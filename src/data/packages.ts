
// Export packages for compatibility
export { mockPackages as packages } from './mockData';

// Export package details for individual package pages
export const packageDetails = {
  'package-1': {
    id: 'package-1',
    title: 'Premium Hajj Package 2024',
    description: 'Experience the ultimate Hajj journey with our premium package featuring 5-star accommodations, VIP transport, and expert guidance throughout your spiritual journey.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop',
    duration: '21 days',
    price: 5500,
    location: 'Makkah & Medina',
    rating: 4.9,
    review_count: 456,
    includes: ['5-star Hotels', 'VIP Transport', 'All Meals', 'Guided Tours'],
    type: 'hajj' as const,
    is_featured: true,
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
