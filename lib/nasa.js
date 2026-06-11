const KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getApod() {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${KEY}&thumbs=true`,
      { next: { revalidate: 3600 } } // re-fetch at most once per hour
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// kept for backwards compatibility with older imports
export const getAPOD = getApod;

// Newest confirmed exoplanets from the NASA Exoplanet Archive (TAP query)
export async function getExoplanets() {
  try {
    const query = encodeURIComponent(
      "select top 24 pl_name,hostname,disc_year,pl_orbper,pl_rade,pl_bmasse,sy_dist,discoverymethod from ps where default_flag=1 and disc_year is not null order by disc_year desc"
    );
    const res = await fetch(
      `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// This week's near-Earth asteroid close approaches (NASA NeoWs).
// Cached 6h so the DEMO_KEY rate limit is never an issue.
export async function getNeoWeek() {
  try {
    const start = new Date().toISOString().slice(0, 10);
    const res = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&api_key=${KEY}`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const rocks = Object.entries(data.near_earth_objects || {})
      .flatMap(([date, list]) =>
        list.map((o) => {
          const ap = o.close_approach_data?.[0];
          const dmin = o.estimated_diameter?.meters?.estimated_diameter_min || 0;
          const dmax = o.estimated_diameter?.meters?.estimated_diameter_max || 0;
          return {
            id: o.id,
            name: o.name.replace(/[()]/g, "").trim(),
            hazardous: o.is_potentially_hazardous_asteroid,
            date,
            meters: Math.round((dmin + dmax) / 2),
            lunar: ap ? +ap.miss_distance.lunar : null,
            kps: ap ? +ap.relative_velocity.kilometers_per_second : null
          };
        })
      )
      .filter((o) => o.lunar != null)
      .sort((a, b) => a.lunar - b.lunar)
      .slice(0, 6);
    return rocks.length ? rocks : null;
  } catch {
    return null;
  }
}
