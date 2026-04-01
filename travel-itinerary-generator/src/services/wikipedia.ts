interface WikipediaGeoSearchItem {
  title: string;
  pageid: number;
  lat: number;
  lon: number;
  dist: number;
}

interface WikipediaGeoSearchResponse {
  query?: {
    geosearch?: WikipediaGeoSearchItem[];
  };
}

export async function fetchNearbyPointsOfInterest(
  latitude: number,
  longitude: number,
  limit = 10,
): Promise<WikipediaGeoSearchItem[]> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    list: "geosearch",
    gscoord: `${latitude}|${longitude}`,
    gsradius: "10000",
    gslimit: String(limit),
  });

  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Unable to fetch nearby points of interest.");
  }

  const payload = (await response.json()) as WikipediaGeoSearchResponse;

  return payload.query?.geosearch ?? [];
}
