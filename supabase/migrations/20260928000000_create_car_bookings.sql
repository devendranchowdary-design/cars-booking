-- Create car_bookings table
CREATE TABLE IF NOT EXISTS car_bookings (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  car TEXT NOT NULL,
  car_type TEXT,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  pickup_location TEXT NOT NULL,
  days INTEGER NOT NULL,
  price_per_day NUMERIC,
  total_cost NUMERIC NOT NULL,
  booked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE car_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read bookings (public app, no auth)
CREATE POLICY "Allow public read" ON car_bookings
  FOR SELECT USING (true);

-- Allow anyone to insert bookings
CREATE POLICY "Allow public insert" ON car_bookings
  FOR INSERT WITH CHECK (true);

-- Allow anyone to delete bookings
CREATE POLICY "Allow public delete" ON car_bookings
  FOR DELETE USING (true);
