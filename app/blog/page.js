import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata = {
  title: "Dispatches — stories from the edge of the void",
  description: "Long-form reads on space missions, orbital mechanics, and the strange physics of deep space."
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="space-y-10 py-12">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Dispatches</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Stories from the edge of the void</h1>
      </section>
      <div className="grid gap-4">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <Link href={`/blog/${p.slug}`} className="card-glow block rounded-lg border border-hairline bg-panel p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-dim">
                {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h2 className="mt-2 font-display text-xl text-starlight">{p.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{p.description}</p>
            </Link>
          </Reveal>
        ))}
      </div>
      <NewsletterSignup />
    </div>
  );
}
