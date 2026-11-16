import 'server-only';
import { cache } from 'react';
import { supabase, supabaseConfigured } from './supabase';
import { defaultPackages } from './pricing-defaults';
import { pricingSchema, type PricingPackage } from './pricing-schema';
export const publishedPricing = cache(
  async (): Promise<{ packages: PricingPackage[]; unavailable: boolean }> => {
    if (!supabaseConfigured())
      return { packages: defaultPackages.filter((p) => p.published), unavailable: false };
    try {
      const { data, error } = await supabase()
        .from('pricing_packages')
        .select('*')
        .eq('published', true)
        .order('sort_order')
        .order('name');
      if (error) {
        console.error('[pricing] read_failed', {
          code: error.code,
          action: 'Apply 202611010001_pricing.sql and check permissions.',
        });
        return { packages: [], unavailable: true };
      }
      const packages = (data || []).flatMap((row) => {
        const p = pricingSchema.safeParse(row);
        return p.success ? [p.data] : [];
      });
      return { packages, unavailable: false };
    } catch {
      console.error('[pricing] connection_failed');
      return { packages: [], unavailable: true };
    }
  },
);
