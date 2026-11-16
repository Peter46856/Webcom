import Link from 'next/link';
import { industries } from '@/lib/buyer-content';
export function BuyerPaths() {
  return (
    <section className="section container buyer-paths">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Find your starting point</span>
          <h2>
            Your industry.
            <br />
            Your operating reality.
          </h2>
        </div>
        <Link className="text-link" href="/industries">
          Explore industry solutions ↗
        </Link>
      </div>
      <div className="industry-cards">
        {industries.map((i) => (
          <Link href={`/industries/${i.slug}`} key={i.slug}>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            <span>Explore the problems we solve ↗</span>
          </Link>
        ))}
      </div>
      <div className="buyer-next">
        <Link href="/how-we-work">
          <strong>How delivery works</strong>
          <span>From discovery to operational handover</span>
        </Link>
        <Link href="/engagements">
          <strong>Choose an engagement</strong>
          <span>Discovery, a focused build, or ongoing engineering</span>
        </Link>
        <Link href="/faq">
          <strong>Questions before you start?</strong>
          <span>Scope, ownership, security, and support</span>
        </Link>
      </div>
    </section>
  );
}
