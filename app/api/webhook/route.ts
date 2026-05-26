import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { Resend } from "resend";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

const GEO_API_URL = process.env.GEO_API_URL || "https://geo-api-eqn1.onrender.com";

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

    const metadata = payment.metadata as { url: string; email: string; domain: string } | null;
    const url = metadata?.url ?? "";
    const email = metadata?.email ?? "";

    if (!url || !email) {
      return NextResponse.json({ error: "Missende metadata" }, { status: 400 });
    }

    // Genereer volledig rapport via Python API
    const reportRes = await fetch(`${GEO_API_URL}/audit/full`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, email }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(120000) : undefined,
    });

    if (!reportRes.ok) {
      throw new Error(`Report API fout: ${reportRes.status}`);
    }

    const reportData = await reportRes.json();
    const report = reportData.report;

    // Formatteer rapport als HTML
    const reportHtml = report
      .split("\n")
      .map((line: string) => {
        if (line.startsWith("# ")) return `<h1 style="color:#000;font-size:24px;margin:20px 0 10px;">${line.replace("# ", "")}</h1>`;
        if (line.startsWith("## ")) return `<h2 style="color:#22d3ee;font-size:18px;margin:16px 0 8px;border-bottom:1px solid #eee;padding-bottom:4px;">${line.replace("## ", "")}</h2>`;
        if (line.startsWith("### ")) return `<h3 style="color:#333;font-size:16px;margin:12px 0 6px;">${line.replace("### ", "")}</h3>`;
        if (line.startsWith("- ")) return `<li style="margin:4px 0;color:#444;">${line.replace("- ", "")}</li>`;
        if (line.match(/^\d+\. /)) return `<li style="margin:4px 0;color:#444;">${line.replace(/^\d+\. /, "")}</li>`;
        if (line === "") return "<br/>";
        return `<p style="margin:6px 0;color:#444;line-height:1.6;">${line}</p>`;
      })
      .join("");

    // Stuur email met rapport
    await resend.emails.send({
      from: "AI-syah.nl <rapport@ai-syah.nl>",
      to: email,
      subject: `Jouw GEO Audit Rapport — ${url}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9f9f9;">
          
          <!-- Header -->
          <div style="background: #000; padding: 40px; text-align: center;">
            <h1 style="color: #22d3ee; margin: 0; font-size: 28px;">AI-syah.nl</h1>
            <p style="color: #fff; margin: 8px 0 0; font-size: 14px; opacity: 0.7;">GEO Audit Rapport</p>
          </div>

          <!-- Intro -->
          <div style="padding: 30px 40px; background: #fff; border-bottom: 1px solid #eee;">
            <h2 style="color: #000; margin: 0 0 10px;">Jouw rapport is klaar! 🎉</h2>
            <p style="color: #555; margin: 0; line-height: 1.6;">
              Bedankt voor je bestelling. Hieronder vind je het volledige GEO audit rapport voor 
              <strong style="color: #22d3ee;">${url}</strong>.
            </p>
          </div>

          <!-- Rapport -->
          <div style="padding: 30px 40px; background: #fff;">
            ${reportHtml}
          </div>

          <!-- Footer -->
          <div style="padding: 30px 40px; background: #f5f5f5; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 13px; margin: 0 0 8px;">
              Vragen over dit rapport? Reply op deze email.
            </p>
            <a href="https://ai-syah.nl" style="color: #22d3ee; font-size: 13px;">ai-syah.nl</a>
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