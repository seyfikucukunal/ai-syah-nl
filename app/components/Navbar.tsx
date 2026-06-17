"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-black/70 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <img src="/logo-ai-syah.png" alt="AI-syah logo" className="h-10 w-10 rounded-full" />
          <span className="font-semibold tracking-wide">AI-syah.nl</span>
        </div>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#services" className="transition hover:text-cyan-300">Services</a>
          <a href="#geo" className="transition hover:text-cyan-300">GEO</a>
          <a href="#cases" className="transition hover:text-cyan-300">Cases</a>
          <a href="#articles" className="transition hover:text-cyan-300">Artikelen</a>
          <a href="/blog" className="transition hover:text-cyan-300">Blog</a>
          <a href="/geo-audit" className="transition hover:text-cyan-300">GEO Audit</a>
          <a href="/over-ons" className="transition hover:text-cyan-300">Over ons</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden rounded-full border border-zinc-700 px-5 py-2 text-sm transition hover:border-white md:block">
            Contact
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobiel menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-zinc-900 px-6 py-6 text-sm text-zinc-400 md:hidden">
          <a href="#services" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">Services</a>
          <a href="#geo" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">GEO</a>
          <a href="#cases" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">Cases</a>
          <a href="#articles" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">Artikelen</a>
          <a href="#contact" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">Contact</a>
          <a href="/blog" className="transition hover:text-cyan-300">Blog</a>
          <a href="/geo-audit" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">GEO Audit</a>
          <a href="/over-ons" onClick={() => setOpen(false)} className="transition hover:text-cyan-300">Over ons</a>
        </div>
      )}
    </nav>
  );
}