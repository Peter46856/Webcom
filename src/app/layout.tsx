import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { site } from '@/lib/site';
import './globals.css';
import './expansion.css';
import './reading.css';
import './theme.css';
import './pricing.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'WebCom — Software & infrastructure, engineered together.',
    template: '%s | WebCom Engineering Studio',
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};
export const viewport: Viewport = { themeColor: '#090d16' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="webcom-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("webcom-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}})()`,
          }}
        />
      </head>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
