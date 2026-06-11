import { MISSIONS } from "@/lib/missions";
import MissionPhoto from "@/components/MissionPhoto";
import LaunchCountdown from "@/components/LaunchCountdown";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Mission Explorer — live launch countdowns and deep space probes",
  description: "Upcoming rocket launches with live countdowns, plus every active and upcoming deep space mission: status, instruments, and discoveries."
};

const chip = {
  Active: "border-telemetry/40 text-telemetry",
  "In transit": "border-signal/40 text-signal"
};

export default function MissionsPage() {
  return (
    <div className="py-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Mission explorer</p>
      <h1 className="mt-3 font-hero text-3xl font-semibold sm:text-4xl">Past the asteroid belt</h1>
      <p className="mt-3 max-w-2xl text-dim">
        The spacecraft operating at — or headed to — the deepest reaches we&apos;ve ever sent hardware. Ordered by launch.
      </p>

      <Reveal>
        <section className="mt-10">
          <h2 className="font-display text-xl text-starlight">Next launches</h2>
          <p className="mt-1 text-sm text-dim">Live countdowns from the global launch schedule.</p>
          <div className="mt-4"><LaunchCountdown /></div>
        </section>
      </Reveal>

      <div className="mt-10 space-y-4">
        {MISSIONS.map((m, i) => (
          <Reveal key={m.name} delay={Math.min(i * 60, 240)}>
            <article className="card-lift sheen grid gap-5 rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur sm:grid-cols-[1fr_150px]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-xl text-starlight">{m.name}</h2>
                  <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${chip[m.status] || "border-hairline text-dim"}`}>
                    {m.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-dim">
                  {m.agency} · {m.launched ? `launched ${m.launched}` : "awaiting launch"} · {m.region}
                </p>
                <p className="mt-3 text-sm text-starlight">{m.highlight}</p>
                <p className="mt-2 text-xs text-dim">Key instruments: {m.instruments}</p>
              </div>
              <MissionPhoto src={m.photo} alt={`${m.name} spacecraft`} />
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-10"><AdSlot size="banner" /></div>
    </div>
  );
}
