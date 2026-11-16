'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { budgets, scopes, inquirySchema } from '@/lib/inquiry';
export function ContactForm({ initialMessage = '' }: { initialMessage?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = inquirySchema.safeParse({ ...data, consent: data.consent === 'on' });
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) fields[String(issue.path[0])] = issue.message;
      setErrors(fields);
      setState('error');
      setMessage('Please check the highlighted fields.');
      return;
    }
    setErrors({});
    setState('sending');
    setMessage('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || 'Your inquiry could not be sent. Please try again.');
      setState('success');
      form.reset();
    } catch (error) {
      setState('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Your inquiry could not be sent. Please try again.',
      );
    }
  }
  if (state === 'success')
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={40} />
        <h2>Your inquiry is in.</h2>
        <p>
          Thank you for sharing your project. WebCom will review the details and follow up using the
          email you provided.
        </p>
        <button className="button button-ghost" onClick={() => setState('idle')}>
          Send another inquiry
        </button>
      </div>
    );
  const fieldError = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  return (
    <form className="contact-form" onSubmit={submit}>
      <h2>Tell us what you’re building.</h2>
      <p>A few details help us start with the right questions.</p>
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Full name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {fieldError('name')}
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {fieldError('email')}
        </label>
      </div>
      <label>
        Company
        <input
          name="company"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={160}
          placeholder="Company or organization"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />
        {fieldError('company')}
      </label>
      <div className="form-row">
        <label>
          Project focus
          <select name="scope" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {scopes.map((scope) => (
              <option key={scope}>{scope}</option>
            ))}
          </select>
        </label>
        <label>
          Estimated budget <span className="field-hint">USD</span>
          <select name="budget" required defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        What would you like to build?
        <textarea
          name="message"
          defaultValue={initialMessage}
          required
          minLength={30}
          maxLength={5000}
          rows={5}
          placeholder="Tell us about the problem, your goals, integrations, and any timeline you have in mind."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {fieldError('message')}
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span>
          I agree that WebCom may use these details to respond to my inquiry, as described in the{' '}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {state === 'error' && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <button className="button form-submit" disabled={state === 'sending'}>
        {state === 'sending' ? (
          <>
            Sending inquiry <LoaderCircle className="spin" size={17} />
          </>
        ) : (
          <>
            Send project inquiry <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="form-footnote">
        Project details stay between you and the studio. Don’t include passwords or sensitive
        credentials.
      </p>
    </form>
  );
}
