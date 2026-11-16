import Link from 'next/link';
import { serviceDepth } from '@/lib/service-depth';
export function ServiceDepth({ slug }: { slug: string }) {
  const detail = serviceDepth[slug];
  if (!detail) return null;
  return (
    <>
      <section className="container section-bottom">
        <div className="section-heading">
          <div>
            <span className="section-kicker">When this engagement fits</span>
            <h2>
              Start with the workflow,
              <br />
              then design the system.
            </h2>
          </div>
          <p>{detail.fit}</p>
        </div>
        <div className="industry-cards">
          {detail.scenarios.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container detail-columns section-bottom">
        <div>
          <span className="section-kicker">Scope and boundaries</span>
          <h2>Know what is being built.</h2>
          <ul className="check-list">
            {detail.boundaries.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <p>
            These are planning areas, not a fixed package. Integrations, migrations, third-party
            costs, and support commitments are defined in the proposal.
          </p>
          <Link className="text-link" href="/engagements">
            Compare engagement models ↗
          </Link>
        </div>
        <aside className="detail-panel">
          <h3>What we validate together</h3>
          <ul>
            {detail.acceptance.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <Link className="text-link" href="/engineering">
            Our engineering standards ↗
          </Link>
        </aside>
      </section>
      <section className="container section-bottom">
        <h2>Questions about this service</h2>
        <div className="faq-list service-faq">
          {detail.questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
