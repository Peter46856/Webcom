import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { services } from '@/lib/content';
import { PageIntro, CTA } from '@/components/shared';
import { ServiceDepth } from '@/components/service-depth';
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return {
    title: service?.title,
    description: service?.description,
    alternates: { canonical: `/services/${slug}` },
  };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageIntro
        label={`Services / ${service.title}`}
        title={service.short}
        description={service.description}
      />
      <section className="container detail-columns section-bottom">
        <div>
          <span className="section-kicker">What we engineer</span>
          <h2>{service.title}</h2>
          <ul className="check-list">
            {service.capabilities.map((item) => (
              <li key={item}>
                <Check size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <aside className="detail-panel">
          <h3>What you take forward</h3>
          <p>{service.outcome}</p>
          <ul>
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>
      <ServiceDepth slug={slug} />
      <section className="container process-section">
        <h2>A clear path from idea to operation.</h2>
        <div className="process-grid">
          {[
            [
              '01',
              'Discover',
              'Map your users, constraints, integrations, and definition of success.',
            ],
            [
              '02',
              'Design',
              'Agree the architecture, scope, delivery milestones, and acceptance criteria.',
            ],
            [
              '03',
              'Build',
              'Deliver in reviewable increments with tests and regular demonstrations.',
            ],
            [
              '04',
              'Operate',
              'Deploy, document, and hand over the system with a practical support plan.',
            ],
          ].map(([n, title, text]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <PageGuide name={'service-' + slug} />
      <CTA />
    </>
  );
}
