import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro, CTA } from '@/components/shared';
import { faqs } from '@/lib/buyer-content';
export const metadata: Metadata = {
  title: 'Frequently asked questions',
  description:
    'Answers about project scope, estimates, ownership, delivery reviews, integrations, security, and ongoing support.',
  alternates: { canonical: '/faq' },
};
export default function FAQ() {
  return (
    <>
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
