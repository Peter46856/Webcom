import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ADMIN_COOKIE, adminError, readBody, sameOrigin } from '@/lib/admin';
import { supabase, supabaseConfigured } from '@/lib/supabase';
const attempts = new Map<string, { count: number; reset: number }>();
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  if (!supabaseConfigured())
    return adminError('Admin setup is incomplete. Follow docs/ADMIN.md.', 503);
  const now = Date.now();
  for (const [key, value] of attempts) if (value.reset < now) attempts.delete(key);
  const key = request.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const bucket = attempts.get(key) || { count: 0, reset: now + 15 * 60000 };
  if (++bucket.count > 10) return adminError('Too many attempts. Try again in 15 minutes.', 429);
  attempts.set(key, bucket);
  try {
    const parsed = z
      .object({ email: z.email().max(254), password: z.string().min(1).max(256) })
      .safeParse(await readBody(request));
    if (!parsed.success) return adminError('Enter a valid email and password.');
    const { data, error } = await supabase().auth.signInWithPassword(parsed.data);
    if (error || !data.session)
      return adminError('Sign-in failed. Check your credentials and administrator access.', 401);
    const { data: membership, error: accessError } = await supabase(data.session.access_token)
      .from('admin_members')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();
    if (accessError || !membership)
      return adminError('Sign-in failed. Check your credentials and administrator access.', 403);
    const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
    // Short session; no refresh token stored. Reauthenticate after expiry.
    response.cookies.set(ADMIN_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure:
        new URL(request.url).protocol === 'https:' ||
        Boolean(process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https://')),
      sameSite: 'strict',
      path: '/',
      maxAge: Math.min(data.session.expires_in, 3600),
    });
    return response;
  } catch {
    return adminError(
      'Sign-in service unavailable. Check Supabase configuration and network access.',
      503,
    );
  }
}
