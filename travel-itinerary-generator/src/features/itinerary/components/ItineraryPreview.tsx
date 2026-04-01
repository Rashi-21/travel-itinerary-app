import type { PlannerFormValues } from "../../../types/itinerary";
import { formatDateRange, calculateTripDuration } from "../../../utils/date";
import { buildDraftItinerary } from "../../../utils/itinerary";

interface ItineraryPreviewProps {
  values: PlannerFormValues;
}

function ItineraryPreview({ values }: ItineraryPreviewProps) {
  const draftItinerary = buildDraftItinerary(values);
  const duration = calculateTripDuration(values.startDate, values.endDate);

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Itinerary Preview</h2>
        <p>
          This side is ready for the generated results panel. For now it shows a
          deterministic draft so we can build the UI before plugging in the APIs.
        </p>
      </div>

      <div className="preview-meta">
        <div className="meta-card">
          <span className="meta-label">Destination</span>
          <strong>{values.destination || "Choose a destination"}</strong>
        </div>
        <div className="meta-card">
          <span className="meta-label">Dates</span>
          <strong>{formatDateRange(values.startDate, values.endDate)}</strong>
        </div>
        <div className="meta-card">
          <span className="meta-label">Trip Length</span>
          <strong>{duration > 0 ? `${duration} days` : "Waiting for dates"}</strong>
        </div>
      </div>

      {!draftItinerary ? (
        <div className="empty-state">
          <h3>Start filling the form to generate the trip plan.</h3>
          <p>
            Once a destination and valid dates are selected, we can render the
            day-by-day itinerary cards here.
          </p>
        </div>
      ) : (
        <>
          <div className="summary-card">
            <h3>{draftItinerary.summary}</h3>
            <p>{draftItinerary.tripNotes}</p>
          </div>

          <div className="days-stack">
            {draftItinerary.days.map((day) => (
              <article key={day.day} className="day-card">
                <div className="day-card-header">
                  <div>
                    <span className="day-index">Day {day.day}</span>
                  </div>
                  <div>
                    <h3>{day.theme}</h3>
                    <p>{values.destination} itinerary block</p>
                  </div>
                </div>

                <ul className="day-list">
                  {day.activities.map((activity) => (
                    <li key={`${day.day}-${activity.title}`} className="activity-item">
                      <strong>{activity.title}</strong>
                      <span>{activity.detail}</span>
                      <span className="activity-category">{activity.category}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ItineraryPreview;
