import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, CTA } from '@/components/shared';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Engagement Models — Discovery, Scoped Builds & Ongoing Operations',
  description:
    'Choose discovery, a scoped engineering build, or ongoing improvements. Understand deliverables, responsibilities, and proposal inputs.',
  alternates: { canonical: '/engagements' },
  openGraph: {
    title: `Engagement Models | ${site.name}`,
    description:
      'Choose discovery, a scoped engineering build, or ongoing improvements. Understand deliverables, responsibilities, and proposal inputs.',
    url: '/engagements',
  },
};

const models = [
  {
    name: 'Discovery & architecture',
    fit: 'The problem matters, but the scope or technical direction is still uncertain.',
    work: 'Workshops, workflow mapping, system constraints, integration assessment, and an architecture-backed plan.',
    outputs: [
      'Prioritized problem and user journeys',
      'Architecture and integration boundaries',
      'Risks, assumptions, and scope exclusions',
      'Phased delivery proposal and acceptance criteria',
    ],
    decision:
      'A decision-ready plan. It may support building, simplifying, or changing direction before committing to a larger scope.',
  },
  {
    name: 'A focused engineering build',
    fit: 'The desired workflow is understood and you need a partner to deliver a defined system or integration.',
    work: 'Implementation in reviewable increments, integration testing, deployment preparation, and operational handover.',
    outputs: [
      'Working application or infrastructure capability',
      'Source code and configuration in agreed repositories',
      'Tests for important workflows and failure paths',
      'Deployment instructions and handover documentation',
    ],
    decision:
      'A defined release evaluated against agreed acceptance criteria, with open issues and limitations recorded.',
  },
  {
    name: 'Ongoing improvement & operations',
    fit: 'A system exists and needs planned improvements, maintenance, or clearer operational ownership.',
    work: 'A scoped backlog of enhancements, defect work, observability improvements, and agreed operational tasks.',
    outputs: [
      'Prioritized and reviewed improvement backlog',
      'Scheduled releases and change records',
      'Maintenance and operational documentation',
      'Defined support boundaries and escalation contacts',
    ],
    decision:
      'An ongoing agreement with explicit capacity, support hours, response expectations, and exclusions.',
  },
];

export default function Engagements() {
  return (
    <>
      <PageIntro
        label="Engagement models"
        title="Start with the commitment that makes sense."
        description="Different problems need different entry points. Choose a discovery engagement, a defined build, or a planned improvement relationship."
      />
      <div className="container section-bottom">
        <Link className="button" href="/pricing" prefetch={false}>
          Compare pricing and included features
        </Link>
      </div>
      <section className="container engagement-grid section-bottom">
        {models.map((model) => (
          <article key={model.name}>
            <span className="section-kicker">A way to work together</span>
            <h2>{model.name}</h2>
            <h3>A good fit when</h3>
            <p>{model.fit}</p>
            <h3>What the work involves</h3>
            <p>{model.work}</p>
            <h3>Typical deliverables</h3>
            <ul>
              {model.outputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="engagement-outcome">
              <strong>What you can decide next</strong>
              <p>{model.decision}</p>
            </div>
            <Link className="button button-ghost" href="/contact" prefetch={false}>
              Discuss this engagement ↗
            </Link>
          </article>
        ))}
      </section>
      <section className="container detail-columns section-bottom">
        <div>
          <h2>What shapes the proposal?</h2>
          <p>
            Scope is more than the number of screens. Data quality, external dependencies,
            permissions, migration effort, network access, test coverage, deployment environments,
            and handover needs all affect the work.
          </p>
          <p>
            We define milestones, assumptions, review points, and a change process in the proposal.
            The inquiry form’s budget ranges are starting context, not published package prices.
          </p>
        </div>
        <aside className="detail-panel">
          <h3>Before the first call</h3>
          <ul>
            <li>Describe the current problem and who it affects</li>
            <li>List the systems that must connect</li>
            <li>Identify deadlines and the reason behind them</li>
            <li>Bring a budget range or ask us to scope the first step</li>
          </ul>
          <Link className="text-link" href="/faq" prefetch={false}>
            Read common buyer questions ↗
          </Link>
        </aside>
      </section>
      <PageGuide name="engagements" />
      <CTA />
    </>
  );
}