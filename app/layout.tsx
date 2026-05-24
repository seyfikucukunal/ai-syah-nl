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
  title: "AI-syah.nl — Word gevonden door AI",
  description:
    "AI-syah.nl bouwt AI-native websites, GEO strategieën en slimme automatiseringen waarmee bedrijven zichtbaar worden in ChatGPT, Gemini, Claude en Perplexity.",
  metadataBase: new URL("https://ai-syah.nl"),
  alternates: {
    canonical: "https://ai-syah.nl",
  },
  keywords: [
    "GEO strategie",
    "AI vindbaarheid",
    "ChatGPT zichtbaar",
    "Generative Engine Optimization",
    "AI website",
    "AI automation",
    "AI agents Nederland",
  ],
  authors: [{ name: "AI-syah.nl", url: "https://ai-syah.nl" }],
  openGraph: {
    title: "AI-syah.nl — Word gevonden door AI",
    description:
      "AI-native websites, GEO strategieën en automatiseringen voor bedrijven die zichtbaar willen zijn in AI zoekmachines.",
    url: "https://ai-syah.nl",
    siteName: "AI-syah.nl",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI-syah.nl — Word gevonden door AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-syah.nl — Word gevonden door AI",
    description:
      "AI-native websites, GEO strategieën en automatiseringen voor bedrijven.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}