// Unified planet data:
// 1) Orbital mechanics — Keplerian elements (E.M. Standish / JPL approximation,
//    valid 1800–2050) + planetPosition() solver, used by the Orrery.
// 2) Profile data — temps, days, moons, gravity, vibes and facts, used by the
//    Planet Explorer and the homepage orbit map.

export const PLANETS = [
  {
    name: "Mercury", color: "#9FA6B2", radiusPx: 2.5, periodDays: 88,
    el: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593],
    rate: [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
    au: 0.39, tempC: 167, day: "59 Earth days", year: "88 days", moons: 0, size: 0.38, gravity: 3.7,
    vibe: "A scorched, airless rock where the Sun looks three times larger than from Earth — yet ice hides in its polar shadows.",
    fact: "Despite being the closest planet to the Sun, permanently shadowed craters at its poles hold water ice that never melts."
  },
  {
    name: "Venus", color: "#E8C97D", radiusPx: 4, periodDays: 225,
    el: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255],
    rate: [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
    au: 0.72, tempC: 464, day: "243 Earth days", year: "225 days", moons: 0, size: 0.95, gravity: 8.87,
    vibe: "A crushing furnace under permanent acid clouds. The surface pressure would feel like being 900 m underwater.",
    fact: "A day on Venus is longer than its year — and it spins backwards, so the Sun rises in the west."
  },
  {
    name: "Earth", color: "#5CC8FF", radiusPx: 4.2, periodDays: 365,
    el: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0],
    rate: [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0],
    au: 1.0, tempC: 15, day: "24 hours", year: "365 days", moons: 1, size: 1.0, gravity: 9.81,
    vibe: "The only place in the known universe where anything has ever been alive. Handle with care.",
    fact: "Earth is the only planet we know with active plate tectonics — possibly a key ingredient for long-term habitability."
  },
  {
    name: "Mars", color: "#E07B54", radiusPx: 3.2, periodDays: 687,
    el: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
    rate: [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
    au: 1.52, tempC: -65, day: "24.6 hours", year: "687 days", moons: 2, size: 0.53, gravity: 3.71,
    vibe: "A cold rust-colored desert with pink skies, blue sunsets, and dust storms that can swallow the whole planet.",
    fact: "Olympus Mons is the largest volcano in the solar system — nearly three times the height of Everest."
  },
  {
    name: "Jupiter", color: "#D9A066", radiusPx: 9, periodDays: 4333,
    el: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
    rate: [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
    au: 5.2, tempC: -110, day: "9.9 hours", year: "11.9 years", moons: 95, size: 11.2, gravity: 24.79,
    vibe: "A striped gas giant so massive that everything else in the solar system could fit inside it — with room to spare.",
    fact: "The Great Red Spot is a storm larger than Earth that has raged for at least 350 years — and it's slowly shrinking."
  },
  {
    name: "Saturn", color: "#E5CFA1", radiusPx: 7.5, periodDays: 10759, ring: true,
    el: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
    rate: [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
    au: 9.58, tempC: -140, day: "10.7 hours", year: "29.5 years", moons: 146, size: 9.45, gravity: 10.44,
    vibe: "The crown jewel: rings of ice spanning 280,000 km, yet in places only about 10 metres thick.",
    fact: "Saturn is less dense than water — drop it in a big enough ocean and it would float."
  },
  {
    name: "Uranus", color: "#9BD8DC", radiusPx: 5.5, periodDays: 30687,
    el: [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.9542763, 74.01692503],
    rate: [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
    au: 19.2, tempC: -195, day: "17.2 hours", year: "84 years", moons: 28, size: 4.0, gravity: 8.87,
    vibe: "An ice giant knocked onto its side, rolling around the Sun with seasons that last two decades each.",
    fact: "Uranus rotates at a 98° tilt — likely the scar of a colossal ancient collision. Each pole gets 42 years of daylight."
  },
  {
    name: "Neptune", color: "#6E8FE8", radiusPx: 5.3, periodDays: 60190,
    el: [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
    rate: [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
    au: 30.05, tempC: -200, day: "16.1 hours", year: "165 years", moons: 16, size: 3.88, gravity: 11.15,
    vibe: "The windiest world we know — supersonic storms tear through its deep blue clouds at 2,100 km/h.",
    fact: "Neptune was discovered by mathematics before telescopes — its position was predicted from wobbles in Uranus's orbit."
  }
];

const DEG = Math.PI / 180;

// Julian centuries since J2000.0 for a JS timestamp
export function centuriesSinceJ2000(ms) {
  const J2000 = Date.UTC(2000, 0, 1, 12, 0, 0); // 2000 Jan 1.5 TT (close enough)
  return (ms - J2000) / (86400000 * 36525);
}

function mod360(x) {
  return ((x % 360) + 360) % 360;
}

// Solve Kepler's equation M = E - e*sin(E) by Newton's method
function solveKepler(Mdeg, e) {
  const M = mod360(Mdeg) * DEG;
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 8; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-8) break;
  }
  return E;
}

// Heliocentric ecliptic position (x, y in AU, in the ecliptic plane)
// for a planet at time t (JS ms).
export function planetPosition(p, ms) {
  const T = centuriesSinceJ2000(ms);
  const a = p.el[0] + p.rate[0] * T;
  const e = p.el[1] + p.rate[1] * T;
  const I = (p.el[2] + p.rate[2] * T) * DEG;
  const L = p.el[3] + p.rate[3] * T;
  const lp = p.el[4] + p.rate[4] * T;
  const ln = p.el[5] + p.rate[5] * T;

  const omega = (lp - ln) * DEG; // argument of perihelion
  const Omega = ln * DEG;        // longitude of ascending node
  const M = L - lp;              // mean anomaly (deg)

  const E = solveKepler(M, e);

  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);

  const cosw = Math.cos(omega), sinw = Math.sin(omega);
  const cosO = Math.cos(Omega), sinO = Math.sin(Omega);
  const cosI = Math.cos(I);

  const x = (cosw * cosO - sinw * sinO * cosI) * xp + (-sinw * cosO - cosw * sinO * cosI) * yp;
  const y = (cosw * sinO + sinw * cosO * cosI) * xp + (-sinw * sinO + cosw * cosO * cosI) * yp;

  const r = Math.sqrt(xp * xp + yp * yp); // heliocentric distance, AU
  return { x, y, r };
}
