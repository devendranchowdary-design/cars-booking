import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
