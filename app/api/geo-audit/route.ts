import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const maxDuration = 120; // Vercel: max 120 seconden

const GEO_API_URL = process.env.GEO_API_URL || "https://geo-api-eqn1.onrender.com";
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "AI-syah.nl <info@ai-syah.nl>";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ai-syah.nl";

const freeAuditCache = new Map<string, { data: unknown; timestamp: number }>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
  }
}

interface GeoAuditResult {
  domain: string;
  brand_name?: string;
  geo_score?: number;
  findings?: Array<{ severity: string; title: string; description: string }>;
}

function scoreLabel(score: number) {
  if (score >= 70) return "Goed";
  if (score >= 40) return "Verbetering nodig";
  return "Kritieke aandacht vereist";
}

function scoreColor(score: number) {
  if (score >= 70) return "#0891b2";
  if (score >= 40) return "#d97706";
  return "#dc2626";
}

async function sendResultsEmail(email: string, result: GeoAuditResult) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[geo-audit email] RESEND_API_KEY ontbreekt — mail naar ${email} niet verstuurd`);
    return;
  }

  const score = result.geo_score ?? 0;
  const brand = result.brand_name || result.domain;
  const resultsUrl = `${BASE_URL}/geo-audit/results?domain=${encodeURIComponent(result.domain)}&cached=true`;
  const topFindings = (result.findings || []).slice(0, 3);

  const findingsHtml = topFindings
    .map(
      (f) => `<li style="margin-bottom:10px;color:#3f3f46;font-size:14px;line-height:1.5;"><strong style="color:#18181b;">${f.title}</strong></li>`
    )
    .join("");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${scoreColor(score)};font-weight:600;margin:0 0 16px;">GEO Audit — ${brand}</p>
    <h1 style="font-size:22px;color:#18181b;margin:0 0 8px;">Jouw AI-zichtbaarheidsscore: ${score}/100</h1>
    <p style="font-size:14px;color:${scoreColor(score)};font-weight:600;margin:0 0 20px;">${scoreLabel(score)}</p>
    <p style="font-size:14px;color:#52525b;line-height:1.6;margin:0 0 20px;">
      We hebben ${result.domain} gescand op zichtbaarheid voor ChatGPT, Gemini en Perplexity. Dit zijn de belangrijkste bevindingen:
    </p>
    ${topFindings.length ? `<ul style="padding-left:18px;margin:0 0 24px;">${findingsHtml}</ul>` : ""}
    <a href="${resultsUrl}" style="display:inline-block;background:#22d3ee;color:#000;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">
      Bekijk volledig rapport →
    </a>
    <p style="font-size:12px;color:#a1a1aa;margin-top:32px;">
      Verstuurd door AI-syah.nl • <a href="mailto:info@ai-syah.nl" style="color:#a1a1aa;">info@ai-syah.nl</a>
    </p>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: `Jouw AI-zichtbaarheidsscore voor ${result.domain}: ${score}/100`,
      html,
    });
    console.log(`[geo-audit email] verstuurd naar=${email} domain=${result.domain} score=${score}`);
  } catch (err) {
    console.error(`[geo-audit email] verzenden mislukt naar=${email}:`, err);
  }
}

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");
  if (!domain) return NextResponse.json({ error: "Missing domain" }, { status: 400 });
  const cached = freeAuditCache.get(domain);
  if (cached) return NextResponse.json(cached.data);
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url, email } = body;
  if (!url) return NextResponse.json({ error: "URL is verplicht" }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Vul een geldig e-mailadres in" }, { status: 400 });
  }

  const domain = extractDomain(url);
  const cached = freeAuditCache.get(domain);
  if (cached) {
    console.log(`[geo-audit scan] domain=${domain} email=${email} cached=true at=${new Date().toISOString()}`);
    return NextResponse.json({
      ...(cached.data as Record<string, unknown>),
      domain: domain,
      already_used: true,
    });
  }

  console.log(`[geo-audit scan] domain=${domain} email=${email} cached=false at=${new Date().toISOString()}`);

  try {
    const apiRes = await fetch(`${GEO_API_URL}/audit/basic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      signal: AbortSignal.timeout(120000),
    });

    if (!apiRes.ok) {
      const err = await apiRes.text();
      throw new Error(`API fout: ${err}`);
    }

    const data = await apiRes.json();
    const result = { ...data, domain };
    freeAuditCache.set(domain, { data: result, timestamp: Date.now() });

    await sendResultsEmail(email, result as GeoAuditResult);

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("GEO API error:", err);
    return NextResponse.json(
      { error: "Audit kon niet worden uitgevoerd. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}