import type { Coordinates } from "../types/itinerary";

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function fetchNominatimSuggestions(input: string): Promise<string[]> {
  if (!input.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    q: input,
    format: "json",
    limit: "5",
    addressdetails: "0",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Unable to load destination suggestions.");
  }

  const results = (await response.json()) as NominatimResult[];

  return Array.from(
    new Set(results.map((result) => result.display_name).filter(Boolean)),
  );
}

export async function geocodeDestination(
  destination: string,
): Promise<(Coordinates & { label: string }) | null> {
  if (!destination.trim()) {
    return null;
  }

  const params = new URLSearchParams({
    q: destination,
    format: "json",
    limit: "1",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Unable to geocode the selected destination.");
  }

  const results = (await response.json()) as NominatimResult[];
  const [firstResult] = results;

  if (!firstResult) {
    return null;
  }

  return {
    latitude: Number(firstResult.lat),
    longitude: Number(firstResult.lon),
    label: firstResult.display_name,
  };
}
