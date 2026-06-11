const KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getApod() {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${KEY}&thumbs=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

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
