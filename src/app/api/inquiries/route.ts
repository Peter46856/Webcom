import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/inquiry';
import { sendInquiryEmail } from '@/lib/inquiry-email';

export const runtime = 'nodejs';
// Process-local abuse protection. Configure a trusted edge rate limiter for multi-instance production.
const attempts = new Map<string, { count: number; until: number }>();
function rateLimited(key: string) {
  const now = Date.now();
  for (const [id, bucket] of attempts) if (bucket.until < now) attempts.delete(id);
  const bucket = attempts.get(key) ?? { count: 0, until: now + 60_000 };
  bucket.count++;
  attempts.set(key, bucket);
  return bucket.count > 5;
}
export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const started = Date.now();
  const log = (event: string, details: Record<string, unknown> = {}) => {
    console.info(
      JSON.stringify({
        service: 'webcom-web',
        requestId,
        event,
        elapsedMs: Date.now() - started,
        ...details,
      }),
    );
  };
  const unavailable = (error: string) =>
    NextResponse.json(
      { error: `${error} Reference: ${requestId}`, requestId },
      { status: 503, headers: { 'X-Request-ID': requestId } },
    );
  log('inquiry.received');
  const origin = request.headers.get('origin');
  // Configure NEXT_PUBLIC_SITE_URL to the actual public origin behind a reverse proxy.
  const allowedOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin;
  if (!origin || origin !== allowedOrigin)
    return NextResponse.json(
      { error: 'This request must come from the WebCom website.' },
      { status: 403 },
    );
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return NextResponse.json({ error: 'Please send a JSON inquiry.' }, { status: 415 });
  // Only trust this header when a hosting proxy overwrites it; see deployment guide.
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (rateLimited(key))
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    );
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 16384)
    return NextResponse.json(
      { error: 'Your inquiry is too large. Please shorten the description.' },
      { status: 413 },
    );
  let raw: unknown;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body, 'utf8') > 16384)
      return NextResponse.json({ error: 'Your inquiry is too large.' }, { status: 413 });
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: 'Your inquiry could not be read. Please try again.' },
      { status: 400 },
    );
  }
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success)
    return NextResponse.json(
      { error: 'Please check the form fields and try again.' },
      { status: 400 },
    );
  const api = process.env.JAVA_API_URL;
  const token = process.env.JAVA_API_TOKEN;
  const invalidConfig = [
    !api && 'JAVA_API_URL missing',
    !token && 'JAVA_API_TOKEN missing',
    token && token.length < 32 && 'JAVA_API_TOKEN shorter than 32 characters',
    token?.startsWith('replace-') && 'JAVA_API_TOKEN is a placeholder',
  ].filter(Boolean);
  if (invalidConfig.length) {
    log('inquiry.config_invalid', { issues: invalidConfig });
    return unavailable('Project inquiries are not connected yet.');
  }
  let endpoint: URL;
  try {
    endpoint = new URL('/api/inquiries', api);
    if (!['http:', 'https:'].includes(endpoint.protocol)) throw new Error();
  } catch {
    log('inquiry.config_invalid', { issues: ['JAVA_API_URL must be an HTTP(S) URL'] });
    return unavailable('Project inquiries are not connected yet.');
  }
  try {
    log('java.request_started');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WebCom-Token': token!,
        'X-Request-ID': requestId,
      },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(16_000),
      cache: 'no-store',
    });
    if (!response.ok) {
      const hint =
        response.status === 401
          ? 'Check that JAVA_API_TOKEN matches WEBCOM_API_TOKEN.'
          : response.status === 400
            ? 'Check Java request validation.'
            : response.status === 404
              ? 'Check JAVA_API_URL points to the WebCom Java API.'
              : 'Check Java logs with this requestId for the Supabase failure.';
      log('java.response_error', { upstreamStatus: response.status, hint });
      return unavailable('Your inquiry could not be saved. Please try again shortly.');
    }
    log('inquiry.saved', { upstreamStatus: response.status });
    // Storage has succeeded. Notification problems must never invite a duplicate submission.
    try {
      const saved = await response.json();
      if (typeof saved.id === 'string' && /^[a-f0-9-]{36}$/i.test(saved.id)) {
        const email = await sendInquiryEmail(
          parsed.data,
          saved.id,
          typeof saved.notificationEmail === 'string' ? saved.notificationEmail : '',
        );
        log(`notification.${email.status}`, { hint: email.reason });
      } else
        log('notification.skipped', {
          hint: 'Updated Java backend must return the saved inquiry ID.',
        });
    } catch {
      log('notification.failed', {
        hint: 'Inquiry remains saved. Check email configuration and retry from admin.',
      });
    }
    return NextResponse.json(
      { message: 'Your inquiry has been received.', requestId },
      { status: 201, headers: { 'X-Request-ID': requestId } },
    );
  } catch (error) {
    const cause =
      error instanceof Error ? (error as Error & { cause?: { code?: unknown } }).cause : undefined;
    const code =
      typeof cause?.code === 'string' && /^[A-Z0-9_]{1,50}$/.test(cause.code)
        ? cause.code
        : 'UNKNOWN';
    log('java.connection_failed', {
      code,
      timeout: error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name),
      hint: 'Check Java is running, JAVA_API_URL, port 8080, and firewall access.',
    });
    return unavailable(
      'The inquiry service is temporarily unavailable. Your message has not been sent. Please try again shortly.',
    );
  }
}
