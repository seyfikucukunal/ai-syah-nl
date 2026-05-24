"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);

    await fetch("https://formspree.io/f/mjgzegrw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Contact</p>
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">Start je AI project.</h2>
        <p className="mb-12 text-zinc-400">
          Klaar om zichtbaar te worden in het AI-tijdperk? Stuur een bericht en we plannen een kennismaking.
        </p>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-cyan-400/30 bg-zinc-900/40 p-12"
          >
            <div className="mb-4 text-5xl">✦</div>
            <h3 className="mb-2 text-2xl font-bold text-cyan-300">Bericht ontvangen.</h3>
            <p className="text-zinc-400">We nemen zo snel mogelijk contact op.</p>
          </motion.div>
        ) : (
          <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 text-left">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Naam</label>
              <input
                type="text"
                placeholder="Jouw naam"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white placeholder-zinc-600 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-400">E-mail</label>
              <input
                type="email"
                placeholder="jouw@email.nl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white placeholder-zinc-600 outline-none transition focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-400">Bericht</label>
              <textarea
                rows={5}
                placeholder="Vertel over je project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-white placeholder-zinc-600 outline-none transition focus:border-cyan-400"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-full bg-white py-4 font-semibold text-black transition hover:bg-cyan-300 disabled:opacity-50"
            >
              {loading ? "Versturen..." : "Verstuur Bericht →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}