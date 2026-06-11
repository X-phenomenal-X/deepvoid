import { getNeoWeek } from "@/lib/nasa";

// turn raw meters into something a human can picture
function sizeLabel(m) {
  if (m < 8) return "car-sized";
  if (m < 18) return "bus-sized";
  if (m < 50) return "house-sized";
  if (m < 120) return "football-field";
  if (m < 400) return "stadium-sized";
  return "mountain-sized";
}

export default async function AsteroidWatch() {
  const rocks = await getNeoWeek();
  if (!rocks) return null;

  return (
    <section>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Asteroid watch</p>
      <h2 className="mt-3 font-hero text-2xl font-medium leading-snug sm:text-3xl">Rocks passing by this week</h2>
      <p className="mt-2 max-w-2xl text-sm text-dim">
        Real close approaches from NASA&apos;s Near-Earth Object program, sorted by how close
        they come. One lunar distance (LD) = the gap between Earth and the Moon.
      </p>

      <div className="sheen mt-8 overflow-hidden rounded-xl border border-hairline bg-panel/80 backdrop-blur">
        <div className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-hairline px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-dim sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <span>Object</span>
          <span className="hidden sm:block">Size</span>
          <span className="hidden sm:block">Speed</span>
          <span className="hidden sm:block">Date</span>
          <span className="text-right">Miss distance</span>
        </div>
        {rocks.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-hairline/50 px-5 py-3.5 transition hover:bg-void/40 sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
          >
            <span className="truncate font-mono text-sm text-starlight">
              {r.name}
              {r.hazardous && (
                <span className="ml-2 rounded border border-telemetry/40 bg-telemetry/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-telemetry">
                  PHA
                </span>
              )}
            </span>
            <span className="hidden text-sm text-dim sm:block">
              ~{r.meters} m <span className="text-dim/60">· {sizeLabel(r.meters)}</span>
            </span>
            <span className="hidden font-mono text-sm text-dim sm:block">{r.kps.toFixed(1)} km/s</span>
            <span className="hidden font-mono text-sm text-dim sm:block">{r.date.slice(5)}</span>
            <span className={`text-right font-mono text-sm ${r.lunar < 1 ? "text-telemetry" : "text-signal"}`}>
              {r.lunar.toFixed(2)} LD
              {r.lunar < 1 && <span className="ml-1.5 text-[10px] uppercase tracking-wider">close</span>}
            </span>
          </div>
        ))}
        <p className="px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-dim/60">
          Source: NASA NeoWs · refreshes every 6 hours · PHA = potentially hazardous asteroid
        </p>
      </div>
    </section>
  );
}
