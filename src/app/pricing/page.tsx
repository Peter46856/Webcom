import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, CTA } from '@/components/shared';
import { PricingCatalog } from '@/components/pricing-catalog';
import { publishedPricing } from '@/lib/pricing';
import { site } from '@/lib/site';

export const revalidate = 3600; // Cache pricing catalog and refresh every hour

export const metadata: Metadata = {
  title: 'Pricing & Engineering Packages',
  description:
    'Feature-based planning ranges for websites, custom software, fleet platforms, ISP automation, cloud engineering, and ongoing support.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `Pricing & Engineering Packages | ${site.name}`,
    description:
      'Feature-based planning ranges for websites, custom software, fleet platforms, ISP automation, cloud engineering, and ongoing support.',
    url: '/pricing',
  },
};

export default async function Pricing() {
  const { packages, unavailable } = await publishedPricing();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What if I do not know which features I need?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the business problem: who uses the system, what they need to accomplish, and where the current process breaks down. We can help narrow a first release or recommend discovery before a build.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are hosting, hardware, and transaction charges included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Domains, cloud hosting, email delivery, map APIs, payment fees, software licenses, network hardware, travel, and physical installation are separate unless explicitly included in your proposal.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I combine services or change requirements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. A fleet platform may need cloud setup, or an ISP portal may need a public website. We quote overlapping work once in a combined scope.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does choosing a package reserve work or require payment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The package button opens an inquiry with that package as context. No checkout, reservation, or contract is created. The final proposal governs pricing and delivery.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageIntro
        label="Pricing & packages"
        title="A clearer starting point for your budget."
        description="Match your needs to a realistic scope. These planning ranges show what is included, what changes the price, and when a custom proposal makes more sense."
      />
      <section className="container section-bottom">
        <div className="pricing-intro">
          <h2>Pay for the work your system needs.</h2>
          <p>
            Prices are indicative engineering fees in each package’s displayed currency, before
            applicable taxes. They are not instant quotes or subscription software prices. We
            confirm scope, acceptance criteria, schedule, and payment milestones in a written
            proposal before work begins.
          </p>
          <p>
            The lower end assumes a clear brief, ready content, standard workflows, and documented
            integrations. The upper end allows more design work, workflow complexity, and
            integration testing within the stated limits. Requirements outside those limits need a
            separate estimate.
          </p>
        </div>
        {packages.length ? (
          <PricingCatalog packages={packages} />
        ) : (
          <div className="detail-panel">
            <h2>
              {unavailable
                ? 'Package pricing is temporarily unavailable.'
                : 'Let’s price your scope together.'}
            </h2>
            <p>Contact the studio for a feature-based estimate and a written proposal.</p>
            <Link className="button" href="/contact">
              Request an estimate
            </Link>
          </div>
        )}
      </section>
      <section className="container section-bottom pricing-explainer">
        <h2>What moves a project up or down the range?</h2>
        <div className="pricing-drivers">
          {[
            [
              'Workflows and roles',
              'A public information page needs less engineering than approvals, permissions, and operational dashboards. We count workflows and their exception paths, not just screens.',
            ],
            [
              'Integrations and real-time data',
              'Payments, maps, live GPS, and network provisioning introduce credentials, callbacks, rate limits, reconciliation, and failure recovery. Undocumented APIs require investigation first.',
            ],
            [
              'Data and reliability',
              'Importing clean records is different from reconciling years of inconsistent data. Availability targets, audit trails, load expectations, and backup recovery affect scope.',
            ],
            [
              'Design and content',
              'Ready branding and content shorten delivery. Bespoke UI research, multilingual content, complex accessibility remediation, and many unique layouts add work.',
            ],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section-bottom pricing-explainer">
        <h2>Choose a sensible commercial model.</h2>
        <div className="pricing-drivers">
          <article>
            <h3>Defined scope, milestone payments</h3>
            <p>
              Best when the workflow and acceptance criteria are clear. We agree a price for a
              written scope and review changes before adding work. The displayed range is an
              orientation, not a fixed offer.
            </p>
          </article>
          <article>
            <h3>Discovery before commitment</h3>
            <p>
              Best when the problem is clear but the solution is not. A short paid engagement
              produces an architecture, risks, and a delivery plan. Discovery is priced separately
              unless the proposal includes it.
            </p>
          </article>
          <article>
            <h3>Monthly engineering capacity</h3>
            <p>
              Best for maintenance and incremental improvements to an existing system. Capacity,
              support hours, escalation expectations, and unused hours are agreed explicitly. It
              does not imply unlimited changes or 24/7 support.
            </p>
          </article>
        </div>
      </section>
      <section className="container section-bottom pricing-explainer">
        <h2>Before you choose a package.</h2>
        <details>
          <summary>What if I do not know which features I need?</summary>
          <p>
            Start with the business problem: who uses the system, what they need to accomplish, and
            where the current process breaks down. We can help narrow a first release or recommend
            discovery before a build.
          </p>
        </details>
        <details>
          <summary>Are hosting, hardware, and transaction charges included?</summary>
          <p>
            No. Domains, cloud hosting, email delivery, map APIs, payment fees, software licenses,
            network hardware, travel, and physical installation are separate unless explicitly
            included in your proposal. We identify expected recurring costs during scoping.
          </p>
        </details>
        <details>
          <summary>Can I combine services or change requirements?</summary>
          <p>
            Yes. A fleet platform may need cloud setup, or an ISP portal may need a public website.
            We quote overlapping work once in a combined scope. New requirements are assessed for
            cost and schedule before approval.
          </p>
        </details>
        <details>
          <summary>Does choosing a package reserve work or require payment?</summary>
          <p>
            No. The package button opens an inquiry with that package as context. No checkout,
            reservation, or contract is created. The final proposal governs pricing and delivery.
          </p>
        </details>
        <details>
          <summary>How were the starting ranges set?</summary>
          <p>
            WebCom’s initial estimates use scoped engineering effort, with a planning baseline
            around USD 50 per hour. Scope and risk change the final quote. Market references
            reviewed on 1 November 2026 include{' '}
            <a href="https://clutch.co/developers/pricing" target="_blank" rel="noreferrer">
              Clutch’s software development pricing guide
            </a>{' '}
            and{' '}
            <a href="https://www.upwork.com/hire/web-developers/" target="_blank" rel="noreferrer">
              Upwork’s developer marketplace
            </a>
            . They are broad reference points, not a quote for your project. Published packages can
            be updated as the studio’s scope and rates evolve.
          </p>
        </details>
      </section>
      <CTA />
    </>
  );
}