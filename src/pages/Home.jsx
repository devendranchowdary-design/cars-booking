import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Your Journey Begins Here</h1>
        <p className="hero-subtitle">
          Book premium cars for any occasion — road trips, business travel, or weekend getaways.
          Hassle-free booking with the best rates guaranteed.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/cars")}>
          Browse Cars →
        </button>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🚘</span>
          <h3>Wide Selection</h3>
          <p>Choose from SUVs, Sedans, Hatchbacks, and Luxury vehicles.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💰</span>
          <h3>Best Prices</h3>
          <p>Competitive daily rates with no hidden charges.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🛡️</span>
          <h3>Fully Insured</h3>
          <p>All vehicles come with comprehensive insurance coverage.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h3>Instant Booking</h3>
          <p>Book in seconds. Pick up and drive away.</p>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8", marginTop: "40px" }}>
        Developed by <strong>Karempudi Devendran Chowdary</strong>
      </p>
    </div>
  );
}

export default Home;
