
import { useState, useEffect } from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { mockHotels, mockPackages } from "@/data/mockData";

// Convert external listings to proper format
const mockExternalListingsFormatted = [
  {
    id: "external-1",
    title: "Premium Flight Deals to Jeddah",
    description: "Direct flights from major cities to Jeddah",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    price: 450,
    currency: "USD",
    rating: 4.5,
    reviewCount: 1234,
    location: "Jeddah",
    provider: "Booking.com",
    type: "flight" as const,
    url: "https://booking.com",
    features: ["Direct Flight", "Baggage Included", "Flexible Dates"]
  },
  {
    id: "external-2",
    title: "Makkah to Madinah Transport",
    description: "Comfortable transportation between holy cities",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    price: 45,
    currency: "USD",
    rating: 4.3,
    reviewCount: 567,
    location: "Both Cities",
    provider: "Saudi Transport Co",
    type: "activity" as const,
    url: "https://sauditransport.com",
    features: ["AC Bus", "WiFi", "Comfortable Seats"]
  }
];

export const useWishlistData = () => {
  const { items, isLoading } = useWishlist();
  
  // For demo purposes, we'll simulate fetching data based on wishlist IDs
  const savedHotels = items
    .filter(item => item.itemType === "hotel")
    .map(item => mockHotels.find(hotel => hotel.id === item.id))
    .filter(Boolean);
    
  const savedPackages = items
    .filter(item => item.itemType === "package")
    .map(item => mockPackages.find(pkg => pkg.id === item.id))
    .filter(Boolean);
    
  const savedTransport = items
    .filter(item => item.itemType === "transport")
    .map(item => mockExternalListingsFormatted.find(listing => listing.id === item.id))
    .filter(Boolean);

  return {
    items,
    isLoading,
    savedHotels,
    savedPackages,
    savedTransport
  };
};
