import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { inquiryStatuses } from '@/lib/blog-schema';
export async function GET(request: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const page = Math.floor(
      Math.max(0, Math.min(100000, Number(request.nextUrl.searchParams.get('page')) || 0)),
    ),
    status = request.nextUrl.searchParams.get('status');
  let query = admin.db
    .from('inquiries')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(page * 25, page * 25 + 24);
  if (status && inquiryStatuses.includes(status as (typeof inquiryStatuses)[number]))
    query = query.eq('status', status);
  const { data, error, count } = await query;
  if (error) {
    console.error('[admin] inquiries.read_failed', { code: error.code });
    return adminError('Could not load inquiries. Check the admin migration and permissions.', 503);
  }
  return NextResponse.json(
    { inquiries: data, count },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
export async function PATCH(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = z
      .object({ id: z.uuid(), status: z.enum(inquiryStatuses) })
      .safeParse(await readBody(request));
    if (!parsed.success) return adminError('Invalid inquiry update.');
    const { data, error } = await admin.db
      .from('inquiries')
      .update({ status: parsed.data.status })
      .eq('id', parsed.data.id)
      .select('id')
      .maybeSingle();
    if (error) return adminError('Could not update the inquiry.', 503);
    return data ? NextResponse.json({ ok: true }) : adminError('Inquiry not found.', 404);
  } catch {
    return adminError('The inquiry update could not be read.');
  }
}
