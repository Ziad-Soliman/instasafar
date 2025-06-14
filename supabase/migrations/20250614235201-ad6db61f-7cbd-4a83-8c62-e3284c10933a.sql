
-- Create user_roles table for role-based access control (only if not exists)
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'provider', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create customer dashboard stats function
CREATE OR REPLACE FUNCTION public.get_customer_dashboard_stats(customer_id_arg UUID)
RETURNS TABLE(
  total_bookings BIGINT,
  upcoming_bookings BIGINT,
  total_spent NUMERIC,
  favorite_city TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- Total bookings count
    (SELECT COUNT(*)::BIGINT FROM bookings WHERE user_id = customer_id_arg),
    
    -- Upcoming bookings count
    (SELECT COUNT(*)::BIGINT FROM bookings 
     WHERE user_id = customer_id_arg 
     AND check_in_date > CURRENT_DATE 
     AND status = 'confirmed'),
    
    -- Total amount spent
    (SELECT COALESCE(SUM(total_price), 0)::NUMERIC FROM bookings 
     WHERE user_id = customer_id_arg 
     AND payment_status = 'paid'),
    
    -- Most booked city
    (SELECT h.city 
     FROM bookings b
     JOIN hotels h ON b.hotel_id = h.id
     WHERE b.user_id = customer_id_arg
     GROUP BY h.city
     ORDER BY COUNT(*) DESC
     LIMIT 1);
END;
$$;

-- Create admin dashboard stats function
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS TABLE(
  total_users BIGINT,
  total_bookings BIGINT,
  total_revenue NUMERIC,
  total_hotels BIGINT,
  total_packages BIGINT,
  pending_bookings BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- Total users count
    (SELECT COUNT(*)::BIGINT FROM profiles),
    
    -- Total bookings count
    (SELECT COUNT(*)::BIGINT FROM bookings),
    
    -- Total revenue
    (SELECT COALESCE(SUM(total_price), 0)::NUMERIC FROM bookings WHERE payment_status = 'paid'),
    
    -- Total hotels
    (SELECT COUNT(*)::BIGINT FROM hotels),
    
    -- Total packages
    (SELECT COUNT(*)::BIGINT FROM packages),
    
    -- Pending bookings
    (SELECT COUNT(*)::BIGINT FROM bookings WHERE status = 'pending');
END;
$$;

-- Drop existing policies first (only if they exist)
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Providers can view their property bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Everyone can view hotels" ON public.hotels;
    DROP POLICY IF EXISTS "Providers can manage their own hotels" ON public.hotels;
    DROP POLICY IF EXISTS "Admins can manage all hotels" ON public.hotels;
    DROP POLICY IF EXISTS "Everyone can view packages" ON public.packages;
    DROP POLICY IF EXISTS "Providers can manage their own packages" ON public.packages;
    DROP POLICY IF EXISTS "Admins can manage all packages" ON public.packages;
EXCEPTION
    WHEN undefined_object THEN null;
END $$;

-- Enable RLS on tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Create new policies for bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can view their property bookings" 
  ON public.bookings 
  FOR SELECT 
  USING (
    hotel_id IN (SELECT id FROM hotels WHERE provider_id = auth.uid()) OR
    package_id IN (SELECT id FROM packages WHERE provider_id = auth.uid())
  );

CREATE POLICY "Admins can view all bookings" 
  ON public.bookings 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for hotels
CREATE POLICY "Everyone can view hotels" 
  ON public.hotels 
  FOR SELECT 
  USING (true);

CREATE POLICY "Providers can manage their own hotels" 
  ON public.hotels 
  FOR ALL
  USING (provider_id = auth.uid());

CREATE POLICY "Admins can manage all hotels" 
  ON public.hotels 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for packages
CREATE POLICY "Everyone can view packages" 
  ON public.packages 
  FOR SELECT 
  USING (true);

CREATE POLICY "Providers can manage their own packages" 
  ON public.packages 
  FOR ALL
  USING (provider_id = auth.uid());

CREATE POLICY "Admins can manage all packages" 
  ON public.packages 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add some default admin user roles
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'admin@instasafar.com'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'provider'::app_role 
FROM auth.users 
WHERE email = 'provider@instasafar.com'
ON CONFLICT (user_id, role) DO NOTHING;

INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'user'::app_role 
FROM auth.users 
WHERE email = 'user@instasafar.com'
ON CONFLICT (user_id, role) DO NOTHING;
