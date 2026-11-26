const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '');

const isProduction = process.env.NODE_ENV === 'production';

export const site = {
  // ...keep all your existing fields here...
  url:
    isProduction && (!configuredUrl || configuredUrl.includes('localhost'))
      ? 'https://www.webcom.website'
      : configuredUrl || 'http://localhost:3000',
};