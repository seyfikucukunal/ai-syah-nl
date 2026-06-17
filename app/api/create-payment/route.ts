import { NextRequest, NextResponse } from "next/server";
import { createMollieClient } from "@mollie/api-client";

const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

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
