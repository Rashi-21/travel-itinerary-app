import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";
import { ACTIVITY_OPTIONS } from "../data/activityOptions";
import { scenicImages, services } from "../data/siteContent";
import {
  createGooglePlacesSessionToken,
  fetchGooglePlaceSuggestions,
  type GooglePlaceSuggestion,
} from "../services/googlePlaces";
import { generateTravelItinerary } from "../services/itineraryGenerator";
import { fetchNominatimSuggestions } from "../services/nominatim";
import type { BuildPackageInput, GeneratedItinerary } from "../types/itinerary";

interface BuilderFormState {
  destinations: string[];
  startDate: string;
  endDate: string;
  guestCount: number;
  selections: string[];
}

const OPTION_SELECTIONS = new Set(["Guide", "Healthcare", "Accomodation"]);

const initialValues: BuilderFormState = {
  destinations: ["Switzerland", "Lauterbrunnen"],
  startDate: "",
  endDate: "",
  guestCount: 2,
  selections: ["Business", "Guide", "Healthcare", "Accomodation"],
};

function CreatePackagePage() {
  const [values, setValues] = useState<BuilderFormState>(initialValues);
  const [generatedTrip, setGeneratedTrip] = useState<GeneratedItinerary | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeDestinationIndex, setActiveDestinationIndex] = useState<number | null>(null);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    Record<number, GooglePlaceSuggestion[]>
  >({});
  const [autocompleteError, setAutocompleteError] = useState("");
  const [loadingDestinationIndex, setLoadingDestinationIndex] = useState<number | null>(null);
  const blurTimeoutRef = useRef<number | null>(null);
  const latestAutocompleteRequestRef = useRef(0);
  const sessionTokensRef = useRef<Record<number, unknown>>({});

  const activeDestinationValue =
    activeDestinationIndex === null ? "" : values.destinations[activeDestinationIndex] ?? "";

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current !== null) {
        window.clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeDestinationIndex === null) {
      return;
    }

    const query = activeDestinationValue.trim();

    if (query.length < 2) {
      setAutocompleteError("");
      setLoadingDestinationIndex((currentIndex) =>
        currentIndex === activeDestinationIndex ? null : currentIndex,
      );
      setDestinationSuggestions((currentSuggestions) => ({
        ...currentSuggestions,
        [activeDestinationIndex]: [],
      }));
      return;
    }

    const requestId = latestAutocompleteRequestRef.current + 1;
    latestAutocompleteRequestRef.current = requestId;
    let isCancelled = false;

    const timeoutId = window.setTimeout(async () => {
      setAutocompleteError("");
      setLoadingDestinationIndex(activeDestinationIndex);

      try {
        let sessionToken = sessionTokensRef.current[activeDestinationIndex];

        if (!sessionToken) {
          sessionToken = await createGooglePlacesSessionToken();
          sessionTokensRef.current[activeDestinationIndex] = sessionToken;
        }

        const suggestions = await fetchGooglePlaceSuggestions(query, sessionToken);

        if (isCancelled || requestId !== latestAutocompleteRequestRef.current) {
          return;
        }

        setDestinationSuggestions((currentSuggestions) => ({
          ...currentSuggestions,
          [activeDestinationIndex]: suggestions,
        }));
      } catch (error) {
        try {
          const fallbackSuggestions = await fetchNominatimSuggestions(query);

          if (isCancelled || requestId !== latestAutocompleteRequestRef.current) {
            return;
          }

          setDestinationSuggestions((currentSuggestions) => ({
            ...currentSuggestions,
            [activeDestinationIndex]: fallbackSuggestions.map((text) => ({ text })),
          }));
          setAutocompleteError("");
        } catch (fallbackError) {
          if (isCancelled || requestId !== latestAutocompleteRequestRef.current) {
            return;
          }

          setDestinationSuggestions((currentSuggestions) => ({
            ...currentSuggestions,
            [activeDestinationIndex]: [],
          }));
          setAutocompleteError(
            fallbackError instanceof Error
              ? fallbackError.message
              : error instanceof Error
                ? error.message
                : "Suggestions are unavailable right now. Please keep typing manually.",
          );
        }
      } finally {
        if (!isCancelled && requestId === latestAutocompleteRequestRef.current) {
          setLoadingDestinationIndex((currentIndex) =>
            currentIndex === activeDestinationIndex ? null : currentIndex,
          );
        }
      }
    }, 250);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [activeDestinationIndex, activeDestinationValue]);

  function updateField<K extends keyof BuilderFormState>(
    field: K,
    value: BuilderFormState[K],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  function updateDestination(index: number, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      destinations: currentValues.destinations.map((destination, destinationIndex) =>
        destinationIndex === index ? value : destination,
      ),
    }));
  }

  function clearDestinationSuggestions(index: number) {
    setDestinationSuggestions((currentSuggestions) => ({
      ...currentSuggestions,
      [index]: [],
    }));
  }

  function cancelSuggestionClose() {
    if (blurTimeoutRef.current !== null) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
  }

  function handleDestinationFocus(index: number) {
    cancelSuggestionClose();
    setActiveDestinationIndex(index);
    setAutocompleteError("");
  }

  function handleDestinationBlur(index: number) {
    blurTimeoutRef.current = window.setTimeout(() => {
      setActiveDestinationIndex((currentIndex) =>
        currentIndex === index ? null : currentIndex,
      );
    }, 120);
  }

  function handleDestinationInputChange(index: number, value: string) {
    updateDestination(index, value);
    setActiveDestinationIndex(index);
    setAutocompleteError("");

    if (value.trim().length < 2) {
      clearDestinationSuggestions(index);
    }
  }

  function selectDestinationSuggestion(index: number, suggestion: GooglePlaceSuggestion) {
    cancelSuggestionClose();
    updateDestination(index, suggestion.text);
    clearDestinationSuggestions(index);
    setActiveDestinationIndex(null);
    setAutocompleteError("");
    delete sessionTokensRef.current[index];
  }

  function addDestination() {
    setValues((currentValues) => ({
      ...currentValues,
      destinations: [...currentValues.destinations, ""],
    }));
  }

  function toggleSelection(selection: string) {
    setValues((currentValues) => {
      const nextSelections = currentValues.selections.includes(selection)
        ? currentValues.selections.filter((item) => item !== selection)
        : [...currentValues.selections, selection];

      return {
        ...currentValues,
        selections: nextSelections,
      };
    });
  }

  function getGuestLabel(guestCount: number) {
    return `${guestCount} ${guestCount === 1 ? "Adult" : "Adults"}`;
  }

  function handleStartDateChange(startDate: string) {
    setValues((currentValues) => ({
      ...currentValues,
      startDate,
      endDate:
        currentValues.endDate && startDate && currentValues.endDate < startDate
          ? ""
          : currentValues.endDate,
    }));
  }

  function handleEndDateChange(endDate: string) {
    setValues((currentValues) => ({
      ...currentValues,
      endDate:
        currentValues.startDate && endDate && endDate < currentValues.startDate
          ? currentValues.startDate
          : endDate,
    }));
  }

  function buildRequest(formValues: BuilderFormState): BuildPackageInput {
    const destinations = formValues.destinations
      .map((destination) => destination.trim())
      .filter(Boolean);
    const preferences = formValues.selections.filter(
      (selection) => !OPTION_SELECTIONS.has(selection),
    );
    const options = formValues.selections.filter((selection) => OPTION_SELECTIONS.has(selection));

    return {
      destinations,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      guests: getGuestLabel(formValues.guestCount),
      preferences,
      options,
    };
  }

  async function handleBuildPackage() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const nextTrip = await generateTravelItinerary(buildRequest(values));
      setGeneratedTrip(nextTrip);
    } catch (error) {
      setGeneratedTrip(null);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to build the package right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="site-page">
      <HeroBanner
        backgroundImage={scenicImages.packageBuilder}
        size="hero"
        className="builder-page"
        title=""
      >
        <div className="builder-modal">
          <div className="builder-modal__header">
            <h2>Build Your Own Package</h2>
            <button aria-label="Close dialog" className="builder-modal__close" type="button">
              &times;
            </button>
          </div>

          <div className="builder-modal__form">
            {values.destinations.map((destination, index) => (
              <div
                key={`destination-${index}`}
                className="builder-field builder-field--autocomplete"
              >
                <label className="builder-field__label" htmlFor={`destination-${index}`}>
                  Enter destination (country, region or city)
                </label>
                <div className="builder-field__control-wrap">
                  <div className="builder-field__control">
                    <input
                      aria-autocomplete="list"
                      aria-controls={`destination-suggestions-${index}`}
                      aria-expanded={activeDestinationIndex === index}
                      autoComplete="off"
                      id={`destination-${index}`}
                      type="text"
                      value={destination}
                      onBlur={() => handleDestinationBlur(index)}
                      onChange={(event) => handleDestinationInputChange(index, event.target.value)}
                      onFocus={() => handleDestinationFocus(index)}
                    />
                    <span className="builder-field__icon" aria-hidden="true">
                      i
                    </span>
                  </div>

                  {activeDestinationIndex === index &&
                  (destination.trim().length >= 2 ||
                    loadingDestinationIndex === index ||
                    Boolean(autocompleteError)) ? (
                    <div
                      id={`destination-suggestions-${index}`}
                      className="builder-field__suggestions"
                      role="listbox"
                    >
                      {loadingDestinationIndex === index ? (
                        <p className="builder-field__suggestion-state">Searching places...</p>
                      ) : null}

                      {loadingDestinationIndex !== index && autocompleteError ? (
                        <p className="builder-field__suggestion-state builder-field__suggestion-state--error">
                          {autocompleteError}
                        </p>
                      ) : null}

                      {loadingDestinationIndex !== index &&
                      !autocompleteError &&
                      (destinationSuggestions[index] ?? []).length === 0 ? (
                        <p className="builder-field__suggestion-state">
                          No matching places found.
                        </p>
                      ) : null}

                      {loadingDestinationIndex !== index && !autocompleteError
                        ? (destinationSuggestions[index] ?? []).map((suggestion) => (
                            <button
                              key={`${index}-${suggestion.text}`}
                              className="builder-field__suggestion"
                              role="option"
                              type="button"
                              onMouseDown={(event) => {
                                event.preventDefault();
                                selectDestinationSuggestion(index, suggestion);
                              }}
                            >
                              {suggestion.text}
                            </button>
                          ))
                        : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            <button className="builder-modal__add" type="button" onClick={addDestination}>
              + Add destination
            </button>

            <div className="builder-modal__split">
              <label className="builder-modal__split-card builder-modal__split-card--dates">
                <span className="builder-field__label">Date Range</span>
                <div className="builder-date-range">
                  <div className="builder-date-input">
                    {!values.startDate ? (
                      <span className="builder-date-input__placeholder">Start Date</span>
                    ) : null}
                    <input
                      aria-label="Start date"
                      className={!values.startDate ? "builder-date-input__control--empty" : ""}
                      type="date"
                      value={values.startDate}
                      onChange={(event) => handleStartDateChange(event.target.value)}
                    />
                  </div>
                  <span className="builder-date-range__arrow">&rarr;</span>
                  <div className="builder-date-input">
                    {!values.endDate ? (
                      <span className="builder-date-input__placeholder">End Date</span>
                    ) : null}
                    <input
                      aria-label="End date"
                      className={!values.endDate ? "builder-date-input__control--empty" : ""}
                      min={values.startDate || undefined}
                      type="date"
                      value={values.endDate}
                      onChange={(event) => handleEndDateChange(event.target.value)}
                    />
                  </div>
                </div>
              </label>

              <label className="builder-modal__split-card builder-modal__split-card--guests">
                <span className="builder-field__label">Guests</span>
                <div className="builder-guest-select">
                  <select
                    value={values.guestCount}
                    onChange={(event) => updateField("guestCount", Number(event.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((guestCount) => (
                      <option key={guestCount} value={guestCount}>
                        {getGuestLabel(guestCount)}
                      </option>
                    ))}
                  </select>
                  <span className="builder-guest-select__value" aria-hidden="true">
                    {getGuestLabel(values.guestCount)}
                  </span>
                  <span className="builder-guest-select__caret" aria-hidden="true" />
                </div>
              </label>
            </div>

            <div className="builder-modal__preferences">
              <span className="builder-modal__preferences-label">
                Activities preferences (optional)
              </span>
              <div className="builder-modal__checks">
                {ACTIVITY_OPTIONS.map((option) => (
                  <label key={option} className="builder-check">
                    <input
                      checked={values.selections.includes(option)}
                      type="checkbox"
                      onChange={() => toggleSelection(option)}
                    />
                    <span className="builder-check__box" aria-hidden="true">
                      {values.selections.includes(option) ? "\u2713" : ""}
                    </span>
                    <span className="builder-check__label">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="button builder-modal__submit"
              disabled={isLoading}
              type="button"
              onClick={handleBuildPackage}
            >
              {isLoading ? "Building..." : "Build Package"}
            </button>

            {errorMessage ? <p className="builder-modal__status">{errorMessage}</p> : null}
          </div>
        </div>
      </HeroBanner>

      <section className="partner-strip partner-strip--image">
        <img
          alt="Travel partners including Emirates, trivago, airbnb, Turkish Airlines, and SWISS"
          className="partner-strip__image"
          src="/partners-strip.png"
        />
      </section>

      <main className="content-shell content-shell--stacked">
        <section className="content-block">
          <SectionTitle
            eyebrow="Best Services"
            title="We Offer Best Services"
            description="The package builder page keeps the hero composition from the reference while adding a real itinerary preview section below."
            align="center"
          />
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <span className="service-card__icon">{service.title.charAt(0)}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        {generatedTrip ? (
          <section className="content-block preview-panel">
            <SectionTitle
              eyebrow="Generated Package"
              title={generatedTrip.title}
              description={generatedTrip.summary}
            />

            <div className="preview-days">
              {generatedTrip.days.map((day) => (
                <article key={day.day} className="preview-day-card">
                  <span className="preview-day-card__index">Day {day.day}</span>
                  <h3>{`Activities for Day ${day.day}`}</h3>
                  <ul>
                    {day.activities.map((activity) => (
                      <li key={`${day.day}-${activity}`}>
                        <strong>{activity}</strong>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}

export default CreatePackagePage;
