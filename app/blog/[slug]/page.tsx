import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="mb-8 inline-block text-sm text-zinc-500 hover:text-cyan-300 transition">
          ← Terug naar kennisbank
        </Link>
        <div className="mb-4 flex items-center gap-4">
          <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-300">
            {post!.category}
          </span>
          <span className="text-xs text-zinc-500">{post!.date}</span>
          <span className="text-xs text-zinc-500">{post!.readTime}</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{post!.title}</h1>
        <p className="mb-12 text-xl text-zinc-400">{post!.description}</p>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-cyan-300 prose-a:text-cyan-400">
          <ReactMarkdown>{post!.content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}