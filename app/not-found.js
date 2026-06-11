import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Signal lost</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">404 — this page drifted off</h1>
      <p className="mt-3 max-w-md text-sm text-dim">
        Whatever was here is now somewhere past the heliopause. Head back to mission control.
      </p>
      <Link
        href="/"
        className="mt-6 rounded border border-telemetry/50 px-4 py-2 font-mono text-xs uppercase tracking-widest text-telemetry transition hover:bg-telemetry hover:text-void"
      >
        Return home
      </Link>
    </div>
  );
}
