import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, sameOrigin, adminError } from '@/lib/admin';
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
