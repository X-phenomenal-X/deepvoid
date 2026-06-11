// Tiny synth blips — no audio files, just WebAudio. Volumes are kept very
// low; sounds only ever fire on explicit user clicks (a valid gesture, so
// the AudioContext is allowed to start).
let ctx;

export function ping(freq = 660, dur = 0.18, vol = 0.045) {
  try {
    if (typeof window === "undefined") return;
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 0.92, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.03);
  } catch {
    /* audio is a garnish — never break the page over it */
  }
}

// Each planet gets its own note — Mercury high and quick, Neptune low and slow.
export function planetPing(index) {
  ping(840 - index * 72, 0.16 + index * 0.012);
}

// Double-blip for catching the alien observer.
export function anomalyPing() {
  ping(980, 0.12, 0.05);
  setTimeout(() => ping(1240, 0.16, 0.04), 90);
}
