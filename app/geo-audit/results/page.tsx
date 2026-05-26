"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

interface GeoAuditData {
  url: string;
  brand_name: string;
  date: string;
  geo_score: number;
  scores: {
    ai_citability: number;
    brand_authority: number;
    content_eeat: number;
    technical: number;
    schema: number;
    platform_optimization: number;
  };
  platforms: Record<string, number>;
  executive_summary: string;
  findings: Array<{
    severity: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
  }>;
  quick_wins: string[];
}

function scoreColor(score: number) {
  if (score >= 70) return "#22d3ee";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score: number) {
  if (score >= 70) return "Goed";
  if (score >= 40) return "Verbetering nodig";
  return "Kritieke aandacht vereist";
}

function scoreHeadline(score: number, brand: string) {
  if (score >= 70) return `${brand} scoort goed in AI-zoekmachines`;
  if (score >= 40) return `${brand} mist kansen in AI-zoekmachines`;
  return `ChatGPT vindt ${brand} bijna niet`;
}

function severityColor(s: string) {
  if (s === "critical") return { bg: "#ef4444", label: "KRITIEK" };
  if (s === "high") return { bg: "#f97316", label: "HOOG" };
  if (s === "medium") return { bg: "#3b82f6", label: "MEDIUM" };
  return { bg: "#6b7280", label: "LAAG" };
}

const COMPONENT_LABELS: Record<string, string> = {
  ai_citability: "AI Citability & Visibility",
  brand_authority: "Brand Authority Signals",
  content_eeat: "Content Quality & E-E-A-T",
  technical: "Technical Foundations",
  schema: "Structured Data",
  platform_optimization: "Platform Optimization",
};

const COMPONENT_WEIGHTS: Record<string, number> = {
  ai_citability: 25,
  brand_authority: 20,
  content_eeat: 20,
  technical: 15,
  schema: 10,
  platform_optimization: 10,
};

function ScoreCircle({ score }: { score: number }) {
  const [animated, setAnimated] = useState(0);
  const color = scoreColor(score);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const t = setTimeout(() => {
      let start = 0;
      const step = () => {
        start += 1.5;
        setAnimated(Math.min(start, score));
        if (start < score) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 300);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.05s linear" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white leading-none">{Math.round(animated)}</span>
        <span className="text-zinc-500 text-sm">/100</span>
      </div>
    </div>
  );
}

function ScoreBar({ score, animate }: { score: number; animate: boolean }) {
  const [width, setWidth] = useState(0);
  const color = scoreColor(score);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(score), 200);
      return () => clearTimeout(t);
    }
  }, [animate, score]);

  return (
    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }} />
    </div>
  );
}

