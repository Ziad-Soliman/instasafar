
-- Populate the hotels table with example records

INSERT INTO public.hotels (id, name, city, address, price_per_night, rating, thumbnail, description, distance_to_haram)
VALUES
  (
    gen_random_uuid(), 
    'Al Safwah Royale Orchid Hotel', 
    'Makkah', 
    'Ibrahim Al Khalil Rd, Makkah 24231, Saudi Arabia',
    350,
    4.8,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    'Experience luxury and comfort steps away from the Holy Mosque with breathtaking views of the Kaaba.',
    '200m'
  ),
  (
    gen_random_uuid(), 
    'Elaf Kinda Hotel', 
    'Makkah', 
    'Central Area, Makkah 24231, Saudi Arabia',
    280,
    4.5,
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    'Prime location in the heart of Makkah, easy access to the Holy Mosque and modern amenities.',
    '450m'
  ),
  (
    gen_random_uuid(), 
    'Al Noor Palace Hotel', 
    'Madinah', 
    'Central Zone, Madinah 42311, Saudi Arabia',
    320,
    4.7,
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    'A serene retreat near the Prophet''s Mosque for peaceful and spiritual stays.',
    '150m'
  ),
  (
    gen_random_uuid(), 
    'Dar Al Iman Intercontinental', 
    'Madinah', 
    '2657 King Faisal Road, Badaah, Madinah 42311, Saudi Arabia',
    410,
    4.6,
    'https://images.unsplash.com/photo-1519821172143-ecb127621cfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Luxury accommodation steps from Al-Masjid an-Nabawi.',
    '220m'
  ),
  (
    gen_random_uuid(), 
    'Makkah Hotel', 
    'Makkah', 
    'Ibrahim Al Khalil Street, Mecca 21955, Saudi Arabia',
    375,
    4.4,
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Modern rooms with stunning Haram views and top service.',
    '180m'
  );

-- You may also want to add amenities and images for a richer UI!
