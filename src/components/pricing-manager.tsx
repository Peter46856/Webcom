'use client';
import { useEffect, useState } from 'react';
import { pricingSchema, packagePrice, type PricingPackage } from '@/lib/pricing-schema';
const blank: PricingPackage = {
  slug: '',
  name: '',
  category: '',
  description: '',
  currency: 'USD',
  price_min: 0,
  price_max: 0,
  billing: 'project',
  timeline: '',
  features: [],
  exclusions: [],
  published: false,
  sort_order: 100,
};
export function PricingManager() {
  const [rows, setRows] = useState<PricingPackage[]>([]),
    [current, setCurrent] = useState<PricingPackage>(blank),
    [editing, setEditing] = useState(false),
    [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  async function reload() {
    const r = await fetch('/api/admin/pricing');
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    setRows(data.packages);
    setLoaded(true);
  }
  useEffect(() => {
    let active = true;
    fetch('/api/admin/pricing')
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        if (active) {
          setRows(d.packages);
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
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const f = new FormData(event.currentTarget);
    const text = (key: string) => String(f.get(key) || '').trim();
    const lines = (key: string) =>
      text(key)
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean);
    const parsed = pricingSchema.safeParse({
      ...Object.fromEntries(f),
      slug: editing ? current.slug : text('slug'),
      price_min: Number(f.get('price_min')),
      price_max: Number(f.get('price_max')),
      sort_order: Number(f.get('sort_order')),
      published: f.get('published') === 'on',
      features: lines('features'),
      exclusions: lines('exclusions'),
    });
    if (!parsed.success) {
      setMessage(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' '));
      return;
    }
    setBusy(true);
    try {
      const r = await fetch('/api/admin/pricing', {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      await reload();
      setCurrent(blank);
      setEditing(false);
      setMessage(
        parsed.data.published ? 'Package saved and published.' : 'Package saved as a draft.',
      );
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save package.');
    } finally {
      setBusy(false);
    }
  }
  async function remove(p: PricingPackage) {
    if (
      !confirm(
        `Delete ${p.name}? This permanently removes the package. You can unpublish it instead by editing it.`,
      )
    )
      return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/pricing?slug=${encodeURIComponent(p.slug)}`, {
        method: 'DELETE',
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      await reload();
      if (current.slug === p.slug) {
        setCurrent(blank);
        setEditing(false);
      }
      setMessage('Package deleted.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not delete package.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <h1>Pricing & packages</h1>
      <p>
        Manage prices, included features, exclusions, currencies, and visibility. Published changes
        appear immediately. Amounts are whole currency units; changing currency does not convert
        prices.
      </p>
      <p role="status" aria-live="polite">
        {message}
      </p>
      <div className="package-admin-list">
        {rows.map((p) => (
          <article className="detail-panel" key={p.slug}>
            <h2>{p.name}</h2>
            <p>
              {packagePrice(p)} {p.currency} / {p.billing} · {p.published ? 'Published' : 'Draft'}
            </p>
            <div className="package-admin-actions">
              <button
                disabled={busy}
                className="button"
                onClick={() => {
                  setCurrent(p);
                  setEditing(true);
                  setMessage('');
                }}
              >
                Edit {p.name}
              </button>
              <button disabled={busy} className="button button-ghost" onClick={() => remove(p)}>
                Delete {p.name}
              </button>
            </div>
          </article>
        ))}
      </div>
      {loaded && !rows.length && <p>No packages yet. Create one below.</p>}
      <form
        key={editing ? current.slug : 'new'}
        className="project-admin-form detail-panel"
        onSubmit={save}
      >
        <h2>{editing ? `Edit ${current.name}` : 'Create a package'}</h2>
        {(
          [
            ['slug', 'Package ID', 100],
            ['name', 'Package name', 100],
            ['category', 'Category / customer goal', 80],
            ['timeline', 'Estimated timeline', 140],
          ] as const
        ).map(([name, label, max]) => (
          <label key={name}>
            {label}
            <input
              name={name}
              required
              defaultValue={current[name]}
              maxLength={max}
              readOnly={name === 'slug' && editing}
              pattern={name === 'slug' ? '[a-z0-9]+(-[a-z0-9]+)*' : undefined}
            />
          </label>
        ))}
        <label>
          Description
          <textarea
            name="description"
            defaultValue={current.description}
            required
            minLength={20}
            maxLength={800}
            rows={3}
          />
        </label>
        <div className="pricing-form-row">
          <label>
            Currency
            <select name="currency" defaultValue={current.currency}>
              {['USD', 'KES', 'EUR', 'GBP'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Billing basis
            <select name="billing" defaultValue={current.billing}>
              <option value="project">Per project</option>
              <option value="engagement">Per engagement</option>
              <option value="month">Per month</option>
            </select>
          </label>
        </div>
        <div className="pricing-form-row">
          <label>
            Lower price
            <input
              name="price_min"
              type="number"
              min={0}
              max={100000000}
              step={1}
              required
              defaultValue={current.price_min}
            />
          </label>
          <label>
            Upper price
            <input
              name="price_max"
              type="number"
              min={0}
              max={100000000}
              step={1}
              required
              defaultValue={current.price_max}
            />
          </label>
        </div>
        <label>
          Included features — one per line
          <textarea
            name="features"
            required
            defaultValue={current.features.join('\n')}
            rows={7}
            maxLength={10000}
          />
        </label>
        <label>
          Exclusions — one per line
          <textarea
            name="exclusions"
            required
            defaultValue={current.exclusions.join('\n')}
            rows={5}
            maxLength={6500}
          />
        </label>
        <label>
          Display order (lower numbers appear first)
          <input
            name="sort_order"
            type="number"
            min={0}
            max={10000}
            step={1}
            defaultValue={current.sort_order}
            required
          />
        </label>
        <label className="pricing-checkbox">
          <input name="published" type="checkbox" defaultChecked={current.published} />
          Publish on the website
        </label>
        <div className="package-admin-actions">
          <button className="button" disabled={busy || !loaded}>
            {busy ? 'Saving…' : 'Save package'}
          </button>
          {editing && (
            <button
              type="button"
              className="button button-ghost"
              onClick={() => {
                setCurrent(blank);
                setEditing(false);
              }}
            >
              Cancel editing / create new
            </button>
          )}
        </div>
      </form>
    </>
  );
}
