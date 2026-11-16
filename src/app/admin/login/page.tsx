import { redirect } from 'next/navigation';
import { getAdmin } from '@/lib/admin';
import { supabaseConfigured } from '@/lib/supabase';
import { AdminLogin } from '@/components/admin-login';
export default async function Login() {
  if (await getAdmin()) redirect('/admin');
  return <AdminLogin configured={supabaseConfigured()} />;
}
