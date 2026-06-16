"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const plan = params.get("plan");
  const isSubscription = plan === "subscription";

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center mx-auto mb-8">
          <span className="text-cyan-400 text-3xl">✓</span>
        </div>

        <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-4">
          Betaling geslaagd
        </p>

        <h1 className="text-3xl font-bold text-white mb-4">
          {isSubscription ? "Abonnement geactiveerd" : "Rapport wordt aangemaakt"}
        </h1>

        <p className="text-zinc-400 text-base mb-8 leading-relaxed">
          {isSubscription
            ? "Je GEO Monitor abonnement is actief. Je eerste rapport wordt nu aangemaakt en binnen enkele minuten per e-mail verstuurd."
            : "Je GEO rapport wordt nu gegenereerd. Je ontvangt het binnen 2 minuten als PDF in je inbox."}
        </p>

        <div className="border border-white/10 rounded-xl p-6 mb-10 text-left space-y-3">
          <div className="flex items-start gap-3 text-sm text-zinc-300">
            <span className="text-cyan-400 shrink-0">1</span>
            <span>Controleer je inbox (ook je spam map)</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-zinc-300">
            <span className="text-cyan-400 shrink-0">2</span>
            <span>Het rapport bevat je score + concreet actieplan</span>
          </div>
          {isSubscription && (
            <div className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="text-cyan-400 shrink-0">3</span>
              <span>Elke maand ontvang je automatisch een nieuw rapport</span>
            </div>
          )}
        </div>

        <a
          href="/"
          className="inline-block bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold px-8 py-3 rounded-xl transition-all"
        >
          Terug naar home
        </a>

        <p className="text-xs text-zinc-600 mt-8">
          Vragen? Mail naar{" "}
          <a href="mailto:info@ai-syah.nl" className="text-cyan-400 hover:underline">
            info@ai-syah.nl
          </a>
        </p>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
