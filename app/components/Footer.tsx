export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-8 py-12">
      <div className="mx-auto max-w-6xl flex flex-col gap-8">

        {/* Auteur vermelding — E-E-A-T signal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold text-black shrink-0">
              SK
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Seyfi Küçükünal</p>
              <p className="text-zinc-500 text-xs">Oprichter & GEO Specialist — AI-syah.nl</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <a
              href="/over-ons"
              className="hover:text-cyan-400 transition"
            >
              Over ons
            </a>
            <a
              href="https://www.linkedin.com/in/seyfi-kucukunal-06465b12/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              LinkedIn →
            </a>
            <a
              href="https://www.linkedin.com/company/ai-syah"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition"
            >
              AI-syah LinkedIn →
            </a>
          </div>
        </div>

        {/* Hoofd footer */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <img src="/logo-ai-syah.png" alt="AI-syah logo" className="h-8 w-8 rounded-full" />
            <span className="font-semibold">AI-syah.nl</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <a href="#services" className="transition hover:text-cyan-300">Services</a>
            <a href="#geo" className="transition hover:text-cyan-300">GEO</a>
            <a href="#cases" className="transition hover:text-cyan-300">Cases</a>
            <a href="#articles" className="transition hover:text-cyan-300">Artikelen</a>
            <a href="/over-ons" className="transition hover:text-cyan-300">Over ons</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </div>
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} AI-syah.nl — AI-native digital agency
          </p>
        </div>

      </div>
    </footer>
  );
}
