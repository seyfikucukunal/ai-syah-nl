"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const SCORE_PREVIEW = {
  score: 34,
  grade: "D",
  color: "#ef4444",
  domain: "voorbeeld-bedrijf.nl",
  dimensions: [
    { label: "AI Citability", score: 22 },
    { label: "Brand Authority", score: 41 },
    { label: "Technical", score: 55 },
    { label: "Schema Data", score: 8 },
  ],
};

function MiniBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-mono w-6 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

function scoreColor(score: number) {
  if (score >= 70) return "#22d3ee";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let cleanUrl = url.trim();
    if (!cleanUrl) return;
    if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

    try {
      new URL(cleanUrl);
    } catch {
      setError("Voer een geldige URL in, bijv. jouwbedrijf.nl");
      return;
    }

    setLoading(true);
    sessionStorage.setItem("pending_url", cleanUrl);
    router.push(`/geo-audit?url=${encodeURIComponent(cleanUrl)}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[90vh] flex items-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Links: tekst + scan input */}
        <div>
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-medium tracking-wide uppercase">
              64% van zoekopdrachten vindt plaats in AI
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Word aanbevolen door AI,<br />
            <span className="text-cyan-400">niet genegeerd</span>.
          </h1>

          <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg">
            Ontdek waarom ChatGPT, Gemini en Perplexity jouw website overslaan — en krijg de exacte fixes om dat te veranderen.
          </p>

          {/* Scan form */}
          <form onSubmit={handleScan} className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="jouwbedrijf.nl"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-all text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-5 py-3.5 rounded-2xl text-sm transition-all whitespace-nowrap disabled:opacity-50"
              >
                {loading ? "Scannen..." : "Gratis scannen →"}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm pl-1">{error}</p>}
            <p className="text-zinc-600 text-xs pl-1">
              Gratis • Geen account nodig • Resultaat in 30 seconden
            </p>
          </form>

          {/* Trust badges */}
          <div className="flex flex-nowrap gap-6 mt-10 text-zinc-500 text-sm">
            {["ChatGPT check", "6 GEO dimensies", "llms.txt analyse", "Schema markup"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Rechts: score preview kaart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full" />

          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
            {/* Header kaart */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-zinc-500 text-sm mb-1">{SCORE_PREVIEW.domain}</p>
                <p className="text-zinc-400 text-xs">AI Visibility Score</p>
              </div>
              <div
                className="text-2xl font-bold px-3 py-1 rounded-lg border"
                style={{ color: SCORE_PREVIEW.color, borderColor: SCORE_PREVIEW.color + "40", backgroundColor: SCORE_PREVIEW.color + "10" }}
              >
                Grade {SCORE_PREVIEW.grade}
              </div>
            </div>

            {/* Score cirkel */}
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  <circle
                    cx="40" cy="40" r="34" fill="none"
                    stroke={SCORE_PREVIEW.color} strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - SCORE_PREVIEW.score / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">{SCORE_PREVIEW.score}</span>
                  <span className="text-zinc-500 text-xs">/100</span>
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-white font-semibold text-sm">Gescored over 6 GEO categorieën</p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  3 van 7 AI crawlers geblokkeerd. 0 structured data types gevonden.
                </p>
              </div>
            </div>

            {/* Dimensies */}
            <div className="space-y-3">
              {SCORE_PREVIEW.dimensions.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">{d.label}</span>
                  </div>
                  <MiniBar score={d.score} color={scoreColor(d.score)} />
                </div>
              ))}
            </div>

            {/* Blur overlay onderaan */}
            <div className="relative">
              <div className="space-y-3 blur-sm pointer-events-none select-none opacity-50">
                {["Content Quality & E-E-A-T", "Platform Optimization"].map((d) => (
                  <div key={d}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-400">{d}</span>
                    </div>
                    <MiniBar score={30} color="#6b7280" />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-700">
                  🔒 Scan jouw website om te ontgrendelen
                </span>
              </div>
            </div>

            {/* CTA onderaan kaart */}
            <button
              onClick={() => document.querySelector("input")?.focus()}
              className="w-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-sm font-semibold py-3 rounded-xl transition-all"
            >
              Start gratis audit →
            </button>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}
