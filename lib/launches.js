export async function getUpcomingLaunches(limit = 5) {
  try {
    const res = await fetch(
      `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&mode=list`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}
