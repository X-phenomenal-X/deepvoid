"use client";

import { useEffect, useState } from "react";
import { PLANETS } from "@/lib/planets";

const KM_AU = 149597870.7;
const LIGHT_MIN_PER_AU = 8.317; // minutes for sunlight to travel 1 AU

// Real photography (NASA / public domain, served via Wikimedia's stable
// filename redirect). If one ever 404s, onError hides it gracefully.
const FP = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const PHOTOS = {
  Mercury: `${FP}Mercury%20in%20color%20-%20Prockter07-edit1.jpg?width=700`,
  Venus: `${FP}Venus-real_color.jpg?width=700`,
  Earth: `${FP}The_Earth_seen_from_Apollo_17.jpg?width=700`,
  Mars: `${FP}OSIRIS_Mars_true_color.jpg?width=700`,
  Jupiter: `${FP}Jupiter_and_its_shrunken_Great_Red_Spot.jpg?width=700`,
  Saturn: `${FP}Saturn_during_Equinox.jpg?width=700`,
  Uranus: `${FP}Uranus2.jpg?width=700`,
  Neptune: `${FP}Neptune_Full.jpg?width=700`
};

function lightTime(au) {
  const mins = au * LIGHT_MIN_PER_AU;
  if (mins < 60) return `${mins.toFixed(0)} min`;
  return `${(mins / 60).toFixed(1)} hrs`;
}

export default function PlanetExplorer() {
  const [sel, setSel] = useState(PLANETS[3]); // start on Mars
  const [kg, setKg] = useState(70);

  // arrow keys hop between planets
  useEffect(() => {
    function onKey(e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const i = PLANETS.findIndex((p) => p.name === sel.name);
      const next = e.key === "ArrowRight" ? Math.min(PLANETS.length - 1, i + 1) : Math.max(0, i - 1);
      setSel(PLANETS[next]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel]);

  const weight = (kg * sel.gravity) / 9.81;

  return (
    <div className="rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur sm:p-8">
      {/* the lineup — sizes are relative (log-ish clamp so Jupiter doesn't eat the row) */}
      <div className="flex items-end justify-between gap-1 sm:gap-2">
        {PLANETS.map((p) => {
          const d = Math.max(14, Math.min(64, 14 + p.size * 4.6));
          const active = sel.name === p.name;
          return (
            <button
              key={p.name}
              onClick={() => setSel(p)}
              aria-label={`View ${p.name}`}
              className="group flex flex-col items-center gap-2"
            >
              <span className="relative flex items-center justify-center" style={{ width: d * (p.ring ? 1.7 : 1), height: d }}>
                {p.ring && (
                  <span
                    aria-hidden="true"
                    className="absolute rounded-[50%] border"
                    style={{
                      width: d * 1.7, height: d * 0.62,
                      borderColor: `${p.color}99`,
                      transform: "rotate(-16deg)",
                      boxShadow: `0 0 6px ${p.color}33`
                    }}
                  />
                )}
                <span
                  className="planet-dot block rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: d, height: d,
                    background: `radial-gradient(circle at 32% 30%, ${p.color}, #0B0F1A 130%)`,
                    boxShadow: active ? `0 0 18px ${p.color}66, 0 0 0 2px ${p.color}88` : `0 0 10px ${p.color}22`
                  }}
                />
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-wider transition ${active ? "text-starlight" : "text-dim group-hover:text-starlight"}`}>
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-dim">
        Tip: use ← → arrow keys to hop between worlds
      </p>

      {/* profile */}
      <div key={sel.name} className="planet-detail mt-6 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-[1fr_180px]">
        <div className="sm:order-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl text-starlight">{sel.name}</h3>
          <span className="font-mono text-xs text-dim">
            {sel.au} AU · {(sel.au * KM_AU / 1e6).toFixed(0)} million km from the Sun
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-starlight">{sel.vibe}</p>
        <dl className="mt-5 grid grid-cols-2 gap-4 font-mono text-xs sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <dt className="uppercase tracking-widest text-dim">Avg temp</dt>
            <dd className="mt-1 text-telemetry">{sel.tempC}°C</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Day length</dt>
            <dd className="mt-1 text-starlight">{sel.day}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Year length</dt>
            <dd className="mt-1 text-starlight">{sel.year}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Moons</dt>
            <dd className="mt-1 text-starlight">{sel.moons}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Gravity</dt>
            <dd className="mt-1 text-starlight">{sel.gravity} m/s²</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Sunlight takes</dt>
            <dd className="mt-1 text-starlight">{lightTime(sel.au)}</dd>
          </div>
        </dl>

        {/* weight converter */}
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded border border-hairline bg-void/50 p-4 font-mono text-xs">
          <span className="uppercase tracking-widest text-dim">You there:</span>
          <label className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="500"
              value={kg}
              onChange={(e) => setKg(Math.max(0, Number(e.target.value)))}
              className="w-20 rounded border border-hairline bg-panel px-2 py-1 text-starlight outline-none focus:border-telemetry"
              aria-label="Your weight on Earth in kilograms"
            />
            <span className="text-dim">kg on Earth</span>
          </label>
          <span className="text-dim">→</span>
          <span className="text-telemetry">
            {weight.toFixed(1)} kg on {sel.name}
          </span>
          {sel.name !== "Earth" && (
            <span className="text-dim">
              ({weight > kg ? "heavier" : "lighter"} by {Math.abs(weight - kg).toFixed(1)} kg)
            </span>
          )}
        </div>

        <p className="mt-5 rounded border border-signal/20 bg-void/50 p-4 text-sm text-dim">
          <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Cool fact · </span>
          {sel.fact}
        </p>
        </div>

        {/* real photograph */}
        <div className="sm:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={sel.name}
            src={PHOTOS[sel.name]}
            alt={`${sel.name}, real photograph`}
            loading="lazy"
            onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }}
            className="aspect-square w-full rounded-full object-cover"
            style={{ boxShadow: `0 0 40px ${sel.color}33, 0 0 0 1px ${sel.color}44` }}
          />
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-dim/60">
            Real photo · NASA
          </p>
        </div>
      </div>
    </div>
  );
}
