import Link from 'next/link';
import { Check } from 'lucide-react';
import { packagePrice, type PricingPackage } from '@/lib/pricing-schema';
export function PricingCatalog({
  packages,
  compact = false,
}: {
  packages: PricingPackage[];
  compact?: boolean;
}) {
  return (
    <div className="pricing-grid">
      {packages.map((p) => (
        <article className="pricing-package" key={p.slug}>
          <span className="section-kicker">{p.category}</span>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <div className="package-price">
            <strong>{packagePrice(p)}</strong>
            <span>
              {p.currency} / {p.billing} · Indicative range
            </span>
          </div>
          <p className="package-timeline">{p.timeline}</p>
          <h3>Included in this scope</h3>
          <ul>
            {p.features.map((f) => (
              <li key={f}>
                <Check size={16} aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          {!compact && (
            <>
              <h3>Quoted separately / not included</h3>
              <ul className="package-exclusions">
                {p.exclusions.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}
          <Link className="button" href={`/contact?package=${encodeURIComponent(p.slug)}`}>
            Discuss {p.name}
          </Link>
        </article>
      ))}
    </div>
  );
}
