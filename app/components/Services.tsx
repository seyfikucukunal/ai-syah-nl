import { services } from "../data/content";

export default function Services() {
  return (
    <section id="services" className="px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Services</p>
          <h2 className="text-4xl font-bold md:text-5xl">Bouw je bedrijf voor het AI-tijdperk.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
              <div className="mb-5 text-4xl transition duration-300 group-hover:scale-125">{s.icon}</div>
              <h3 className="mb-4 text-2xl font-semibold">{s.title}</h3>
              <p className="leading-relaxed text-zinc-400">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}