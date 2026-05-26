export default function BedanktPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 text-6xl">✦</div>
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">
          Betaling geslaagd
        </p>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
          Rapport wordt aangemaakt.
        </h1>
        <p className="mb-8 text-xl text-zinc-400">
          Je ontvangt het volledige GEO audit rapport binnen 5 minuten in je inbox.
        </p>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 text-left">
          <h3 className="mb-4 text-lg font-semibold">Wat nu?</h3>
          <ul className="space-y-3 text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-cyan-300">1.</span>
              <span>Check je inbox — het rapport komt binnen 5 minuten</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-300">2.</span>
              <span>Bekijk de prioriteitenlijst — begin met de Quick Wins</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-300">3.</span>
              <span>Hulp nodig? Neem contact op via ai-syah.nl</span>
            </li>
          </ul>
        </div>
        <a href="/" className="mt-8 inline-block rounded-full border border-zinc-700 px-8 py-4 font-semibold transition hover:border-cyan-300 hover:text-cyan-300">
          ← Terug naar home
        </a>
      </div>
    </main>
  );
}