import { z } from 'zod';
export const scopes = [
  'Software engineering',
  'Logistics & fleet systems',
  'Network infrastructure',
  'Cloud & DevOps',
  'Architecture consultation',
] as const;
export const budgets = [
  'Under $5,000',
  '$5,000–$15,000',
  '$15,000–$50,000',
  '$50,000+',
  'Let’s scope it together',
] as const;
export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.email('Please enter a valid email address.').max(254),
  company: z.string().trim().min(2, 'Please enter your company name.').max(160),
  scope: z.enum(scopes),
  budget: z.enum(budgets),
  message: z.string().trim().min(30, 'Tell us a little more (at least 30 characters).').max(5000),
  consent: z.literal(true, { error: 'Please agree so we can respond to your inquiry.' }),
  website: z.string().max(0).optional(),
});
