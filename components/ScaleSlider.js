"use client";
import { useEffect, useMemo, useState } from "react";
import { PROBES, distanceKm, KM_PER_AU } from "@/lib/voyager";

const MIN_KM = 384400; // Moon
const MAX_KM = 4.0175e13; // Proxima Centauri (~4.246 ly)

const LANDMARKS = [
  { name: "Moon", km: 384400 },
  { name: "Mars (avg)", km: 2.25e8 },
  { name: "Jupiter (avg)", km: 7.78e8 },
  { name: "Neptune", km: 4.5e9 },
  { name: "Voyager 1", km: null }, // live
  { name: "Oort Cloud (inner)", km: 2.99e11 },
  { name: "Proxima Centauri", km: 4.0175e13 }
];

const logMin = Math.log10(MIN_KM);
const logMax = Math.log10(MAX_KM);

function kmToT(km) {
  return (Math.log10(km) - logMin) / (logMax - logMin);
}
function tToKm(t) {
  return Math.pow(10, logMin + t * (logMax - logMin));
}

function fmtKm(km) {
  if (km >= 1e12) return (km / 1e12).toFixed(2) + " trillion km";
  if (km >= 1e9) return (km / 1e9).toFixed(2) + " billion km";
  if (km >= 1e6) return (km / 1e6).toFixed(2) + " million km";
  return Math.round(km).toLocaleString("en-US") + " km";
}

function fmtLight(km) {
  const s = km / 299792.458;
  if (s < 60) return s.toFixed(1) + " light-seconds";
  if (s < 3600) return (s / 60).toFixed(1) + " light-minutes";
  if (s < 86400) return (s / 3600).toFixed(1) + " light-hours";
  if (s < 31557600) return (s / 86400).toFixed(1) + " light-days";
  return (s / 31557600).toFixed(2) + " light-years";
}

export default function ScaleSlider() {
  const [t, setT] = useState(kmToT(4.5e9));
  const [v1Km, setV1Km] = useState(null);

  useEffect(() => {
    const tick = () => setV1Km(distanceKm(PROBES.voyager1));
    tick();
    const id = setInterval(tick, 5000);
    return () => clearInterval(id);
  }, []);

  const km = useMemo(() => tToKm(t), [t]);

  return (
    <div className="rounded-lg border border-hairline bg-panel p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-lg text-starlight">Scale of the void</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
          logarithmic rail · Moon → Proxima Centauri
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(t * 1000)}
        onChange={(e) => setT(Number(e.target.value) / 1000)}
        className="scale-rail mt-6 w-full"
        aria-label="Distance from Earth"
      />

      <div className="mt-4 grid gap-3 font-mono text-sm sm:grid-cols-3">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-dim">Distance</p>
          <p className="mt-1 text-telemetry">{fmtKm(km)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-dim">In AU</p>
          <p className="mt-1 text-starlight">{(km / KM_PER_AU).toFixed(3)} AU</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-dim">Light travel</p>
          <p className="mt-1 text-signal">{fmtLight(km)}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {LANDMARKS.map((l) => {
          const target = l.km ?? v1Km;
          if (!target) return null;
          const isV1 = l.km === null;
          return (
            <button
              key={l.name}
              onClick={() => setT(kmToT(target))}
              className={`rounded border px-2.5 py-1 font-mono text-[11px] transition ${
                isV1
                  ? "voyager-pulse border-telemetry/50 text-telemetry hover:bg-telemetry hover:text-void"
                  : "border-hairline text-dim hover:border-signal/50 hover:text-starlight"
              }`}
            >
              {l.name}
              {isV1 && " (live)"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
