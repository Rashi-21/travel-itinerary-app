export type ActivityCategory = string;

export type ItineraryCategory = string;

export interface PlannerFormValues {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  travelStyle: string;
  interests: ActivityCategory[];
  notes: string;
}

export interface ItineraryActivity {
  title: string;
  detail: string;
  category: ItineraryCategory;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  activities: ItineraryActivity[];
}

export interface DraftItinerary {
  summary: string;
  tripNotes: string;
  days: ItineraryDay[];
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface BuildPackageInput {
  destinations: string[];
  startDate: string;
  endDate: string;
  guests: string;
  preferences: string[];
  options: string[];
}

export interface GeneratedItineraryDay {
  day: number;
  activities: string[];
}

export interface GeneratedItinerary {
  title: string;
  summary: string;
  days: GeneratedItineraryDay[];
}
