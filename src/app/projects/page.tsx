import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { publishedProjects } from '@/lib/projects';
import { PageIntro, CTA } from '@/components/shared';
import { ProjectCard } from '@/components/project-card';
export const metadata: Metadata = {
  title: 'Selected projects',
  alternates: { canonical: '/projects' },
};
export const dynamic = 'force-dynamic';
export default async function Projects() {
  const projects = await publishedProjects();
  return (
    <>
      <PageIntro
        label="Projects"
        title="Engineering in practice."
        description="A closer look at the systems: how they connect, the problems they address, and the decisions behind their architecture."
      />
      <section className="container section-bottom">
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <p className="content-note">
          Interface illustrations are conceptual views. Project descriptions reflect the supplied
          project brief; measured outcomes and deployment details are not published.
        </p>
      </section>
      <PageGuide name="projects" />
      <CTA />
    </>
  );
}
