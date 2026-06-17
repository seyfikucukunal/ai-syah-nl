import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-syah.nl — Word aanbevolen door AI",
  description:
    "AI-syah.nl bouwt AI-native websites, GEO strategieën en slimme automatiseringen waarmee bedrijven zichtbaar en aanbevolen worden in ChatGPT, Gemini, Claude en Perplexity.",
  metadataBase: new URL("https://www.ai-syah.nl"),
  verification: {
    google: "ysS5YD2zPdHp1IDaShZUHGVfqlMLTpSxXF-q5xQK1f4",
  },
  alternates: {
    canonical: "https://www.ai-syah.nl",
  },
  keywords: [
    "GEO strategie",
    "Generative Engine Optimization",
    "AI vindbaarheid",
    "ChatGPT zichtbaar",
    "AI website Nederland",
    "AI automation",
    "AI agents Nederland",
    "GEO audit",
    "AI marketing bureau",
    "Perplexity optimalisatie",
  ],
  authors: [{ name: "AI-syah.nl", url: "https://www.ai-syah.nl" }],
  openGraph: {
    title: "AI-syah.nl — Word aanbevolen door AI",
    description:
      "AI-native websites, GEO strategieën en automatiseringen voor bedrijven die aanbevolen willen worden in ChatGPT, Gemini, Claude en Perplexity.",
    url: "https://www.ai-syah.nl",
    siteName: "AI-syah.nl",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-syah.nl — Word aanbevolen door AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-syah.nl — Word aanbevolen door AI",
    description:
      "AI-native websites, GEO strategieën en automatiseringen voor bedrijven die zichtbaar willen zijn in AI zoekmachines.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// JSON-LD Schema's
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ai-syah.nl/#organization",
  "name": "AI-syah.nl",
  "legalName": "AI-syah.nl",
  "url": "https://www.ai-syah.nl",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.ai-syah.nl/logo-ai-syah.png",
    "width": 200,
    "height": 200,
  },
  "description": "AI-syah.nl is een gespecialiseerd bureau voor Generative Engine Optimization (GEO), AI-native websites en slimme automatiseringen. Wij helpen bedrijven zichtbaar en aanbevolen te worden in ChatGPT, Gemini, Claude en Perplexity.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kethelweg 208",
    "addressLocality": "Vlaardingen",
    "postalCode": "3135 GP",
    "addressRegion": "Zuid-Holland",
    "addressCountry": "NL",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@ai-syah.nl",
    "availableLanguage": ["Dutch", "English"],
  },
  "sameAs": [
    "https://www.linkedin.com/company/ai-syah",
  ],
  "foundingDate": "2024",
  "areaServed": {
    "@type": "Country",
    "name": "Netherlands",
  },
  "knowsAbout": [
    "Generative Engine Optimization",
    "AI Marketing",
    "Large Language Models",
    "ChatGPT Optimization",
    "Schema Markup",
    "AI Automation",
    "GEO Strategy",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ai-syah.nl/#website",
  "url": "https://www.ai-syah.nl",
  "name": "AI-syah.nl",
  "description": "AI-native bureau voor GEO, AI websites en automatiseringen",
  "publisher": {
    "@id": "https://www.ai-syah.nl/#organization",
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.ai-syah.nl/geo-audit?url={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  "inLanguage": "nl-NL",
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AI-syah.nl Diensten",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "@id": "https://www.ai-syah.nl/#geo-strategie",
        "name": "GEO Strategie",
        "description": "Generative Engine Optimization strategie om bedrijven zichtbaar en aanbevolen te maken in ChatGPT, Gemini, Claude en Perplexity.",
        "provider": { "@id": "https://www.ai-syah.nl/#organization" },
        "serviceType": "Generative Engine Optimization",
        "areaServed": "Netherlands",
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "@id": "https://www.ai-syah.nl/#ai-automation",
        "name": "AI Automation",
        "description": "Slimme AI automatiseringen en workflows voor bedrijfsprocessen, lead generatie en content.",
        "provider": { "@id": "https://www.ai-syah.nl/#organization" },
        "serviceType": "AI Automation",
        "areaServed": "Netherlands",
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "@id": "https://www.ai-syah.nl/#ai-websites",
        "name": "AI-native Websites",
        "description": "AI-native websites gebouwd voor maximale zichtbaarheid in AI zoekmachines en geoptimaliseerd voor GEO.",
        "provider": { "@id": "https://www.ai-syah.nl/#organization" },
        "serviceType": "Web Development",
        "areaServed": "Netherlands",
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "@id": "https://www.ai-syah.nl/#geo-audit",
        "name": "GEO Audit",
        "description": "Volledig GEO rapport dat laat zien hoe zichtbaar uw website is in ChatGPT, Gemini en Perplexity, inclusief actieplan.",
        "provider": { "@id": "https://www.ai-syah.nl/#organization" },
        "serviceType": "GEO Audit",
        "areaServed": "Netherlands",
        "offers": {
          "@type": "Offer",
          "price": "9.99",
          "priceCurrency": "EUR",
          "priceValidUntil": "2026-12-31",
        },
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat is Generative Engine Optimization (GEO)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GEO (Generative Engine Optimization) is het optimaliseren van uw website en content zodat AI-zoekmachines zoals ChatGPT, Gemini, Claude en Perplexity uw bedrijf kunnen vinden, begrijpen en aanbevelen in hun antwoorden.",
      },
    },
    {
      "@type": "Question",
      "name": "Waarom is GEO belangrijk voor mijn bedrijf?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "64% van zoekopdrachten vindt nu plaats via AI-systemen. Als uw bedrijf niet geoptimaliseerd is voor deze AI-zoekmachines, mist u potentiële klanten die via ChatGPT, Gemini of Perplexity naar uw diensten zoeken.",
      },
    },
    {
      "@type": "Question",
      "name": "Hoe werkt een GEO audit van AI-syah.nl?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Onze GEO audit analyseert uw website op zes dimensies: AI Citability, Brand Authority, Content E-E-A-T, Technical Foundations, Schema Data en Platform Optimization. U ontvangt een score van 0-100 plus een concreet actieplan als PDF per email.",
      },
    },
    {
      "@type": "Question",
      "name": "Wat kost een GEO audit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een gratis basis GEO scan is direct beschikbaar. Het volledige rapport met alle bevindingen en actieplan kost €9,99 voor de eerste scan. Een maandelijks abonnement voor doorlopende monitoring is beschikbaar voor €29,99 per maand.",
      },
    },
    {
      "@type": "Question",
      "name": "Hoe lang duurt het voordat ik resultaten zie na GEO optimalisatie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quick wins zoals JSON-LD schema implementatie en robots.txt aanpassingen zijn binnen 1-2 weken merkbaar. Volledige GEO autoriteitsopbouw duurt gemiddeld 2-3 maanden, afhankelijk van de huidige staat van uw website.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
