import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro, CTA } from '@/components/shared';
import { BlogList } from '@/components/blog-list';
import { publishedPosts } from '@/lib/published-blog';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Engineering journal',
  alternates: { canonical: '/blog' },
};
export default async function Blog() {
  const posts = await publishedPosts();
  return (
    <>
      <PageIntro
        label="Blog"
        title="Notes from inside the system."
        description="Engineering guides, architectural tradeoffs, and practical thinking across software, logistics, and networks."
      />
      <section className="container section-bottom">
        <BlogList
          posts={posts.map(({ slug, title, description, category, readingTime }) => ({
            slug,
            title,
            description,
            category,
            readingTime,
          }))}
        />
      </section>
      <PageGuide name="blog" />
      <CTA />
    </>
  );
}
