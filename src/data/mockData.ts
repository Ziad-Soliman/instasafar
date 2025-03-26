
// Mock data for the application

// Internal Hotels
export const featuredHotels = [
  {
    id: "hotel-1",
    name: "Al Safwah Royale Orchid Hotel",
    city: "Makkah",
    address: "Ibrahim Al Khalil Rd, Makkah 24231, Saudi Arabia",
    description: "Experience luxury and comfort just steps away from the Holy Mosque. Our hotel offers breathtaking views of the Kaaba and impeccable service.",
    rating: 4.8,
    price_per_night: 350,
    distance_to_haram: "200m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Prayer Room", "Family Rooms"],
    thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: "hotel-2",
    name: "Elaf Kinda Hotel",
    city: "Makkah",
    address: "Central Area, Makkah 24231, Saudi Arabia",
    description: "Enjoy the convenience of our prime location in the heart of Makkah, with easy access to the Holy Mosque and modern amenities for a comfortable stay.",
    rating: 4.5,
    price_per_night: 280,
    distance_to_haram: "450m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Airport Shuttle", "Laundry"],
    thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: "hotel-3",
    name: "Al Noor Palace Hotel",
    city: "Madinah",
    address: "Central Zone, Madinah 42311, Saudi Arabia",
    description: "A serene retreat located near the Prophet's Mosque, offering pilgrims a peaceful and spiritual stay with all modern conveniences.",
    rating: 4.7,
    price_per_night: 320,
    distance_to_haram: "150m",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "AC", "Concierge", "Family Rooms"],
    thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  }
];

// Internal Packages
export const featuredPackages = [
  {
    id: "package-1",
    name: "Premium Umrah Package - 10 Days",
    description: "A comprehensive 10-day Umrah package featuring 5-star accommodations in Makkah and Madinah, round-trip flights, guided tours, and private transportation.",
    price: 2500,
    duration_days: 10,
    start_date: "2023-11-15",
    end_date: "2023-11-25",
    thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Both"
  },
  {
    id: "package-2",
    name: "Comfort Makkah & Madinah - 7 Days",
    description: "Experience the spiritual journey with our 7-day package that includes comfortable accommodations, transportation between cities, and guided religious activities.",
    price: 1800,
    duration_days: 7,
    start_date: "2023-12-10",
    end_date: "2023-12-17",
    thumbnail: "https://images.unsplash.com/photo-1534831686667-2425fc539065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    city: "Both"
  }
];

