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

  try {
    const isLocal = process.env.NEXT_PUBLIC_BASE_URL?.includes("localhost");

const payment = await mollieClient.payments.create({
  amount: {
    currency: "EUR",
    value: "9.99",
  },
  description: `GEO Audit Rapport — ${domain || url}`,
  redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/geo-audit/bedankt?domain=${encodeURIComponent(domain || url)}&email=${encodeURIComponent(email || "")}`,
  ...(isLocal ? {} : { webhookUrl: `https://geo-api-eqn1.onrender.com/payment/webhook` }),
  metadata: {
    url,
    email: email || "",
    domain: domain || "",
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