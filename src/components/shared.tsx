import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro container">
      <div className="breadcrumb">
        <Link href="/">WebCom</Link>
        <span>/</span>
        <span>{label}</span>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
export function CTA() {
  return (
    <section className="container cta-section">
      <div className="cta-box">
        <div className="cta-orbit" aria-hidden="true" />
        <div className="cta-content">
          <span className="status-label">
            <span />A good system starts with a conversation
          </span>
          <h2>
            What are you
            <br />
            building next?
          </h2>
          <p>
            Bring us your hardest software or infrastructure challenge.
            <br className="desktop-break" /> Let’s find a clear path forward.
          </p>
          <Link className="button" href="/contact">
            Let’s talk about your project <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="cta-symbol" aria-hidden="true">
          ↗
        </div>
      </div>
    </section>
  );
}
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
