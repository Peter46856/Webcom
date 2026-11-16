import { publishedProjects } from '@/lib/projects';
import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/content';
import { publishedPosts } from '@/lib/published-blog';
import { industries } from '@/lib/buyer-content';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    '',
    '/services',
    '/pricing',
    '/projects',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/industries',
    '/how-we-work',
    '/engagements',
    '/faq',
    '/engineering',
    ...industries.map((x) => `/industries/${x.slug}`),
    ...services.map((x) => `/services/${x.slug}`),
    ...(await publishedProjects()).map((x) => `/projects/${x.slug}`),
    ...(await publishedPosts()).map((x) => `/blog/${x.slug}`),
  ].map((route) => ({
    url: new URL(route || '/', site.url).href,
    changeFrequency: route.startsWith('/blog') ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : 0.7,
  }));
}
