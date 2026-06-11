import Orrery from "@/components/Orrery";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Live solar system map — where every planet is right now",
  description:
    "A real-time map of the solar system. All eight planet positions computed live in your browser from Keplerian orbital elements — press play to travel through time."
};

export default function SolarSystemPage() {
  return (
    <div className="space-y-10 py-12">
      <section>
        <p className="hero-in hero-in-1 font-mono text-xs uppercase tracking-[0.25em] text-telemetry">
          Computed live · no images, just orbital mechanics
        </p>
        <h1 className="hero-in hero-in-2 mt-3 font-display text-3xl tracking-tight sm:text-4xl">
          Where every planet is, right now
        </h1>
        <p className="hero-in hero-in-3 mt-3 max-w-2xl text-sm leading-relaxed text-dim sm:text-base">
          This is not an illustration. Each position is solved in your browser from the planets&apos;
          real orbital elements — the same Keplerian approximation NASA/JPL publishes for the
          years 1800–2050. Press play and fast-forward the solar system.
        </p>
      </section>

      <div className="hero-in hero-in-4">
        <Orrery />
      </div>

      <Reveal>
        <section className="max-w-2xl space-y-4 text-sm leading-relaxed text-dim">
          <h2 className="font-display text-xl text-starlight">How this works</h2>
          <p>
            Every planet&apos;s orbit can be described by six numbers — its size, shape, tilt, and
            orientation, plus where the planet was at a reference moment. From those six numbers
            and the current time, Kepler&apos;s equation gives the planet&apos;s exact place on its
            ellipse. Your browser solves that equation for all eight planets, sixty times a second.
          </p>
          <p>
            One honest caveat: real distances are too lopsided to draw. Neptune orbits about
            80&times; farther out than Mercury, so this map gently compresses distance to keep
            everything visible. Directions, orbital shapes, and speeds are all real — notice how
            Mercury sprints while Neptune barely moves, exactly as in the sky.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
