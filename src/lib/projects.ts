import 'server-only';
import { cache } from 'react';
import { projects } from './content';
import { supabase, supabaseConfigured } from './supabase';
import { projectSchema, type PortfolioProject } from './project-schema';
export const publishedProjects = cache(async (): Promise<PortfolioProject[]> => {
  if (!supabaseConfigured()) return projects.map((p) => projectSchema.parse(p));
  try {
    const { data, error, status } = await supabase()
      .from('portfolio_projects')
      .select('data')
      .order('created_at');
    if (error) {
      const code = /^[A-Z0-9_]{1,30}$/.test(error.code || '') ? error.code : 'UNKNOWN';
      const action =
        code === 'PGRST205' || code === '42P01'
          ? 'Run the contents of supabase/migrations/202610310002_projects.sql in the Supabase SQL Editor.'
          : code === '42501' || status === 403
            ? 'Check portfolio_projects SELECT grants and row-level security policies from the projects migration.'
            : status === 401
              ? 'Check that SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY belong to the same Supabase project.'
              : 'Check Supabase availability and the server connection. If the table was just created, refresh the Supabase schema cache.';
      console.error('[projects] read_failed', { code, status, action });
      return projects.map((p) => projectSchema.parse(p));
    }
    return (data || []).flatMap((row) => {
      const parsed = projectSchema.safeParse(row.data);
      return parsed.success ? [parsed.data] : [];
    });
  } catch {
    console.error('[projects] connection_failed', {
      action: 'Check SUPABASE_URL, Supabase availability, and network access. The request may have timed out.',
    });
    return projects.map((p) => projectSchema.parse(p));
  }
});
