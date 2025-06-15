
-- Insert sample packages data with English and Arabic translations
INSERT INTO public.packages (
  id, provider_id, name, name_ar, description, description_ar, 
  city, city_ar, price, duration_days, start_date, end_date,
  includes_hotel, includes_flight, includes_transport, thumbnail
) VALUES 
(
  gen_random_uuid(), null, 
  'Premium Umrah Package - Makkah', 'باقة العمرة المميزة - مكة',
  'Complete Umrah package with 5-star accommodation near Haram, flights, and ground transportation', 
  'باقة عمرة شاملة مع إقامة فخمة 5 نجوم بالقرب من الحرم والطيران والنقل الأرضي',
  'Makkah', 'مكة المكرمة',
  2500.00, 7, '2024-01-15', '2024-12-31',
  true, true, true, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Hajj Package - Complete Journey', 'باقة الحج - الرحلة الكاملة',
  'Full Hajj package including accommodation in Makkah, Madinah, Mina, and Arafat with all transportation',
  'باقة حج كاملة تشمل الإقامة في مكة والمدينة ومنى وعرفات مع جميع وسائل النقل',
  'Makkah', 'مكة المكرمة',
  4200.00, 14, '2024-06-01', '2024-07-31',
  true, true, true, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Economy Umrah Package', 'باقة العمرة الاقتصادية',
  'Affordable Umrah package with comfortable 3-star hotel and essential services',
  'باقة عمرة اقتصادية مع فندق 3 نجوم مريح والخدمات الأساسية',
  'Makkah', 'مكة المكرمة',
  1200.00, 5, '2024-01-01', '2024-12-31',
  true, false, true, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Madinah Visit Package', 'باقة زيارة المدينة',
  'Special package for visiting the Prophet Mosque with guided tours and comfortable stay',
  'باقة خاصة لزيارة المسجد النبوي مع جولات مع مرشد وإقامة مريحة',
  'Madinah', 'المدينة المنورة',
  800.00, 3, '2024-01-01', '2024-12-31',
  true, false, true, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Family Umrah Package', 'باقة العمرة العائلية',
  'Family-friendly Umrah package with spacious rooms and child-friendly services',
  'باقة عمرة مناسبة للعائلات مع غرف واسعة وخدمات مناسبة للأطفال',
  'Makkah', 'مكة المكرمة',
  3200.00, 10, '2024-02-01', '2024-11-30',
  true, true, true, '/placeholder.svg'
);

-- Insert sample flights data with English and Arabic translations
INSERT INTO public.flights (
  id, provider_id, airline_name, airline_name_ar, flight_number,
  origin, origin_ar, destination, destination_ar, 
  departure_time, arrival_time, price, class, available_seats, total_seats, aircraft_type
) VALUES 
(
  gen_random_uuid(), null,
  'Saudi Arabian Airlines', 'الخطوط الجوية العربية السعودية', 'SV804',
  'London Heathrow', 'لندن هيثرو', 'Jeddah', 'جدة',
  '2024-07-15 14:30:00+00', '2024-07-16 01:45:00+03', 850.00,
  'economy', 180, 300, 'Boeing 777'
),
(
  gen_random_uuid(), null,
  'Emirates', 'طيران الإمارات', 'EK809',
  'Dubai', 'دبي', 'Madinah', 'المدينة المنورة',
  '2024-07-20 08:15:00+04', '2024-07-20 10:30:00+03', 420.00,
  'economy', 220, 380, 'Airbus A380'
),
(
  gen_random_uuid(), null,
  'Turkish Airlines', 'الخطوط الجوية التركية', 'TK99',
  'Istanbul', 'اسطنبول', 'Jeddah', 'جدة',
  '2024-08-01 23:50:00+03', '2024-08-02 04:15:00+03', 680.00,
  'economy', 145, 280, 'Boeing 787'
),
(
  gen_random_uuid(), null,
  'Qatar Airways', 'الخطوط الجوية القطرية', 'QR402',
  'Doha', 'الدوحة', 'Riyadh', 'الرياض',
  '2024-07-25 16:20:00+03', '2024-07-25 17:45:00+03', 290.00,
  'business', 28, 42, 'Airbus A350'
),
(
  gen_random_uuid(), null,
  'Egyptian Airlines', 'مصر للطيران', 'MS656',
  'Cairo', 'القاهرة', 'Jeddah', 'جدة',
  '2024-08-10 11:30:00+02', '2024-08-10 14:20:00+03', 520.00,
  'economy', 160, 250, 'Airbus A320'
),
(
  gen_random_uuid(), null,
  'Flynas', 'طيران ناس', 'XY201',
  'Riyadh', 'الرياض', 'Jeddah', 'جدة',
  '2024-07-18 19:00:00+03', '2024-07-18 21:15:00+03', 180.00,
  'economy', 140, 180, 'Airbus A320'
);

