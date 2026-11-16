'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PortfolioProject } from '@/lib/project-schema';
export function ProjectManager() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  async function load() {
    try {
      const r = await fetch('/api/admin/projects');
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setProjects(data.projects);
      setLoaded(true);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not load projects.');
    }
  }
  useEffect(() => {
    let active = true;
    fetch('/api/admin/projects')
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        if (active) {
          setProjects(data.projects);
          setLoaded(true);
        }
      })
      .catch((e) => {
        if (active) setMessage(e instanceof Error ? e.message : 'Could not load projects.');
      });
    return () => {
      active = false;
    };
  }, []);
  async function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const form = event.currentTarget;
    const f = new FormData(form);
    const text = (key: string) => String(f.get(key) || '').trim();
    const lines = (key: string) =>
      text(key)
        .split('\n')
        .map((x) => x.trim())
        .filter(Boolean);
    const nodes = lines('nodes').map((line) => {
      const [title, tech, ...detail] = line.split('|').map((x) => x.trim());
      return { title, tech, detail: detail.join('|') };
    });
    try {
      const r = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: text('slug'),
          name: text('name'),
          category: text('category'),
          title: text('title'),
          description: text('description'),
          challenge: text('challenge'),
          approach: text('approach'),
          stack: lines('stack'),
          features: lines('features'),
          nodes,
          color: 'blue',
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      form.reset();
      await load();
      setMessage('Project added. It is now visible on the website.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save project.');
    } finally {
      setBusy(false);
    }
  }
  async function remove(p: PortfolioProject) {
    if (!confirm(`Remove ${p.name} from the website? This permanently deletes the project.`))
      return;
    setBusy(true);
    setMessage('');
    try {
      const r = await fetch(`/api/admin/projects?slug=${encodeURIComponent(p.slug)}`, {
        method: 'DELETE',
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      await load();
      setMessage('Project removed.');
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not remove project.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <h1>Projects</h1>
      <p>
        Add case studies to the website or remove existing projects. New projects go live as soon as
        you save.
      </p>
      <p role="status" aria-live="polite">
        {message}
      </p>
      <section className="detail-panel">
        <h2>Published projects</h2>
        {!loaded ? (
          <p>Loading projects…</p>
        ) : projects.length ? (
          projects.map((p) => (
            <div className="project-admin-row" key={p.slug}>
              <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              <button className="button" disabled={busy} onClick={() => remove(p)}>
                Remove {p.name}
              </button>
            </div>
          ))
        ) : (
          <p>No projects yet. Add your first case study below.</p>
        )}
      </section>
      <form className="project-admin-form detail-panel" onSubmit={add}>
        <h2>Add a project</h2>
        {(
          [
            ['name', 'Project name', 120],
            ['slug', 'URL slug (for example warehouse-platform)', 120],
            ['category', 'Category', 100],
            ['title', 'Case study headline', 180],
          ] as const
        ).map(([name, label, max]) => (
          <label key={name}>
            {label}
            <input
              name={name}
              required
              maxLength={max}
              pattern={name === 'slug' ? '[a-z0-9]+(-[a-z0-9]+)*' : undefined}
            />
          </label>
        ))}
        {(
          [
            ['description', 'Summary (at least 30 characters)', 1000],
            ['challenge', 'The challenge (at least 30 characters)', 5000],
            ['approach', 'The approach (at least 30 characters)', 5000],
            ['stack', 'Technologies — one per line', 2000],
            ['features', 'Capabilities — one per line', 10000],
            [
              'nodes',
              'Architecture components — one per line: Component name | Technology | Description',
              20000,
            ],
          ] as const
        ).map(([name, label, max]) => (
          <label key={name}>
            {label}
            <textarea
              name={name}
              required
              rows={4}
              maxLength={max}
              minLength={['description', 'challenge', 'approach'].includes(name) ? 30 : 1}
            />
          </label>
        ))}
        <button className="button button-primary" disabled={busy || !loaded}>
          {busy ? 'Saving…' : 'Add project'}
        </button>
      </form>
    </>
  );
}
