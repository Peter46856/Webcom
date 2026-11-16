import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { Code2, Network, Route, Cloud } from 'lucide-react';
import { PageIntro, CTA } from '@/components/shared';
export const metadata: Metadata = {
  title: 'About the studio',
  alternates: { canonical: '/about' },
};
export default function About() {
  return (
    <>
      <PageIntro
        label="About"
        title="Engineering is how we think."
        description="WebCom Engineering Studio connects software development and network infrastructure. We work where applications meet real operational complexity."
      />
      <section className="container about-statement">
        <div className="about-mark" aria-hidden="true">
          <Code2 />
          <Network />
          <Route />
          <Cloud />
          <span>
            One connected
            <br />
            engineering mindset.
          </span>
        </div>
        <div>
          <span className="section-kicker">Our philosophy</span>
          <h2>
            See the whole picture.
            <br />
            Care about the details.
          </h2>
          <p>
            A fleet platform depends on more than a dashboard. An ISP billing system depends on more
            than a payment callback. Useful engineering starts with understanding the complete path
            from a person’s intent to a system’s response.
          </p>
          <p>
            We bring that perspective to software architecture, logistics technology,
            telecommunications, and cloud operations. We value explicit tradeoffs, clear
            documentation, and systems that teams can confidently operate.
          </p>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Technical toolkit</span>
            <h2>
              The right tools.
              <br />
              For the actual problem.
            </h2>
          </div>
          <p>
            Technology follows the constraints.
            <br />
            The architecture comes first.
          </p>
        </div>
        <div className="stack-grid">
          {[
            [
              'Application engineering',
              'Java / Spring Boot',
              'React / Next.js / TypeScript',
              'Node.js / Express / FastAPI',
            ],
            [
              'Data & real-time systems',
              'PostgreSQL / Supabase',
              'Redis / WebSockets',
              'Geospatial and graph-based routing',
            ],
            [
              'Networks & infrastructure',
              'MikroTik RouterOS / PPPoE',
              'GPON / EPON / Fiber',
              'Linux / Cloud / CI/CD',
            ],
          ].map(([title, ...items]) => (
            <div key={title}>
              <h3>{title}</h3>
              {items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section className="container detail-columns section-bottom">
        <div>
          <h2>
            Development grounded
            <br />
            in operations.
          </h2>
          <p>
            Our work spans web application development, geospatial transit systems, fleet
            operations, ISP subscriber management, and the infrastructure that connects them.
          </p>
        </div>
        <aside className="detail-panel">
          <h3>A note on the studio</h3>
          <p>
            We let engineering work explain our approach. Explore the project architectures to see
            how we think about interfaces, data, and operational workflows.
          </p>
        </aside>
      </section>
      <PageGuide name="about" />
      <CTA />
    </>
  );
}
