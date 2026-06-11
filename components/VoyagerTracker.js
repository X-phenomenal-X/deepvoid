"use client";
import { useEffect, useState } from "react";
import { PROBES, distanceKm, toAU, lightTime } from "@/lib/voyager";

function Odometer({ probe }) {
  const [km, setKm] = useState(null);

  useEffect(() => {
    const tick = () => setKm(distanceKm(probe));
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [probe]);

  const lt = km ? lightTime(km) : null;

  return (
    <div className="card-glow rounded-lg border border-hairline bg-panel p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-starlight">{probe.name}</h3>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-telemetry">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-telemetry" />
          live estimate
        </span>
      </div>
      <p className="odometer mt-3 font-mono text-2xl tabular-nums text-telemetry sm:text-3xl">
        {km ? Math.floor(km).toLocaleString("en-US") + " km" : "acquiring signal…"}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-[11px] text-dim">
        <div>
          <dt className="uppercase tracking-widest">Distance</dt>
          <dd className="mt-1 text-starlight">{km ? toAU(km).toFixed(3) + " AU" : "—"}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Signal delay</dt>
          <dd className="mt-1 text-starlight">{lt ? `${lt.hours}h ${lt.minutes}m one way` : "—"}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Velocity</dt>
          <dd className="mt-1 text-starlight">{probe.kmPerSec} km/s</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Launched</dt>
          <dd className="mt-1 text-starlight">{probe.launched}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-dim">{probe.note}</p>
    </div>
  );
}

export default function VoyagerTracker() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Odometer probe={PROBES.voyager1} />
      <Odometer probe={PROBES.voyager2} />
    </div>
  );
}
