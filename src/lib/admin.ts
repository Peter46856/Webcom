import 'server-only';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseConfigured } from './supabase';
export const ADMIN_COOKIE = 'webcom-admin';
export const getAdmin = cache(async () => {
  if (!supabaseConfigured()) return null;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    const db = supabase(token);
    const {
      data: { user },
      error,
    } = await db.auth.getUser(token);
    if (error || !user) return null;
    const { data: membership, error: accessError } = await db
      .from('admin_members')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();
    return accessError || !membership ? null : { db, user };
  } catch {
    return null;
  }
});
export function sameOrigin(request: NextRequest) {
  // Read the server runtime setting rather than a build-time public-env literal.
  const { NEXT_PUBLIC_SITE_URL } = process.env;
  return (
    request.headers.get('origin') ===
    new URL(NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin
  );
}
export function adminError(error: string, status = 400) {
  return NextResponse.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });
}
export async function readBody(request: NextRequest) {
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    throw new Error('Expected JSON.');
  if (Number(request.headers.get('content-length') || 0) > 120000)
    throw new Error('Request too large.');
  const text = await request.text();
  if (Buffer.byteLength(text) > 120000) throw new Error('Request too large.');
  return JSON.parse(text);
}
