"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-[85vh] items-center justify-center px-6 text-center"
    >
      <div className="max-w-6xl">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-cyan-300">AI • GEO • AUTOMATION</p>
        <h1 className="mb-8 text-4xl font-bold leading-tight md:text-8xl">
          Word gevonden door <span className="text-cyan-300">AI</span>.
        </h1>
        <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-zinc-300 md:text-2xl">
          AI-syah.nl bouwt AI-native websites, GEO strategieën en slimme automatiseringen waarmee bedrijven zichtbaar worden in ChatGPT, Gemini, Claude en andere AI zoekmachines.
        </p>
        <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm text-zinc-400">
          {["ChatGPT", "Gemini", "Claude", "Perplexity"].map((ai) => (
            <div key={ai} className="rounded-full border border-zinc-800 px-4 py-2">{ai}</div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#contact" className="rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-zinc-200">
            Start Project
          </a>
          <a href="#geo" className="rounded-full border border-zinc-700 px-8 py-4 font-semibold transition hover:border-cyan-300 hover:text-cyan-300">
            Bekijk GEO Strategie
          </a>
        </div>
      </div>
    </motion.section>
  );
}