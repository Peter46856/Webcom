import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { publishedPost } from '@/lib/published-blog';
import { site } from '@/lib/site';
import { Markdown } from '@/components/markdown';
import { articleHeadings, headingId } from '@/lib/headings';
import { CTA } from '@/components/shared';

export const revalidate = 3600; // Cache compiled MDX/Markdown articles and refresh every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await publishedPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.description,
      url: `/blog/${slug}`,
      type: 'article',
      authors: [site.name],
    },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await publishedPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    url: `${site.url}/blog/${slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blog/${slug}`,
    },
    author: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="article container">
        <div className="breadcrumb">
          <Link href="/blog">Engineering journal</Link>
          <span>/</span>
          <span>{post.category}</span>
        </div>
        <div className="article-meta">
          <span>{post.category}</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-lede">{post.description}</p>
        <div className="article-byline">
          WebCom Engineering Studio <span>Engineering guide</span>
        </div>
        {post.format === 'mdx' && (
          <nav className="article-contents" aria-label="Article chapters">
            <span>In this article</span>
            {articleHeadings(post.source).map((title) => (
              <a key={title} href={'#' + headingId(title)}>
                {title}
              </a>
            ))}
          </nav>
        )}
        <div className="prose">
          {post.format === 'mdx' ? (
            <MDXRemote
              source={post.source}
              components={{
                h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
              }}
            />
          ) : (
            <Markdown content={post.source} />
          )}
        </div>
        <Link href="/blog" className="text-link">
          ← Back to the engineering journal
        </Link>
      </article>
      <CTA />
    </>
  );
}