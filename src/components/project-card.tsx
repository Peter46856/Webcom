import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '@/lib/project-schema';
import { ProjectVisual } from './project-visual';
export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <ProjectVisual type={project.slug} />
      <div className="project-card-body">
        <div className="project-category">
          {project.category}
          <ArrowUpRight size={18} />
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.stack.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
