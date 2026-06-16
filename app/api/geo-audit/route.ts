import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120; // Vercel: max 120 seconden

const GEO_API_URL = process.env.GEO_API_URL || "https://geo-api-eqn1.onrender.com";

const freeAuditCache = new Map<string, { data: unknown; timestamp: number }>();

function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
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
  const { url } = body;
  if (!url) return NextResponse.json({ error: "URL is verplicht" }, { status: 400 });

  const domain = extractDomain(url);
  const cached = freeAuditCache.get(domain);
  if (cached) {
    return NextResponse.json({
      ...(cached.data as Record<string, unknown>),
      domain: domain,
      already_used: true,
    });
  }

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
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("GEO API error:", err);
    return NextResponse.json(
      { error: "Audit kon niet worden uitgevoerd. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}