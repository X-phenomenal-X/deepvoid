import PlanetExplorer from "@/components/PlanetExplorer";
import Reveal from "@/components/Reveal";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "The Neighborhood — Solar System Explorer",
  description: "Interactive profiles of all eight planets: temperatures, day lengths, moons, gravity, real NASA photos, and the facts worth knowing."
};

export default function PlanetsPage() {
  return (
    <div className="py-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">The neighborhood</p>
      <h1 className="mt-3 font-hero text-3xl font-semibold sm:text-4xl">Eight worlds, one star</h1>
      <p className="mt-3 max-w-2xl text-dim">
        Click any planet for its profile — what it&apos;s like to stand there (or float, where standing
        isn&apos;t an option), how far it is, and the one fact about it worth telling someone.
      </p>
      <Reveal><div className="mt-10"><PlanetExplorer /></div></Reveal>
      <div className="mt-10"><AdSlot size="banner" /></div>
    </div>
  );
}
