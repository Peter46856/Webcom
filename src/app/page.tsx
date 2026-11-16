import { publishedProjects } from '@/lib/projects';
import { PricingPreview } from '@/components/pricing-preview';
import { PageGuide } from '@/components/page-guide';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Braces,
  GitBranch,
  Layers3,
  Terminal,
  Check,
} from 'lucide-react';
import { SystemMap } from '@/components/system-map';
import { ProjectCard } from '@/components/project-card';
import { ServiceIcon } from '@/components/icons';
import { CTA, TextLink } from '@/components/shared';
import { services } from '@/lib/content';
import { publishedPosts } from '@/lib/published-blog';
import { BuyerPaths } from '@/components/buyer-paths';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const projects = await publishedProjects();
  const posts = (await publishedPosts()).slice(0, 2);
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="status-label">
            <span />
            Software development & network infrastructure
          </div>
          <h1>
            Complex systems.
            <br />
            Clear thinking.
            <br />
            Real impact.
          </h1>
          <p>
            We engineer the software and infrastructure that keep your business moving. From your
            first API to your last-mile connection.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/contact">
              Build with WebCom <ArrowUpRight size={18} />
            </Link>
            <Link className="button button-ghost" href="/projects">
              Explore our work <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="note-line" />
            Architecture. Development. Deployment.
          </div>
        </div>
        <SystemMap />
      </section>
      <section className="expertise-strip">
        <div className="container">
          <span>
            One studio.
            <br />
            <strong>Every layer.</strong>
          </span>
          <div>
            <Braces />
            Software engineering
          </div>
          <div>
            <GitBranch />
            Logistics systems
          </div>
          <div>
            <Layers3 />
            Network infrastructure
          </div>
          <div>
            <Terminal />
            Cloud & DevOps
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Our capabilities</span>
            <h2>
              From the application
              <br />
              to the infrastructure.
            </h2>
          </div>
          <p>
            Good engineering connects the dots.
            <br />
            We bring the whole system into focus.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <Link className="service-card" href={`/services/${service.slug}`} key={service.slug}>
              <div className="service-card-top">
                <span className="icon-box">
                  <ServiceIcon name={service.icon} />
                </span>
                <ArrowUpRight size={20} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <ul>
                {service.tags.map((tag) => (
                  <li key={tag}>
                    <span />
                    {tag}
                  </li>
                ))}
              </ul>
              <span className="service-link">
                Explore capability <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section work-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Selected engineering</span>
              <h2>Built for the real world.</h2>
            </div>
            <TextLink href="/projects">Explore all projects</TextLink>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section className="section container approach-section">
        <div>
          <span className="section-kicker">The WebCom approach</span>
          <h2>
            We think in systems.
            <br />
            We build for people.
          </h2>
          <p>
            Every interface sits on an architecture. Every network serves a business. We connect the
            technical decisions to the outcomes that matter.
          </p>
          <TextLink href="/about">Meet the engineering mindset</TextLink>
        </div>
        <div className="principle-list">
          {[
            [
              'Understand before we build',
              'We map the problem, the constraints, and the operational reality before choosing the tools.',
            ],
            [
              'Engineer for what comes next',
              'Clear boundaries, documented decisions, and maintainable systems give your team room to grow.',
            ],
            [
              'Own the whole journey',
              'From architecture to deployment and handover, the details stay connected.',
            ],
          ].map(([title, text]) => (
            <div key={title}>
              <span className="principle-check">
                <Check size={16} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="facts-strip container" aria-label="Studio capabilities">
        <div>
          <strong>4</strong>
          <span>Engineering disciplines</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Featured system stories</span>
        </div>
        <div>
          <strong>End to end</strong>
          <span>Architecture through deployment</span>
        </div>
        <div>
          <strong>Built to evolve</strong>
          <span>Maintainability by design</span>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Engineering journal</span>
            <h2>Behind the architecture.</h2>
          </div>
          <TextLink href="/blog">Read the journal</TextLink>
        </div>
        <div className="journal-grid">
          {posts.map((post) => (
            <Link className="journal-card" href={`/blog/${post.slug}`} key={post.slug}>
              <div className="article-meta">
                <span>{post.category}</span>
                <span>{post.readingTime} min read</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <span className="text-link">
                Read article <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <BuyerPaths />
      <PricingPreview />
      <PageGuide name="home" />
      <CTA />
    </>
  );
}
