const GOOGLE_MAPS_SCRIPT_ID = "google-maps-places-script";

interface GooglePlacesAutocompleteResponse {
  suggestions?: Array<{
    placePrediction?: {
      text?: {
        toString(): string;
      };
    };
  }>;
}

export interface GooglePlaceSuggestion {
  text: string;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        importLibrary?: (libraryName: string) => Promise<{
          AutocompleteSessionToken?: new () => unknown;
          AutocompleteSuggestion?: {
            fetchAutocompleteSuggestions: (
              request: Record<string, unknown>,
            ) => Promise<GooglePlacesAutocompleteResponse>;
          };
        }>;
      };
    };
  }
}

let googleMapsLoadPromise: Promise<void> | null = null;

async function loadGoogleMapsPlacesApi(): Promise<void> {
  if (window.google?.maps?.importLibrary) {
    return;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Add VITE_GOOGLE_MAPS_API_KEY in your environment to enable Google place suggestions.",
    );
  }

  if (googleMapsLoadPromise) {
    return googleMapsLoadPromise;
  }

  googleMapsLoadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      GOOGLE_MAPS_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true" || window.google?.maps?.importLibrary) {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Google Maps could not be loaded.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}` +
      "&loading=async&libraries=places&v=weekly";

    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => reject(new Error("Google Maps could not be loaded.")),
      { once: true },
    );

    document.head.appendChild(script);
  });

  return googleMapsLoadPromise;
}

async function getPlacesLibrary() {
  await loadGoogleMapsPlacesApi();

  if (!window.google?.maps?.importLibrary) {
    throw new Error("Google Places library is unavailable.");
  }

  return window.google.maps.importLibrary("places");
}

export async function createGooglePlacesSessionToken(): Promise<unknown> {
  const library = await getPlacesLibrary();

  if (!library.AutocompleteSessionToken) {
    throw new Error("Google Places session tokens are unavailable.");
  }

  return new library.AutocompleteSessionToken();
}

export async function fetchGooglePlaceSuggestions(
  input: string,
  sessionToken: unknown,
): Promise<GooglePlaceSuggestion[]> {
  if (!input.trim()) {
    return [];
  }

  const library = await getPlacesLibrary();

  if (!library.AutocompleteSuggestion?.fetchAutocompleteSuggestions) {
    throw new Error("Google autocomplete suggestions are unavailable.");
  }

  const { suggestions } = await library.AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    sessionToken,
    language: "en-US",
  });

  const uniqueTexts = Array.from(
    new Set(
      (suggestions ?? [])
        .map((suggestion) => suggestion.placePrediction?.text?.toString() ?? "")
        .filter(Boolean),
    ),
  );

  return uniqueTexts.map((text) => ({ text }));
}
