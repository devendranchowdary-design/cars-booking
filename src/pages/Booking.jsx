import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const carState = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedCar, setSelectedCar] = useState(carState.carName || "");
  const [loading, setLoading] = useState(false);

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const days = calculateDays();
  const totalCost = days * (carState.pricePerDay || 0);

  async function handleBooking() {
    if (!name || !phone || !pickupDate || !returnDate || !pickupLocation || !selectedCar) {
      alert("Please fill all the details");
      return;
    }

    if (days <= 0) {
      alert("Return date must be after pickup date");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("car_bookings")
      .insert([
        {
          name: name,
          phone: phone,
          car: selectedCar,
          car_type: carState.carType || "N/A",
          pickup_date: pickupDate,
          return_date: returnDate,
          pickup_location: pickupLocation,
          days: days,
          price_per_day: carState.pricePerDay || 0,
          total_cost: totalCost,
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Booking failed. Please try again.");
      return;
    }

    alert(`🎉 Booking confirmed!\n\nCar: ${selectedCar}\nDays: ${days}\nTotal: ₹${totalCost.toLocaleString()}`);
    navigate("/history");
  }

  return (
    <main className="booking-page">
      <h1>Book Your Ride</h1>

      {carState.carName && (
        <div className="selected-car-banner">
          <span>🚗</span>
          <div>
            <strong>{carState.carName}</strong>
            <p>{carState.carType} • {carState.seats} seats • {carState.fuel} • {carState.transmission} • ₹{carState.pricePerDay?.toLocaleString()}/day</p>
          </div>
        </div>
      )}

      <div className="booking-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Selected Car</label>
          <input
            type="text"
            placeholder="Car name"
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
            readOnly={!!carState.carName}
          />
        </div>

        <div className="form-group">
          <label>Pickup Location</label>
          <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
            <option value="">Select location</option>
            <option value="Hyderabad - Gachibowli">Hyderabad - Gachibowli</option>
            <option value="Hyderabad - Hitech City">Hyderabad - Hitech City</option>
            <option value="Hyderabad - Begumpet">Hyderabad - Begumpet</option>
            <option value="Bangalore - Koramangala">Bangalore - Koramangala</option>
            <option value="Bangalore - Whitefield">Bangalore - Whitefield</option>
            <option value="Chennai - T Nagar">Chennai - T Nagar</option>
            <option value="Mumbai - Andheri">Mumbai - Andheri</option>
            <option value="Delhi - Connaught Place">Delhi - Connaught Place</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>

        {days > 0 && carState.pricePerDay && (
          <div className="cost-summary">
            <div className="cost-row">
              <span>Duration</span>
              <span>{days} day{days > 1 ? 's' : ''}</span>
            </div>
            <div className="cost-row">
              <span>Rate</span>
              <span>₹{carState.pricePerDay.toLocaleString()} / day</span>
            </div>
            <div className="cost-row cost-total">
              <span>Total</span>
              <span>₹{totalCost.toLocaleString()}</span>
            </div>
          </div>
        )}

        <button
          className="btn btn-primary btn-lg btn-full"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </main>
  );
}

export default Booking;
