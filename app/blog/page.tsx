import { getAllPosts } from "../../lib/posts";
import Link from "next/link";

export const metadata = {
  title: "GEO & AI Kennisbank — AI-syah.nl",
  description: "Artikelen over GEO strategie, AI vindbaarheid en automation.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-300">Kennisbank</p>
        <h1 className="mb-4 text-5xl font-bold">GEO & AI artikelen.</h1>
        <p className="mb-16 text-zinc-400 text-lg">
          Diepgaande content over AI-vindbaarheid, GEO strategie en automation.
        </p>
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="group rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 transition duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <div className="mb-4 flex items-center gap-4">
                  <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-zinc-500">{post.date}</span>
                  <span className="text-xs text-zinc-500">{post.readTime}</span>
                </div>
                <h2 className="mb-3 text-2xl font-bold group-hover:text-cyan-300 transition">
                  {post.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}