export const site = {
  name: 'WebCom Engineering Studio',
  description:
    'Software development and network infrastructure for ambitious businesses. Custom platforms, fleet systems, ISP automation, and cloud engineering.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
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
