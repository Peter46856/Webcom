import 'server-only';
import { cache } from 'react';
import { getPosts, getPost } from './blog';
import { supabase, supabaseConfigured } from './supabase';
export type PublishedArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  source: string;
  format: 'mdx' | 'markdown';
  publishedAt?: string;
};
export const publishedPosts = cache(async () => {
  const local: PublishedArticle[] = getPosts().map((p) => ({
    ...p,
    source: getPost(p.slug)!.source,
    format: 'mdx',
  }));
  if (!supabaseConfigured()) return local;
  try {
    const { data, error } = await supabase()
      .from('blog_posts')
      .select('slug,title,description,category,content,published_at')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    if (error) {
      console.error('[blog] published.read_failed', { code: error.code });
      return local;
    }
    const managed: PublishedArticle[] = (data || [])
      .filter((p) => !local.some((l) => l.slug === p.slug))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        readingTime: Math.max(1, Math.ceil(p.content.split(/\s+/).length / 220)),
        source: p.content,
        format: 'markdown',
        publishedAt: p.published_at,
      }));
    return [...managed, ...local];
  } catch {
    console.error('[blog] published.connection_failed');
    return local;
  }
});
export async function publishedPost(slug: string) {
  return (await publishedPosts()).find((p) => p.slug === slug) || null;
}
