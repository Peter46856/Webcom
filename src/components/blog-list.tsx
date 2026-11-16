'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { categories } from '@/lib/content';
type Summary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
};
export function BlogList({ posts }: { posts: Summary[] }) {
  const [category, setCategory] = useState('All articles');
  const [query, setQuery] = useState('');
  const filtered = posts.filter(
    (post) =>
      (category === 'All articles' || post.category === category) &&
      `${post.title} ${post.description} ${post.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="blog-toolbar">
        <div className="filter-tabs" role="group" aria-label="Filter articles by category">
          {categories.map((item) => (
            <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={17} />
          <input
            aria-label="Search articles"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            type="search"
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
      </p>
      <div className="journal-grid blog-grid">
        {filtered.map((post) => (
          <Link className="journal-card" href={`/blog/${post.slug}`} key={post.slug}>
            <div className="article-meta">
              <span>{post.category}</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <span className="text-link">
              Read article <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matching articles</h2>
          <p>Try a different search or reset the filters.</p>
          <button
            className="button button-ghost"
            onClick={() => {
              setQuery('');
              setCategory('All articles');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
