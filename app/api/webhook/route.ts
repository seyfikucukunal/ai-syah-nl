import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const paymentId = body.get("id") as string;

  if (!paymentId) {
    return NextResponse.json({ error: "Geen payment ID" }, { status: 400 });
  }

  try {
    const payment = await mollieClient.payments.get(paymentId);

    if (payment.status !== "paid") {
      return NextResponse.json({ status: "not paid" });
    }

    const metadata = payment.metadata as { url: string; email: string } | null;
    const url = metadata?.url ?? "";
    const email = metadata?.email ?? "";

    // Genereer volledig rapport via Claude
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: `Je bent een GEO (Generative Engine Optimization) expert. Maak een uitgebreid professioneel GEO audit rapport voor de volgende website.

Website: ${url}

Schrijf een volledig rapport in het Nederlands met de volgende secties:

# GEO Audit Rapport — ${url}

## Executive Summary
[2-3 zinnen samenvatting]

## GEO Score: [0-100]/100

## Score Breakdown
- AI Citability & Visibility: [score]/100
- Brand Authority Signals: [score]/100  
- Content Quality & E-E-A-T: [score]/100
- Technical Foundations: [score]/100
- Structured Data: [score]/100
- Platform Optimization: [score]/100

## AI Platform Readiness
- ChatGPT: [score]/100 — [status]
- Google Gemini: [score]/100 — [status]
- Perplexity: [score]/100 — [status]
- Bing Copilot: [score]/100 — [status]

## Kritieke Bevindingen
[5-7 bevindingen met prioriteit KRITIEK/HOOG/MEDIUM/LAAG]

## Quick Wins (Deze Week)
[3-5 acties met tijdsinvestering]

## Verbeteringen Deze Maand
[3-5 acties]

## Strategische Initiatieven
[2-3 lange termijn acties]

## Conclusie
[Afsluiting met call to action voor AI-syah.nl]

Geef een realistisch en gedetailleerd rapport gebaseerd op wat je weet over dit type website.`,
        },
      ],
    });

    const reportContent = message.content[0];
    if (reportContent.type !== "text") {
      throw new Error("Onverwacht response type");
    }

    const report = reportContent.text;

    // Stuur email met rapport
    await resend.emails.send({
      from: "AI-syah.nl <rapport@ai-syah.nl>",
      to: email,
      subject: `Jouw GEO Audit Rapport — ${url}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 40px; text-align: center;">
            <h1 style="color: #22d3ee; margin: 0;">AI-syah.nl</h1>
            <p style="color: #fff; margin: 10px 0 0;">GEO Audit Rapport</p>
          </div>
          <div style="padding: 40px; background: #fff;">
            <h2>Jouw rapport is klaar!</h2>
            <p>Bedankt voor je bestelling. Hieronder vind je het volledige GEO audit rapport voor <strong>${url}</strong>.</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; font-family: monospace; font-size: 14px;">
${report}
            </div>
            <hr style="margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">
              Vragen over dit rapport? Reply op deze email of ga naar 
              <a href="https://ai-syah.nl">ai-syah.nl</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook mislukt" }, { status: 500 });
  }
}