import { getUpcomingLaunches } from "@/lib/launches";
import Countdown from "@/components/Countdown";

export default async function LaunchCountdown() {
  const launches = await getUpcomingLaunches(4);
  if (!launches.length) {
    return (
      <div className="rounded-lg border border-hairline bg-panel p-5 text-sm text-dim">
        Launch feed unavailable — it refreshes hourly.
      </div>
    );
  }
  return (
    <div className="grid gap-3">
      {launches.map((l) => (
        <div
          key={l.id}
          className="card-glow flex flex-wrap items-center justify-between gap-3 rounded-lg border border-hairline bg-panel px-5 py-4"
        >
          <div className="min-w-0">
            <p className="truncate font-display text-sm text-starlight">{l.name}</p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-dim">
              {l.launch_service_provider?.name || "TBD"} · {l.pad?.location?.name || ""}
            </p>
          </div>
          <Countdown target={l.net} />
        </div>
      ))}
    </div>
  );
}
