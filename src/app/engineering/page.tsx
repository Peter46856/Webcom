import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro, CTA } from '@/components/shared';
import { Architecture } from '@/components/architecture';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engineering Standards — Architecture, Reliability & Deployment',
  description:
    'How WebCom approaches architecture, access controls, integration reliability, quality, deployment, and handover.',
  alternates: { canonical: '/engineering' },
  openGraph: {
    title: `Engineering Standards | ${site.name}`,
    description:
      'How WebCom approaches architecture, access controls, integration reliability, quality, deployment, and handover.',
    url: '/engineering',
  },
};

const standards = [
  [
    'Architecture with a reason',
    'Separate interface, business behavior, and infrastructure responsibilities. Record the tradeoffs. A service boundary should solve an actual ownership, security, or scaling problem rather than add infrastructure by default.',
  ],
  [
    'Access aligned to responsibility',
    'Define user roles and data access paths early. Validate requests on the server, keep credentials out of the browser, and review least-privilege access for integrations and operators.',
  ],
  [
    'Failure is part of the workflow',
    'Network calls can fail, payment callbacks can repeat, and devices can report late. Model retries, idempotency, timeouts, and recovery paths around the risk of the operation.',
  ],
  [
    'Tests that protect important behavior',
    'Prioritize authentication, permissions, business state transitions, data validation, and high-value user journeys. Use representative failure conditions rather than only testing the happy path.',
  ],
  [
    'Deployments people can repeat',
    'Separate environments, document configuration, automate repeatable checks, and make production ownership explicit. Backups matter only when restore expectations and responsibilities are understood.',
  ],
  [
    'Handover that survives the project',
    'Keep architecture decisions, API contracts, deployment steps, known limitations, and operational procedures near the code. Agree the scope of future support rather than leaving it implicit.',
  ],
];

export default function Engineering() {
  return (
    <>
      <PageIntro
        label="Engineering standards"
        title="The decisions behind dependable software."
        description="Our engineering approach connects architecture, implementation, and operations. Specific controls and assurance requirements are defined for each engagement."
      />
      <section className="container section-bottom">
        <Architecture
          nodes={[
            {
              title: 'Experience',
              tech: 'React / Next.js',
              detail:
                'Accessible workflows, meaningful loading and error states, and interactions that reflect the application’s real state.',
            },
            {
              title: 'Application',
              tech: 'Java / Spring Boot',
              detail:
                'Server-side validation, authorization, explicit business operations, and traceable integration boundaries.',
            },
            {
              title: 'Data & access',
              tech: 'Supabase / PostgreSQL',
              detail:
                'Data constraints, row-level access policies, controlled credentials, and a clear separation between public content and private inquiries.',
            },
          ]}
        />
      </section>
      <section className="container solution-grid section-bottom">
        {standards.map(([title, text]) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="container detail-panel section-bottom">
        <h2>Assurance is scoped, not implied.</h2>
        <p>
          This page describes an engineering approach. It is not a certification claim. Regulatory
          compliance, formal security audits, penetration testing, recovery objectives, availability
          targets, and contractual SLAs must be explicitly agreed and verified for the deployed
          system.
        </p>
      </section>
      <PageGuide name="engineering" />
      <CTA />
    </>
  );
}