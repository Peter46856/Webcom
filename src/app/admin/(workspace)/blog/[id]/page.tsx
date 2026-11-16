import { notFound, redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { BlogEditor } from '@/components/blog-editor';
import { ManagedPost } from '@/lib/blog-schema';
import { z } from 'zod';
export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  const { data, error } = await admin.db.from('blog_posts').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error('Post could not be loaded.');
  if (!data) notFound();
  return <BlogEditor initial={data as ManagedPost} />;
}
