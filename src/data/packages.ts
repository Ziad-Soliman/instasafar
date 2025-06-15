
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
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
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
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    ]
  },
  'package-2': {
    id: 'package-2',
    title: 'Luxury Umrah Experience',
    name: 'Luxury Umrah Experience',
    description: 'A spiritual journey with luxury accommodations and private transport for your Umrah pilgrimage.',
    detailed_description: 'Enjoy a peaceful and luxurious Umrah experience with our carefully curated package. Stay in premium hotels close to the holy sites and travel in comfort with private transportation.',
    image: 'https://images.unsplash.com/photo-1564769625392-651b64d96e7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    thumbnail: 'https://images.unsplash.com/photo-1564769625392-651b64d96e7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1564769625392-651b64d96e7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
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
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    hotel_details: {
      makkah: {
        name: 'Makkah Clock Royal Tower',
        rating: 4,
        nights: 4,
        room_type: 'Standard Room'
      },
      madinah: {
        name: 'Madinah Hilton',
        rating: 4,
        nights: 3,
        room_type: 'Deluxe Room'
      }
    },
    transport_details: {
      type: 'Private Car',
      includes_airport_transfer: true,
      includes_city_transfer: true
    },
    itinerary: [
      { day: 1, title: 'Arrival in Makkah', description: 'Check-in and rest' },
      { day: 2, title: 'Umrah Performance', description: 'Complete Umrah rituals' },
      { day: 3, title: 'Makkah Exploration', description: 'Visit holy sites' },
      { day: 4, title: 'Travel to Medina', description: 'Journey to the Prophet\'s city' },
      { day: 5, title: 'Medina Ziyarat', description: 'Visit Prophet\'s Mosque and holy sites' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1564769625392-651b64d96e7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    ]
  },
  'package-3': {
    id: 'package-3',
    title: 'Saudi Discovery Tour',
    name: 'Saudi Discovery Tour',
    description: 'Explore the beauty and heritage of Saudi Arabia with visits to Riyadh, Jeddah, and the ancient city of AlUla.',
    detailed_description: 'Discover the rich history and modern marvels of Saudi Arabia. This comprehensive tour takes you through the capital Riyadh, the coastal city of Jeddah, and the UNESCO World Heritage site of AlUla.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
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
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    hotel_details: {
      riyadh: {
        name: 'Riyadh Palace Hotel',
        rating: 4,
        nights: 3,
        room_type: 'Superior Room'
      },
      jeddah: {
        name: 'Jeddah Hilton',
        rating: 4,
        nights: 3,
        room_type: 'Sea View Room'
      },
      alula: {
        name: 'AlUla Desert Resort',
        rating: 5,
        nights: 4,
        room_type: 'Desert Villa'
      }
    },
    flight_details: {
      airline: 'Flynas',
      departure_airport: 'DXB',
      arrival_airport: 'RUH',
      class: 'Economy'
    },
    transport_details: {
      type: 'Tour Bus',
      includes_airport_transfer: true,
      includes_city_transfer: true
    },
    itinerary: [
      { day: 1, title: 'Arrival in Riyadh', description: 'City tour and modern landmarks' },
      { day: 2, title: 'Riyadh Exploration', description: 'National Museum and historic Diriyah' },
      { day: 3, title: 'Travel to Jeddah', description: 'Flight to Jeddah, Red Sea coast' },
      { day: 4, title: 'Jeddah Old Town', description: 'UNESCO heritage Al-Balad district' },
      { day: 5, title: 'Journey to AlUla', description: 'Travel to the ancient oasis city' },
      { day: 6, title: 'Hegra Archaeological Site', description: 'Explore Nabatean tombs' },
      { day: 7, title: 'AlUla Rock Formations', description: 'Elephant Rock and desert landscape' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
    ]
  }
};
