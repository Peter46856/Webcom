'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LockKeyhole, ArrowRight } from 'lucide-react';
import { Logo } from './icons';
export function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState(''),
    [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const fields = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fields.get('email'), password: fields.get('password') }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      router.replace('/admin');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-login">
      <Link href="/" aria-label="WebCom home">
        <Logo />
      </Link>
      <div className="admin-login-card">
        <LockKeyhole size={26} />
        <h1>Studio sign-in</h1>
        <p>Manage conversations and publish engineering insights.</p>
        {!configured && (
          <div className="admin-notice">
            Admin setup is required. Add the Supabase project URL and publishable key to .env.local,
            apply the admin migration, and grant your account access. Instructions: docs/ADMIN.md.
          </div>
        )}
        <form onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="button" disabled={busy || !configured}>
            {busy ? 'Signing in…' : 'Sign in securely'}
            <ArrowRight size={16} />
          </button>
        </form>
        <p className="admin-small">
          Access is limited to approved studio administrators. Ask the project owner for account
          recovery through Supabase.
        </p>
      </div>
      <Link href="/" className="text-link">
        ← Back to the website
      </Link>
    </div>
  );
}
