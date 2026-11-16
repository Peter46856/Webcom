import fs from 'node:fs';
import path from 'node:path';

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  file: string;
};
// Local, reviewed MDX only. Never compile user-submitted MDX.
const articles = [
  {
    slug: 'designing-reliable-event-pipelines',
    title: 'Real-time is a system, not a socket.',
    description:
      'What a fleet tracking pipeline needs beyond an open WebSocket: durable events, reconnects, and an honest view of location freshness.',
    category: 'Logistics Tech',
    readingTime: 6,
  },
  {
    slug: 'payment-to-provisioning',
    title: 'From payment callback to network access.',
    description:
      'Designing an ISP billing workflow that handles duplicate callbacks, failed provisioning, and the gap between paid and connected.',
    category: 'Network Infrastructure',
    readingTime: 7,
  },
  {
    slug: 'clear-system-boundaries',
    title: 'Start with boundaries. Then choose the tools.',
    description:
      'A practical approach to separating application, business, and infrastructure concerns without turning a small product into a distributed maze.',
    category: 'Software Engineering',
    readingTime: 5,
  },
];
export function getPosts(): Post[] {
  return articles.map((post) => ({
    ...post,
    readingTime: Math.max(
      1,
      Math.ceil(
        fs
          .readFileSync(path.join(process.cwd(), 'content', 'blog', `${post.slug}.mdx`), 'utf8')
          .split(/\s+/).length / 220,
      ),
    ),
    file: path.join(process.cwd(), 'content', 'blog', `${post.slug}.mdx`),
  }));
}
export function getPost(slug: string) {
  const post = getPosts().find((item) => item.slug === slug);
  return post ? { ...post, source: fs.readFileSync(post.file, 'utf8') } : null;
}
