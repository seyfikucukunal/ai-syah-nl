import { geoBlokken } from "../data/content";

export default function Geo() {
  return (
    <section id="geo" className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-4 text-xl uppercase tracking-[0.3em] text-cyan-300">Waarom GEO?</p>
        <h2 className="mb-6 text-4xl font-bold md:text-5xl">
          Zoekmachines veranderen. AI wordt het nieuwe startpunt.
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-400">
          Mensen zoeken steeds vaker via AI-systemen zoals ChatGPT, Gemini, Claude en Perplexity. AI-syah.nl helpt bedrijven om niet alleen gevonden te worden in Google, maar ook genoemd, begrepen en aanbevolen te worden door AI.
        </p>
        <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
          {geoBlokken.map((b) => (
            <div key={b.title} className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <div className="mb-4 text-3xl text-cyan-300">{b.icon}</div>
              <h3 className="mb-3 text-xl font-semibold">{b.title}</h3>
              <p className="leading-relaxed text-zinc-400">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}