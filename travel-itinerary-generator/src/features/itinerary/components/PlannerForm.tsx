import { ACTIVITY_OPTIONS } from "../../../data/activityOptions";
import type { PlannerFormValues } from "../../../types/itinerary";
import { calculateTripDuration } from "../../../utils/date";

interface PlannerFormProps {
  values: PlannerFormValues;
  onFieldChange: <K extends keyof PlannerFormValues>(
    field: K,
    value: PlannerFormValues[K],
  ) => void;
  onToggleInterest: (interest: PlannerFormValues["interests"][number]) => void;
}

function PlannerForm({ values, onFieldChange, onToggleInterest }: PlannerFormProps) {
  const tripDuration = calculateTripDuration(values.startDate, values.endDate);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Build Your Own Package</h2>
        <p>
          This is the starter form shell. We can swap in the Figma layout details
          next without changing the core state structure.
        </p>
      </div>

      <div className="field-grid">
        <div className="field-row">
          <div className="field">
            <label htmlFor="origin">Origin</label>
            <input
              id="origin"
              name="origin"
              placeholder="e.g. New Delhi, India"
              type="text"
              value={values.origin}
              onChange={(event) => onFieldChange("origin", event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="destination">Destination</label>
            <input
              id="destination"
              name="destination"
              placeholder="e.g. Paris, France"
              type="text"
              value={values.destination}
              onChange={(event) => onFieldChange("destination", event.target.value)}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={values.startDate}
              onChange={(event) => onFieldChange("startDate", event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={values.endDate}
              onChange={(event) => onFieldChange("endDate", event.target.value)}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="guestCount">Guests</label>
            <input
              id="guestCount"
              name="guestCount"
              min={1}
              type="number"
              value={values.guestCount}
              onChange={(event) =>
                onFieldChange("guestCount", Math.max(1, Number(event.target.value) || 1))
              }
            />
          </div>

          <div className="field">
            <label htmlFor="travelStyle">Travel Style</label>
            <input
              id="travelStyle"
              name="travelStyle"
              placeholder="e.g. relaxed, family-friendly, food-first"
              type="text"
              value={values.travelStyle}
              onChange={(event) => onFieldChange("travelStyle", event.target.value)}
            />
          </div>
        </div>

        <fieldset className="field">
          <legend className="legend-label">Activity Preferences</legend>
          <div className="pill-grid">
            {ACTIVITY_OPTIONS.map((interest) => {
              const isActive = values.interests.includes(interest);

              return (
                <button
                  key={interest}
                  className={`pill${isActive ? " is-active" : ""}`}
                  type="button"
                  onClick={() => onToggleInterest(interest)}
                >
                  {interest}
                </button>
              );
            })}
          </div>
          <p className="field-hint">
            Multi-select is already wired so we can feed the API results into the
            itinerary builder later.
          </p>
        </fieldset>

        <div className="field">
          <label htmlFor="brief">Trip Brief</label>
          <textarea
            id="brief"
            name="brief"
            placeholder="Add a short summary of the travel style, pace, or must-see priorities."
            value={values.notes}
            onChange={(event) => onFieldChange("notes", event.target.value)}
          />
        </div>

        <div className="form-footer">
          <div>
            <strong>Live planning state</strong>
            <span>
              {tripDuration > 0
                ? `${tripDuration} itinerary day${tripDuration === 1 ? "" : "s"} detected`
                : "Choose valid dates to calculate the trip duration"}
            </span>
          </div>

          <span className="footer-badge">Ready for API wiring</span>
        </div>
      </div>
    </section>
  );
}

export default PlannerForm;
