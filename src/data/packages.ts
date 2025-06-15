
// Export packages for compatibility
export { mockPackages as packages } from './mockData';

// Export package details for individual package pages
export const packageDetails = {
  'package-1': {
    id: 'package-1',
    title: 'Premium Hajj Package 2024',
    name: 'Premium Hajj Package 2024',
    description: 'Experience the ultimate Hajj journey with our premium package featuring 5-star accommodations, VIP transport, and expert guidance throughout your spiritual journey.',
    detailed_description: 'Experience the ultimate Hajj journey with our premium package featuring 5-star accommodations, VIP transport, and expert guidance throughout your spiritual journey. Our comprehensive package includes everything you need for a meaningful pilgrimage.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ],
    duration: '21 days',
    duration_days: 21,
    price: 5500,
    location: 'Makkah & Medina',
    city: 'Both' as const,
    rating: 4.9,
    review_count: 456,
    includes: ['5-star Hotels', 'VIP Transport', 'All Meals', 'Guided Tours'],
    type: 'hajj' as const,
    is_featured: true,
    start_date: '2024-08-15',
    end_date: '2024-12-31',
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    hotel_details: {
      makkah: {
        name: 'Fairmont Makkah Clock Royal Tower',
        rating: 5,
        nights: 10,
        room_type: 'Deluxe Room with Haram View'
      },
      madinah: {
        name: 'Al Madinah Harmony Hotel',
        rating: 5,
        nights: 8,
        room_type: 'Premium Room with Prophet\'s Mosque View'
      }
    },
    flight_details: {
      airline: 'Saudia Airlines',
      departure_airport: 'JFK',
      arrival_airport: 'JED',
      class: 'Economy'
    },
    transport_details: {
      type: 'Private Bus',
      includes_airport_transfer: true,
      includes_city_transfer: true
    },
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah', description: 'Airport transfer to Makkah hotel' },
      { day: 2, title: 'Umrah Performance', description: 'Guided Umrah with experienced guide' },
      { day: 3, title: 'Haram Visits', description: 'Multiple visits to Masjid al-Haram' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    ]
  },
  'package-2': {
    id: 'package-2',
    title: 'Luxury Umrah Experience',
    name: 'Luxury Umrah Experience',
    description: 'A serene and comfortable Umrah journey with stays in premium hotels close to the holy mosques.',
    detailed_description: 'Our Luxury Umrah Experience is designed for those seeking comfort and convenience. It includes stays in select 5-star hotels in both Makkah and Medina, private transportation, and options for guided Ziyarat tours to historical sites.',
    image: 'https://images.unsplash.com/photo-1564769625392-651b64d9625f?w=400&h=300&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1564769625392-651b64d9625f?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1564769625392-651b64d9625f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604528178351-3c8239a9c809?w=800&h=600&fit=crop'
    ],
    duration: '7 days',
    duration_days: 7,
    price: 1200,
    location: 'Makkah & Medina',
    city: 'Both' as const,
    rating: 4.7,
    review_count: 234,
    includes: ['4-star Hotels', 'Private Transport', 'Breakfast', 'Ziyarat'],
    type: 'umrah' as const,
    is_featured: true,
    start_date: '2024-09-01',
    end_date: '2025-01-31',
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    hotel_details: {
        makkah: { name: 'Jabal Omar Hyatt Regency Makkah', rating: 5, nights: 4, room_type: 'Standard Room' },
        madinah: { name: 'Anwar Al Madinah Mövenpick Hotel', rating: 5, nights: 3, room_type: 'Classic Room' }
    },
    transport_details: { type: 'Private Car', includes_airport_transfer: true, includes_city_transfer: false },
    itinerary: [
      { day: 1, title: 'Arrival in Jeddah & Transfer to Makkah', description: 'Check-in to your hotel and prepare for Umrah.' },
      { day: 2, title: 'Umrah Performance', description: 'Perform Umrah at your own pace.' },
      { day: 4, title: 'Travel to Medina', description: 'Private transfer to your hotel in Medina.' },
      { day: 5, title: 'Ziyarat in Medina', description: 'Visit key historical sites.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1564769625392-651b64d9625f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604528178351-3c8239a9c809?w=800&h=600&fit=crop'
    ]
  },
  'package-3': {
    id: 'package-3',
    title: 'Saudi Discovery Tour',
    name: 'Saudi Discovery Tour',
    description: 'Explore the rich history and stunning landscapes of Saudi Arabia, from Riyadh to the ancient city of AlUla.',
    detailed_description: 'Embark on a 10-day adventure across Saudi Arabia. Discover the bustling capital of Riyadh, the historic port city of Jeddah, and the breathtaking archaeological wonders of AlUla, a UNESCO World Heritage site.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?w=400&h=300&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?w=400&h=300&fit=crop',
    images: [
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1618621941848-52b3d85458a4?w=800&h=600&fit=crop'
    ],
    duration: '10 days',
    duration_days: 10,
    price: 2800,
    location: 'Riyadh, Jeddah & AlUla',
    city: 'Multiple' as const,
    rating: 4.5,
    review_count: 167,
    includes: ['Premium Hotels', 'Tour Guide', 'All Meals', 'Entrance Fees'],
    type: 'custom' as const,
    is_featured: false,
    start_date: '2024-10-15',
    end_date: '2025-03-20',
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    hotel_details: {
        riyadh: { name: 'Four Seasons Hotel Riyadh', rating: 5, nights: 3, room_type: 'Superior Room' },
        jeddah: { name: 'Rosewood Jeddah', rating: 5, nights: 3, room_type: 'Deluxe City View Room' },
        alula: { name: 'Shaden Resort AlUla', rating: 4, nights: 3, room_type: 'Villa with private pool' }
    },
    flight_details: { airline: 'Flynas', departure_airport: 'RUH', arrival_airport: 'JED', class: 'Economy' },
    transport_details: { type: 'Private SUV', includes_airport_transfer: true, includes_city_transfer: true },
    itinerary: [
        { day: 1, title: 'Arrival in Riyadh', description: 'Explore the city center and Kingdom Centre.' },
        { day: 4, title: 'Fly to Jeddah', description: 'Discover the historic Al-Balad district.' },
        { day: 7, title: 'Journey to AlUla', description: 'Explore Hegra, Elephant Rock, and more.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618621941848-52b3d85458a4?w=800&h=600&fit=crop'
    ]
  }
};
