import { useState, useEffect } from "react";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  function loadBookings() {
    const data = JSON.parse(localStorage.getItem("carBookings") || "[]");
    setBookings(data.reverse());
  }

  function cancelBooking(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const data = JSON.parse(localStorage.getItem("carBookings") || "[]");
    const updated = data.filter((b) => b.id !== id);
    localStorage.setItem("carBookings", JSON.stringify(updated));
    loadBookings();
  }

  return (
    <main className="history-page">
      <h1>My Bookings</h1>

      <button className="btn btn-secondary" onClick={loadBookings} style={{ marginBottom: "24px" }}>
        🔄 Refresh
      </button>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h3>No bookings yet</h3>
          <p>Your booking history will appear here once you book a car.</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>🚗 {b.car}</h3>
                <span className="booking-type">{b.carType}</span>
              </div>
              <div className="booking-details">
                <p><strong>Name:</strong> {b.name}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>Pickup:</strong> {b.pickupLocation}</p>
                <p><strong>Dates:</strong> {b.pickupDate} → {b.returnDate} ({b.days} days)</p>
                <p><strong>Total:</strong> ₹{b.totalCost?.toLocaleString()}</p>
                <p className="booked-at">Booked on {new Date(b.bookedAt).toLocaleString()}</p>
              </div>
              <button className="btn btn-danger" onClick={() => cancelBooking(b.id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default BookingHistory;
