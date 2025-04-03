
// Mock data for external listings

export const externalListings = [
  {
    id: "ext-1",
    listing_type: "hotel" as "hotel" | "flight" | "transport",
    name: "Hilton Makkah Convention Hotel",
    description: "Luxury hotel with stunning views of the Haram",
    city: "Makkah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Booking.com",
    redirect_url: "https://www.booking.com",
    image_url: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "From $200/night",
    rating_indication: "8.9"
  },
  {
    id: "ext-2",
    listing_type: "hotel" as "hotel" | "flight" | "transport",
    name: "Pullman ZamZam Makkah",
    description: "Modern hotel near the Holy Mosque",
    city: "Makkah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Agoda",
    redirect_url: "https://www.agoda.com",
    image_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "From $180/night",
    rating_indication: "8.7"
  },
  {
    id: "ext-3",
    listing_type: "flight" as "hotel" | "flight" | "transport",
    name: "Flights to Jeddah",
    description: "Find the best deals on flights",
    city: "Jeddah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Skyscanner",
    redirect_url: "https://www.skyscanner.com",
    image_url: "https://images.unsplash.com/photo-1482927849216-cc8b100ae9a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "From $600 round-trip"
  },
  {
    id: "ext-4",
    listing_type: "transport" as "hotel" | "flight" | "transport",
    name: "Makkah to Madinah Transport",
    description: "Reliable transport between holy cities",
    city: "Both" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "GetYourGuide",
    redirect_url: "https://www.getyourguide.com",
    image_url: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "From $50 per person"
  }
];
