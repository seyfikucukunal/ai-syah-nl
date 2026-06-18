"use client";
import { useState } from "react";
import { faqItems } from "../data/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
          <h2 className="text-4xl font-bold md:text-5xl mb-4">
            Veelgestelde vragen over GEO.
          </h2>
          <p className="text-zinc-400 text-lg">
            Alles wat je wilt weten over Generative Engine Optimization en AI-vindbaarheid.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900/40 transition-all duration-200 hover:border-zinc-700"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-white pr-4">{item.question}</span>
                <span className={`text-cyan-400 text-xl shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-zinc-400 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-500 text-sm mb-4">Nog meer vragen?</p>
          <a
            href="#contact"
            className="inline-block border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all"
          >
            Neem contact op →
          </a>
        </div>
      </div>
    </section>
  );
}
