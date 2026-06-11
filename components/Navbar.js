"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/solar-system", label: "Solar System" },
  { href: "/missions", label: "Missions" },
  { href: "/exoplanets", label: "Exoplanets" },
  { href: "/blog", label: "Dispatches" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-void/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-lg tracking-tight text-starlight">
          deep<span className="text-telemetry">void</span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-6 text-sm text-dim sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link transition hover:text-starlight">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="rounded border border-telemetry/40 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-telemetry transition hover:bg-telemetry hover:text-void"
          >
            Subscribe
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded border border-hairline text-starlight sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3.5 w-4.5" style={{ width: 18 }}>
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* mobile panel */}
      <div
        className={`overflow-hidden border-hairline transition-all duration-300 sm:hidden ${open ? "max-h-80 border-t" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2.5 text-sm text-dim transition hover:bg-panel hover:text-starlight"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            onClick={() => setOpen(false)}
            className="mt-2 rounded border border-telemetry/40 px-3 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-telemetry"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
