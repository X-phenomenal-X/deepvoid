"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PLANETS, planetPosition } from "@/lib/planets";

/*
 * Live orbit map — planet positions computed from JPL approximate
 * Keplerian elements via lib/planets. Tilted pseudo-3D presentation,
 * time warp controls, hover + click-to-explore.
 */

const WARPS = [
  { label: "Real time", v: 1 },
  { label: "1 day/s", v: 86400 },
  { label: "1 month/s", v: 2629800 },
  { label: "1 year/s", v: 31557600 },
  { label: "10 yrs/s", v: 315576000 }
];

const TILT = 0.42;

export default function OrbitMap({ variant = "panel" }) {
  const hero = variant === "hero";
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const simRef = useRef(Date.now());
  const warpRef = useRef(1);
  const hoverRef = useRef(null);
  const hitsRef = useRef([]);
  const [warpIdx, setWarpIdx] = useState(0);
  const [selName, setSelName] = useState(null);
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h, cx, cy, scale;
    let last = performance.now();

    const meta = {};
    for (const p of PLANETS) {
      meta[p.name] = {
        color: p.color,
        ring: !!p.ring,
        size: Math.max(3, Math.min(9, 3 + (p.size || 1) * 0.55)) + (hero ? 1 : 0)
      };
    }

    // log-compressed display radius so Neptune fits on screen with Mercury visible
    const rd = (au) => Math.log(1 + au / 0.3);
    const RMAX = rd(31);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrapRef.current.clientWidth;
      h = hero ? wrapRef.current.clientHeight : Math.max(380, Math.min(560, Math.round(w * 0.52)));
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2 + (hero ? 14 : 10);
      scale = Math.min(w / (hero ? 2.05 : 2.15), (h / (hero ? 1.95 : 2.1)) / TILT) / RMAX;
    }

    function project(pos) {
      const r = Math.hypot(pos.x, pos.y);
      const th = Math.atan2(pos.y, pos.x);
      const R = rd(r) * scale;
      return { x: cx + R * Math.cos(th), y: cy + R * Math.sin(th) * TILT };
    }

    function draw(now) {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      simRef.current += dt * warpRef.current * 1000;
      const t = simRef.current;

      ctx.clearRect(0, 0, w, h);

      // orbit paths
      ctx.lineWidth = 1;
      for (const p of PLANETS) {
        ctx.beginPath();
        const periodMs = p.periodDays * 86400000;
        for (let i = 0; i <= 96; i++) {
          const s = project(planetPosition(p, t + (i / 96) * periodMs));
          i === 0 ? ctx.moveTo(s.x, s.y) : ctx.lineTo(s.x, s.y);
        }
        const active = hoverRef.current === p.name;
        ctx.strokeStyle = active ? `${p.color}66` : "rgba(140,160,190,0.13)";
        ctx.stroke();
      }

      // sun
      const sunR = hero ? 38 : 30;
      const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR);
      sg.addColorStop(0, "rgba(255,220,150,0.95)");
      sg.addColorStop(0.25, "rgba(255,180,90,0.45)");
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#FFE9C2";
      ctx.beginPath(); ctx.arc(cx, cy, hero ? 6 : 5, 0, Math.PI * 2); ctx.fill();

      // planets, back to front
      const hits = [];
      const drawn = PLANETS
        .map((p) => ({ p, s: project(planetPosition(p, t)) }))
        .sort((a, b) => a.s.y - b.s.y);

      for (const { p, s } of drawn) {
        const m = meta[p.name];
        const hov = hoverRef.current === p.name;
        const r = m.size * (hov ? 1.35 : 1);

        if (m.ring) {
          ctx.strokeStyle = `${m.color}AA`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.ellipse(s.x, s.y, r * 2.1, r * 0.8, -0.3, 0, Math.PI * 2);
          ctx.stroke();
        }

        const pg = ctx.createRadialGradient(s.x - r * 0.35, s.y - r * 0.35, 0, s.x, s.y, r * 1.05);
        pg.addColorStop(0, m.color);
        pg.addColorStop(1, "#0B0F1A");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI * 2); ctx.fill();

        if (hov) {
          ctx.strokeStyle = `${m.color}AA`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(s.x, s.y, r + 4, 0, Math.PI * 2); ctx.stroke();
        }

        // label
        ctx.globalAlpha = hov ? 1 : 0.55;
        ctx.fillStyle = hov ? "#EDF2FF" : "#8FA0BF";
        ctx.font = `${hero ? 10 : 9}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.fillText(p.name.toUpperCase(), s.x, s.y - r - 7);
        ctx.globalAlpha = 1;

        hits.push({ n: p.name, x: s.x, y: s.y });
      }
      hitsRef.current = hits;

      raf = requestAnimationFrame(draw);
    }

    function nearest(e) {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      let best = null, bd = 20;
      for (const hsh of hitsRef.current) {
        const d = Math.hypot(hsh.x - px, hsh.y - py);
        if (d < bd) { bd = d; best = hsh.n; }
      }
      return best;
    }

    function onMove(e) {
      const n = nearest(e);
      hoverRef.current = n;
      canvas.style.cursor = n ? "pointer" : "default";
    }
    function onClick(e) {
      const n = nearest(e);
      if (n) setSelName(n);
      else setSelName(null);
    }
    function onVis() {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(draw); }
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);

    const dateTick = setInterval(() => {
      setDateStr(new Date(simRef.current).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }));
    }, 200);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(dateTick);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [hero]);

  const sel = selName ? PLANETS.find((p) => p.name === selName) : null;

  const warpChips = (
    <div className="flex flex-wrap items-center gap-1.5">
      {WARPS.map((wp, i) => (
        <button
          key={wp.label}
          onClick={() => { warpRef.current = wp.v; setWarpIdx(i); }}
          className={`rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
            warpIdx === i
              ? "border-telemetry/60 bg-telemetry/10 text-telemetry"
              : "border-hairline bg-void/50 text-dim hover:border-telemetry/30 hover:text-starlight"
          }`}
        >
          {wp.label}
        </button>
      ))}
      <button
        onClick={() => { simRef.current = Date.now(); warpRef.current = 1; setWarpIdx(0); }}
        className="rounded border border-hairline bg-void/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-dim transition hover:border-signal/40 hover:text-signal"
      >
        ↺ Today
      </button>
    </div>
  );

  if (hero) {
    return (
      <div ref={wrapRef} className="absolute inset-0">
        <canvas ref={canvasRef} className="block h-full w-full" />
        <div className="absolute bottom-16 right-5 z-10 flex flex-col items-end gap-2 sm:right-8">
          <span className="font-mono text-xs text-telemetry">{dateStr}</span>
          {warpChips}
        </div>
        {sel && (
          <div className="planet-detail absolute right-4 top-1/2 z-10 w-72 max-w-[80vw] -translate-y-1/2 rounded-lg border border-hairline bg-void/80 p-4 backdrop-blur">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-starlight">{sel.name}</h3>
              <button onClick={() => setSelName(null)} className="font-mono text-xs text-dim hover:text-starlight" aria-label="Close">✕</button>
            </div>
            <p className="mt-1 font-mono text-[11px] text-dim">
              {sel.au} AU · {sel.tempC}°C · {sel.moons} moon{sel.moons === 1 ? "" : "s"}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-dim">{sel.fact}</p>
            <Link href="/planets" className="mt-2 inline-block font-mono text-xs text-signal hover:underline">
              Full profile →
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-hairline bg-panel/80 backdrop-blur">
      {/* controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        {warpChips}
        <span className="font-mono text-xs text-telemetry">{dateStr}</span>
      </div>

      {/* map */}
      <div ref={wrapRef} className="relative">
        <canvas ref={canvasRef} className="block w-full" />
        <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest text-dim/70">
          Positions computed from JPL orbital elements · distances log-compressed · click a planet
        </p>
      </div>

      {/* selected planet */}
      {sel && (
        <div className="planet-detail border-t border-hairline px-5 py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl text-starlight">{sel.name}</h3>
            <span className="font-mono text-xs text-dim">
              {sel.au} AU · {sel.tempC}°C · {sel.moons} moon{sel.moons === 1 ? "" : "s"} · year: {sel.year}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-dim">{sel.fact}</p>
          <Link href="/planets" className="mt-2 inline-block font-mono text-xs text-signal hover:underline">
            Full profile →
          </Link>
        </div>
      )}
    </div>
  );
}
