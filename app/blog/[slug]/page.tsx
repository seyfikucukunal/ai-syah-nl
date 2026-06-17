import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — AI-syah.nl`,
    description: post.description,
    openGraph: {
      title: `${post.title} — AI-syah.nl`,
      description: post.description,
      url: `https://www.ai-syah.nl/blog/${slug}`,
      siteName: "AI-syah.nl",
      locale: "nl_NL",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — AI-syah.nl`,
      description: post.description,
    },
    alternates: {
      canonical: `https://www.ai-syah.nl/blog/${slug}`,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-12 mb-4 text-2xl font-bold text-white">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-cyan-300">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split("|").filter(Boolean).map(h => h.trim());
      const rows = tableLines.slice(2).map(row => row.split("|").filter(Boolean).map(c => c.trim()));
      elements.push(
        <div key={i} className="my-8 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-700">
                {headers.map((h, idx) => (
                  <th key={idx} className="py-3 px-4 text-left text-cyan-300 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ridx) => (
                <tr key={ridx} className="border-b border-zinc-800">
                  {row.map((cell, cidx) => (
                    <td key={cidx} className="py-3 px-4 text-zinc-300">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-zinc-300">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        listItems.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-zinc-300">
              <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-300">
                {idx + 1}
              </span>
              <span className="mt-0.5" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
            </li>
          ))}
        </ol>
      );
      continue;
    } else if (line === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="my-3 leading-relaxed text-zinc-300"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}
        />
      );
    }
    i++;
  }
  return elements;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.ai-syah.nl/blog/${slug}`,
    "headline": post!.title,
    "description": post!.description,
    "datePublished": post!.date.includes("T") ? post!.date : `${post!.date}T00:00:00+02:00`,
    "dateModified": post!.date.includes("T") ? post!.date : `${post!.date}T00:00:00+02:00`,
    "inLanguage": "nl-NL",
    "url": `https://www.ai-syah.nl/blog/${slug}`,
    "author": {
      "@type": "Organization",
      "@id": "https://www.ai-syah.nl/#organization",
      "name": "AI-syah.nl",
      "url": "https://www.ai-syah.nl",
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://www.ai-syah.nl/#organization",
      "name": "AI-syah.nl",
      "url": "https://www.ai-syah.nl",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ai-syah.nl/logo-ai-syah.png",
        "width": 200,
        "height": 200,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ai-syah.nl/blog/${slug}`,
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://www.ai-syah.nl/blog",
      "name": "GEO & AI Kennisbank — AI-syah.nl",
    },
    "about": {
      "@type": "Thing",
      "name": post!.category,
    },
    "image": {
    "@type": "ImageObject",
    "url": "https://www.ai-syah.nl/og-image.png",
    "width": 1200,
    "height": 630
  },
    "keywords": `${post!.category}, GEO, Generative Engine Optimization, AI vindbaarheid, AI-syah.nl`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ai-syah.nl",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Kennisbank",
        "item": "https://www.ai-syah.nl/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post!.title,
        "item": `https://www.ai-syah.nl/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-cyan-300 transition">
            ← Terug naar kennisbank
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4 mt-6">
            <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">
              {post!.category}
            </span>
            <span className="text-xs text-zinc-500">{post!.date}</span>
            <span className="text-xs text-zinc-500">{post!.readTime}</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            {post!.title}
          </h1>

          <p className="mb-12 text-xl leading-relaxed text-zinc-400 border-l-2 border-cyan-400 pl-4">
            {post!.description}
          </p>

          <div className="border-t border-zinc-800 pt-10">
            {renderMarkdown(post!.content)}
          </div>

          <div className="mt-16 rounded-3xl border border-cyan-400/30 bg-zinc-900/40 p-8 text-center">
            <h3 className="mb-3 text-xl font-bold text-cyan-300">Hulp nodig met GEO?</h3>
            <p className="mb-6 text-zinc-400">AI-syah.nl helpt jouw bedrijf zichtbaar te worden in ChatGPT, Gemini en Claude.</p>
            <Link href="/#contact" className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-cyan-300">
              Neem contact op →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
