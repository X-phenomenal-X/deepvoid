import LaunchCountdown from "@/components/LaunchCountdown";
import VoyagerTracker from "@/components/VoyagerTracker";
import Reveal from "@/components/Reveal";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Missions — live launch countdowns and deep space trackers",
  description: "Upcoming rocket launches with live countdowns, plus real-time distance trackers for Voyager 1 and 2."
};

export default function MissionsPage() {
  return (
    <div className="space-y-12 py-12">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Mission control</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Launches & deep space missions</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
          Live countdowns from the global launch schedule, and the two farthest machines humanity has ever built.
        </p>
      </section>
      <Reveal>
        <section>
          <h2 className="font-display text-xl text-starlight">Upcoming launches</h2>
          <div className="mt-4"><LaunchCountdown /></div>
        </section>
      </Reveal>
      <AdSlot size="banner" />
      <Reveal>
        <section>
          <h2 className="font-display text-xl text-starlight">The interstellar fleet</h2>
          <div className="mt-4"><VoyagerTracker /></div>
        </section>
      </Reveal>
    </div>
  );
}
