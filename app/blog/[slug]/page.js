import { getAllPosts, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" }
  };
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "DeepVoid" }
  };

  return (
    <article className="mx-auto max-w-2xl py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-base leading-relaxed text-dim">{post.description}</p>
      <AdSlot size="banner" />
      <div className="prose-void mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="mt-12"><NewsletterSignup /></div>
    </article>
  );
}
