import type { BuildPackageInput, GeneratedItinerary } from "../types/itinerary";
import { calculateTripDuration } from "../utils/date";
import { geocodeDestination } from "./nominatim";
import { fetchNearbyPointsOfInterest } from "./wikipedia";

const MAX_DURATION_DAYS = 2;
const MAX_ACTIVITIES_PER_DAY = 3;
const MIN_ACTIVITIES_PER_DAY = 2;

function formatList(items: string[]): string {
  if (items.length === 0) {
    return "curated local highlights";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function uniqueTitles(titles: string[]): string[] {
  const seen = new Set<string>();

  return titles.filter((title) => {
    const normalizedTitle = title.trim().toLowerCase();

    if (!normalizedTitle || seen.has(normalizedTitle)) {
      return false;
    }

    seen.add(normalizedTitle);
    return true;
  });
}

function createFallbackActivities(destination: string): string[] {
  return [
    `Explore the local highlights of ${destination}`,
    `Visit a landmark near ${destination}`,
    `Discover scenic corners around ${destination}`,
    `Walk through a popular neighborhood in ${destination}`,
    `Stop by a notable cultural spot in ${destination}`,
    `Take in a signature viewpoint in ${destination}`,
  ];
}

async function fetchPoiTitles(
  latitude: number,
  longitude: number,
  primaryDestination: string,
): Promise<string[]> {
  try {
    const poiItems = await fetchNearbyPointsOfInterest(latitude, longitude, 50);

    return uniqueTitles(
      poiItems
        .map((item) => item.title)
        .filter((title) => title.trim().toLowerCase() !== primaryDestination.toLowerCase()),
    );
  } catch {
    return [];
  }
}

function distributeActivities(titles: string[], duration: number): string[][] {
  const totalTargetActivities = Math.min(
    duration * MAX_ACTIVITIES_PER_DAY,
    Math.max(duration * MIN_ACTIVITIES_PER_DAY, titles.length),
  );
  const selectedTitles = titles.slice(0, totalTargetActivities);
  const distributed: string[][] = [];
  let cursor = 0;

  for (let dayIndex = 0; dayIndex < duration; dayIndex += 1) {
    const remainingDays = duration - dayIndex;
    const remainingActivities = selectedTitles.length - cursor;
    const activitiesForDay = Math.ceil(remainingActivities / remainingDays);
    const safeCount = Math.min(MAX_ACTIVITIES_PER_DAY, Math.max(1, activitiesForDay));

    distributed.push(selectedTitles.slice(cursor, cursor + safeCount));
    cursor += safeCount;
  }

  return distributed;
}

export async function generateTravelItinerary(
  input: BuildPackageInput,
): Promise<GeneratedItinerary> {
  const destinations = input.destinations.map((destination) => destination.trim()).filter(Boolean);

  if (destinations.length === 0) {
    throw new Error("Add at least one destination before building the package.");
  }

  const duration = Math.min(calculateTripDuration(input.startDate, input.endDate), MAX_DURATION_DAYS);

  if (duration === 0) {
    throw new Error("Enter a valid start date and end date in YYYY-MM-DD format.");
  }

  const primaryDestination = destinations[destinations.length - 1] ?? destinations[0];
  let location;

  try {
    location = await geocodeDestination(primaryDestination);
  } catch {
    throw new Error("We couldn't look up that destination right now. Please try again.");
  }

  if (!location) {
    throw new Error(`We couldn't find "${primaryDestination}". Try a more specific destination.`);
  }

  const poiTitles = await fetchPoiTitles(
    location.latitude,
    location.longitude,
    primaryDestination,
  );

  const paddedTitles = uniqueTitles([
    ...poiTitles,
    ...createFallbackActivities(primaryDestination),
  ]);
  const activitiesByDay = distributeActivities(paddedTitles, duration);
  const focusText = formatList(input.preferences);

  return {
    title: `Trip to ${primaryDestination}`,
    summary: `A ${duration}-day trip for ${input.guests} focusing on ${focusText}.`,
    days: activitiesByDay.map((activities, index) => ({
      day: index + 1,
      activities,
    })),
  };
}
