import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { ArrowUpRight, MessageSquare, FileText, Compass } from 'lucide-react';
import { PageIntro } from '@/components/shared';
import { ContactForm } from '@/components/contact-form';
import { bookingUrl } from '@/lib/site';
import { publishedPricing } from '@/lib/pricing';
import { packagePrice } from '@/lib/pricing-schema';
export const metadata: Metadata = {
  title: 'Start a project',
  alternates: { canonical: '/contact' },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const requestedPackage = (await searchParams).package;
  const selectedPackage = requestedPackage
    ? (await publishedPricing()).packages.find((p) => p.slug === requestedPackage)
    : undefined;
  const initialMessage = selectedPackage
    ? `I am interested in the ${selectedPackage.name} package (${packagePrice(selectedPackage)} ${selectedPackage.currency} per ${selectedPackage.billing}, indicative).\n\nMy project goals are: `
    : '';
  const booking = bookingUrl();
  return (
    <>
      <PageIntro
        label="Contact"
        title="Let’s build something that works."
        description="A new product, a complex integration, or infrastructure that needs a better foundation. Tell us where you want to go."
      />
      <section className="container contact-layout section-bottom">
        <aside className="contact-aside">
          <span className="status-label">
            <span />
            Start with a conversation
          </span>
          <h2>
            Bring the challenge.
            <br />
            We’ll bring the questions.
          </h2>
          <p>
            You don’t need a complete specification. A clear problem and a little context are a good
            starting point.
          </p>
          <div className="contact-steps">
            {[
              [
                MessageSquare,
                'Share your context',
                'Tell us about the people, systems, and goals involved.',
              ],
              [
                Compass,
                'Find the right approach',
                'We explore the scope, constraints, and technical direction together.',
              ],
              [
                FileText,
                'Define the next step',
                'Agree on a discovery engagement or a focused delivery plan.',
              ],
            ].map(([Icon, title, text]) => {
              const I = Icon as typeof MessageSquare;
              return (
                <div key={String(title)}>
                  <I size={20} />
                  <div>
                    <h3>{String(title)}</h3>
                    <p>{String(text)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {booking && (
            <a className="button button-ghost" href={booking} target="_blank" rel="noreferrer">
              Schedule a discovery call <ArrowUpRight size={17} />
            </a>
          )}
        </aside>
        <ContactForm initialMessage={initialMessage} />
      </section>
      <PageGuide name="contact" />
    </>
  );
}
