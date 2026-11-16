import { z } from 'zod';
export const pricingSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    name: z.string().trim().min(3).max(100),
    category: z.string().trim().min(3).max(80),
    description: z.string().trim().min(20).max(800),
    currency: z.enum(['USD', 'KES', 'EUR', 'GBP']),
    price_min: z.number().int().min(0).max(100000000),
    price_max: z.number().int().min(0).max(100000000),
    billing: z.enum(['project', 'engagement', 'month']),
    timeline: z.string().trim().min(3).max(140),
    features: z.array(z.string().trim().min(2).max(300)).min(1).max(30),
    exclusions: z.array(z.string().trim().min(2).max(300)).min(1).max(20),
    published: z.boolean(),
    sort_order: z.number().int().min(0).max(10000),
  })
  .refine((p) => p.price_max >= p.price_min, {
    path: ['price_max'],
    message: 'The upper price must be at least the lower price.',
  });
export type PricingPackage = z.infer<typeof pricingSchema>;
export function packagePrice(p: PricingPackage) {
  const money = (value: number) =>
    new Intl.NumberFormat('en', {
      style: 'currency',
      currency: p.currency,
      maximumFractionDigits: 0,
    }).format(value);
  return p.price_min === p.price_max
    ? money(p.price_min)
    : `${money(p.price_min)} – ${money(p.price_max)}`;
}
