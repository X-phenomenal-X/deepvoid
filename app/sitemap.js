import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const base = "https://deepvoid-woad.vercel.app";
  const staticPages = ["", "/solar-system", "/missions", "/exoplanets", "/blog", "/about", "/privacy"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "daily",
    priority: p === "" ? 1 : 0.7
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.8
  }));
  return [...staticPages, ...posts];
}
