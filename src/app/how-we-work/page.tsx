import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageIntro, CTA } from '@/components/shared';
import { deliveryPhases } from '@/lib/buyer-content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'How We Work — Discovery, Architecture, Delivery & Handover',
  description:
    'WebCom delivery process: discovery, architecture, incremental development, validation, deployment, and operational handover.',
  alternates: { canonical: '/how-we-work' },
  openGraph: {
    title: `How We Work | ${site.name}`,
    description:
      'WebCom delivery process: discovery, architecture, incremental development, validation, deployment, and operational handover.',
    url: '/how-we-work',
  },
};

export default function Approach() {
  return (
    <>
      <PageIntro
        label="How we work"
        title="Clarity at every handoff."
        description="A delivery process should make responsibilities and decisions visible. Here is how we take a project from an open question to an operable system."
      />
      <section className="container delivery-timeline">
        {deliveryPhases.map((phase, index) => (
          <article key={phase.name}>
            <span className="phase-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <span className="section-kicker">{phase.output}</span>
              <h2>{phase.name}</h2>
              <p>{phase.detail}</p>
              <div className="phase-gate">
                <strong>Before we move on</strong>
                <p>{phase.check}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="section container detail-columns">
        <div>
          <h2>
            Working together,
            <br />
            without ambiguity.
          </h2>
          <p>
            We recommend one accountable contact on each side, a shared backlog, an agreed review
            cadence, and written acceptance criteria. Decisions that change cost or scope should be
            visible before implementation begins.
          </p>
        </div>
        <aside className="detail-panel">
          <h3>What your team provides</h3>
          <ul>
            <li>Access to the people who use and operate the system</li>
            <li>Existing documentation and approved integration access</li>
            <li>A decision maker for scope and acceptance</li>
            <li>A clear owner for production accounts and handover</li>
          </ul>
          <Link className="text-link" href="/engagements" prefetch={false}>
            Find the right engagement ↗
          </Link>
        </aside>
      </section>
      <PageGuide name="how-we-work" />
      <CTA />
    </>
  );
}