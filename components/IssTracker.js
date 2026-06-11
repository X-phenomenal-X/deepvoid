"use client";
import { useEffect, useState } from "react";

export default function IssTracker() {
  const [pos, setPos] = useState(null);
  useEffect(() => {
    let id;
    async function fetchPos() {
      try {
        const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        if (res.ok) setPos(await res.json());
      } catch {}
    }
    fetchPos();
    id = setInterval(fetchPos, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-glow rounded-lg border border-hairline bg-panel p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base text-starlight">ISS — where is it?</h3>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          updates every 10s
        </span>
      </div>
      {pos ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 font-mono text-[11px] text-dim sm:grid-cols-4">
          <div>
            <dt className="uppercase tracking-widest">Latitude</dt>
            <dd className="mt-1 text-starlight">{pos.latitude.toFixed(2)}°</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest">Longitude</dt>
            <dd className="mt-1 text-starlight">{pos.longitude.toFixed(2)}°</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest">Altitude</dt>
            <dd className="mt-1 text-starlight">{Math.round(pos.altitude)} km</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest">Speed</dt>
            <dd className="mt-1 text-starlight">{Math.round(pos.velocity).toLocaleString()} km/h</dd>
          </div>
        </dl>
      ) : (
        <p className="mt-4 font-mono text-sm text-dim">acquiring orbit…</p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-dim">
        The International Space Station circles Earth every ~92 minutes — it will cross an
        entire ocean while you read this page.
      </p>
    </div>
  );
}
