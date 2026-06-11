"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EVENTS, EVENT_TYPES } from "@/lib/events";

// treat event dates as ending at 23:59 UTC so an event still counts as
// "today" for its whole day
const endMs = (e) => Date.parse(`${e.end || e.date}T23:59:00Z`);
const startMs = (e) => Date.parse(`${e.date}T00:00:00Z`);

function fmt(date, end) {
  const opts = { month: "short", day: "numeric", timeZone: "UTC" };
  const a = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", opts);
  if (!end) return a;
  const b = new Date(`${end}T12:00:00Z`).toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" });
  return `${a}–${b}`;
}

function Countdown({ to }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <span className="text-dim">—</span>;
  let s = Math.max(0, Math.floor((to - now) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;
  return (
    <span className="tabular-nums">
      {d}<span className="text-dim">d</span> {h}<span className="text-dim">h</span> {m}
      <span className="text-dim">m</span> {s}<span className="text-dim">s</span>
    </span>
  );
}

export default function CosmicEvents() {
  const [showPast, setShowPast] = useState(false);
  const now = Date.now();

  const sorted = [...EVENTS].sort((a, b) => startMs(a) - startMs(b));
  const past = sorted.filter((e) => endMs(e) < now);
  const future = sorted.filter((e) => endMs(e) >= now);
  const nextMajor = future.find((e) => e.major) || future[0];

  return (
    <div>
      {/* countdown banner to the next major event */}
      {nextMajor && (
        <div className="sheen glow-pulse mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-telemetry/30 bg-panel/80 px-6 py-5 backdrop-blur">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-telemetry">
              Next major event · {fmt(nextMajor.date, nextMajor.end)}
            </p>
            <p className="mt-1 font-hero text-lg font-medium text-starlight sm:text-2xl">{nextMajor.title}</p>
            <p className="mt-1 font-mono text-xs text-dim">{nextMajor.where}</p>
            {nextMajor.major && (
              <Link href="/eclipse" className="mt-2 inline-block font-mono text-xs text-signal hover:underline">
                Full eclipse guide & countdown →
              </Link>
            )}
          </div>
          <p className="font-mono text-2xl text-telemetry sm:text-4xl">
            <Countdown to={startMs(nextMajor)} />
          </p>
        </div>
      )}

      <div className="sheen stagger overflow-hidden rounded-xl border border-hairline bg-panel/80 backdrop-blur">
        {/* past toggle */}
        <button
          onClick={() => setShowPast(!showPast)}
          className="flex w-full items-center justify-between border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-dim transition hover:text-starlight"
        >
          <span>{past.length} events already passed this year</span>
          <span>{showPast ? "hide ↑" : "show ↓"}</span>
        </button>

        {showPast &&
          past.map((e, i) => <EventRow key={`p${i}`} e={e} passed />)}

        {/* the "now" line */}
        <div className="flex items-center gap-3 bg-void/40 px-5 py-2">
          <span className="live-dot shrink-0" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-telemetry">You are here</span>
          <span className="h-px flex-1 bg-telemetry/30" />
        </div>

        {future.map((e, i) => <EventRow key={`f${i}`} e={e} highlight={e === nextMajor} />)}

        <p className="px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-dim/60">
          All dates UTC · sources: NASA, Royal Observatory Greenwich, timeanddate
        </p>
      </div>
    </div>
  );
}

function EventRow({ e, passed = false, highlight = false }) {
  const t = EVENT_TYPES[e.type];
  return (
    <div
      className={`grid grid-cols-[88px_1fr] gap-4 border-b border-hairline/50 px-5 py-4 transition sm:grid-cols-[110px_130px_1fr] ${
        passed ? "opacity-45" : "hover:bg-void/40"
      } ${highlight ? "bg-telemetry/[0.04]" : ""}`}
    >
      <div className="font-mono text-sm text-starlight">
        {fmt(e.date, e.end)}
        {passed && <span className="ml-1.5 text-signal">✓</span>}
      </div>
      <div className="hidden sm:block">
        <span
          className="rounded border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{ borderColor: `${t.color}55`, color: t.color, backgroundColor: `${t.color}11` }}
        >
          {t.label}
        </span>
      </div>
      <div>
        <p className={`text-sm ${e.major ? "font-hero font-medium text-telemetry" : "text-starlight"}`}>
          {e.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-dim">{e.desc}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim/70">{e.where}</p>
      </div>
    </div>
  );
}
