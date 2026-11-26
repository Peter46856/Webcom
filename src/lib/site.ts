const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://www.webcom.website'
    : 'http://localhost:3000');

// Remove any trailing slash so new URL('/services', site.url) stays clean
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, '');

export const site = {
  name: 'WebCom Engineering Studio',
  shortName: 'WebCom',
  domain: 'webcom.website',
  description:
    'Software development and network infrastructure for ambitious businesses. Custom platforms, fleet and logistics systems, ISP automation, and cloud engineering.',
  url: normalizedSiteUrl,
};

export function bookingUrl() {
  const value = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}