"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import AutoStartFromQuery from "./AutoStartFromQuery";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GeoAuditForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  const steps = [
    "Website ophalen...",
    "AI crawlers controleren...",
    "Schema markup analyseren...",
    "Citability score berekenen...",
    "Rapport samenstellen...",
  ];

  const runScan = async (scanUrl: string, scanEmail: string) => {
    setError("");
    let cleanUrl = scanUrl.trim();
    if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

    try {
      new URL(cleanUrl);
    } catch {
      setError("Voer een geldige URL in, bijv. https://jouwbedrijf.nl");
      return;
    }

    if (!EMAIL_RE.test(scanEmail.trim())) {
      setError("Vul een geldig e-mailadres in — daar sturen we je score naartoe");
      return;
    }

    setLoading(true);

    for (let i = 0; i < steps.length; i++) {
      setLoadingStep(i);
      await new Promise((r) => setTimeout(r, 1200));
    }

    try {
      const res = await fetch("/api/geo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cleanUrl, email: scanEmail.trim() }),
      });

      const data = await res.json();

      if (data.already_used) {
        router.push(`/geo-audit/results?domain=${encodeURIComponent(data.domain)}&cached=true`);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Audit mislukt");

      sessionStorage.setItem("geo_audit_result", JSON.stringify(data));
      router.push(`/geo-audit/results?domain=${encodeURIComponent(data.domain)}`);
    } catch (err: unknown) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runScan(url, email);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center space-y-8 px-4">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-cyan-400/40 animate-ping [animation-delay:0.3s]" />
            <div className="absolute inset-4 rounded-full border-2 border-cyan-400 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-zinc-400 text-sm font-mono tracking-widest uppercase">GEO Analyse</p>
            <div className="space-y-1">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 justify-center transition-all duration-500 ${
                  i < loadingStep ? "text-cyan-400 opacity-60" : i === loadingStep ? "text-white" : "text-zinc-700"
                }`}>
                  {i < loadingStep ? (
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i === loadingStep ? (
                    <div className="w-4 h-4 shrink-0 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-4 h-4 shrink-0 rounded-full border border-zinc-700" />
                  )}
                  <span className={`text-sm ${i === loadingStep ? "font-medium" : ""}`}>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-zinc-600 text-xs">Analyseren duurt 15-30 seconden</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-3">
      <Suspense fallback={null}>
        <AutoStartFromQuery
          onUrl={(urlParam) => {
            setUrl(urlParam);
            const pendingEmail = sessionStorage.getItem("pending_email");
            if (pendingEmail) {
              sessionStorage.removeItem("pending_email");
              setEmail(pendingEmail);
              runScan(urlParam, pendingEmail);
            }
          }}
        />
      </Suspense>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://jouwbedrijf.nl"
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-all text-base"
        />
      </div>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-all text-base"
        />
      </div>

      {error && <p className="text-red-400 text-sm pl-1">{error}</p>}

      <button
        type="submit"
        className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-4 rounded-2xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] active:scale-[0.98] text-base"
      >
        Analyseer mijn website →
      </button>

      <p className="text-zinc-600 text-xs text-center pt-1">
        Gratis • Je score ontvang je direct per e-mail • Resultaat in 30 seconden
      </p>
    </form>
  );
}
