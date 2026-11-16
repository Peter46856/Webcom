import { InquiryInbox } from '@/components/inquiry-inbox';
export default function Inquiries() {
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="section-kicker">Studio / Inquiries</span>
          <h1>Every conversation matters.</h1>
          <p>Review incoming projects and keep track of the next step.</p>
        </div>
      </div>
      <InquiryInbox />
    </>
  );
}
