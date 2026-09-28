import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("car_bookings")
      .select("*")
      .order("booked_at", { ascending: false });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to retrieve bookings");
      return;
    }

    setBookings(data);
  }

  async function cancelBooking(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    const { error } = await supabase
      .from("car_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to cancel booking");
      return;
    }

    loadBookings();
  }

  return (
    <main className="history-page">
      <h1>My Bookings</h1>

      <button className="btn btn-secondary" onClick={loadBookings} style={{ marginBottom: "24px" }}>
        🔄 Refresh
      </button>

      {loading ? (
        <div className="empty-state">
          <span className="empty-icon">⏳</span>
          <h3>Loading bookings...</h3>
        </div>
      ) : bookings.length === 0 ? (
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
                <span className="booking-type">{b.car_type}</span>
              </div>
              <div className="booking-details">
                <p><strong>Name:</strong> {b.name}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>Pickup:</strong> {b.pickup_location}</p>
                <p><strong>Dates:</strong> {b.pickup_date} → {b.return_date} ({b.days} days)</p>
                <p><strong>Total:</strong> ₹{Number(b.total_cost).toLocaleString()}</p>
                <p className="booked-at">Booked on {new Date(b.booked_at).toLocaleString()}</p>
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
