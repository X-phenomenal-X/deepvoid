"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OrbitMap from "@/components/OrbitMap";
import { PROBES, distanceKm } from "@/lib/voyager";

function useLiveKm(probe) {
  const [km, setKm] = useState(null);
  useEffect(() => {
    setKm(distanceKm(probe));
    const id = setInterval(() => setKm(distanceKm(probe)), 100);
    return () => clearInterval(id);
  }, [probe]);
  return km;
}

export default function HeroVoid() {
  const v1 = useLiveKm(PROBES.voyager1);
  const v2 = useLiveKm(PROBES.voyager2);

  return (
    <section className="relative left-1/2 h-[88vh] min-h-[620px] w-screen -translate-x-1/2 overflow-hidden">
      {/* the living solar system */}
      <OrbitMap variant="hero" />

      {/* readability veils */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-44 bg-gradient-to-b from-void via-void/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-60 bg-gradient-to-t from-void via-void/70 to-transparent" />

      {/* headline */}
      <div className="pointer-events-none absolute inset-x-0 top-10 z-10 mx-auto max-w-7xl px-5 sm:top-14 sm:px-8">
        <p className="hero-in hero-in-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-telemetry">
          <span className="live-dot" /> Live · this is not an illustration
        </p>
        <h1 className="hero-in hero-in-2 mt-4 max-w-3xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          The deep void,
          <br />
          <span className="text-gradient">in real time.</span>
        </h1>
        <p className="hero-in hero-in-3 mt-4 max-w-xl text-sm leading-relaxed text-dim sm:text-base">
          Every planet below sits exactly where it is right now, computed from JPL
          orbital data. Hover them. Click them. Crank time itself.
        </p>
        <div className="hero-in hero-in-3 pointer-events-auto mt-6 flex flex-wrap gap-3">
          <Link
            href="/planets"
            className="rounded border border-telemetry/50 bg-telemetry/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-telemetry transition hover:bg-telemetry/20"
          >
            Explore the worlds →
          </Link>
          <Link
            href="/missions"
            className="rounded border border-hairline bg-void/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-dim transition hover:border-signal/40 hover:text-signal"
          >
            Track the missions
          </Link>
        </div>
      </div>

      {/* mega ticker */}
      <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
          Voyager 1 · farthest human-made object · km from the Sun
        </p>
        <p className="odometer mt-1 font-mono text-3xl font-medium tabular-nums text-telemetry sm:text-5xl lg:text-6xl" aria-live="off">
          {v1 === null ? "—" : Math.floor(v1).toLocaleString("en-US")}
        </p>
        <p className="mt-2 font-mono text-[11px] text-dim sm:text-xs">
          gaining ~17 km every second
          <span className="mx-3 text-hairline">|</span>
          Voyager 2: <span className="text-starlight">{v2 === null ? "—" : Math.floor(v2).toLocaleString("en-US")}</span> km
        </p>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <span className="scroll-cue block font-mono text-[10px] uppercase tracking-[0.3em] text-dim/70">scroll ↓</span>
      </div>
    </section>
  );
}
