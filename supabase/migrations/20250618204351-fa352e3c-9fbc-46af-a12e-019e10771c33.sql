
-- Drop existing policies first, then recreate them
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Providers can view their bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Providers can update their bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can update any booking" ON bookings;

DROP POLICY IF EXISTS "Anyone can view hotels" ON hotels;
DROP POLICY IF EXISTS "Providers can manage their hotels" ON hotels;
DROP POLICY IF EXISTS "Admins can manage all hotels" ON hotels;

DROP POLICY IF EXISTS "Anyone can view packages" ON packages;
DROP POLICY IF EXISTS "Providers can manage their packages" ON packages;
DROP POLICY IF EXISTS "Admins can manage all packages" ON packages;

DROP POLICY IF EXISTS "Users can manage their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

DROP POLICY IF EXISTS "Providers can manage their own data" ON providers;
DROP POLICY IF EXISTS "Admins can manage all providers" ON providers;

-- Add missing foreign keys for data integrity
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS provider_id uuid;

-- Update existing bookings to set provider_id based on hotel/package relationships
UPDATE bookings SET provider_id = (
  SELECT h.provider_id FROM hotels h WHERE h.id = bookings.hotel_id
) WHERE hotel_id IS NOT NULL AND provider_id IS NULL;

UPDATE bookings SET provider_id = (
  SELECT p.provider_id FROM packages p WHERE p.id = bookings.package_id  
) WHERE package_id IS NOT NULL AND provider_id IS NULL;

-- Enable RLS on all tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Recreate RLS policies for bookings table
CREATE POLICY "Users can view their own bookings" 
  ON bookings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can view their bookings" 
  ON bookings FOR SELECT 
  USING (auth.uid() = provider_id);

CREATE POLICY "Admins can view all bookings" 
  ON bookings FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can create bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can update their bookings" 
  ON bookings FOR UPDATE 
  USING (auth.uid() = provider_id);

CREATE POLICY "Admins can update any booking" 
  ON bookings FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Recreate RLS policies for hotels table
CREATE POLICY "Anyone can view hotels" 
  ON hotels FOR SELECT 
  TO authenticated, anon
  USING (true);

CREATE POLICY "Providers can manage their hotels" 
  ON hotels FOR ALL 
  USING (auth.uid() = provider_id);

CREATE POLICY "Admins can manage all hotels" 
  ON hotels FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Recreate RLS policies for packages table
CREATE POLICY "Anyone can view packages" 
  ON packages FOR SELECT 
  TO authenticated, anon
  USING (true);

CREATE POLICY "Providers can manage their packages" 
  ON packages FOR ALL 
  USING (auth.uid() = provider_id);

CREATE POLICY "Admins can manage all packages" 
  ON packages FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Recreate RLS policies for profiles table
CREATE POLICY "Users can manage their own profile" 
  ON profiles FOR ALL 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Recreate RLS policies for providers table
CREATE POLICY "Providers can manage their own data" 
  ON providers FOR ALL 
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all providers" 
  ON providers FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Add triggers to automatically set provider_id in bookings
CREATE OR REPLACE FUNCTION set_booking_provider_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Set provider_id based on hotel_id
  IF NEW.hotel_id IS NOT NULL THEN
    NEW.provider_id := (SELECT provider_id FROM hotels WHERE id = NEW.hotel_id);
  -- Set provider_id based on package_id
  ELSIF NEW.package_id IS NOT NULL THEN
    NEW.provider_id := (SELECT provider_id FROM packages WHERE id = NEW.package_id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_booking_provider_id ON bookings;
CREATE TRIGGER trigger_set_booking_provider_id
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_provider_id();

-- Create function to ensure data consistency when admin updates listings
CREATE OR REPLACE FUNCTION update_booking_provider_references()
RETURNS TRIGGER AS $$
BEGIN
  -- When hotel provider changes, update related bookings
  IF TG_TABLE_NAME = 'hotels' AND OLD.provider_id != NEW.provider_id THEN
    UPDATE bookings SET provider_id = NEW.provider_id WHERE hotel_id = NEW.id;
  END IF;
  
  -- When package provider changes, update related bookings  
  IF TG_TABLE_NAME = 'packages' AND OLD.provider_id != NEW.provider_id THEN
    UPDATE bookings SET provider_id = NEW.provider_id WHERE package_id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_hotel_bookings ON hotels;
DROP TRIGGER IF EXISTS trigger_update_package_bookings ON packages;

CREATE TRIGGER trigger_update_hotel_bookings
  AFTER UPDATE ON hotels
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_provider_references();

CREATE TRIGGER trigger_update_package_bookings
  AFTER UPDATE ON packages  
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_provider_references();
