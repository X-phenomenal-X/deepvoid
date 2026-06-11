import VoyagerTracker from "@/components/VoyagerTracker";
import ApodCard from "@/components/ApodCard";
import LaunchCountdown from "@/components/LaunchCountdown";
import IssTracker from "@/components/IssTracker";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import ScaleSlider from "@/components/ScaleSlider";
import Orrery from "@/components/Orrery";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero — staggered load-in, live odometers */}
      <section>
        <p className="hero-in hero-in-1 font-mono text-xs uppercase tracking-[0.25em] text-telemetry">
          Live telemetry estimate
        </p>
        <h1 className="hero-in hero-in-2 mt-3 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Two spacecraft are leaving the solar system. Watch them go.
        </h1>
        <p className="hero-in hero-in-3 mt-4 max-w-2xl text-sm leading-relaxed text-dim sm:text-base">
          Launched in 1977, the Voyager probes are still flying — gaining roughly 17 kilometres
          on the void every second. The counters below are computed live from NASA/JPL mission data.
        </p>
        <div className="hero-in hero-in-4 mt-8">
          <VoyagerTracker />
        </div>
      </section>

      {/* The solar system right now */}
      <Reveal>
        <section>
          <Orrery />
          <p className="mt-2 text-right">
            <Link href="/solar-system" className="font-mono text-xs uppercase tracking-widest text-signal transition hover:text-starlight">
              Full-page orrery →
            </Link>
          </p>
        </section>
      </Reveal>

      {/* Scale of the void */}
      <Reveal>
        <ScaleSlider />
      </Reveal>

      <AdSlot size="banner" />

      {/* Launches + ISS */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <h2 className="font-display text-xl text-starlight">Next launches</h2>
            <p className="mt-1 text-sm text-dim">Live countdowns from the global launch schedule.</p>
            <div className="mt-4">
              <LaunchCountdown />
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-xl text-starlight">Overhead right now</h2>
            <IssTracker />
            <ApodCard />
          </div>
        </Reveal>
      </section>

      {/* Explore */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <Link href="/exoplanets" className="card-glow block rounded-lg border border-hairline bg-panel p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">NASA Exoplanet Archive</p>
            <h3 className="mt-2 font-display text-lg text-starlight">The newest worlds we&apos;ve found</h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">
              Browse the latest confirmed planets around other stars — sizes, orbits, and how far away they are.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/blog" className="card-glow block rounded-lg border border-hairline bg-panel p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Dispatches</p>
            <h3 className="mt-2 font-display text-lg text-starlight">Stories from the edge of the void</h3>
            <p className="mt-2 text-sm leading-relaxed text-dim">
              Long-form reads on the missions, the math, and the strange physics of deep space.
            </p>
          </Link>
        </Reveal>
      </section>

      <Reveal><NewsletterSignup /></Reveal>
      <AdSlot size="banner" />
    </div>
  );
}
