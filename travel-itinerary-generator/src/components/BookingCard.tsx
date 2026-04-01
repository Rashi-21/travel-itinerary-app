function BookingCard() {
  return (
    <aside className="booking-card">
      <h3>Book This Tour</h3>
      <p>
        A polished inquiry panel that mirrors the booking card shown in the
        references.
      </p>

      <div className="booking-card__fields">
        <input placeholder="Name" type="text" />
        <input placeholder="Email" type="email" />
        <input placeholder="Confirm Email" type="email" />
        <input placeholder="Phone" type="tel" />
        <input placeholder="dd-mm-yy" type="text" />
        <input placeholder="Number of ticket" type="number" />
        <textarea placeholder="Message" rows={4} />
      </div>

      <div className="booking-card__actions">
        <button className="button button--ghost" type="button">
          Check Availability
        </button>
        <button className="button" type="button">
          Book Now
        </button>
      </div>
    </aside>
  );
}

export default BookingCard;
