import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { blogSchema } from '@/lib/blog-schema';
import { getPosts } from '@/lib/blog';
export async function GET() {
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const { data, error } = await admin.db
    .from('blog_posts')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) return adminError('Could not load posts. Apply the admin migration.', 503);
  return NextResponse.json({ posts: data }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  try {
    const parsed = blogSchema.safeParse(await readBody(request));
    if (!parsed.success)
      return adminError(
        parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' '),
      );
    if (getPosts().some((p) => p.slug === parsed.data.slug))
      return adminError('This slug belongs to a starter MDX article. Choose another slug.');
    const { data, error } = await admin.db
      .from('blog_posts')
      .insert({ ...parsed.data, author_id: admin.user.id })
      .select('*')
      .single();
    if (error)
      return adminError(
        error.code === '23505' ? 'That slug already exists.' : 'Post could not be saved.',
        error.code === '23505' ? 409 : 503,
      );
    return NextResponse.json({ post: data }, { status: 201 });
  } catch {
    return adminError('Post could not be read.');
  }
}
