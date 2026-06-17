export default function ReportPreview() {
  return (
    <section className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Zie het voor je betaalt
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Een echt rapport — geen teaser.
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Dit is een voorbeeldrapport voor een lokaal bedrijf met een lage score.
            Dit is wat je ontgrendelt na je scan.
          </p>
        </div>

        {/* 3 preview kaarten */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          {/* Kaart 1: Score */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Score & Grade</p>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#ef4444" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset="155"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">27</span>
                  <span className="text-zinc-500 text-xs">/100</span>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold">Bakkerij De Korst</p>
                <p className="text-zinc-400 text-sm">bakkerijdekorst.nl</p>
                <span className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">Grade F</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800">
              {[["27/100", "GEO Score"], ["2/7", "AI crawlers"], ["0", "Schema types"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-white font-bold text-sm">{val}</p>
                  <p className="text-zinc-500 text-xs leading-tight">{label}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Bakkerij De Korst is vrijwel onzichtbaar voor AI-zoekmachines. De fixes zijn eenvoudig.
            </p>
          </div>

          {/* Kaart 2: AI Crawler toegang */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">AI Crawler Toegang</p>
            <p className="text-zinc-400 text-xs">Als een crawler je niet kan bereiken, kan het AI-platform je niet aanbevelen.</p>
            <div className="space-y-2">
              {[
                { bot: "GPTBot", platform: "ChatGPT", status: "Geblokkeerd", color: "#ef4444" },
                { bot: "ClaudeBot", platform: "Claude", status: "Geblokkeerd", color: "#ef4444" },
                { bot: "PerplexityBot", platform: "Perplexity", status: "Geblokkeerd", color: "#ef4444" },
                { bot: "Google-Extended", platform: "Gemini", status: "Toegestaan", color: "#22d3ee" },
                { bot: "Bingbot", platform: "Bing Copilot", status: "Toegestaan", color: "#22d3ee" },
              ].map((row) => (
                <div key={row.bot} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-800/50">
                  <span className="text-zinc-400 font-mono">{row.bot}</span>
                  <span className="text-zinc-500">{row.platform}</span>
                  <span className="font-semibold" style={{ color: row.color }}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kaart 3: Actieplan */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Jouw 90-dagen plan</p>
            <p className="text-zinc-400 text-xs">Quick wins eerst, daarna structurele verbeteringen.</p>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Dag 1–30 · Quick wins</p>
              {[
                { n: 1, title: "Deblokkeer GPTBot & ClaudeBot in robots.txt", impact: "HOOG" },
                { n: 2, title: "Voeg LocalBusiness JSON-LD schema toe", impact: "HOOG" },
                { n: 3, title: "Publiceer llms.txt in je domein root", impact: "MEDIUM" },
              ].map((item) => (
                <div key={item.n} className="flex gap-3">
                  <span className="text-cyan-400 font-bold text-xs shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <p className="text-white text-xs font-medium leading-snug">{item.title}</p>
                    <span className={`text-[10px] font-bold ${item.impact === "HOOG" ? "text-red-400" : "text-amber-400"}`}>{item.impact} IMPACT</span>
                  </div>
                </div>
              ))}
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider pt-1">Dag 31–60 · Structureel</p>
              {[
                { n: 4, title: "Voeg FAQ sectie toe met FAQPage schema", impact: "HOOG" },
                { n: 5, title: "Schrijf openingstijden & locatie in gestructureerde data", impact: "MEDIUM" },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 opacity-60">
                  <span className="text-zinc-500 font-bold text-xs shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <p className="text-zinc-400 text-xs font-medium leading-snug">{item.title}</p>
                    <span className={`text-[10px] font-bold ${item.impact === "HOOG" ? "text-red-400" : "text-amber-400"}`}>{item.impact} IMPACT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Labels onder kaarten */}
        <div className="grid md:grid-cols-3 gap-6 text-center mb-16">
          {[
            "Jouw score & grade",
            "AI crawler toegang — wat blokkeert je",
            "Geprioriteerd actieplan"
          ].map((label) => (
            <p key={label} className="text-zinc-400 font-medium text-sm">{label}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/geo-audit"
            className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-10 py-4 rounded-2xl text-base transition-all"
          >
            Start gratis audit →
          </a>
          <p className="text-zinc-600 text-sm mt-4">Gratis · Geen account nodig · Resultaat in 30 seconden</p>
        </div>

      </div>
    </section>
  );
}
