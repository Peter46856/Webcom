import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { pricingSchema } from '@/lib/pricing-schema';
const headers = { 'Cache-Control': 'no-store' };
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const { data, error } = await admin.db
    .from('pricing_packages')
    .select('*')
    .order('sort_order')
    .order('name');
  if (error)
    return adminError('Could not load packages. Apply the pricing migration in Supabase.', 503);
  return NextResponse.json({ packages: data }, { headers });
}
async function save(request: NextRequest, update: boolean) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = pricingSchema.safeParse(await readBody(request));
    if (!parsed.success)
      return adminError(
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' '),
      );
    const query = update
      ? admin.db.from('pricing_packages').update(parsed.data).eq('slug', parsed.data.slug)
      : admin.db.from('pricing_packages').insert(parsed.data);
    const { data, error } = await query.select('slug').maybeSingle();
    if (error)
      return adminError(
        error.code === '23505' ? 'That package ID already exists.' : 'Package could not be saved.',
        error.code === '23505' ? 409 : 503,
      );
    if (!data) return adminError('Package no longer exists. Refresh the list.', 404);
    return NextResponse.json({ saved: true }, { status: update ? 200 : 201, headers });
  } catch {
    return adminError('Could not read package data.');
  }
}
export async function POST(request: NextRequest) {
  return save(request, false);
}
export async function PATCH(request: NextRequest) {
  return save(request, true);
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return adminError('Invalid package ID.');
  const { data, error } = await admin.db
    .from('pricing_packages')
    .delete()
    .eq('slug', slug)
    .select('slug')
    .maybeSingle();
  if (error) return adminError('Could not delete package.', 503);
  if (!data) return adminError('Package not found.', 404);
  return NextResponse.json({ removed: true }, { headers });
}
