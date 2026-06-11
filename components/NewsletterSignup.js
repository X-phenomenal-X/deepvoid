export default function NewsletterSignup() {
  return (
    <div id="newsletter" className="rounded-lg border border-telemetry/30 bg-panel p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-telemetry">Mission briefing</p>
      <h3 className="mt-2 font-display text-xl text-starlight">One email a week from the edge of the solar system</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim">
        Voyager milestones, upcoming launches worth staying up for, and one thing about the
        universe that will rearrange your sense of scale. No spam, unsubscribe anytime.
      </p>
      {/* Replace the form action with your Beehiiv/ConvertKit embed URL when ready */}
      <form className="mt-5 flex max-w-md flex-col gap-2 sm:flex-row" action="#" method="post">
        <input
          type="email"
          required
          placeholder="you@earth.com"
          className="w-full rounded border border-hairline bg-void px-3 py-2.5 text-sm text-starlight placeholder:text-dim/60 focus:border-telemetry focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="rounded bg-telemetry px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-void transition hover:brightness-110"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
