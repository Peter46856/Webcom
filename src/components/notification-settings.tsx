'use client';
import { useEffect, useState } from 'react';
export function NotificationSettings() {
  const [recipient, setRecipient] = useState(''),
    [configured, setConfigured] = useState(false),
    [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  useEffect(() => {
    let active = true;
    fetch('/api/admin/notification-settings')
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        if (active) {
          setRecipient(d.recipient);
          setConfigured(d.configured);
          setLoaded(true);
        }
      })
      .catch((e) => {
        if (active) setMessage(e.message);
      });
    return () => {
      active = false;
    };
  }, []);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const r = await fetch('/api/admin/notification-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setMessage('Recipient saved. Future notifications use this address.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save settings.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <h1>Inquiry notifications</h1>
      <p>
        Every successful inquiry stays in your admin inbox. Send a copy to the personal or business
        address below. This address is private and is never published on the website.
      </p>
      <div className="notification-config">
        <h2>Email delivery setup</h2>
        <p>
          {!loaded
            ? 'Loading settings…'
            : configured
              ? 'Email provider credentials are configured. Confirm your sending domain is verified in Resend.'
              : 'Email is not connected yet. Set RESEND_API_KEY and INQUIRY_EMAIL_FROM in the web server environment, then restart the web server.'}
        </p>
        <p>
          Use a verified sender address from your domain. The recipient can be Gmail or another
          mailbox. Replying to the notification addresses the person who submitted the inquiry.
        </p>
        <p>
          Restart the updated Java backend after installing this feature. It privately retrieves the
          recipient after saving each inquiry. If email fails, the inquiry remains in admin; open it
          and choose “Send email notification” to retry. Provider acceptance does not guarantee
          inbox delivery.
        </p>
      </div>
      <form className="project-admin-form detail-panel" onSubmit={save}>
        <label>
          Inquiry notification recipient
          <input
            type="email"
            required
            maxLength={254}
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </label>
        <button className="button" disabled={busy || !loaded}>
          {busy ? 'Saving…' : 'Save recipient'}
        </button>
        <p role="status">{message}</p>
      </form>
    </>
  );
}
