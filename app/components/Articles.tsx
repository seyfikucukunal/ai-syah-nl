import { articles } from "../data/content";

export default function Articles() {
  return (
    <section id="articles" className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Kennisbank</p>
          <h2 className="text-4xl font-bold md:text-5xl">GEO & AI artikelen.</h2>
          <p className="mt-4 text-zinc-400">Diepgaande content over AI-vindbaarheid, GEO strategie en automation.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((a) => (
            <div key={a.title} className="group rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">{a.tag}</span>
                <span className="text-xs text-zinc-600">{a.date}</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold leading-snug transition group-hover:text-cyan-300">{a.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}