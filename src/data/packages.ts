
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
  }
};
