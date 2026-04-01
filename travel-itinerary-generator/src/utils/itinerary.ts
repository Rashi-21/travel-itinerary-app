import { ACTIVITY_OPTIONS } from "../data/activityOptions";
import type {
  ActivityCategory,
  DraftItinerary,
  ItineraryActivity,
  PlannerFormValues,
} from "../types/itinerary";
import { calculateTripDuration } from "./date";

const activityTemplates: Record<ActivityCategory, ItineraryActivity[]> = {
  Culture: [
    {
      title: "Walk through the historic core",
      detail: "Anchor the day around signature architecture, museums, and local storytelling.",
      category: "Culture",
    },
    {
      title: "Reserve a landmark visit",
      detail: "Prioritize one must-see attraction to avoid rushing through the trip.",
      category: "Culture",
    },
  ],
  Food: [
    {
      title: "Try a neighborhood food crawl",
      detail: "Mix one local favorite with one crowd-pleasing stop for balance.",
      category: "Food",
    },
    {
      title: "Book a sunset dinner",
      detail: "Use the evening for a memorable meal with a view or signature cuisine.",
      category: "Food",
    },
  ],
  Outdoors: [
    {
      title: "Explore a scenic outdoor route",
      detail: "Add a park, viewpoint, or waterfront stretch for a lighter travel day.",
      category: "Outdoors",
    },
    {
      title: "Visit a nature-forward point of interest",
      detail: "Great for balancing dense sightseeing with open-air time.",
      category: "Outdoors",
    },
  ],
  Relaxing: [
    {
      title: "Keep the morning intentionally slow",
      detail: "Leave room for a spa, cafe stop, or easy neighborhood wandering.",
      category: "Relaxing",
    },
    {
      title: "Plan a relaxed evening reset",
      detail: "A lighter final activity helps the itinerary feel realistic, not overpacked.",
      category: "Relaxing",
    },
  ],
  Shopping: [
    {
      title: "Browse local shops and markets",
      detail: "Mix one design-forward street with one practical shopping stop.",
      category: "Shopping",
    },
    {
      title: "Set aside time for souvenirs",
      detail: "Cluster this with another nearby attraction to reduce backtracking.",
      category: "Shopping",
    },
  ],
  Romantic: [
    {
      title: "Add one intimate signature stop",
      detail: "Use viewpoints, scenic dinners, or quiet promenades to create a stronger mood.",
      category: "Romantic",
    },
    {
      title: "Balance pace with a softer evening",
      detail: "Romantic itineraries feel more premium when one moment is saved for sunset.",
      category: "Romantic",
    },
  ],
};

function getActivityTemplate(category: ActivityCategory): ItineraryActivity[] {
  if (activityTemplates[category]) {
    return activityTemplates[category];
  }

  return [
    {
      title: `Explore ${category.toLowerCase()} highlights`,
      detail: `Add one well-chosen ${category.toLowerCase()} stop to keep the day focused and realistic.`,
      category,
    },
    {
      title: `Pair ${category.toLowerCase()} with a nearby landmark`,
      detail: "Grouping experiences by area will make the package feel smoother and more premium.",
      category,
    },
  ];
}

function fallbackInterests(interests: ActivityCategory[]): ActivityCategory[] {
  if (interests.length > 0) {
    return interests;
  }

  return ACTIVITY_OPTIONS.slice(0, 2);
}

export function buildDraftItinerary(values: PlannerFormValues): DraftItinerary | null {
  const duration = calculateTripDuration(values.startDate, values.endDate);

  if (!values.destination || duration === 0) {
    return null;
  }

  const interests = fallbackInterests(values.interests);
  const days = Array.from({ length: duration }, (_, index) => {
    const firstInterest = interests[index % interests.length];
    const secondInterest = interests[(index + 1) % interests.length];
    const firstTemplates = getActivityTemplate(firstInterest);
    const secondTemplates = getActivityTemplate(secondInterest);

    return {
      day: index + 1,
      theme: `${firstInterest} + ${secondInterest} focus`,
      activities: [
        firstTemplates[index % firstTemplates.length],
        secondTemplates[(index + 1) % secondTemplates.length],
      ],
    };
  });

  const travelerLabel = values.guestCount === 1 ? "traveler" : "travelers";

  return {
    summary: `${duration}-day ${values.destination} trip for ${values.guestCount} ${travelerLabel}.`,
    tripNotes:
      values.notes.trim() ||
      `Starter preview built around ${values.travelStyle || "balanced"} pacing and ${interests
        .join(", ")
        .toLowerCase()} preferences.`,
    days,
  };
}
