import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { publishedProjects } from '@/lib/projects';
import { site } from '@/lib/site';
import { PageIntro, CTA, TextLink } from '@/components/shared';
import { ProjectVisual } from '@/components/project-visual';
import { Architecture } from '@/components/architecture';
import { CaseDepth } from '@/components/case-depth';

export const revalidate = 3600; // Cache project detail pages and refresh every hour

async function getProjectBySlug(slug: string) {
  const projects = await publishedProjects();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return { project, next };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProjectBySlug(slug);
  if (!data) return {};

  const { project } = data;
  return {
    title: `${project.name} — ${project.title}`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description: project.description,
      url: `/projects/${slug}`,
      type: 'article',
    },
  };
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProjectBySlug(slug);
  if (!data) notFound();

  const { project, next } = data;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: `${site.url}/projects/${slug}`,
    applicationCategory: 'BusinessApplication',
    creator: {
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
      <PageIntro
        label={`Projects / ${project.name}`}
        title={project.title}
        description={project.description}
      />
      <div className="container">
        <div className="case-header">
          <h2>{project.name}</h2>
          <div className="tag-list">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <ProjectVisual type={project.slug} large />
        <p className="content-note">
          Conceptual interface illustration · Architecture overview based on the project brief
        </p>
        <div className="case-story">
          <div>
            <span className="section-kicker">The challenge</span>
            <h2>A real operational problem.</h2>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span className="section-kicker">The approach</span>
            <h2>Designed around the system.</h2>
            <p>{project.approach}</p>
          </div>
        </div>
        <section className="section-bottom">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Inside the system</span>
              <h2>Explore the architecture.</h2>
            </div>
            <p>Select a component to see its role.</p>
          </div>
          <Architecture nodes={project.nodes} />
        </section>
        <section className="detail-columns section-bottom">
          <div>
            <h2>Core capabilities</h2>
            <ul className="check-list">
              {project.features.map((item) => (
                <li key={item}>
                  <Check size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside className="detail-panel">
            <h3>Have a related challenge?</h3>
            <p>
              We can help translate your operating requirements into a practical architecture and
              delivery plan.
            </p>
            <TextLink href="/contact">Discuss your project</TextLink>
          </aside>
        </section>
        <CaseDepth slug={slug} />
        <div className="next-project">
          <span>Explore the next system</span>
          <Link className="text-link" href={`/projects/${next.slug}`} prefetch={false}>
            {next.name} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <PageGuide name={'project-' + slug} />
      <CTA />
    </>
  );
}