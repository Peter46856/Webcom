import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { publishedProjects } from '@/lib/projects';
import { PageIntro, CTA } from '@/components/shared';
import { ProjectCard } from '@/components/project-card';

export const revalidate = 3600; // Cache projects page and refresh every hour

export const metadata: Metadata = {
  title: 'Software & Infrastructure Engineering Case Studies',
  description:
    'Explore selected software engineering, logistics platforms, and network infrastructure systems built by WebCom Engineering Studio.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Software & Infrastructure Engineering Case Studies | WebCom Engineering Studio',
    description:
      'A closer look at the systems built by WebCom: how they connect, the problems they address, and the decisions behind their architecture.',
    url: '/projects',
  },
};

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