import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

const BASE_URL = 'https://h-remodeling.com';
const GA_MEASUREMENT_ID = 'G-37D3N6116Z';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'H Remodeling | Kitchen, Bathroom, Flooring & Deck Experts in DMV',
  description: 'H Remodeling provides quality kitchen remodeling, bathroom renovation, flooring installation, and deck building services in Maryland, Virginia, and Washington D.C.',
  keywords: 'kitchen remodel, bathroom remodel, flooring, decking, DMV, Maryland, Virginia, Washington DC, home renovation, Bethesda, Arlington, McLean, Alexandria',
  verification: {
    google: ['lHNtTmihGmQbbGQGzRHp7qRPoicVIikvZQ_7g-kkJe4', '3c-mYnyE2HwnVuvk6U9SskM1o_nCSXinmT7LEnzPjQ4'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'H Remodeling | Quality Remodeling in DMV Area',
    description: 'Transform your home with H Remodeling. Expert kitchen, bathroom, flooring, and deck services.',
    type: 'website',
    url: BASE_URL,
    siteName: 'H Remodeling',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'H Remodeling - Kitchen, Bathroom, Flooring & Deck Experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'H Remodeling | Kitchen, Bathroom, Flooring & Deck Experts in DMV',
    description: 'Transform your home with H Remodeling. Expert kitchen, bathroom, flooring, and deck services.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'US-MD;US-VA;US-DC',
    'geo.placename': 'Maryland;Virginia;Washington D.C.',
    'geo.position': '38.9072;-77.0369',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

// Schema.org LocalBusiness structured data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BASE_URL,
  name: 'H Remodeling',
  description: 'Professional kitchen remodeling, bathroom renovation, flooring installation, and deck building services in the DMV area.',
  url: BASE_URL,
  telephone: '+1-703-585-9517',
  email: 'hremodeling05@gmail.com',
  image: `${BASE_URL}/og-image.png`,
  logo: `${BASE_URL}/favicon.ico`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'DMV Area',
    addressRegion: 'MD/VA/DC',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.9072,
    longitude: -77.0369,
  },
  areaServed: [
    { '@type': 'State', name: 'Maryland' },
    { '@type': 'State', name: 'Virginia' },
  ],
  serviceType: [
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Flooring Installation',
    'Deck Building',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '17:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61584490866793',
    'https://www.instagram.com/hremodeling05',
  ],
  currenciesAccepted: 'USD',
  foundingDate: '2014',
  slogan: 'Quality Remodeling in Virginia & Maryland',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
