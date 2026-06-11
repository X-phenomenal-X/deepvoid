import HeroVoid from "@/components/HeroVoid";
import VoyagerTracker from "@/components/VoyagerTracker";
import ApodCard from "@/components/ApodCard";
import LaunchCountdown from "@/components/LaunchCountdown";
import IssTracker from "@/components/IssTracker";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import ScaleSlider from "@/components/ScaleSlider";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-20 pb-16">
      {/* Cinematic hero — the solar system, live, full bleed */}
      <HeroVoid />

      {/* Mission telemetry */}
      <Reveal>
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Mission telemetry</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Two machines from 1977, still calling home</h2>
          <p className="mt-2 max-w-2xl text-sm text-dim">
            Distances update ten times a second from each probe&apos;s real velocity. The signal
            you&apos;d send right now takes nearly a full day to arrive.
          </p>
          <div className="mt-8"><VoyagerTracker /></div>
        </section>
      </Reveal>

      <Reveal><IssTracker /></Reveal>

      {/* Scale of the Void — the interactive */}
      <Reveal>
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Scale of the void</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">How far is far?</h2>
          <p className="mt-2 max-w-2xl text-sm text-dim">
            Drag from the Moon to the nearest star. The scale is logarithmic — it has to be,
            or Voyager wouldn&apos;t even leave the first pixel.
          </p>
          <div className="mt-6"><ScaleSlider /></div>
        </section>
      </Reveal>

      <section className="grid gap-4 lg:grid-cols-2">
        <Reveal><ApodCard /></Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <LaunchCountdown />
            <AdSlot size="box" />
          </div>
        </Reveal>
      </section>

      {/* Explore links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal>
          <Link href="/planets" className="card-lift card-lift-blue sheen group block rounded-xl border border-hairline bg-panel/80 p-7 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">The neighborhood</p>
            <h2 className="mt-3 font-display text-2xl leading-snug transition group-hover:text-signal">Eight worlds, one star →</h2>
            <p className="mt-2 text-sm text-dim">Interactive profiles of every planet — temps, moons, and the fact worth repeating.</p>
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <Link href="/missions" className="card-lift card-lift-blue sheen group block rounded-xl border border-hairline bg-panel/80 p-7 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Mission explorer</p>
            <h2 className="mt-3 font-display text-2xl leading-snug transition group-hover:text-signal">Every probe past the asteroid belt →</h2>
            <p className="mt-2 text-sm text-dim">Status, instruments, and what each mission taught us.</p>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/exoplanets" className="card-lift card-lift-blue sheen group block rounded-xl border border-hairline bg-panel/80 p-7 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Exoplanet database</p>
            <h2 className="mt-3 font-display text-2xl leading-snug transition group-hover:text-signal">5,000+ confirmed worlds, searchable →</h2>
            <p className="mt-2 text-sm text-dim">Filter by size, orbit, and distance. Straight from NASA&apos;s archive.</p>
          </Link>
        </Reveal>
      </section>

      <Reveal><NewsletterSignup /></Reveal>
      <AdSlot size="banner" />
    </div>
  );
}
