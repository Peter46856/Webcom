import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { NotificationSettings } from '@/components/notification-settings';
export default async function Notifications() {
  if (!(await getAdmin())) redirect('/admin/login');
  return <NotificationSettings />;
}
