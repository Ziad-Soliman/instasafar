
// Mock data for hotels

export const featuredHotels = [
  {
    id: "hotel-1",
    name: "Al Safwah Royale Orchid Hotel",
    city: "Makkah" as "Makkah" | "Madinah",
    address: "Ibrahim Al Khalil Rd, Makkah 24231, Saudi Arabia",
    description: "Experience luxury and comfort just steps away from the Holy Mosque. Our hotel offers breathtaking views of the Kaaba and impeccable service.",
    rating: 4.8,
    price_per_night: 350,
    distance_to_haram: "200m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Prayer Room", "Family Rooms"],
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: "hotel-2",
    name: "Elaf Kinda Hotel",
    city: "Makkah" as "Makkah" | "Madinah",
    address: "Central Area, Makkah 24231, Saudi Arabia",
    description: "Enjoy the convenience of our prime location in the heart of Makkah, with easy access to the Holy Mosque and modern amenities for a comfortable stay.",
    rating: 4.5,
    price_per_night: 280,
    distance_to_haram: "450m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Airport Shuttle", "Laundry"],
    thumbnail: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
  },
  {
    id: "hotel-3",
    name: "Al Noor Palace Hotel",
    city: "Madinah" as "Makkah" | "Madinah",
    address: "Central Zone, Madinah 42311, Saudi Arabia",
    description: "A serene retreat located near the Prophet's Mosque, offering pilgrims a peaceful and spiritual stay with all modern conveniences.",
    rating: 4.7,
    price_per_night: 320,
    distance_to_haram: "150m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Concierge", "Family Rooms"],
    thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  }
];

// Mock hotel details including rooms
export const hotelDetails = {
  "hotel-1": {
    id: "hotel-1",
    name: "Al Safwah Royale Orchid Hotel",
    city: "Makkah",
    address: "Ibrahim Al Khalil Rd, Makkah 24231, Saudi Arabia",
    description: "Experience luxury and comfort just steps away from the Holy Mosque. Our hotel offers breathtaking views of the Kaaba and impeccable service for all pilgrims seeking both spiritual fulfillment and premium accommodations.",
    detailed_description: "Al Safwah Royale Orchid Hotel sits in a prime location just 200 meters from the Haram, offering guests easy access to perform their religious duties. The hotel features elegant rooms designed for comfort and relaxation after long days of worship. Our dedicated staff is committed to providing exceptional service to make your stay both comfortable and memorable.\n\nGuests can enjoy our international restaurant serving a variety of cuisines, including Middle Eastern, Asian, and Western options. The hotel also features a well-equipped prayer room, business center, and 24-hour room service to cater to all your needs.",
    rating: 4.8,
    price_per_night: 350,
    distance_to_haram: "200m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Air Conditioning", "Prayer Room", "Family Rooms", "24-hour Front Desk", "Concierge", "Laundry Service", "Spa", "Fitness Center"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
    ],
    map_coordinates: {
      lat: 21.4225,
      lng: 39.8262
    },
    rooms: [
      {
        id: "room-1-1",
        room_type: "Standard Room",
        price_per_night: 350,
        capacity: 2,
        description: "Comfortable room with two single beds, perfect for two pilgrims.",
        amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Private Bathroom", "Refrigerator"],
        images: [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        ]
      },
      {
        id: "room-1-2",
        room_type: "Deluxe Room",
        price_per_night: 450,
        capacity: 2,
        description: "Spacious room with a king-size bed and city view.",
        amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "Private Bathroom", "Mini Bar", "Coffee Maker", "Safe"],
        images: [
          "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        ]
      },
      {
        id: "room-1-3",
        room_type: "Family Suite",
        price_per_night: 650,
        capacity: 4,
        description: "Spacious suite with two bedrooms, perfect for families.",
        amenities: ["Free WiFi", "Air Conditioning", "Flat-screen TV", "2 Bathrooms", "Mini Bar", "Coffee Maker", "Safe", "Living Area"],
        images: [
          "https://images.unsplash.com/photo-1630660664869-c9d3cc676880?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80"
        ]
      }
    ],
    reviews: [
      {
        id: "review-1-1",
        user_name: "Ahmad K.",
        rating: 5,
        date: "2023-08-15",
        comment: "Perfect location right next to the Haram. The staff was extremely helpful and the room was very comfortable. I would definitely stay here again for my next Umrah trip."
      },
      {
        id: "review-1-2",
        user_name: "Fatima S.",
        rating: 4,
        date: "2023-07-22",
        comment: "Great hotel with excellent service. The proximity to the Haram is unbeatable. The only minor issue was that the WiFi was a bit slow during peak hours."
      },
      {
        id: "review-1-3",
        user_name: "Mohammed A.",
        rating: 5,
        date: "2023-06-10",
        comment: "One of the best hotels I've stayed at in Makkah. The room was spacious and clean, and the view of the Haram was breathtaking. The breakfast buffet had a wide variety of options."
      }
    ]
  },
  // Add more hotel details as needed
};
