'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './icons';
const links = [
  ['Services', '/services'],
  ['Industries', '/industries'],
  ['Projects', '/projects'],
  ['Blog', '/blog'],
  ['About', '/about'],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith('/admin')) return null;
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" aria-label="WebCom home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <details className="studio-menu">
            <summary>Explore</summary>
            <div>
              {[
                ['How we work', '/how-we-work'],
                ['Pricing & packages', '/pricing'],
                ['Engagement models', '/engagements'],
                ['Engineering standards', '/engineering'],
                ['Frequently asked questions', '/faq'],
              ].map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <ThemeToggle />
        <Link className="button button-small nav-cta" href="/contact">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ...links,
              ['How we work', '/how-we-work'],
              ['Pricing & packages', '/pricing'],
              ['Engagement models', '/engagements'],
              ['Engineering standards', '/engineering'],
              ['FAQs', '/faq'],
              ['Let’s talk', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={pathname.startsWith(href) ? 'page' : undefined}
              >
                {label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
