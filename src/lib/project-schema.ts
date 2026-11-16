import { z } from 'zod';
export const projectSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(120),
  category: z.string().trim().min(2).max(100),
  title: z.string().trim().min(5).max(180),
  description: z.string().trim().min(30).max(1000),
  challenge: z.string().trim().min(30).max(5000),
  approach: z.string().trim().min(30).max(5000),
  stack: z.array(z.string().trim().min(1).max(100)).min(1).max(20),
  features: z.array(z.string().trim().min(1).max(500)).min(1).max(20),
  nodes: z
    .array(
      z.object({
        title: z.string().min(1).max(120),
        tech: z.string().min(1).max(200),
        detail: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(10),
  color: z.enum(['green', 'blue', 'purple']).default('blue'),
});
export type PortfolioProject = z.infer<typeof projectSchema>;
