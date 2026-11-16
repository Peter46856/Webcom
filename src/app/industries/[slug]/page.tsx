import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries } from '@/lib/buyer-content';
import { PageIntro, CTA } from '@/components/shared';
export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((i) => i.slug === slug);
  return {
    title: i?.title,
    description: i?.description,
    alternates: { canonical: `/industries/${slug}` },
  };
}
export default async function Industry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.find((i) => i.slug === slug);
  if (!i) notFound();
  return (
    <>
      <PageIntro label={`Industries / ${i.title}`} title={i.headline} description={i.description} />
      <section className="container section-bottom">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Where the friction starts</span>
            <h2>Recognize the operating problem.</h2>
          </div>
        </div>
        <div className="industry-cards problem-cards">
          {i.problems.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section industry-band">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">What we can build</span>
              <h2>Connected capabilities.</h2>
            </div>
            <Link className="text-link" href={`/services/${i.service}`}>
              Explore the engineering service ↗
            </Link>
          </div>
          <div className="solution-grid">
            {i.solutions.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container detail-columns">
        <div>
          <span className="section-kicker">A useful first conversation</span>
          <h2>Questions we start with.</h2>
          <ul className="check-list">
            {i.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        <aside className="detail-panel">
          <h3>See a related system</h3>
          <p>
            Explore the component responsibilities, data flow, and implementation context behind a
            relevant WebCom project.
          </p>
          <Link className="text-link" href={`/projects/${i.project}`}>
            Read the architecture story ↗
          </Link>
          <hr />
          <h3>Scope before commitment</h3>
          <p>
            We agree integrations, acceptance criteria, dependencies, and handover needs before a
            delivery plan is finalized.
          </p>
          <Link className="text-link" href="/engagements">
            Compare engagement models ↗
          </Link>
        </aside>
      </section>
      <PageGuide name={'industry-' + slug} />
      <CTA />
    </>
  );
}
