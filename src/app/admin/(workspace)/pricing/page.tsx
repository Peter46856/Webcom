import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { PricingManager } from '@/components/pricing-manager';
export default async function PricingAdmin() {
  if (!(await getAdmin())) redirect('/admin/login');
  return <PricingManager />;
}
