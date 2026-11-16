import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { publishedProjects } from '@/lib/projects';
import { PageIntro, CTA, TextLink } from '@/components/shared';
import { ProjectVisual } from '@/components/project-visual';
import { Architecture } from '@/components/architecture';
import { CaseDepth } from '@/components/case-depth';
export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await publishedProjects();
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project?.name,
    description: project?.description,
    alternates: { canonical: `/projects/${slug}` },
  };
}
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = await publishedProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
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
          <TextLink href={`/projects/${next.slug}`}>{next.name}</TextLink>
        </div>
      </div>
      <PageGuide name={'project-' + slug} />
      <CTA />
    </>
  );
}
