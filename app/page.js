import HeroVoid from "@/components/HeroVoid";
import VoyagerTracker from "@/components/VoyagerTracker";
import ApodCard from "@/components/ApodCard";
import LaunchCountdown from "@/components/LaunchCountdown";
import IssTracker from "@/components/IssTracker";
import AsteroidWatch from "@/components/AsteroidWatch";
import CosmicEvents from "@/components/CosmicEvents";
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
          <h2 className="mt-3 font-hero text-2xl font-medium leading-snug sm:text-3xl">Two machines from 1977, still calling home</h2>
          <p className="mt-2 max-w-2xl text-sm text-dim">
            Distances update ten times a second from each probe&apos;s real velocity. The signal
            you&apos;d send right now takes nearly a full day to arrive.
          </p>
          <div className="mt-8"><VoyagerTracker /></div>
        </section>
      </Reveal>

      <Reveal><IssTracker /></Reveal>

      <Reveal><AsteroidWatch /></Reveal>

      {/* Cosmic calendar */}
      <Reveal>
        <section id="events">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Cosmic calendar · 2026</p>
          <h2 className="mt-3 font-hero text-2xl font-medium leading-snug sm:text-3xl">The sky has a schedule</h2>
          <p className="mt-2 max-w-2xl text-sm text-dim">
            Eclipses, meteor showers, oppositions — what already happened this year, and exactly
            how long until what&apos;s next. The total solar eclipse over Europe is the one to plan for.
          </p>
          <div className="mt-8"><CosmicEvents /></div>
        </section>
      </Reveal>

      {/* Scale of the Void — the interactive */}
      <Reveal>
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Scale of the void</p>
          <h2 className="mt-3 font-hero text-2xl font-medium leading-snug sm:text-3xl">How far is far?</h2>
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
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <Link href="/planets" className="card-lift card-lift-blue sheen group block h-full rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">The neighborhood</p>
            <h2 className="mt-3 font-display text-xl leading-snug transition group-hover:text-signal">Eight worlds, one star →</h2>
            <p className="mt-2 text-sm text-dim">Profiles of every planet — temps, moons, real photos, and your weight there.</p>
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <Link href="/solar-system" className="card-lift card-lift-blue sheen group block h-full rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Full-page orrery</p>
            <h2 className="mt-3 font-display text-xl leading-snug transition group-hover:text-signal">The map, supersized →</h2>
            <p className="mt-2 text-sm text-dim">A dedicated live solar system map with Voyager escape directions.</p>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/missions" className="card-lift card-lift-blue sheen group block h-full rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Mission explorer</p>
            <h2 className="mt-3 font-display text-xl leading-snug transition group-hover:text-signal">Every probe out there →</h2>
            <p className="mt-2 text-sm text-dim">Status, instruments, spacecraft photos, and what each mission taught us.</p>
          </Link>
        </Reveal>
        <Reveal delay={180}>
          <Link href="/exoplanets" className="card-lift card-lift-blue sheen group block h-full rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Exoplanet archive</p>
            <h2 className="mt-3 font-display text-xl leading-snug transition group-hover:text-signal">The newest worlds →</h2>
            <p className="mt-2 text-sm text-dim">The latest confirmed planets around other stars, straight from NASA.</p>
          </Link>
        </Reveal>
      </section>

      <Reveal><NewsletterSignup /></Reveal>
      <AdSlot size="banner" />
    </div>
  );
}
