import { getApod } from "@/lib/nasa";

export default async function ApodCard() {
  const apod = await getApod();
  if (!apod) {
    return (
      <div className="rounded-lg border border-hairline bg-panel p-5 text-sm text-dim">
        NASA image feed is rate-limited right now — add a free NASA_API_KEY to fix this permanently.
      </div>
    );
  }
  const img = apod.media_type === "video" ? apod.thumbnail_url : apod.url;
  return (
    <div className="card-glow overflow-hidden rounded-lg border border-hairline bg-panel">
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={apod.title} className="aspect-video w-full object-cover" loading="lazy" />
      )}
      <div className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          NASA · Astronomy Picture of the Day
        </p>
        <h3 className="mt-2 font-display text-base text-starlight">{apod.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-dim">{apod.explanation}</p>
      </div>
    </div>
  );
}
