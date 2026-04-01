# Travel Itinerary Generator

A multi-page travel website built with React, Vite, and TypeScript. It includes a package builder that geocodes destinations, fetches nearby points of interest, and generates a short structured itinerary for display in the UI.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Nominatim (OpenStreetMap) for geocoding
- Wikipedia GeoSearch for nearby POIs
- Google Places Autocomplete for enhanced destination suggestions when an API key is provided

## Features

- Responsive multi-page travel UI
- Home, About, Packages, and Tour detail pages
- Build-your-own package flow
- Destination autocomplete with Google Places and Nominatim fallback
- Generated itinerary output in a structured day-by-day format
- Graceful fallback activities when POI lookup fails
- Browser tab favicon support via `public/travel-vibe-logo.png`

## Routes

- `/`: Home page
- `/about`: About page
- `/create-package`: Build your own package page
- `/packages`: Packages archive page
- `/tour/information`: Tour information tab
- `/tour/plan`: Tour plan tab
- `/tour/location`: Tour location tab
- `/tour/gallery`: Tour gallery tab

## Getting Started

1. Install Node.js 18.18+ or 20+.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example` if you want Google Places autocomplete.

4. Add your Google Maps API key to `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

5. Start the development server:

```bash
npm run dev
```

6. Build for production:

```bash
npm run build
```

7. Preview the production build:

```bash
npm run preview
```

## Environment Variables

- `VITE_GOOGLE_MAPS_API_KEY`
  Optional. Enables Google Places autocomplete in the package builder.
  If it is missing, the app falls back to Nominatim suggestions where possible.

## Itinerary Generation

The package builder uses `src/services/itineraryGenerator.ts` to return a structured object in this shape:

```ts
{
  title: "Trip to Paris",
  summary: "A 2-day trip for 2 Adults focusing on Culture and Outdoors.",
  days: [
    {
      day: 1,
      activities: ["Visit Eiffel Tower", "Explore Louvre Museum"]
    },
    {
      day: 2,
      activities: ["Visit Arc de Triomphe", "Explore Notre-Dame de Paris"]
    }
  ]
}
```

Current behavior:

- Calculates trip duration from `startDate` and `endDate`
- Caps the generated itinerary to a maximum of `2` days
- Fetches nearby POIs from Wikipedia based on geocoded destination coordinates
- Distributes activities across the generated days with roughly `2-3` activities per day
- Falls back to generated local highlights if Wikipedia data is unavailable
- Returns a friendly error when dates are invalid or the destination cannot be found

## Project Structure

- `src/App.tsx`: Route definitions
- `src/pages/`: Page-level screens
- `src/components/`: Shared UI components
- `src/data/`: Static content and activity options
- `src/services/googlePlaces.ts`: Google Places autocomplete integration
- `src/services/nominatim.ts`: Destination suggestions and geocoding
- `src/services/wikipedia.ts`: Nearby POI lookup
- `src/services/itineraryGenerator.ts`: Final itinerary generation logic
- `src/types/itinerary.ts`: Shared itinerary-related types
- `src/utils/date.ts`: Date and duration helpers
- `public/`: Static assets including favicon and images

## Notes

- The package builder can still work without Google Places autocomplete.
- The generated itinerary is intentionally capped to 2 days to keep the current UI manageable.
