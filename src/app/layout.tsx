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
  applicationName: 'WebCom Engineering Studio',
  title: {
    default: 'WebCom Engineering Studio — Custom Software & Network Infrastructure',
    template: '%s | WebCom Engineering Studio',
  },
  description: site.description,
  keywords: [
    'WebCom',
    'WebCom Engineering Studio',
    'webcom.website',
    'custom software development',
    'network infrastructure engineering',
    'full-stack web applications',
    'API integration',
  ],
  authors: [{ name: 'WebCom Engineering Studio', url: site.url }],
  creator: 'WebCom Engineering Studio',
  publisher: 'WebCom Engineering Studio',
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'WebCom Engineering Studio — Custom Software & Network Infrastructure',
    description: site.description,
    url: site.url,
    siteName: 'WebCom Engineering Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebCom Engineering Studio — Custom Software & Network Infrastructure',
    description: site.description,
  },
  // Optional: Add your Google Search Console HTML verification code here if not using DNS verification
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  // },
};

export const viewport: Viewport = { themeColor: '#090d16' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: 'WebCom Engineering Studio',
        alternateName: ['WebCom', 'webcom.website'],
        description: site.description,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: 'WebCom Engineering Studio',
        alternateName: 'WebCom',
        url: site.url,
        description: site.description,
        areaServed: 'Worldwide',
        knowsAbout: [
          'Custom Software Development',
          'Full-Stack Web Applications',
          'Network Infrastructure Engineering',
          'System Architecture & APIs',
        ],
      },
    ],
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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