import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { inquirySchema } from '@/lib/inquiry';
import { sendInquiryEmail } from '@/lib/inquiry-email';
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = z.object({ id: z.uuid() }).safeParse(await readBody(request));
    if (!parsed.success) return adminError('Invalid inquiry reference.');
    const [{ data: inquiry, error }, { data: settings, error: settingsError }] = await Promise.all([
      admin.db.from('inquiries').select('*').eq('id', parsed.data.id).maybeSingle(),
      admin.db.from('studio_settings').select('inquiry_email').eq('id', 'main').maybeSingle(),
    ]);
    if (error || settingsError)
      return adminError('Could not load the inquiry or notification settings.', 503);
    if (!inquiry) return adminError('Inquiry not found.', 404);
    if (!settings) return adminError('Set the recipient in Admin > Notifications.', 503);
    const payload = inquirySchema.safeParse({ ...inquiry, consent: true });
    if (!payload.success) return adminError('Stored inquiry does not match the expected fields.');
    const result = await sendInquiryEmail(payload.data, parsed.data.id, settings.inquiry_email);
    if (result.status !== 'accepted')
      return adminError(result.reason || 'Email could not be sent.', 503);
    return NextResponse.json({
      message: 'Email accepted by the provider. Check your inbox and spam folder.',
    });
  } catch {
    return adminError('Could not send notification. The inquiry remains saved.', 503);
  }
}
