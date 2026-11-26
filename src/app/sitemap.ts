import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/content';
import { publishedProjects } from '@/lib/projects';
import { publishedPosts } from '@/lib/published-blog';
import { industries } from '@/lib/buyer-content';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    site.url && !site.url.includes('localhost')
      ? site.url.replace(/\/$/, '')
      : 'https://www.webcom.website';

  const [projects, posts] = await Promise.all([publishedProjects(), publishedPosts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/industries`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/how-we-work`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/engagements`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/engineering`, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((item) => ({
    url: `${baseUrl}/industries/${item.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...blogRoutes,
  ];
}