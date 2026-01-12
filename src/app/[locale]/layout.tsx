import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../globals.css';

const BASE_URL = 'https://www.h-remodeling.com';
const GA_MEASUREMENT_ID = 'G-37D3N6116Z';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Kitchen & Bathroom Remodeling Maryland & Virginia | H Remodeling | Free Estimates',
  description: '⭐ 10+ Years Experience, 500+ Projects Completed. Kitchen remodeling, bathroom renovation, flooring & deck services in Maryland & Northern Virginia. Licensed & Insured. Call (703) 585-9517 for FREE estimate!',
  keywords: 'kitchen remodeling Maryland, bathroom renovation Virginia, flooring contractor Bethesda, deck builder Arlington, kitchen cabinets McLean, bathroom remodel Alexandria, hardwood floors Rockville, home renovation Silver Spring',
  verification: {
    google: ['lHNtTmihGmQbbGQGzRHp7qRPoicVIikvZQ_7g-kkJe4', '3c-mYnyE2HwnVuvk6U9SskM1o_nCSXinmT7LEnzPjQ4'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Kitchen & Bathroom Remodeling Maryland & Virginia | Free Estimates',
    description: '⭐ 10+ Years, 500+ Projects. Licensed & insured kitchen, bathroom, flooring & deck experts in MD & VA. Get your FREE quote today!',
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
    title: 'Kitchen & Bathroom Remodeling Maryland & Virginia | Free Estimates',
    description: '⭐ 10+ Years, 500+ Projects. Licensed & insured experts in MD & VA. Get FREE quote!',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'US-MD;US-VA;US-DC',
    'geo.placename': 'Maryland;Virginia;Washington D.C.',
    'geo.position': '38.9072;-77.0369',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Schema.org LocalBusiness structured data with reviews for rich snippets
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': BASE_URL,
  name: 'H Remodeling',
  description: 'Professional kitchen remodeling, bathroom renovation, flooring installation, and deck building services in Maryland and Northern Virginia. Licensed & insured with 10+ years experience.',
  url: BASE_URL,
  telephone: '+1-703-585-9517',
  email: 'hremodeling05@gmail.com',
  image: `${BASE_URL}/og-image.png`,
  logo: `${BASE_URL}/favicon.ico`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Serving Maryland & Northern Virginia',
    addressLocality: 'Bethesda',
    addressRegion: 'MD',
    postalCode: '20814',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.9847,
    longitude: -77.0947,
  },
  areaServed: [
    { '@type': 'State', name: 'Maryland' },
    { '@type': 'State', name: 'Virginia' },
    { '@type': 'City', name: 'Bethesda' },
    { '@type': 'City', name: 'Arlington' },
    { '@type': 'City', name: 'McLean' },
    { '@type': 'City', name: 'Alexandria' },
    { '@type': 'City', name: 'Rockville' },
    { '@type': 'City', name: 'Silver Spring' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Remodeling Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kitchen Remodeling',
          description: 'Custom kitchen cabinets, countertops, islands, and complete kitchen renovations',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bathroom Renovation',
          description: 'Walk-in showers, freestanding tubs, custom vanities, and full bathroom remodels',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Flooring Installation',
          description: 'Hardwood, luxury vinyl plank (LVP), tile, and laminate flooring installation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deck Building',
          description: 'Composite and wood decking, pergolas, railings, and outdoor living spaces',
        },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sarah M.' },
      datePublished: '2024-11-15',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Excellent kitchen remodel in Bethesda. Professional team completed on time and on budget. Highly recommend!',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Michael T.' },
      datePublished: '2024-10-22',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'H Remodeling transformed our outdated bathroom into a modern spa-like retreat. Great communication throughout.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Jennifer L.' },
      datePublished: '2024-09-18',
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Beautiful hardwood floors installed throughout our Arlington home. Clean work and fair pricing.',
    },
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
  paymentAccepted: 'Cash, Check, Credit Card',
  currenciesAccepted: 'USD',
  foundingDate: '2014',
  slogan: 'Quality Remodeling in Maryland & Virginia',
  knowsAbout: [
    'Kitchen Remodeling',
    'Bathroom Renovation',
    'Flooring Installation',
    'Deck Building',
    'Home Improvement',
    'Interior Design',
  ],
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
