"use client";
import { useEffect, useState } from "react";

export default function Countdown({ target }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <span className="font-mono text-sm text-telemetry">T- …</span>;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <span className="font-mono text-sm text-telemetry">Launching</span>;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return (
    <span className="font-mono text-sm tabular-nums text-telemetry">
      T- {d}d {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}
    </span>
  );
}
