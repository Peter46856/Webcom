import { z } from 'zod';
export const blogSchema = z.object({
  title: z.string().trim().min(5).max(160),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(30).max(350),
  category: z.enum(['Software Engineering', 'Logistics Tech', 'Network Infrastructure']),
  content: z.string().trim().min(100).max(80000),
  status: z.enum(['draft', 'published']),
});
export type BlogDraft = z.infer<typeof blogSchema>;
export type ManagedPost = BlogDraft & {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};
export const inquiryStatuses = ['new', 'contacted', 'qualified', 'closed'] as const;
