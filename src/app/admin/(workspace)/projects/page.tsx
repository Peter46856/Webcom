import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { ProjectManager } from '@/components/project-manager';
export default async function ProjectsAdmin() {
  if (!(await getAdmin())) redirect('/admin/login');
  return <ProjectManager />;
}
