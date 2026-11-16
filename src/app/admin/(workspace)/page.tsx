import Link from 'next/link';
import { getAdmin } from '@/lib/admin';
import { AdminTaskHelp } from '@/components/admin-task-help';
import { redirect } from 'next/navigation';
export default async function Dashboard() {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  const [all, fresh, posts, drafts] = await Promise.all([
    admin.db.from('inquiries').select('id', { count: 'exact', head: true }),
    admin.db.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    admin.db
      .from('blog_posts')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published'),
    admin.db.from('blog_posts').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
  ]);
  const broken = [all, fresh, posts, drafts].some((x) => x.error);
  return (
    <>
      <div className="admin-page-heading">
        <div>
          <span className="section-kicker">WebCom / Studio overview</span>
          <h1>A clear view of the studio.</h1>
          <p>Follow up on new conversations. Turn engineering knowledge into useful content.</p>
        </div>
        <Link className="button" href="/admin/blog/new">
          Write an article
        </Link>
      </div>
      {broken && (
        <p className="form-error" role="alert">
          Some data could not be loaded. Apply the admin migration and check your administrator
          membership.
        </p>
      )}
      <div className="admin-stats">
        {[
          ['Total inquiries', all],
          ['Awaiting review', fresh],
          ['Published articles', posts],
          ['Draft articles', drafts],
        ].map(([label, result]) => (
          <div key={String(label)}>
            <span>{String(label)}</span>
            <strong>
              {(result as typeof all).error ? '—' : ((result as typeof all).count ?? 0)}
            </strong>
          </div>
        ))}
      </div>
      <div className="admin-start-grid">
        <Link href="/admin/inquiries">
          <span>Client conversations</span>
          <h2>From inquiry to next step.</h2>
          <p>
            Review project scope, budget, and contact details. Keep every conversation’s status
            current.
          </p>
          <b>Open inquiry inbox ↗</b>
        </Link>
        <Link href="/admin/blog">
          <span>Engineering journal</span>
          <h2>Give your thinking a home.</h2>
          <p>
            Write in Markdown, preview your article, and publish only when it is ready for the
            public website.
          </p>
          <b>Open blog studio ↗</b>
        </Link>
      </div>
      <AdminTaskHelp context="overview" />
    </>
  );
}
