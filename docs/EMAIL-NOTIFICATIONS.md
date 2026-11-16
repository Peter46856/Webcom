# Inquiry email notifications

## Setup

1. Run the contents of `supabase/migrations/202611010001_pricing.sql` after the existing admin migration. It seeds `pjuma655@gmail.com` only if no settings row exists.
2. Create a [Resend](https://resend.com) account. [Verify a sending domain](https://resend.com/docs/dashboard/domains/introduction) using its DNS instructions, then create a sending [API key](https://resend.com/docs/dashboard/api-keys/introduction).
3. Retain your existing settings and add these server-only entries to the root `.env.local`:

   ```dotenv
   RESEND_API_KEY=re_YOUR_PRIVATE_KEY
   INQUIRY_EMAIL_FROM=WebCom <inquiries@YOUR-VERIFIED-DOMAIN>
   ```

   Replace both placeholders. Gmail can be the recipient, but the sender must belong to the domain accepted by your Resend account. Keep the key out of chat, client code, and `NEXT_PUBLIC_` variables.

4. Restart `npm run dev` and the Java backend using the existing configured terminal and Maven command. The updated Java backend privately retrieves the recipient after saving an inquiry. Next.js does not need a Supabase secret key.
5. Open **Admin → Notifications** to change the recipient at any time. No restart is needed for recipient changes. Credential presence in this page does not prove domain verification or delivery.
6. Submit a real inquiry. Confirm it in admin and check the recipient inbox/spam folder. Next.js logs `notification.accepted`, `notification.not_configured`, or `notification.failed` with a safe hint. Check Resend for delivery/bounce events.

## Behavior

Java saves before retrieving notification settings. Next.js then emails the name, email, company, scope, budget, message, reference, and admin link. The email is plain text. From is server-configured, To comes from private settings, and Reply-To is the validated inquirer's address. The public response never includes the recipient. Only admin members can read or change `studio_settings`; Java reads it with its existing server key.

Email failure never changes a saved inquiry into a failed submission. The admin inbox remains the source of record. Each send has a four-second timeout and at most one immediate retry for network errors, HTTP 429, or server errors. Permanent provider errors are not retried. There is no durable background queue or scheduled retry worker.

Open an inquiry and choose **Send email notification** to retry manually to the current recipient. The authenticated, origin-checked endpoint loads the saved inquiry itself, rather than accepting arbitrary email content. Fix sender/configuration problems before retrying.

[Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys) deduplicates an unchanged email payload for 24 hours. A payload fingerprint allows a new send after the recipient changes. Repeating an identical send during that window returns the previous acceptance instead of a new email; repeats after 24 hours can send another copy.

Provider acceptance does not guarantee inbox delivery. No delivery webhook or historical send-status table is implemented. Check Resend for delivery status and admin for every inquiry. Docker Compose passes email credentials to the web service; Java still owns the Supabase secret.

## Verification

`npm run test:notifications` uses isolated fetch/env substitutes and sends no real email. It covers destination/Reply-To, plain text, retry idempotency, recipient changes, configuration errors, bounded retries, persistence ordering, and successful submission despite mail failure. Browser tests cover recipient editing and setup feedback. Java tests verify settings-failure isolation and storage ordering. Live delivery requires the setup above.
