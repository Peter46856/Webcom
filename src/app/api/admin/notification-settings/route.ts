import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { emailConfigured } from '@/lib/inquiry-email';
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const { data, error } = await admin.db
    .from('studio_settings')
    .select('inquiry_email')
    .eq('id', 'main')
    .maybeSingle();
  if (error || !data)
    return adminError('Apply the pricing and notification settings migration in Supabase.', 503);
  return NextResponse.json(
    { recipient: data.inquiry_email, configured: emailConfigured() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
export async function PATCH(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = z.object({ recipient: z.email().max(254) }).safeParse(await readBody(request));
    if (!parsed.success) return adminError('Enter a valid recipient email address.');
    const { data, error } = await admin.db
      .from('studio_settings')
      .update({ inquiry_email: parsed.data.recipient })
      .eq('id', 'main')
      .select('id')
      .maybeSingle();
    if (error || !data)
      return adminError('Could not update notification settings. Check the migration.', 503);
    return NextResponse.json({ saved: true });
  } catch {
    return adminError('Could not read settings.');
  }
}