export default function GeoAuditResults() {
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");
  const cached = searchParams.get("cached");
  const [data, setData] = useState<GeoAuditData | null>(null);
  const [barsVisible, setBarsVisible] = useState(false);
  const [paying, setPaying] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [paymentEmail, setPaymentEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("geo_audit_result");
    if (stored) {
      setData(JSON.parse(stored));
    } else if (domain) {
      fetch(`/api/geo-audit?domain=${encodeURIComponent(domain)}`)
        .then((r) => r.json())
        .then(setData)
        .catch(console.error);
    }
  }, [domain]);

  useEffect(() => {
    if (data) {
      const t = setTimeout(() => setBarsVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, [data]);

const handlePayment = async () => {
    if (!data) return;
    if (!paymentEmail) {
      setShowEmailInput(true);
      ctaRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setPaying(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: data.url, domain, email: paymentEmail }),
      });
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch {
      setPaying(false);
      alert("Betaling kon niet worden gestart. Probeer het opnieuw.");
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const findings = data.findings;
  const visibleFindings = findings.slice(0, 2);
  const hiddenFindings = findings.slice(2);
  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const highCount = findings.filter((f) => f.severity === "high").length;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Glow achtergrond */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {cached && (
        <div className="bg-zinc-900 border-b border-zinc-800 py-3 px-4 text-center text-sm text-zinc-400 relative z-10">
          Je hebt eerder al een gratis audit voor dit domein uitgevoerd. Hieronder zie je de resultaten van je eerste scan.
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-8">

        {/* HERO SCORE */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 text-center space-y-4">
          <p className="text-zinc-500 text-sm uppercase tracking-[0.3em]">GEO Audit — {data.brand_name}</p>
          <ScoreCircle score={data.geo_score} />
          <div>
            <p className="text-2xl font-bold" style={{ color: scoreColor(data.geo_score) }}>
              {scoreLabel(data.geo_score)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
              {scoreHeadline(data.geo_score, data.brand_name)}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {criticalCount > 0 && (
              <span className="bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-medium px-3 py-1 rounded-full">
                {criticalCount} kritieke problemen
              </span>
            )}
            {highCount > 0 && (
              <span className="bg-orange-400/10 border border-orange-400/30 text-orange-400 text-xs font-medium px-3 py-1 rounded-full">
                {highCount} hoge prioriteit
              </span>
            )}
            <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-medium px-3 py-1 rounded-full">
              {findings.length} bevindingen totaal
            </span>
          </div>
          <button
            onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-2"
          >
            Bekijk volledig rapport →
          </button>
        </div>

        {/* EXECUTIVE SUMMARY */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-3">
          <h2 className="text-white font-semibold text-lg">Samenvatting</h2>
          <p className="text-zinc-400 leading-relaxed text-sm">{data.executive_summary}</p>
        </div>

        {/* SCORE BREAKDOWN */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-lg">Score Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-zinc-500 font-medium text-left pb-3">Component</th>
                  <th className="text-zinc-500 font-medium text-center pb-3 w-20">Score</th>
                  <th className="text-zinc-500 font-medium text-center pb-3 w-16">Gewicht</th>
                  <th className="text-zinc-500 font-medium text-left pb-3 pl-4">Voortgang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {Object.entries(data.scores).map(([key, score]) => (
                  <tr key={key}>
                    <td className="py-3 text-zinc-300">{COMPONENT_LABELS[key]}</td>
                    <td className="py-3 text-center font-bold" style={{ color: scoreColor(score) }}>{score}/100</td>
                    <td className="py-3 text-center text-zinc-500">{COMPONENT_WEIGHTS[key]}%</td>
                    <td className="py-3 pl-4 w-40"><ScoreBar score={score} animate={barsVisible} /></td>
                  </tr>
                ))}
                <tr className="border-t-2 border-zinc-700">
                  <td className="py-3 text-white font-bold">OVERALL</td>
                  <td className="py-3 text-center font-bold text-white">{data.geo_score}/100</td>
                  <td className="py-3 text-center text-zinc-500">100%</td>
                  <td className="py-3 pl-4 w-40"><ScoreBar score={data.geo_score} animate={barsVisible} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI PLATFORM SCORES */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-white font-semibold text-lg">AI Platform Zichtbaarheid</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(data.platforms).map(([platform, score]) => (
              <div key={platform} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-center space-y-1">
                <p className="text-zinc-500 text-xs">{platform}</p>
                <p className="text-xl font-bold" style={{ color: scoreColor(score) }}>{score}</p>
                <div className="w-full bg-zinc-800 rounded-full h-1">
                  <div className="h-full rounded-full transition-all duration-700 delay-500"
                    style={{ width: barsVisible ? `${score}%` : "0%", backgroundColor: scoreColor(score) }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINDINGS */}
        <div className="space-y-3">
          <h2 className="text-white font-semibold text-lg">Bevindingen</h2>
          {visibleFindings.map((f, i) => {
            const { bg, label } = severityColor(f.severity);
            return (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-white text-xs font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                    style={{ backgroundColor: bg }}>{label}</span>
                  <h3 className="text-white font-medium text-sm leading-snug">{f.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed pl-[52px]">{f.description}</p>
              </div>
            );
          })}

          {hiddenFindings.length > 0 && (
            <div className="relative">
              <div className="space-y-3 blur-sm pointer-events-none select-none" aria-hidden>
                {hiddenFindings.slice(0, 3).map((f, i) => {
                  const { bg, label } = severityColor(f.severity);
                  return (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-5 space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="text-white text-xs font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                          style={{ backgroundColor: bg }}>{label}</span>
                        <h3 className="text-white font-medium text-sm leading-snug">{f.title}</h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed pl-[52px]">{f.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/80 to-transparent rounded-3xl">
                <div className="text-center space-y-3 p-6">
                  <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold">+{hiddenFindings.length} bevindingen verborgen</p>
                  <p className="text-zinc-400 text-sm">Inclusief alle aanbevelingen en actieplan</p>
                  <button
                    onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })}
                    className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-6 py-2.5 rounded-full transition-all text-sm"
                  >
                    Ontgrendel volledig rapport
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="bg-zinc-900/40 border border-cyan-400/30 rounded-3xl p-8 space-y-6">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-medium tracking-wide uppercase">Lanceringsprijs — eerste 100 audits</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ontdek hoe je {data.brand_name} laat vinden door AI
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Je score van <strong className="text-cyan-300">{data.geo_score}/100</strong> laat zien dat er concrete verbeterpunten zijn.
              Het volledige rapport bevat alle {findings.length} bevindingen, een stap-voor-stap actieplan en de snelste quick wins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              `Alle ${findings.length} bevindingen uitgelegd`,
              "Stap-voor-stap actieplan",
              "Quick wins voor deze week",
              "Schema.org code snippets",
              "llms.txt template op maat",
              "PDF rapport per e-mail",
              "1x gratis heraudit binnen 30 dagen",
              "Vergelijking met AI-platform scores",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-zinc-400">
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
  <div>
    <div className="flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">€9,99</span>
      <span className="text-zinc-500 line-through text-lg">€49,99</span>
    </div>
    <p className="text-zinc-600 text-xs mt-0.5">eenmalig • direct beschikbaar</p>
  </div>
  <div className="flex-1 space-y-3 w-full sm:w-auto">
    {showEmailInput && (
      <input
        type="email"
        placeholder="jouw@email.nl"
        value={paymentEmail}
        onChange={(e) => setPaymentEmail(e.target.value)}
        className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-400 transition"
      />
    )}
    <button
      onClick={handlePayment}
      disabled={paying}
      className="w-full sm:w-auto bg-white hover:bg-cyan-300 disabled:opacity-60 text-black font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] active:scale-[0.98] text-base whitespace-nowrap"
    >
      {paying ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
          Betaling starten...
        </span>
      ) : "Ontvang mijn volledig rapport →"}
    </button>
  </div>
</div>

          <p className="text-zinc-600 text-xs">
            Veilige betaling via Mollie • PDF binnen 5 minuten in je inbox • Geen abonnement
          </p>
        </div>

        <p className="text-zinc-600 text-xs text-center pb-4">
          Audit uitgevoerd op {new Date(data.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })} •{" "}
          <a href="/geo-audit" className="underline hover:text-zinc-400 transition-colors">Nieuwe audit starten</a>
        </p>

      </div>
    </div>
  );
}