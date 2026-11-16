'use client';
import { useState, useEffect, useCallback } from 'react';
import { inquiryStatuses } from '@/lib/blog-schema';
import { AdminTaskHelp } from './admin-task-help';
type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string;
  scope: string;
  budget: string;
  message: string;
  created_at: string;
  status: (typeof inquiryStatuses)[number];
};
export function InquiryInbox() {
  const [rows, setRows] = useState<Inquiry[]>([]),
    [page, setPage] = useState(0),
    [status, setStatus] = useState(''),
    [count, setCount] = useState(0),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(true),
    [selected, setSelected] = useState<Inquiry | null>(null),
    [saving, setSaving] = useState(false);
  const [emailBusy, setEmailBusy] = useState(false),
    [emailMessage, setEmailMessage] = useState('');
  async function sendEmail() {
    if (!selected) return;
    setEmailBusy(true);
    setEmailMessage('');
    try {
      const response = await fetch('/api/admin/inquiries/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEmailMessage(data.message);
    } catch (e) {
      setEmailMessage(e instanceof Error ? e.message : 'Could not send email.');
    } finally {
      setEmailBusy(false);
    }
  }
  const load = useCallback(
    (signal?: AbortSignal) => {
      return fetch(`/api/admin/inquiries?page=${page}&status=${status}`, { signal })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          return data;
        })
        .then((data) => {
          if (signal?.aborted) return;
          setError('');
          setRows(data.inquiries);
          setCount(data.count);
        })
        .catch((error) => {
          if (!signal?.aborted)
            setError(error instanceof Error ? error.message : 'Could not load inquiries.');
        })
        .finally(() => {
          if (!signal?.aborted) setBusy(false);
        });
    },
    [page, status],
  );
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);
  async function update(value: string) {
    if (!selected) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selected.id, status: value }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSelected({ ...selected, status: value as Inquiry['status'] });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Update failed.');
    } finally {
      setSaving(false);
    }
  }
  return (
    <>
      <div className="admin-toolbar">
        <label>
          Filter by status
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setBusy(true);
              setPage(0);
              setSelected(null);
            }}
          >
            <option value="">All statuses</option>
            {inquiryStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <span>{count} inquiries</span>
        <button
          className="button button-ghost"
          onClick={() => {
            setBusy(true);
            void load();
          }}
          disabled={busy}
        >
          Refresh
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <div className="inbox-layout">
        <div className="inquiry-list" aria-busy={busy}>
          {busy ? (
            <p className="admin-empty">Loading inquiries…</p>
          ) : !rows.length ? (
            <p className="admin-empty">No inquiries match this filter.</p>
          ) : (
            rows.map((row) => (
              <button
                className={`inquiry-row ${selected?.id === row.id ? 'selected' : ''}`}
                key={row.id}
                onClick={() => {
                  setSelected(row);
                  setEmailMessage('');
                }}
              >
                <div>
                  <strong>{row.company}</strong>
                  <span className={`status-pill ${row.status}`}>{row.status}</span>
                </div>
                <span>
                  {row.name} / {row.scope}
                </span>
                <small>{new Date(row.created_at).toLocaleString()}</small>
              </button>
            ))
          )}
        </div>
        <section className="inquiry-detail" aria-label="Inquiry details">
          {selected ? (
            <>
              <div className="article-meta">
                <span>Project inquiry</span>
                <span>{new Date(selected.created_at).toLocaleDateString()}</span>
              </div>
              <h2>{selected.company}</h2>
              <p>{selected.name}</p>
              <a href={`mailto:${encodeURIComponent(selected.email)}`} className="text-link">
                {selected.email}
              </a>
              <dl>
                <dt>Project focus</dt>
                <dd>{selected.scope}</dd>
                <dt>Budget / USD</dt>
                <dd>{selected.budget}</dd>
              </dl>
              <h3>Project brief</h3>
              <p className="inquiry-message">{selected.message}</p>
              <div>
                <button className="button button-ghost" disabled={emailBusy} onClick={sendEmail}>
                  {emailBusy ? 'Sending…' : 'Send email notification'}
                </button>
                <p role="status">{emailMessage}</p>
              </div>
              <label>
                Conversation status
                <select
                  value={selected.status}
                  disabled={saving}
                  onChange={(e) => update(e.target.value)}
                >
                  {inquiryStatuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </>
          ) : (
            <div className="admin-empty">
              <h2>Select an inquiry</h2>
              <p>Project details and follow-up controls appear here.</p>
            </div>
          )}
        </section>
      </div>
      <div className="admin-pagination">
        <button
          className="button button-ghost"
          disabled={page === 0 || busy}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.max(1, Math.ceil(count / 25))}
        </span>
        <button
          className="button button-ghost"
          disabled={(page + 1) * 25 >= count || busy}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <AdminTaskHelp context="inquiries" />
    </>
  );
}
