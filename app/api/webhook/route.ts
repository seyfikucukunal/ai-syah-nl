import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { Resend } from "resend";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!);
const GEO_API_URL = process.env.GEO_API_URL || "https://geo-api-eqn1.onrender.com";

export const maxDuration = 300;

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

    console.log(`Verwerken rapport voor ${url} → ${email}`);

    const reportRes = await fetch(`${GEO_API_URL}/audit/full`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, email }),
    });

    if (!reportRes.ok) {
      console.error(`Report API fout: ${reportRes.status}`);
      return NextResponse.json({ error: "Rapport generatie mislukt" }, { status: 500 });
    }

    const reportData = await reportRes.json();
    const report = reportData.report;
    const pdfBase64 = reportData.pdf_base64;

    console.log(`Rapport gegenereerd voor ${url}`);

    const score = report.geo_score;
    const brandName = report.brand_name;
    const scoreColor = score >= 70 ? "#22d3ee" : score >= 40 ? "#f59e0b" : "#ef4444";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9f9f9;">
        <div style="background: #000; padding: 40px; text-align: center;">
          <h1 style="color: #22d3ee; margin: 0; font-size: 28px;">AI-syah.nl</h1>
          <p style="color: #fff; margin: 8px 0 0; font-size: 14px; opacity: 0.7;">GEO Audit Rapport</p>
        </div>
        <div style="padding: 30px 40px; background: #fff; text-align: center; border-bottom: 1px solid #eee;">
          <p style="color: #666; margin: 0 0 8px; font-size: 14px;">GEO Score voor ${url}</p>
          <div style="display: inline-block; width: 100px; height: 100px; border-radius: 50%; background: ${scoreColor}; line-height: 100px; text-align: center;">
            <span style="color: #fff; font-size: 32px; font-weight: bold;">${score}</span>
          </div>
          <p style="color: #333; font-weight: bold; margin: 12px 0 0; font-size: 18px;">${brandName}</p>
        </div>
        <div style="padding: 30px 40px; background: #fff; border-bottom: 1px solid #eee;">
          <h2 style="color: #000; margin: 0 0 10px;">Jouw rapport is klaar! 🎉</h2>
          <p style="color: #555; margin: 0; line-height: 1.6;">
            Het volledige GEO audit rapport voor <strong style="color: #22d3ee;">${url}</strong> 
            is bijgevoegd als PDF.
          </p>
        </div>
        <div style="padding: 30px 40px; background: #fff; border-bottom: 1px solid #eee;">
          <h3 style="color: #000; margin: 0 0 10px;">Samenvatting</h3>
          <p style="color: #555; line-height: 1.6;">${report.executive_summary}</p>
        </div>
        <div style="padding: 30px 40px; background: #fff; border-bottom: 1px solid #eee;">
          <h3 style="color: #000; margin: 0 0 10px;">Top Quick Wins</h3>
          <ol style="color: #555; padding-left: 20px; line-height: 1.8;">
            ${report.quick_wins?.slice(0, 3).map((win: string) => `<li>${win}</li>`).join("")}
          </ol>
        </div>
        <div style="padding: 30px 40px; background: #000; text-align: center;">
          <p style="color: #fff; margin: 0 0 16px;">Hulp nodig bij het implementeren?</p>
          <a href="https://ai-syah.nl/#contact" 
             style="background: #22d3ee; color: #000; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
            Neem contact op →
          </a>
          <p style="color: #666; font-size: 12px; margin: 16px 0 0;">
            Vragen? Reply op deze email • ai-syah.nl
          </p>
        </div>
      </div>
    `;

    const emailOptions: any = {
      from: "AI-syah.nl <rapport@ai-syah.nl>",
      to: email,
      subject: `Jouw GEO Audit Rapport — ${url}`,
      html: emailHtml,
    };

    if (pdfBase64) {
      const domain = url
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split("/")[0];
      emailOptions.attachments = [
        {
          filename: `GEO-Rapport-${domain}.pdf`,
          content: pdfBase64,
        },
      ];
    }

    await resend.emails.send(emailOptions);
    console.log(`Email verstuurd naar ${email}`);

    return NextResponse.json({ status: "ok" });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook mislukt" }, { status: 500 });
  }
}