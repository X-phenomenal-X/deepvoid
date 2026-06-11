export const metadata = {
  title: "About",
  description: "What DeepVoid is, where the data comes from, and why distance from Earth is the most underrated number in science."
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 text-sm leading-relaxed text-dim">
      <h1 className="font-display text-3xl tracking-tight text-starlight">About DeepVoid</h1>
      <p>
        DeepVoid exists to make one number feel real: how far away things are. The Voyager
        odometers on the homepage tick because the probes really are moving — about 17 kilometres
        farther from us every second — and watching that number roll does something a static
        fact never will.
      </p>
      <p>
        Everything here is built on public, official data: NASA/JPL mission status for the Voyager
        trackers, the standard JPL Keplerian approximation for live planet positions, The Space
        Devs Launch Library for countdowns, Where The ISS At for station telemetry, and the NASA
        Exoplanet Archive for newly confirmed worlds. Where a number is an estimate (extrapolated
        between official updates), the page says so.
      </p>
      <p>
        DeepVoid is independent and is not affiliated with or endorsed by NASA. Questions or
        corrections are always welcome — accuracy is the whole point.
      </p>
    </div>
  );
}
