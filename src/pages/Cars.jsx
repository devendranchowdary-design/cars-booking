import { useNavigate } from "react-router-dom";

const carsData = [
  {
    id: 1,
    name: "Toyota Fortuner",
    type: "SUV",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    pricePerDay: 4500,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=250&fit=crop",
    available: true,
  },
  {
    id: 2,
    name: "Honda City",
    type: "Sedan",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    pricePerDay: 2500,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop",
    available: true,
  },
  {
    id: 3,
    name: "Hyundai Creta",
    type: "SUV",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    pricePerDay: 3200,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop",
    available: true,
  },
  {
    id: 4,
    name: "Maruti Swift",
    type: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    pricePerDay: 1500,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=250&fit=crop",
    available: true,
  },
  {
    id: 5,
    name: "BMW 5 Series",
    type: "Luxury",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    pricePerDay: 8500,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop",
    available: false,
  },
  {
    id: 6,
    name: "Mahindra Thar",
    type: "SUV",
    seats: 4,
    fuel: "Diesel",
    transmission: "Manual",
    pricePerDay: 3800,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=250&fit=crop",
    available: true,
  },
];

function CarCard({ car }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking", {
      state: {
        carName: car.name,
        carType: car.type,
        pricePerDay: car.pricePerDay,
        seats: car.seats,
        fuel: car.fuel,
        transmission: car.transmission,
      },
    });
  };

  return (
    <div className="car-card">
      <div className="car-image" style={{ backgroundImage: `url(${car.image})` }}>
        <span className={`badge ${car.available ? 'badge-available' : 'badge-unavailable'}`}>
          {car.available ? "Available" : "Booked"}
        </span>
      </div>
      <div className="car-info">
        <h2>{car.name}</h2>
        <div className="car-specs">
          <span className="spec">🏷️ {car.type}</span>
          <span className="spec">👥 {car.seats} seats</span>
          <span className="spec">⛽ {car.fuel}</span>
          <span className="spec">⚙️ {car.transmission}</span>
        </div>
        <div className="car-footer">
          <span className="price">₹{car.pricePerDay.toLocaleString()}<small>/day</small></span>
          <button
            className="btn btn-primary"
            onClick={handleBook}
            disabled={!car.available}
          >
            {car.available ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Cars() {
  return (
    <div className="cars-page">
      <h1>Available Cars</h1>
      <p className="page-subtitle">Choose from our premium fleet of well-maintained vehicles</p>
      <div className="cars-grid">
        {carsData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default Cars;