-- Insert sample transport options data with English and Arabic translations
INSERT INTO public.transport_options (
  id, provider_id, name, name_ar, description, description_ar,
  type, from_city, from_city_ar, to_city, to_city_ar,
  price, duration_hours, departure_time, arrival_time, capacity, available_seats, thumbnail
) VALUES 
(
  gen_random_uuid(), null,
  'Airport Transfer - Jeddah to Makkah', 'نقل المطار - جدة إلى مكة',
  'Comfortable air-conditioned bus service from King Abdulaziz Airport to Makkah hotels',
  'خدمة حافلات مكيفة ومريحة من مطار الملك عبدالعزيز إلى فنادق مكة',
  'airport_transfer', 'Jeddah Airport', 'مطار جدة', 'Makkah Hotels', 'فنادق مكة',
  45.00, 2, '06:00:00', '08:00:00', 50, 35, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Makkah to Madinah Express', 'اكسبرس مكة إلى المدينة',
  'High-speed luxury coach service between the holy cities',
  'خدمة حافلات فاخرة عالية السرعة بين المدينتين المقدستين',
  'intercity', 'Makkah', 'مكة المكرمة', 'Madinah', 'المدينة المنورة',
  80.00, 4, '09:00:00', '13:00:00', 45, 30, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Ziyarat Tour - Makkah Holy Sites', 'جولة زيارات - المواقع المقدسة في مكة',
  'Guided tour of historical and religious sites around Makkah',
  'جولة مع مرشد للمواقع التاريخية والدينية حول مكة',
  'ziyarat_tour', 'Makkah Hotels', 'فنادق مكة', 'Holy Sites', 'المواقع المقدسة',
  60.00, 6, '08:00:00', '14:00:00', 25, 20, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Private Car Service', 'خدمة السيارة الخاصة',
  'Luxury private car with professional driver for personal transportation',
  'سيارة خاصة فاخرة مع سائق محترف للنقل الشخصي',
  'private_car', 'Any Location', 'أي موقع', 'Any Destination', 'أي وجهة',
  120.00, 1, '00:00:00', '01:00:00', 4, 4, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Madinah Airport Transfer', 'نقل مطار المدينة',
  'Direct transfer service from Prince Mohammad Airport to Madinah hotels',
  'خدمة نقل مباشرة من مطار الأمير محمد إلى فنادق المدينة',
  'airport_transfer', 'Madinah Airport', 'مطار المدينة', 'Madinah Hotels', 'فنادق المدينة',
  35.00, 1, '05:30:00', '06:30:00', 40, 25, '/placeholder.svg'
),
(
  gen_random_uuid(), null,
  'Hajj Transport Package', 'باقة نقل الحج',
  'Complete transportation package for Hajj including Mina, Arafat, and Muzdalifah',
  'باقة نقل كاملة للحج تشمل منى وعرفات والمزدلفة',
  'intercity', 'Makkah', 'مكة المكرمة', 'Hajj Sites', 'مواقع الحج',
  200.00, 12, '04:00:00', '16:00:00', 55, 40, '/placeholder.svg'
);
