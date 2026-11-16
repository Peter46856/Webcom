import { PageGuide } from '@/components/page-guide';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/shared';
export const metadata: Metadata = {
  title: 'Privacy notice',
  alternates: { canonical: '/privacy' },
};
export default function Privacy() {
  return (
    <>
      <PageIntro
        label="Privacy"
        title="Your inquiry. Handled with care."
        description="How information submitted through this website is used."
      />
      <article className="container prose privacy-content">
        <h2>Information you share</h2>
        <p>
          The contact form collects your name, email address, company, project focus, budget range,
          project description, and your agreement to be contacted. These details are used to assess
          your request and respond to it.
        </p>
        <h2>Storage and access</h2>
        <p>
          Submitted inquiries are processed by the website’s backend and stored in a Supabase-hosted
          PostgreSQL database. Access should be limited to people responsible for handling studio
          inquiries. Please do not submit passwords, payment details, or other sensitive
          credentials.
        </p>
        <h2>Inquiry email notifications</h2>
        <p>
          When email notifications are enabled, a copy of your inquiry is sent through Resend to the
          studio’s configured inbox. That copy includes the contact and project details you
          submitted, and your email address is used as the reply address. The receiving mailbox
          provider also processes that copy. Deleting a database record does not automatically
          delete copies in email systems.
        </p>
        <h2>Technical information</h2>
        <p>
          Hosting providers may process technical request information to deliver and secure the
          website. The website does not include advertising trackers or optional analytics by
          default.
        </p>
        <p>
          Your light or dark appearance preference is saved in your browser’s local storage so that
          it can be remembered on later visits. You can change it with the theme button or remove it
          by clearing this site’s browser data.
        </p>
        <h2>Your choices</h2>
        <p>
          You can request access to, correction of, or deletion of information you submitted by
          using the contact form and identifying the original inquiry email. Do not include
          sensitive identity documents in your message.
        </p>
        <h2>Retention</h2>
        <p>
          Inquiry information should be kept only as long as needed to respond and manage the
          resulting business relationship. The operator must configure a retention and deletion
          process before production use.
        </p>
      </article>
      <PageGuide name="privacy" />
    </>
  );
}
