# Travel Itinerary Generator

Multi-page React + Vite + TypeScript implementation inspired by the provided travel Figma screens.

## Quick Start

1. Install Node.js 18.18+ or Node.js 20+.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

## Routes

- `/`: Home page
- `/create-package`: Build your own package page
- `/about`: About page
- `/packages`: Packages archive page
- `/tour/information`: Tour information page
- `/tour/plan`: Tour plan page
- `/tour/location`: Tour location page
- `/tour/gallery`: Tour gallery page

## Current Structure

- `src/App.tsx`: route map
- `src/pages/*`: page-level screens
- `src/components/*`: shared layout and UI pieces
- `src/data/siteContent.ts`: travel mock content and remote image references
- `src/services/nominatim.ts`: OpenStreetMap geocoding helper
- `src/services/wikipedia.ts`: Wikipedia geosearch helper
- `src/utils/date.ts`: date and duration helpers
- `src/utils/itinerary.ts`: itinerary preview generator for the builder page

## Notes

- The APIs in this assignment are public, so no environment variables are required yet.
- Node and npm were not available in the current shell when this scaffold was created, so dependencies have not been installed yet.
