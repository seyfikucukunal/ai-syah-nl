import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over Ons — AI-syah.nl",
  description: "Maak kennis met het team achter AI-syah.nl. Oprichter Seyfi Küçükünal en onze AI agents ATLAS, HERMES, ORACLE en ARGUS helpen bedrijven zichtbaar te worden in ChatGPT, Gemini en Perplexity.",
  alternates: {
    canonical: "https://www.ai-syah.nl/over-ons",
  },
  openGraph: {
    title: "Over Ons — AI-syah.nl",
    description: "Het team achter AI-syah.nl — mensen en AI agents die samenwerken aan jouw GEO zichtbaarheid.",
    url: "https://www.ai-syah.nl/over-ons",
    siteName: "AI-syah.nl",
    locale: "nl_NL",
    type: "website",
  },
};

const teamSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.ai-syah.nl/over-ons",
  "url": "https://www.ai-syah.nl/over-ons",
  "name": "Over AI-syah.nl",
  "description": "Het team achter AI-syah.nl bestaat uit oprichter Seyfi Küçükünal en vier gespecialiseerde AI agents.",
  "publisher": {
    "@id": "https://www.ai-syah.nl/#organization",
  },
  "mainEntity": {
    "@id": "https://www.ai-syah.nl/#organization",
  },
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.ai-syah.nl/#seyfi",
  "name": "Seyfi Küçükünal",
  "jobTitle": "Oprichter & GEO Strateeg",
  "worksFor": {
    "@id": "https://www.ai-syah.nl/#organization",
  },
  "url": "https://www.ai-syah.nl/over-ons",
  "sameAs": [
    "https://www.linkedin.com/in/seyfi-kucukunal-06465b12/",
  ],
  "knowsAbout": [
    "Generative Engine Optimization",
    "AI Visibility",
    "GEO Strategie",
    "AI Automation",
    "Digital Marketing",
  ],
  "nationality": {
    "@type": "Country",
    "name": "Netherlands",
  },
};

const agents = [
  {
    id: "atlas",
    name: "ATLAS",
    role: "GEO Visibility Strategist",
    description: "ATLAS analyseert hoe zichtbaar een website is in AI-zoekmachines. Hij verwerkt duizenden datapunten om de exacte positie van een merk in ChatGPT, Gemini en Perplexity te bepalen en stelt een optimale GEO strategie op.",
    expertise: ["AI Visibility Analysis", "GEO Scoring", "Entity Recognition", "Brand Positioning"],
    color: "from-cyan-500 to-blue-600",
    icon: "◈",
  },
  {
    id: "hermes",
    name: "HERMES",
    role: "Automation & Workflow Agent",
    description: "HERMES ontwerpt en implementeert slimme AI workflows die repetitieve bedrijfsprocessen automatiseren. Van leadverwerking tot klantenservice — HERMES zorgt dat alles naadloos samenwerkt.",
    expertise: ["Workflow Automation", "Lead Processing", "CRM Integration", "AI Pipelines"],
    color: "from-purple-500 to-cyan-600",
    icon: "⟁",
  },
  {
    id: "oracle",
    name: "ORACLE",
    role: "Content Intelligence Agent",
    description: "ORACLE optimaliseert content voor maximale AI-citability. Hij analyseert welke content AI-platforms citeren, identificeert contentkansen en schrijft entity-first content die AI-systemen begrijpen en aanbevelen.",
    expertise: ["Content Optimization", "E-E-A-T Signals", "AI Citability", "Semantic Writing"],
    color: "from-amber-500 to-orange-600",
    icon: "◎",
  },
  {
    id: "argus",
    name: "ARGUS",
    role: "GEO Audit Engine",
    description: "ARGUS voert diepgaande GEO audits uit op websites. Hij scant schema markup, robots.txt, llms.txt, crawlertoegang en structured data om precies te bepalen wat een website nodig heeft om beter zichtbaar te worden in AI.",
    expertise: ["GEO Auditing", "Schema Analysis", "Crawler Access", "Technical GEO"],
    color: "from-green-500 to-cyan-600",
    icon: "⬡",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      <main className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="text-center mb-20">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Over ons</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Mensen en AI,<br />
              <span className="text-cyan-400">samen voor jouw zichtbaarheid.</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              AI-syah.nl combineert menselijke GEO expertise met de kracht van gespecialiseerde AI agents.
              Samen zorgen we dat jouw bedrijf gevonden en aanbevolen wordt in het AI-tijdperk.
            </p>
          </div>

          {/* Oprichter */}
          <div className="mb-20">
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-8">Oprichter</p>
            <div className="border border-zinc-800 bg-zinc-900/40 rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl font-bold text-black shrink-0">
                  SK
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-white">Seyfi Küçükünal</h2>
                    <span className="text-xs bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full">
                      Oprichter & GEO Strateeg
                    </span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Seyfi is de oprichter van AI-syah.nl en een pionier in Generative Engine Optimization in Nederland.
                    Met een diepgaande kennis van AI-systemen, digitale marketing en automatisering helpt hij bedrijven
                    de transitie te maken van traditionele SEO naar AI-vindbaarheid. Hij gelooft dat bedrijven die nu
                    investeren in GEO een structureel concurrentievoordeel opbouwen in het AI-tijdperk.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["GEO Strategie", "AI Visibility", "Digital Marketing", "AI Automation", "Entrepreneurship"].map((skill) => (
                      <span key={skill} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://www.linkedin.com/in/seyfi-kucukunal-06465b12/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition text-sm font-medium"
                  >
                    LinkedIn profiel →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* AI Agents */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-8">AI Agents</p>
            <div className="grid md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="border border-zinc-800 bg-zinc-900/40 rounded-3xl p-8 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl shrink-0`}>
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-cyan-400 text-sm">{agent.role}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                    {agent.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {agent.expertise.map((skill) => (
                      <span key={skill} className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missie */}
          <div className="mt-20 border border-cyan-400/20 bg-zinc-900/40 rounded-3xl p-10 text-center">
            <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4">Onze missie</p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Elk bedrijf verdient het om gevonden te worden door AI.
            </h2>
            <p className="text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8">
              We geloven dat AI-zoekmachines de toekomst zijn van digitale vindbaarheid.
              Onze missie is om Nederlandse bedrijven te helpen deze transitie te maken —
              voordat de concurrentie het doet.
            </p>
            <a
              href="/geo-audit"
              className="inline-block bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-8 py-4 rounded-2xl transition-all"
            >
              Start gratis GEO audit →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
