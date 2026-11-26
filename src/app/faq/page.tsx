import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro, CTA } from '@/components/shared';
import { faqs } from '@/lib/buyer-content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Scoping, Delivery & Support',
  description:
    'Answers about project scope, estimates, ownership, delivery reviews, integrations, security, and ongoing support.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: `Frequently Asked Questions | ${site.name}`,
    description:
      'Answers about project scope, estimates, ownership, delivery reviews, integrations, security, and ongoing support.',
    url: '/faq',
  },
};

export default function FAQ() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageIntro
        label="FAQs"
        title="Good questions. Clear starting answers."
        description="Understand how an engagement is scoped, delivered, and handed over before you start a conversation."
      />
      <section className="container faq-list section-bottom">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <PageGuide name="faq" />
      <CTA />
    </>
  );
}