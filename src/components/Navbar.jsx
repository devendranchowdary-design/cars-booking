import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div>
        <h2>🚗 DriveEase</h2>
        <span style={{ color: "#94a3b8", fontSize: "12px" }}>by Karempudi Devendran Chowdary</span>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/booking">Book Now</Link>
        <Link to="/history">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;
