import 'server-only';
import { z } from 'zod';
import { createHash } from 'node:crypto';
import type { inquirySchema } from './inquiry';
export type EmailResult = { status: 'accepted' | 'failed' | 'not_configured'; reason?: string };
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_EMAIL_FROM);
}
export async function sendInquiryEmail(
  inquiry: z.infer<typeof inquirySchema>,
  id: string,
  recipient: string,
): Promise<EmailResult> {
  if (!emailConfigured())
    return {
      status: 'not_configured',
      reason: 'Set RESEND_API_KEY and INQUIRY_EMAIL_FROM on the web server.',
    };
  if (!z.email().safeParse(recipient).success)
    return {
      status: 'not_configured',
      reason:
        'Set the inquiry recipient in Admin > Notifications and restart the updated Java backend.',
    };
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const text = [
    'New WebCom project inquiry',
    `Reference: ${id}`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company: ${inquiry.company}`,
    `Project focus: ${inquiry.scope}`,
    `Budget: ${inquiry.budget}`,
    '',
    inquiry.message,
    '',
    `Review in admin: ${new URL('/admin/inquiries', base).href}`,
  ].join('\n');
  // Retry the identical payload once for transient failures; provider deduplication lasts 24h.
  const body = JSON.stringify({
    from: process.env.INQUIRY_EMAIL_FROM,
    to: [recipient],
    reply_to: inquiry.email,
    subject: 'New WebCom project inquiry',
    text,
  });
  const fingerprint = createHash('sha256').update(body).digest('hex');
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `webcom-inquiry/${id}/${fingerprint}`,
        },
        body,
        signal: AbortSignal.timeout(4000),
        cache: 'no-store',
      });
      if (response.ok) return { status: 'accepted' };
      if (response.status !== 429 && response.status < 500)
        return {
          status: 'failed',
          reason: `Email provider returned HTTP ${response.status}. Check sender verification and credentials.`,
        };
    } catch {
      /* Never log credentials, submitted details, or provider response bodies. */
    }
  }
  return {
    status: 'failed',
    reason: 'Email provider unavailable or timed out. The inquiry remains saved; retry from admin.',
  };
}