// External Listings
export const externalListings = [
  {
    id: "ext-1",
    listing_type: "hotel",
    name: "Hilton Makkah Convention Hotel",
    description: "Luxury hotel with stunning views of the Haram",
    city: "Makkah",
    provider_name: "Booking.com",
    redirect_url: "https://www.booking.com",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    price_indication: "From $200/night",
    rating_indication: "8.9"
  },
  {
    id: "ext-2",
    listing_type: "hotel",
    name: "Pullman ZamZam Makkah",
    description: "Modern hotel near the Holy Mosque",
    city: "Makkah",
    provider_name: "Agoda",
    redirect_url: "https://www.agoda.com",
    image_url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
    price_indication: "From $180/night",
    rating_indication: "8.7"
  },
  {
    id: "ext-3",
    listing_type: "flight",
    name: "Flights to Jeddah",
    description: "Find the best deals on flights",
    city: "Jeddah",
    provider_name: "Skyscanner",
    redirect_url: "https://www.skyscanner.com",
    image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80",
    price_indication: "From $600 round-trip"
  },
  {
    id: "ext-4",
    listing_type: "transport",
    name: "Makkah to Madinah Transport",
    description: "Reliable transport between holy cities",
    city: "Both",
    provider_name: "GetYourGuide",
    redirect_url: "https://www.getyourguide.com",
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    price_indication: "From $50 per person"
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
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
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
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
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
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
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
          "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80"
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

// Mock package details
export const packageDetails = {
  "package-1": {
    id: "package-1",
    name: "Premium Umrah Package - 10 Days",
    description: "A comprehensive 10-day Umrah package featuring 5-star accommodations in Makkah and Madinah, round-trip flights, guided tours, and private transportation.",
    detailed_description: "Our Premium Umrah Package is designed to provide pilgrims with a seamless and spiritually fulfilling experience. The 10-day journey includes stays at luxury hotels in both Makkah and Madinah, located just steps away from the holy mosques.\n\nThe package includes round-trip international flights from major cities, private airport transfers, and comfortable transportation between Makkah and Madinah. Our experienced religious guides will assist you throughout your pilgrimage, providing valuable insights and ensuring you complete all rituals correctly.\n\nYou'll spend 5 nights in Makkah and 4 nights in Madinah, with daily meals provided at the hotels. The package also includes guided visits to significant historical and religious sites in both cities, helping you gain a deeper appreciation of Islamic heritage.",
    price: 2500,
    duration_days: 10,
    start_date: "2023-11-15",
    end_date: "2023-11-25",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1604143304764-58ca6fb783fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80",
      "https://images.unsplash.com/photo-1610553556003-9b2ae8efdd66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ],
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Both",
    hotel_details: {
      makkah: {
        name: "Al Safwah Royale Orchid Hotel",
        rating: 5,
        nights: 5,
        room_type: "Deluxe Room"
      },
      madinah: {
        name: "Al Noor Palace Hotel",
        rating: 5,
        nights: 4,
        room_type: "Executive Room"
      }
    },
    flight_details: {
      airline: "Saudi Airlines",
      departure_airport: "Multiple major cities",
      arrival_airport: "Jeddah International Airport",
      class: "Economy"
    },
    transport_details: {
      type: "Private air-conditioned vehicle",
      includes_airport_transfer: true,
      includes_city_transfer: true
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jeddah",
        description: "Arrival at Jeddah International Airport. Meet and greet by our representative. Transfer to your hotel in Makkah. Rest and prepare for Umrah."
      },
      {
        day: 2,
        title: "Umrah Rituals",
        description: "Perform Umrah rituals with guidance from our religious expert. Evening free for prayers at the Holy Mosque."
      },
      {
        day: 3,
        title: "Makkah Exploration",
        description: "Morning prayers at Haram. Guided tour of historical sites in Makkah including Jabal Al-Noor and Jabal Thawr."
      },
      {
        day: 4,
        title: "Prayers and Reflection",
        description: "Full day for prayers and reflection at the Holy Mosque."
      },
      {
        day: 5,
        title: "More Makkah Exploration",
        description: "Visit to Makkah Museum and other significant sites. Evening for shopping at local markets."
      },
      {
        day: 6,
        title: "Travel to Madinah",
        description: "After Fajr prayer, depart for Madinah by private vehicle. Check-in at hotel in Madinah. Evening prayers at the Prophet's Mosque."
      },
      {
        day: 7,
        title: "Madinah Exploration",
        description: "Visit historical mosques and sites in Madinah including Quba Mosque, Qiblatain Mosque, and the Seven Mosques."
      },
      {
        day: 8,
        title: "Uhud and More",
        description: "Visit to Mount Uhud, Baqi Cemetery, and other significant sites. Evening for prayers at the Prophet's Mosque."
      },
      {
        day: 9,
        title: "Final Day in Madinah",
        description: "Full day for prayers and reflection at the Prophet's Mosque. Farewell dinner."
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to Jeddah International Airport for your return flight."
      }
    ],
    reviews: [
      {
        id: "review-p1-1",
        user_name: "Ibrahim M.",
        rating: 5,
        date: "2023-05-20",
        comment: "This package exceeded all my expectations. The hotels were luxurious and perfectly located, and the guides were knowledgeable and helpful. The entire journey was spiritually fulfilling and extremely comfortable."
      },
      {
        id: "review-p1-2",
        user_name: "Aisha R.",
        rating: 4,
        date: "2023-04-15",
        comment: "A wonderful package that made our Umrah journey stress-free. The accommodations were excellent and the transportation was very comfortable. The only small issue was a slight delay in one of our transfers."
      }
    ]
  },
  // Add more package details as needed
};
