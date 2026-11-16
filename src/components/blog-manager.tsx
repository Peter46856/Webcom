'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ManagedPost } from '@/lib/blog-schema';
import { AdminTaskHelp } from './admin-task-help';
export function BlogManager() {
  const [posts, setPosts] = useState<ManagedPost[]>([]),
    [error, setError] = useState(''),
    [loading, setLoading] = useState(true),
    [filter, setFilter] = useState('all');
  useEffect(() => {
    fetch('/api/admin/posts')
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setPosts(data.posts);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const shown = posts.filter((p) => filter === 'all' || p.status === filter);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="section-kicker">Studio / Blog</span>
          <h1>Your engineering journal.</h1>
          <p>Draft, review, publish. Every article has its own public page.</p>
        </div>
        <Link className="button" href="/admin/blog/new">
          Create article
        </Link>
      </div>
      <div className="admin-toolbar">
        <label>
          Publication status
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All posts</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
        </label>
        <span>{shown.length} articles</span>
      </div>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      <div className="admin-posts">
        {loading ? (
          <p>Loading articles…</p>
        ) : shown.length ? (
          shown.map((post) => (
            <article key={post.id}>
              <div>
                <span className={`status-pill ${post.status}`}>{post.status}</span>
                <h2>
                  <Link href={`/admin/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
                <small>
                  {post.category} / Updated {new Date(post.updated_at).toLocaleDateString()}
                </small>
              </div>
              <Link className="button button-ghost" href={`/admin/blog/${post.id}`}>
                Edit article
              </Link>
            </article>
          ))
        ) : (
          <div className="admin-empty">
            <h2>No articles here yet.</h2>
            <p>Create a draft to start your next engineering story.</p>
          </div>
        )}
      </div>
      <p className="admin-small">
        The three original starter guides remain file-based MDX in content/blog. They are preserved
        on the public blog. New articles created here are stored in Supabase.
      </p>
      <AdminTaskHelp context="blog" />
    </>
  );
}
