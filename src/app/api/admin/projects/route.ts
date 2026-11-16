import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { projectSchema } from '@/lib/project-schema';
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const { data, error } = await admin.db
    .from('portfolio_projects')
    .select('data')
    .order('created_at');
  if (error)
    return adminError('Could not load projects. Apply the projects migration in Supabase.', 503);
  return NextResponse.json(
    { projects: data.map((row) => row.data) },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = projectSchema.safeParse(await readBody(request));
    if (!parsed.success)
      return adminError(
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' '),
      );
    const { error } = await admin.db
      .from('portfolio_projects')
      .insert({ slug: parsed.data.slug, data: parsed.data });
    if (error)
      return adminError(
        error.code === '23505' ? 'That project URL already exists.' : 'Could not save project.',
        error.code === '23505' ? 409 : 503,
      );
    return NextResponse.json({ saved: true }, { status: 201 });
  } catch {
    return adminError('Could not read project.');
  }
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return adminError('Invalid project URL.');
  const { error } = await admin.db.from('portfolio_projects').delete().eq('slug', slug);
  if (error) return adminError('Could not remove project.', 503);
  return NextResponse.json({ removed: true });
}
