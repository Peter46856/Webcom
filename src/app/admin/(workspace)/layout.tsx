import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { AdminShell } from '@/components/admin-shell';
export default async function Workspace({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return <AdminShell email={admin.user.email || 'Studio administrator'}>{children}</AdminShell>;
}
