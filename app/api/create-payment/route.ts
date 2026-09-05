import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";
import { Resend } from "resend";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "AI-syah.nl <info@ai-syah.nl>";
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "info@ai-syah.nl";

async function notifyOwnerOfPaymentIntent(email: string, domain: string) {
  if (!process.env.RESEND_API_KEY || !email) return;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: RESEND_FROM,
      to: LEAD_NOTIFY_EMAIL,
      replyTo: email,
      subject: `Hete lead: ${email} start afrekenen voor ${domain}`,
      html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#ffffff;">
        <p style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#f59e0b;font-weight:700;margin:0 0 12px;">Betaling gestart</p>
        <p style="font-size:15px;color:#18181b;margin:0 0 16px;line-height:1.6;">
          <strong><a href="mailto:${email}" style="color:#18181b;">${email}</a></strong> is naar Mollie-checkout gestuurd voor het €9,99 rapport van <strong>${domain}</strong>.
        </p>
        <p style="font-size:12px;color:#71717a;margin-top:16px;">
          Check het Mollie-dashboard om te zien of de betaling ook echt is afgerond. Reageer direct via "beantwoorden" — dat mailt rechtstreeks naar ${email}.
        </p>
      </div>`,
    });
    console.log(`[create-payment lead] notificatie verstuurd naar=${LEAD_NOTIFY_EMAIL} lead=${email} domain=${domain}`);
  } catch (err) {
    console.error("[create-payment lead] notificatie mislukt:", err);
  }
}

export async function POST(req: NextRequest) {
  const { url, email, domain } = await req.json();

  if (!url) {
    return NextResponse.json(
      { error: "URL is verplicht" },
      { status: 400 }
    );
  }

  // Gebruik url als fallback voor domain
  const safeDomain = domain && domain !== "undefined" ? domain : url;

  console.log(
    `[create-payment] domain=${safeDomain} email=${email || "(geen)"} url=${url} at=${new Date().toISOString()}`
  );

  await notifyOwnerOfPaymentIntent(email, safeDomain);

  try {
    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: "9.99",
      },
      description: `GEO Audit Rapport — ${safeDomain}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/geo-audit/bedankt?domain=${encodeURIComponent(safeDomain)}&email=${encodeURIComponent(email || "")}`,
      webhookUrl: `https://geo-api-eqn1.onrender.com/payment/webhook`,
      metadata: {
        url,
        email: email || "",
        domain: safeDomain,
      },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Betaling aanmaken mislukt." },
      { status: 500 }
    );
  }
}
