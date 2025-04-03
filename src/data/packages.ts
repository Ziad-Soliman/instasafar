
// Mock data for packages

export const featuredPackages = [
  {
    id: "package-1",
    name: "Premium Umrah Package - 10 Days",
    description: "A comprehensive 10-day Umrah package featuring 5-star accommodations in Makkah and Madinah, round-trip flights, guided tours, and private transportation.",
    price: 2500,
    duration_days: 10,
    start_date: "2023-11-15",
    end_date: "2023-11-25",
    thumbnail: "https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Both" as "Makkah" | "Madinah" | "Both"
  },
  {
    id: "package-2",
    name: "Comfort Makkah & Madinah - 7 Days",
    description: "Experience the spiritual journey with our 7-day package that includes comfortable accommodations, transportation between cities, and guided religious activities.",
    price: 1800,
    duration_days: 7,
    start_date: "2023-12-10",
    end_date: "2023-12-17",
    thumbnail: "https://images.unsplash.com/photo-1581887301413-98ec94fb02b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes_hotel: true,
    includes_flight: false,
    includes_transport: true,
    city: "Both" as "Makkah" | "Madinah" | "Both"
  }
];

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
      "https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581887301413-98ec94fb02b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
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
