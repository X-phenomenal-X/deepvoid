// Live Voyager distance estimation.
// We take a known distance at a known moment (the "epoch", from NASA/JPL
// published mission status), then add (speed x seconds elapsed since then).
// Both probes travel at near-constant velocity, so this stays accurate for years.

export const PROBES = {
  voyager1: {
    name: "Voyager 1",
    launched: "1977-09-05",
    epochMs: Date.UTC(2025, 0, 1),
    epochKm: 24.82e9, // ~165.9 AU from the Sun on 2025-01-01
    kmPerSec: 16.9,
    note: "The farthest human-made object. Now in interstellar space."
  },
  voyager2: {
    name: "Voyager 2",
    launched: "1977-08-20",
    epochMs: Date.UTC(2025, 0, 1),
    epochKm: 20.75e9, // ~138.7 AU from the Sun on 2025-01-01
    kmPerSec: 15.4,
    note: "The only spacecraft to have visited Uranus and Neptune."
  }
};

export const KM_PER_AU = 149597870.7;

export function distanceKm(probe, atMs = Date.now()) {
  const elapsedSec = (atMs - probe.epochMs) / 1000;
  return probe.epochKm + probe.kmPerSec * elapsedSec;
}

export function toAU(km) {
  return km / KM_PER_AU;
}

export function lightTime(km) {
  const seconds = km / 299792.458;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes, seconds };
}
