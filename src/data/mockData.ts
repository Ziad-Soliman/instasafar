
// Mock data for featured hotels, packages, and external listings

export const featuredHotels = [
  {
    id: "hotel-1",
    name: "Makkah Royal Clock Tower",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Makkah",
    distance_to_haram: "50m",
    rating: 4.8,
    review_count: 2845,
    price_per_night: 350,
    amenities: ["WiFi", "Parking", "Breakfast", "Restaurant"],
    is_featured: true
  },
  {
    id: "hotel-2",
    name: "Dar Al Eiman Royal",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Madinah",
    distance_to_haram: "100m",
    rating: 4.6,
    review_count: 1967,
    price_per_night: 280,
    amenities: ["WiFi", "Parking", "Restaurant"],
    is_featured: true
  },
  {
    id: "hotel-3",
    name: "Pullman ZamZam Makkah",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    location: "Makkah",
    distance_to_haram: "200m",
    rating: 4.7,
    review_count: 3201,
    price_per_night: 420,
    amenities: ["WiFi", "Parking", "Breakfast", "Restaurant"],
    is_featured: false
  }
];

export const featuredPackages = [
  {
    id: "package-1",
    title: "Complete Umrah Package - 14 Days",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "14 Days",
    price: 2500,
    location: "Makkah & Madinah",
    rating: 4.9,
    review_count: 856,
    includes: ["Accommodation", "Transportation", "Meals", "Guided Tours"],
    type: "umrah" as const,
    is_featured: true
  },
  {
    id: "package-2",
    title: "Premium Hajj Package - 21 Days",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d36de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    duration: "21 Days",
    price: 4500,
    location: "Makkah, Madinah & Mina",
    rating: 4.8,
    review_count: 642,
    includes: ["5-Star Hotels", "VIP Transportation", "All Meals", "Expert Guide"],
    type: "hajj" as const,
    is_featured: true
  }
];

export const externalListings = [
  {
    id: "external-1",
    title: "Luxury Umrah Experience",
    provider: "Islamic Travel",
    provider_logo: "/placeholder.svg",
    price_range: "$2,000 - $4,000",
    rating: 4.7,
    review_count: 523,
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["5-Star Hotels", "Private Transport", "Guided Tours"]
  },
  {
    id: "external-2",
    title: "Budget-Friendly Hajj",
    provider: "Pilgrimage Plus",
    provider_logo: "/placeholder.svg",
    price_range: "$3,500 - $5,500",
    rating: 4.5,
    review_count: 387,
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Group Travel", "Shared Accommodation", "Meals Included"]
  },
  {
    id: "external-3",
    title: "Family Umrah Package",
    provider: "Sacred Journeys",
    provider_logo: "/placeholder.svg",
    price_range: "$1,800 - $3,200",
    rating: 4.6,
    review_count: 294,
    url: "https://example.com",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    features: ["Family Rooms", "Kid-Friendly", "Flexible Dates"]
  }
];
