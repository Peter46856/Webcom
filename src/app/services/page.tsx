import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '@/lib/content';
import { ServiceIcon } from '@/components/icons';
import { PageIntro, CTA } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Custom Software Development & Network Infrastructure Services',
  description:
    'Explore end-to-end engineering services from WebCom Engineering Studio: custom software applications, logistics platforms, network infrastructure, and cloud DevOps.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Custom Software Development & Network Infrastructure Services | WebCom Engineering Studio',
    description:
      'Software, operations, networks, and cloud infrastructure—choose a focused engagement or bring WebCom in across the full engineering lifecycle.',
    url: '/services',
  },
};

export default function Services() {
  return (
    <>
      <PageIntro
        label="Services"
        title="The whole system. Thoughtfully engineered."
        description="Software, operations, networks, and cloud infrastructure. Choose a focused engagement or bring us in across the full engineering lifecycle."
      />
      <section className="container service-detail-list">
        {services.map((service) => (
          <article key={service.slug}>
            <div>
              <span className="icon-box">
                <ServiceIcon name={service.icon} />
              </span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link className="text-link" href={`/services/${service.slug}`} prefetch={false}>
                Explore {service.title.toLowerCase()} <ArrowUpRight size={18} />
              </Link>
            </div>
            <ul>
              {service.capabilities.map((text) => (
                <li key={text}>
                  <Check size={16} />
                  {text}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <PageGuide name="services" />
      <CTA />
    </>
  );
}