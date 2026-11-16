import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, adminError, readBody, sameOrigin } from '@/lib/admin';
import { blogSchema } from '@/lib/blog-schema';
import { getPosts } from '@/lib/blog';
import { z } from 'zod';
async function mutate(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
  remove: boolean,
) {
  if (!sameOrigin(request)) return adminError('Invalid request origin.', 403);
  const admin = await getAdmin();
  if (!admin) return adminError('Please sign in as an administrator.', 401);
  const { id } = await context.params;
  if (!z.uuid().safeParse(id).success) return adminError('Invalid post ID.');
  if (remove) {
    const { data, error } = await admin.db
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();
    if (error) return adminError('Could not delete post.', 503);
    return data ? NextResponse.json({ ok: true }) : adminError('Post not found.', 404);
  }
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
      .update(parsed.data)
      .eq('id', id)
      .select('*')
      .maybeSingle();
    if (error)
      return adminError(
        error.code === '23505' ? 'That slug already exists.' : 'Could not save post.',
        error.code === '23505' ? 409 : 503,
      );
    return data ? NextResponse.json({ post: data }) : adminError('Post not found.', 404);
  } catch {
    return adminError('Post could not be read.');
  }
}
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return mutate(request, context, false);
}
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  return mutate(request, context, true);
}
