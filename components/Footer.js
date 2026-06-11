import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
        <p>
          deep<span className="text-telemetry">void</span> — live data from humanity&apos;s
          deepest space missions. Data: NASA/JPL, The Space Devs, NASA Exoplanet Archive.
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="transition hover:text-starlight">About</Link>
          <Link href="/privacy" className="transition hover:text-starlight">Privacy</Link>
          <Link href="/blog" className="transition hover:text-starlight">Dispatches</Link>
        </div>
      </div>
    </footer>
  );
}
