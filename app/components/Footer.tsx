export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 px-8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo-ai-syah.png" alt="AI-syah logo" className="h-8 w-8 rounded-full" />
          <span className="font-semibold">AI-syah.nl</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
          <a href="#services" className="transition hover:text-cyan-300">Services</a>
          <a href="#geo" className="transition hover:text-cyan-300">GEO</a>
          <a href="#cases" className="transition hover:text-cyan-300">Cases</a>
          <a href="#articles" className="transition hover:text-cyan-300">Artikelen</a>
          <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
        </div>
        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} AI-syah.nl — AI-native digital agency
        </p>
      </div>
    </footer>
  );
}