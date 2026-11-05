import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({});

// CSP-allowlist op basis van wat de site echt laadt:
// - OpenAI Ads pixel (bzrcdn.openai.com + eigen tracking-endpoints op *.openai.com)
// - Formspree (contactformulier), geo-api op Render (pricing/betaling)
// - Vercel Analytics draait same-origin via /_vercel/insights; fonts zijn self-hosted via next/font
// Staat in Report-Only: niets wordt geblokkeerd, overtredingen verschijnen in de browserconsole.
// Zodra de console schoon is: key omzetten naar "Content-Security-Policy".
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.openai.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.openai.com https://formspree.io https://geo-api-eqn1.onrender.com https://vitals.vercel-insights.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=(), payment=(self)" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withMDX(nextConfig);
