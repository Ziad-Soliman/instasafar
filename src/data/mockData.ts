
// Mock data for development and testing

export interface FlightData {
  id: string;
  airline: string;
  airline_logo: string;
  departure_city: string;
  departure_airport: string;
  departure_time: string;
  arrival_city: string;
  arrival_airport: string;
  arrival_time: string;
  duration: string;
  price: number;
  stops: number;
  is_internal: boolean;
}

export interface HotelData {
  id: string;
  name: string;
  image: string;
  location: string;
  distance_to_haram: string;
  rating: number;
  review_count: number;
  price_per_night: number;
  amenities: string[];
  is_featured?: boolean;
}

export interface PackageData {
  id: string;
  title: string;
  image: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  review_count: number;
  includes: string[];
  type: 'hajj' | 'umrah' | 'custom';
  is_featured?: boolean;
}

export const mockFlights: FlightData[] = [
  {
    id: 'flight-1',
    airline: 'Saudi Arabian Airlines',
    airline_logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center',
    departure_city: 'Riyadh',
    departure_airport: 'RUH',
    departure_time: '08:30',
    arrival_city: 'Jeddah',
    arrival_airport: 'JED',
    arrival_time: '10:15',
    duration: '1h 45m',
    price: 280,
    stops: 0,
    is_internal: true
  },
  {
    id: 'flight-2',
    airline: 'Flynas',
    airline_logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center',
    departure_city: 'Dammam',
    departure_airport: 'DMM',
    departure_time: '14:20',
    arrival_city: 'Medina',
    arrival_airport: 'MED',
    arrival_time: '16:45',
    duration: '2h 25m',
    price: 320,
    stops: 0,
    is_internal: true
  },
  {
    id: 'flight-3',
    airline: 'Emirates',
    airline_logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&crop=center',
    departure_city: 'Dubai',
    departure_airport: 'DXB',
    departure_time: '22:40',
    arrival_city: 'Jeddah',
    arrival_airport: 'JED',
    arrival_time: '23:55',
    duration: '2h 15m',
    price: 450,
    stops: 0,
    is_internal: false
  }
];

export const mockHotels: HotelData[] = [
  {
    id: 'hotel-1',
    name: 'Makkah Clock Royal Tower',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    location: 'Makkah',
    distance_to_haram: '0.1 km',
    rating: 4.8,
    review_count: 2456,
    price_per_night: 850,
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Spa'],
    is_featured: true
  },
  {
    id: 'hotel-2',
    name: 'Madinah Hilton',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
    location: 'Medina',
    distance_to_haram: '0.3 km',
    rating: 4.6,
    review_count: 1823,
    price_per_night: 420,
    amenities: ['WiFi', 'Breakfast', 'Gym', 'Pool'],
    is_featured: false
  },
  {
    id: 'hotel-3',
    name: 'Riyadh Palace Hotel',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    location: 'Riyadh',
    distance_to_haram: 'N/A',
    rating: 4.4,
    review_count: 987,
    price_per_night: 280,
    amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center'],
    is_featured: false
  }
];

export const mockPackages: PackageData[] = [
  {
    id: 'package-1',
    title: 'Premium Hajj Package 2024',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop',
    duration: '21 days',
    price: 5500,
    location: 'Makkah & Medina',
    rating: 4.9,
    review_count: 456,
    includes: ['5-star Hotels', 'VIP Transport', 'All Meals', 'Guided Tours'],
    type: 'hajj',
    is_featured: true
  },
  {
    id: 'package-2',
    title: 'Luxury Umrah Experience',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    duration: '7 days',
    price: 1200,
    location: 'Makkah & Medina',
    rating: 4.7,
    review_count: 234,
    includes: ['4-star Hotels', 'Private Transport', 'Breakfast', 'Ziyarat'],
    type: 'umrah',
    is_featured: true
  },
  {
    id: 'package-3',
    title: 'Saudi Discovery Tour',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73095?w=400&h=300&fit=crop',
    duration: '10 days',
    price: 2800,
    location: 'Riyadh, Jeddah & AlUla',
    rating: 4.5,
    review_count: 167,
    includes: ['Premium Hotels', 'Tour Guide', 'All Meals', 'Entrance Fees'],
    type: 'custom',
    is_featured: false
  }
];

// Export for backward compatibility
export const flights = mockFlights;
export const hotels = mockHotels;
export const packages = mockPackages;
