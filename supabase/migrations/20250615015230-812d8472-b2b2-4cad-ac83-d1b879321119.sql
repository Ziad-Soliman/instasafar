
-- Add Arabic translation columns to hotels table
ALTER TABLE public.hotels 
ADD COLUMN IF NOT EXISTS name_ar TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS city_ar TEXT,
ADD COLUMN IF NOT EXISTS address_ar TEXT;

-- Add Arabic translation columns to packages table
ALTER TABLE public.packages 
ADD COLUMN IF NOT EXISTS name_ar TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS city_ar TEXT;

-- Create transport_options table if it doesn't exist (since it was referenced in edge functions but missing)
CREATE TABLE IF NOT EXISTS public.transport_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.providers(id),
  name TEXT NOT NULL,
  name_ar TEXT,
  description TEXT,
  description_ar TEXT,
  type TEXT NOT NULL, -- 'bus', 'taxi', 'car_rental', 'train'
  from_city TEXT NOT NULL,
  from_city_ar TEXT,
  to_city TEXT NOT NULL,
  to_city_ar TEXT,
  price NUMERIC NOT NULL,
  duration_hours INTEGER,
  departure_time TIME,
  arrival_time TIME,
  capacity INTEGER,
  available_seats INTEGER,
  thumbnail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create flights table if it doesn't exist (since it was referenced in edge functions but missing)
CREATE TABLE IF NOT EXISTS public.flights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES public.providers(id),
  airline_name TEXT NOT NULL,
  airline_name_ar TEXT,
  flight_number TEXT NOT NULL,
  origin TEXT NOT NULL,
  origin_ar TEXT,
  destination TEXT NOT NULL,
  destination_ar TEXT,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  price NUMERIC NOT NULL,
  class TEXT DEFAULT 'economy', -- 'economy', 'business', 'first'
  available_seats INTEGER,
  total_seats INTEGER,
  aircraft_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.transport_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flights ENABLE ROW LEVEL SECURITY;

-- Create policies for transport_options (similar to hotels and packages)
CREATE POLICY "Everyone can view transport options" 
  ON public.transport_options 
  FOR SELECT 
  USING (true);

CREATE POLICY "Providers can manage their own transport options" 
  ON public.transport_options 
  FOR ALL
  USING (provider_id = auth.uid());

CREATE POLICY "Admins can manage all transport options" 
  ON public.transport_options 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create policies for flights (similar to hotels and packages)
CREATE POLICY "Everyone can view flights" 
  ON public.flights 
  FOR SELECT 
  USING (true);

CREATE POLICY "Providers can manage their own flights" 
  ON public.flights 
  FOR ALL
  USING (provider_id = auth.uid());

CREATE POLICY "Admins can manage all flights" 
  ON public.flights 
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add some sample Arabic data for existing hotels
UPDATE public.hotels 
SET 
  name_ar = CASE 
    WHEN name = 'Al Safwah Royale Orchid Hotel' THEN 'فندق الصفوة رويال أورشيد'
    WHEN name = 'Elaf Kinda Hotel' THEN 'فندق إيلاف كندة'
    WHEN name = 'Al Noor Palace Hotel' THEN 'فندق قصر النور'
    WHEN name = 'Dar Al Iman Intercontinental' THEN 'دار الإيمان إنتركونتيننتال'
    WHEN name = 'Makkah Hotel' THEN 'فندق مكة'
    ELSE name
  END,
  city_ar = CASE 
    WHEN city = 'Makkah' THEN 'مكة المكرمة'
    WHEN city = 'Madinah' THEN 'المدينة المنورة'
    ELSE city
  END,
  description_ar = CASE 
    WHEN name = 'Al Safwah Royale Orchid Hotel' THEN 'استمتع بالفخامة والراحة على بعد خطوات من المسجد الحرام مع إطلالات خلابة على الكعبة المشرفة.'
    WHEN name = 'Elaf Kinda Hotel' THEN 'موقع مميز في قلب مكة المكرمة، سهولة الوصول إلى المسجد الحرام ووسائل الراحة الحديثة.'
    WHEN name = 'Al Noor Palace Hotel' THEN 'ملاذ هادئ بالقرب من المسجد النبوي للإقامات المريحة والروحانية.'
    WHEN name = 'Dar Al Iman Intercontinental' THEN 'إقامة فاخرة على بعد خطوات من المسجد النبوي الشريف.'
    WHEN name = 'Makkah Hotel' THEN 'غرف حديثة مع إطلالات رائعة على الحرم وخدمة متميزة.'
    ELSE description
  END,
  address_ar = CASE 
    WHEN address LIKE '%Ibrahim Al Khalil%' THEN 'طريق إبراهيم الخليل، مكة المكرمة'
    WHEN address LIKE '%Central Area%' THEN 'المنطقة المركزية، مكة المكرمة'
    WHEN address LIKE '%Central Zone%' THEN 'المنطقة المركزية، المدينة المنورة'
    WHEN address LIKE '%King Faisal Road%' THEN 'طريق الملك فيصل، المدينة المنورة'
    ELSE address
  END;
