'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Inbox, FileText, ArrowUpRight, LogOut } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './icons';
const items = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
  { href: '/admin/projects', label: 'Projects', icon: LayoutDashboard },
  { href: '/admin/pricing', label: 'Pricing & packages', icon: FileText },
  { href: '/admin/notifications', label: 'Notifications', icon: Inbox },
  { href: '/admin/blog', label: 'Blog studio', icon: FileText },
];
export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname(),
    router = useRouter();
  const [error, setError] = useState('');
  async function logout() {
    try {
      const r = await fetch('/api/admin/logout', { method: 'POST' });
      if (!r.ok) throw new Error();
      router.replace('/admin/login');
      router.refresh();
    } catch {
      setError('Could not sign out. Please try again.');
    }
  }
  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <Link href="/" aria-label="WebCom home">
          <Logo />
        </Link>
        <span className="admin-workspace-label">Studio workspace</span>
        <nav aria-label="Administration">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href))
                  ? 'page'
                  : undefined
              }
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <ThemeToggle />
          <Link href="/" target="_blank">
            View website
            <ArrowUpRight size={15} />
          </Link>
          <span>{email}</span>
          <button onClick={logout}>
            <LogOut size={16} />
            Sign out
          </button>
          {error && <p role="alert">{error}</p>}
        </div>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
