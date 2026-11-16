'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogDraft, ManagedPost, blogSchema } from '@/lib/blog-schema';
import { Markdown } from './markdown';
import { AdminTaskHelp } from './admin-task-help';
const blank: BlogDraft = {
  title: '',
  slug: '',
  description: '',
  category: 'Software Engineering',
  content: '',
  status: 'draft',
};
export function BlogEditor({ initial }: { initial?: ManagedPost }) {
  const [post, setPost] = useState<BlogDraft>(initial || blank),
    [preview, setPreview] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [notice, setNotice] = useState(''),
    [dirty, setDirty] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function change(key: keyof BlogDraft, value: string) {
    setPost({ ...post, [key]: value });
    setDirty(true);
    setNotice('');
  }
  async function save(status: 'draft' | 'published') {
    const parsed = blogSchema.safeParse({ ...post, status });
    if (!parsed.success) {
      setError(parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(' '));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const r = await fetch(initial ? `/api/admin/posts/${initial.id}` : '/api/admin/posts', {
        method: initial ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setPost(data.post);
      setDirty(false);
      setNotice(
        status === 'published'
          ? 'Published. The article is now available on the website.'
          : 'Draft saved. Only administrators can see this article.',
      );
      if (!initial) router.replace(`/admin/blog/${data.post.id}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.');
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!initial || !window.confirm('Delete this article permanently? This cannot be undone.'))
      return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/posts/${initial.id}`, { method: 'DELETE' });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setDirty(false);
      router.replace('/admin/blog');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed.');
      setBusy(false);
    }
  }
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <Link
            className="text-link"
            href="/admin/blog"
            onClick={(e) => {
              if (dirty && !window.confirm('Leave without saving your changes?'))
                e.preventDefault();
            }}
          >
            ← Blog studio
          </Link>
          <h1>{initial ? 'Edit your article.' : 'Start a useful conversation.'}</h1>
          <p>Markdown supports headings, lists, links, quotes, and fenced code blocks.</p>
        </div>
      </div>
      <div className="editor-actions">
        <button className="button button-ghost" disabled={busy} onClick={() => save('draft')}>
          {post.status === 'published' ? 'Unpublish & save draft' : 'Save draft'}
        </button>
        <button className="button" disabled={busy} onClick={() => save('published')}>
          {busy
            ? 'Saving…'
            : post.status === 'published'
              ? 'Update published article'
              : 'Publish article'}
        </button>
        {initial && (
          <button className="admin-danger" disabled={busy} onClick={remove}>
            Delete article
          </button>
        )}
        {post.status === 'published' && initial && !dirty && (
          <Link href={`/blog/${post.slug}`} target="_blank" className="text-link">
            View live article ↗
          </Link>
        )}
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="admin-success" role="status">
          {notice}
        </p>
      )}
      <div className="blog-editor">
        <div className="editor-fields">
          <label>
            Article title
            <input
              value={post.title}
              maxLength={160}
              onChange={(e) => change('title', e.target.value)}
            />
          </label>
          <label>
            URL slug
            <div className="slug-input">
              <span>/blog/</span>
              <input
                value={post.slug}
                maxLength={120}
                onChange={(e) => change('slug', e.target.value)}
              />
            </div>
            <small>
              Lowercase letters, numbers, and hyphens. Changing a published slug changes its URL.
            </small>
          </label>
          <label>
            Summary
            <textarea
              rows={3}
              value={post.description}
              maxLength={350}
              onChange={(e) => change('description', e.target.value)}
            />
          </label>
          <label>
            Category
            <select value={post.category} onChange={(e) => change('category', e.target.value)}>
              {['Software Engineering', 'Logistics Tech', 'Network Infrastructure'].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="editor-help">
            <h3>Before you publish</h3>
            <p>
              Lead with a real problem. Explain the decisions and tradeoffs. Use evidence for
              results. Leave out credentials, customer data, and unsupported claims.
            </p>
            <p>
              Raw HTML, executable MDX, and images are disabled in managed posts. Use standard
              Markdown for safe publishing.
            </p>
          </div>
        </div>
        <div className="editor-main">
          <div className="editor-toolbar">
            <strong>Article body</strong>
            <div>
              <button aria-pressed={!preview} onClick={() => setPreview(false)}>
                Write
              </button>
              <button aria-pressed={preview} onClick={() => setPreview(true)}>
                Preview
              </button>
            </div>
          </div>
          {preview ? (
            <div className="prose editor-preview">
              <h2>{post.title || 'Your article title'}</h2>
              <Markdown content={post.content || 'Start writing to see a preview.'} />
            </div>
          ) : (
            <textarea
              aria-label="Article body Markdown"
              className="markdown-input"
              value={post.content}
              maxLength={80000}
              placeholder={
                '## The problem\n\nExplain the context.\n\n## The approach\n\nShow the decisions, tradeoffs, and useful details.'
              }
              onChange={(e) => change('content', e.target.value)}
            />
          )}
          <div className="editor-counter">
            {post.content.trim() ? post.content.trim().split(/\s+/).length : 0} words /{' '}
            {dirty ? 'Unsaved changes' : post.status === 'published' ? 'Published' : 'Draft'}
          </div>
        </div>
      </div>
      <AdminTaskHelp context="editor" />
    </>
  );
}
