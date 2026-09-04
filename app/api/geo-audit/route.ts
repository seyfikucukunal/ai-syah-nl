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

function scoreHeadline(score: number, brand: string) {
  if (score >= 70) return `${brand} scoort goed in AI-zoekmachines`;
  if (score >= 40) return `${brand} mist kansen in AI-zoekmachines`;
  return `ChatGPT vindt ${brand} bijna niet`;
}

function scoreIntro(score: number, domain: string) {
  if (score >= 70) {
    return `Goed nieuws: ${domain} doet het beter dan de meeste sites die we scannen. Er staan nog wel een paar verbeterpunten open — die zetten we hieronder voor je op een rij.`;
  }
  if (score >= 40) {
    return `${domain} wordt door AI-zoekmachines wel gevonden, maar mist een aantal signalen die ChatGPT, Gemini en Perplexity nodig hebben om je actief aan te bevelen. Dit zijn de belangrijkste verbeterpunten.`;
  }
  return `${domain} is op dit moment vrijwel onzichtbaar voor ChatGPT, Gemini en Perplexity. Dat betekent dat potentiële klanten die via AI zoeken, je concurrenten te zien krijgen — niet jou. Dit zijn de belangrijkste redenen waarom.`;
}

const SEVERITY_LABEL: Record<string, string> = {
  critical: "KRITIEK",
  high: "HOOG",
  medium: "MEDIUM",
  low: "LAAG",
};

const SEVERITY_COLOR: Record<string, string> = {
  critical: "#dc2626",
  high: "#ea580c",
  medium: "#2563eb",
  low: "#6b7280",
};

async function sendResultsEmail(email: string, result: GeoAuditResult) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[geo-audit email] RESEND_API_KEY ontbreekt — mail naar ${email} niet verstuurd`);
    return;
  }

  const score = result.geo_score ?? 0;
  const brand = result.brand_name || result.domain;
  const resultsUrl = `${BASE_URL}/geo-audit/results?domain=${encodeURIComponent(result.domain)}&cached=true`;
  const topFindings = (result.findings || []).slice(0, 3);
  const extraCount = Math.max((result.findings || []).length - topFindings.length, 0);

  const findingsHtml = topFindings
    .map((f) => {
      const sevLabel = SEVERITY_LABEL[f.severity] || f.severity.toUpperCase();
      const sevColor = SEVERITY_COLOR[f.severity] || "#6b7280";
      return `
      <li style="margin-bottom:16px;list-style:none;">
        <span style="display:inline-block;background:${sevColor};color:#fff;font-size:10px;font-weight:700;letter-spacing:0.5px;padding:2px 8px;border-radius:6px;margin-bottom:6px;">${sevLabel}</span>
        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#18181b;">${f.title}</p>
        <p style="margin:2px 0 0;font-size:13px;color:#71717a;line-height:1.5;">${f.description}</p>
      </li>`;
    })
    .join("");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:540px;margin:0 auto;padding:32px 24px;background:#ffffff;">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${scoreColor(score)};font-weight:700;margin:0 0 16px;">Gratis GEO Audit</p>

    <h1 style="font-size:24px;color:#18181b;margin:0 0 12px;line-height:1.3;">${scoreHeadline(score, brand)}</h1>

    <div style="display:inline-block;background:${scoreColor(score)}14;border:1px solid ${scoreColor(score)}40;border-radius:12px;padding:12px 20px;margin-bottom:20px;">
      <span style="font-size:28px;font-weight:800;color:${scoreColor(score)};">${score}</span><span style="font-size:14px;color:#71717a;">/100</span>
      <span style="display:block;font-size:12px;font-weight:600;color:${scoreColor(score)};margin-top:2px;">${scoreLabel(score)}</span>
    </div>

    <p style="font-size:14px;color:#3f3f46;line-height:1.6;margin:0 0 24px;">
      ${scoreIntro(score, result.domain)}
    </p>

    ${
      topFindings.length
        ? `<h2 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#71717a;margin:0 0 12px;">Belangrijkste bevindingen</h2>
           <ul style="padding:0;margin:0 0 8px;">${findingsHtml}</ul>
           ${extraCount > 0 ? `<p style="font-size:13px;color:#a1a1aa;margin:0 0 24px;">+ ${extraCount} meer bevindingen in het volledige rapport.</p>` : `<div style="margin-bottom:24px;"></div>`}`
        : ""
    }

    <a href="${resultsUrl}" style="display:inline-block;background:#22d3ee;color:#000;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;margin-bottom:8px;">
      Bekijk volledig rapport →
    </a>
    <p style="font-size:12px;color:#a1a1aa;margin:8px 0 28px;">
      Voor €9,99 krijg je alle bevindingen, een stap-voor-stap actieplan, quick wins en kant-en-klare schema.org code — als PDF in je inbox.
    </p>

    <p style="font-size:14px;color:#3f3f46;line-height:1.6;margin:0 0 4px;">Groet,</p>
    <p style="font-size:14px;color:#18181b;font-weight:600;margin:0 0 24px;">Seyfi Küçükünal<br/><span style="font-weight:400;color:#71717a;">GEO Specialist &amp; Oprichter, AI-syah.nl</span></p>

    <p style="font-size:11px;color:#a1a1aa;border-top:1px solid #e4e4e7;padding-top:16px;">
      Je ontvangt deze mail omdat je een gratis GEO-scan hebt aangevraagd voor ${result.domain} op ai-syah.nl.
      Vragen? Mail terug naar <a href="mailto:info@ai-syah.nl" style="color:#a1a1aa;">info@ai-syah.nl</a>.
    </p>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: `${scoreHeadline(score, brand)} — score ${score}/100`,
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