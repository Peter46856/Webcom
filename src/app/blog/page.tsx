import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro, CTA } from '@/components/shared';
import { BlogList } from '@/components/blog-list';
import { publishedPosts } from '@/lib/published-blog';

export const revalidate = 3600; // Cache blog index and refresh every hour

export const metadata: Metadata = {
  title: 'Engineering Journal — Software, Logistics & Network Architecture',
  description:
    'Read engineering guides, architectural tradeoffs, and practical insights on custom software systems, logistics platforms, and network infrastructure from WebCom Engineering Studio.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Engineering Journal | WebCom Engineering Studio',
    description:
      'Notes from inside the system: engineering guides, architectural tradeoffs, and practical thinking across software, logistics, and networks.',
    url: '/blog',
  },
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