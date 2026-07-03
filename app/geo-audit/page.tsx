import GeoAuditForm from "./GeoAuditForm";

export const metadata = {
  title: "Gratis GEO Audit — Ontdek of ChatGPT jouw bedrijf vindt | AI-syah.nl",
  description:
    "Vul je website in en ontdek in 30 seconden hoe zichtbaar jouw bedrijf is voor AI-zoekmachines zoals ChatGPT, Gemini en Perplexity. Gratis, geen account nodig.",
  alternates: {
    canonical: "https://www.ai-syah.nl/geo-audit",
  },
};

export default function GeoAuditPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-300 text-xs font-medium tracking-wide uppercase">Gratis GEO Audit</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white text-center leading-tight mb-4 max-w-3xl">
          Vindt ChatGPT
          <span className="text-cyan-300"> jouw bedrijf</span>?
        </h1>

        <p className="text-zinc-400 text-lg text-center max-w-xl mb-12 leading-relaxed">
          Vul je website in en ontdek in 30 seconden hoe zichtbaar jij bent voor AI-zoekmachines zoals ChatGPT, Gemini en Perplexity.
        </p>

        <GeoAuditForm />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-16 text-zinc-500 text-sm">
          {["ChatGPT check", "Schema markup", "llms.txt analyse"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
