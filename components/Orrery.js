"use client";
import { useEffect, useRef, useState } from "react";
import { PLANETS, planetPosition } from "@/lib/planets";

// Radial compression so Mercury (0.39 AU) and Neptune (30 AU) both fit on
// one canvas: screen radius grows with the 0.42 power of true distance.
const COMPRESS = 0.42;
const MAX_AU = 31;

const SPEEDS = [
  { label: "1 day/s", daysPerSec: 1 },
  { label: "1 week/s", daysPerSec: 7 },
  { label: "1 month/s", daysPerSec: 30 },
  { label: "1 year/s", daysPerSec: 365 }
];

// Approximate ecliptic longitudes of the Voyager escape trajectories
const VOYAGERS = [
  { name: "Voyager 1", lonDeg: 260 },
  { name: "Voyager 2", lonDeg: 290 }
];

export default function Orrery() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ simMs: Date.now(), playing: false, speedIdx: 1 });
  const [, force] = useState(0);
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h, cx, cy, scale;
    let last = performance.now();
    let visible = true;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = Math.min(rect.width, 640);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
      scale = (Math.min(w, h) / 2 - 28) / Math.pow(MAX_AU, COMPRESS);
    }

    function project(x, y) {
      const r = Math.sqrt(x * x + y * y);
      if (r === 0) return [cx, cy];
      const rr = Math.pow(r, COMPRESS) * scale;
      return [cx + (x / r) * rr, cy - (y / r) * rr];
    }

    function draw() {
      const st = stateRef.current;
      ctx.clearRect(0, 0, w, h);

      // orbit paths (sampled true orbits, compressed)
      ctx.lineWidth = 1;
      for (const p of PLANETS) {
        ctx.beginPath();
        const period = p.periodDays * 86400000;
        for (let i = 0; i <= 96; i++) {
          const t = st.simMs + (i / 96) * period;
          const pos = planetPosition(p, t);
          const [px, py] = project(pos.x, pos.y);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(28,36,54,0.9)";
        ctx.stroke();
      }

      // Voyager escape directions
      const rim = Math.pow(MAX_AU, COMPRESS) * scale;
      ctx.font = "10px var(--font-mono), monospace";
      for (const v of VOYAGERS) {
        const a = (v.lonDeg * Math.PI) / 180;
        const dx = Math.cos(a), dy = Math.sin(a);
        const x1 = cx + dx * rim * 0.86, y1 = cy - dy * rim * 0.86;
        const x2 = cx + dx * rim * 1.0, y2 = cy - dy * rim * 1.0;
        ctx.strokeStyle = "rgba(255,179,92,0.55)";
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
        // arrowhead
        ctx.fillStyle = "rgba(255,179,92,0.8)";
        ctx.beginPath();
        ctx.arc(x2, y2, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,179,92,0.7)";
        const tx = cx + dx * rim * 1.0 + (dx >= 0 ? 5 : -5);
        ctx.textAlign = dx >= 0 ? "left" : "right";
        ctx.fillText(v.name + " →", Math.min(Math.max(tx, 4), w - 4), y2 + 3);
      }

      // Sun
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      sunGlow.addColorStop(0, "rgba(255,210,130,0.9)");
      sunGlow.addColorStop(1, "rgba(255,179,92,0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFD282";
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // planets
      ctx.textAlign = "left";
      for (const p of PLANETS) {
        const pos = planetPosition(p, st.simMs);
        const [px, py] = project(pos.x, pos.y);
        ctx.beginPath();
        ctx.arc(px, py, p.radiusPx, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(139,150,171,0.95)";
        ctx.fillText(p.name, px + p.radiusPx + 4, py + 3);
      }
    }

    function frame(now) {
      const st = stateRef.current;
      const dt = (now - last) / 1000;
      last = now;
      if (visible && st.playing) {
        st.simMs += SPEEDS[st.speedIdx].daysPerSec * 86400000 * dt;
      }
      if (visible) {
        draw();
        setDateLabel(
          new Date(stateRef.current.simMs).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric"
          })
        );
      }
      raf = requestAnimationFrame(frame);
    }

    function onVis() { visible = document.visibilityState === "visible"; }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    if (reduced) {
      stateRef.current.playing = false;
      draw();
      setDateLabel(new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }));
      // still need a light loop to reflect control changes
      raf = requestAnimationFrame(frame);
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const st = stateRef.current;

  return (
    <div className="rounded-lg border border-hairline bg-panel p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-starlight">The solar system, right now</h3>
          <p className="mt-0.5 text-xs text-dim">
            Planet positions computed live from Keplerian orbital elements (JPL approximation).
            Distances compressed to fit — directions and orbital motion are real.
          </p>
        </div>
        <span className="font-mono text-xs tabular-nums text-telemetry">{dateLabel}</span>
      </div>

      <div className="relative mt-4 w-full">
        <canvas ref={canvasRef} className="block w-full" aria-label="Map of current planet positions" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={() => { st.playing = !st.playing; force((n) => n + 1); }}
          className="rounded border border-telemetry/50 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-telemetry transition hover:bg-telemetry hover:text-void"
        >
          {st.playing ? "Pause" : "Play time"}
        </button>
        <button
          onClick={() => { st.simMs = Date.now(); st.playing = false; force((n) => n + 1); }}
          className="rounded border border-hairline px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-dim transition hover:text-starlight"
        >
          Today
        </button>
        <div className="flex gap-1">
          {SPEEDS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => { st.speedIdx = i; force((n) => n + 1); }}
              className={`rounded px-2 py-1.5 font-mono text-[11px] transition ${
                st.speedIdx === i ? "bg-hairline text-starlight" : "text-dim hover:text-starlight"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
