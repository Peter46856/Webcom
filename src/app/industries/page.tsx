import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { industries } from '@/lib/buyer-content';
import { PageIntro, CTA } from '@/components/shared';
export const metadata: Metadata = {
  title: 'Industry solutions',
  description:
    'Software and infrastructure solutions for logistics, regional ISPs, SaaS teams, and enterprise operations.',
  alternates: { canonical: '/industries' },
};
export default function Industries() {
  return (
    <>
      <PageIntro
        label="Industries"
        title="The context changes the engineering."
        description="Start with the way your organization operates. Explore the workflows, integration challenges, and delivery questions that shape a useful system."
      />
      <section className="container section-bottom industry-overview">
        {industries.map((i) => (
          <article key={i.slug}>
            <div>
              <span className="section-kicker">Industry solutions</span>
              <h2>{i.title}</h2>
              <p>{i.description}</p>
              <Link className="button button-ghost" href={`/industries/${i.slug}`}>
                Explore {i.title.toLowerCase()} ↗
              </Link>
            </div>
            <ul>
              {i.problems.map(([title, text]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <PageGuide name="industries" />
      <CTA />
    </>
  );
}
