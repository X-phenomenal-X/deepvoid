import { getExoplanets } from "@/lib/nasa";
import Reveal from "@/components/Reveal";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Exoplanets — the newest worlds we've found",
  description: "The most recently confirmed exoplanets from the NASA Exoplanet Archive: sizes, orbits, distances, and discovery methods."
};

export default async function ExoplanetsPage() {
  const planets = await getExoplanets();
  return (
    <div className="space-y-10 py-12">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">NASA Exoplanet Archive</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">The newest worlds</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
          Humanity has confirmed thousands of planets around other stars. These are the latest —
          straight from the official archive, refreshed daily.
        </p>
      </section>
      <AdSlot size="banner" />
      {planets.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planets.map((p, i) => (
            <Reveal key={p.pl_name} delay={(i % 3) * 80}>
              <div className="card-glow h-full rounded-lg border border-hairline bg-panel p-5">
                <h2 className="font-display text-base text-starlight">{p.pl_name}</h2>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-dim">
                  orbits {p.hostname} · found {p.disc_year}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-2 font-mono text-[11px] text-dim">
                  <div>
                    <dt className="uppercase tracking-widest">Year length</dt>
                    <dd className="mt-0.5 text-starlight">{p.pl_orbper ? `${Number(p.pl_orbper).toFixed(1)} days` : "unknown"}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest">Size</dt>
                    <dd className="mt-0.5 text-starlight">{p.pl_rade ? `${Number(p.pl_rade).toFixed(2)}× Earth` : "unknown"}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest">Distance</dt>
                    <dd className="mt-0.5 text-starlight">{p.sy_dist ? `${(Number(p.sy_dist) * 3.262).toFixed(0)} ly` : "unknown"}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest">Method</dt>
                    <dd className="mt-0.5 text-starlight">{p.discoverymethod || "—"}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-hairline bg-panel p-5 text-sm text-dim">
          The archive is busy right now — this list refreshes automatically.
        </p>
      )}
    </div>
  );
}
