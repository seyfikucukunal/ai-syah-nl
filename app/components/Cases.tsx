export default function Cases() {
  return (
    <section id="cases" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Cases</p>
          <h2 className="text-4xl font-bold md:text-5xl">AI systemen gebouwd voor groei.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300">GEO</span>
              <span className="text-zinc-500">AI Visibility</span>
            </div>
            <h3 className="mb-4 text-3xl font-bold">GEO optimalisatie voor AI zoekmachines</h3>
            <p className="mb-8 leading-relaxed text-zinc-400">
              Strategie ontwikkeld om bedrijven zichtbaar te maken in ChatGPT, Gemini, Claude en AI search engines via structured content en entity positioning.
            </p>
            <div className="flex gap-4 text-sm text-zinc-500">
              <span>ChatGPT</span><span>Gemini</span><span>Claude</span>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm text-cyan-300">Automation</span>
              <span className="text-zinc-500">Workflow AI</span>
            </div>
            <h3 className="mb-4 text-3xl font-bold">AI workflows & slimme automatisering</h3>
            <p className="mb-8 leading-relaxed text-zinc-400">
              Slimme AI processen gebouwd voor automatisering van content, workflows, lead generatie en realtime AI interacties.
            </p>
            <div className="flex gap-4 text-sm text-zinc-500">
              <span>n8n</span><span>OpenAI</span><span>Automation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}