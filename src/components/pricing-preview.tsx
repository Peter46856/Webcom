import { publishedPricing } from '@/lib/pricing';
import { PricingCatalog } from './pricing-catalog';
import { TextLink } from './shared';
export async function PricingPreview() {
  const { packages } = await publishedPricing();
  if (!packages.length) return null;
  return (
    <section className="container section section-bottom">
      <div className="section-heading">
        <div>
          <span className="section-kicker">Pricing & packages</span>
          <h2>Know the scope before the spend.</h2>
        </div>
        <TextLink href="/pricing">Compare all packages</TextLink>
      </div>
      <p className="content-note">
        Indicative engineering fees. See the full package for scope limits, exclusions, and costs
        quoted separately.
      </p>
      <PricingCatalog packages={packages.slice(0, 2)} compact />
    </section>
  );
}
