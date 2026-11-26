import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries } from '@/lib/buyer-content';
import { site } from '@/lib/site';
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
  const i = industries.find((item) => item.slug === slug);
  if (!i) return {};

  return {
    title: `${i.title} — Software & Infrastructure Solutions`,
    description: i.description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${i.title} | ${site.name}`,
      description: i.description,
      url: `/industries/${slug}`,
      type: 'website',
    },
  };
}

export default async function Industry({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.find((item) => item.slug === slug);
  if (!i) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${i.title} Engineering Solutions`,
    description: i.description,
    url: `${site.url}/industries/${slug}`,
    areaServed: i.title,
    provider: {
      '@type': 'ProfessionalService',
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
            <Link className="text-link" href={`/services/${i.service}`} prefetch={false}>
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
          <Link className="text-link" href={`/projects/${i.project}`} prefetch={false}>
            Read the architecture story ↗
          </Link>
          <hr />
          <h3>Scope before commitment</h3>
          <p>
            We agree integrations, acceptance criteria, dependencies, and handover needs before a
            delivery plan is finalized.
          </p>
          <Link className="text-link" href="/engagements" prefetch={false}>
            Compare engagement models ↗
          </Link>
        </aside>
      </section>
      <PageGuide name={'industry-' + slug} />
      <CTA />
    </>
  );
}