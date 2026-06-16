"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://geo-api-eqn1.onrender.com";

type Plan = "single" | "subscription";

const plans = [
  {
    id: "single" as Plan,
    badge: "EENMALIG",
    title: "Losse Scan",
    price: "9,99",
    priceNote: "eerste rapport · daarna €49,99",
    description: "Één keer je AI-zichtbaarheid meten. Ideaal om te starten.",
    features: [
      "Volledig GEO rapport als PDF",
      "Score op 6 dimensies",
      "AI-platform analyse",
      "Prioriteitslijst met quick wins",
      "Bezorgd per e-mail binnen 2 minuten",
    ],
    cta: "Rapport aanvragen",
    accent: false,
  },
  {
    id: "subscription" as Plan,
    badge: "MEEST GEKOZEN",
    title: "GEO Monitor",
    price: "29,99",
    priceNote: "per maand · jaarcontract",
    description: "Maandelijks bijhouden waar je staat. Zie wat werkt.",
    features: [
      "Maandelijks automatisch rapport",
      "Score-ontwikkeling over tijd",
      "Vroeg signaal bij AI-algoritme wijzigingen",
      "Prioriteitslijst bijgewerkt per maand",
      "Bezorgd per e-mail, altijd op tijd",
    ],
    cta: "Abonnement starten",
    accent: true,
  },
];

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"plans" | "details">("plans");

  function selectPlan(plan: Plan) {
    setSelectedPlan(plan);
    setStep("details");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !url || !selectedPlan) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url, plan: selectedPlan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Er is iets misgegaan");
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error("Geen betaallink ontvangen");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Er is iets misgegaan. Probeer opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold tracking-widest text-cyan-400 uppercase">
            AI-syah.nl
          </a>
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-white transition-colors"
          >
            ← Terug
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4">
            GEO Rapport
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Word gevonden door AI.
            <br />
            <span className="text-zinc-400">Meet waar je staat.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Een volledig GEO-rapport laat zien hoe ChatGPT, Gemini en Perplexity
            jouw website zien — en wat je kunt doen om dat te verbeteren.
          </p>
        </div>

        {step === "plans" && (
          <>
            {/* Pricing cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border p-8 flex flex-col transition-all ${
                    plan.accent
                      ? "border-cyan-400/60 bg-zinc-900/80"
                      : "border-white/10 bg-zinc-900/40"
                  }`}
                >
                  {plan.accent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-cyan-400 text-black text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {!plan.accent && (
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 block">
                      {plan.badge}
                    </span>
                  )}

                  {plan.accent && <div className="mb-4" />}

                  <h2 className="text-xl font-bold text-white mb-1">{plan.title}</h2>
                  <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-1">
                    <span className="text-4xl font-bold text-white">€{plan.price}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-8">{plan.priceNote}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => selectPlan(plan.id)}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.accent
                        ? "bg-cyan-400 text-black hover:bg-cyan-300"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 text-xs text-zinc-500">
              <span>🔒 Betaling via Mollie</span>
              <span>📄 PDF binnen 2 minuten</span>
              <span>📧 Bezorgd op je e-mail</span>
              <span>🇳🇱 Nederlands rapport</span>
            </div>
          </>
        )}

        {step === "details" && selectedPlan && (
          <div className="max-w-md mx-auto">
            {/* Terug knop */}
            <button
              onClick={() => { setStep("plans"); setError(""); }}
              className="text-xs text-zinc-500 hover:text-white mb-8 flex items-center gap-1 transition-colors"
            >
              ← Ander pakket kiezen
            </button>

            {/* Gekozen pakket samenvatting */}
            <div className="border border-cyan-400/30 rounded-xl p-5 mb-8 bg-zinc-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    {selectedPlan === "subscription" ? "Maandelijks" : "Eenmalig"}
                  </p>
                  <p className="text-white font-semibold">
                    {selectedPlan === "subscription" ? "GEO Monitor" : "Losse Scan"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold text-xl">
                    €{selectedPlan === "subscription" ? "29,99" : "9,99"}
                  </p>
                  {selectedPlan === "subscription" && (
                    <p className="text-xs text-zinc-500">per maand</p>
                  )}
                </div>
              </div>
            </div>

            {/* Formulier */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-2">
                  E-mailadres
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 uppercase tracking-widest mb-2">
                  Website URL
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="jouwwebsite.nl"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
                <p className="text-xs text-zinc-600 mt-2">
                  Het rapport wordt gebaseerd op deze URL.
                </p>
              </div>

              {error && (
                <div className="bg-red-950/40 border border-red-500/30 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-400 text-black font-bold py-4 rounded-xl text-sm hover:bg-cyan-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Betaallink aanmaken…" : "Naar betaling →"}
              </button>

              <p className="text-center text-xs text-zinc-600 pt-2">
                Je wordt doorgestuurd naar Mollie voor een veilige betaling.
                <br />
                Het rapport wordt direct na betaling per e-mail verstuurd.
              </p>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
