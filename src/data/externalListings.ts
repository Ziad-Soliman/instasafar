
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
    image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "من 750 ﷼",
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
    image_url: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "من 680 ﷼",
    rating_indication: "8.7"
  },
  {
    id: "ext-3",
    listing_type: "flight" as "hotel" | "flight" | "transport",
    name: "رحلات إلى جدة",
    description: "أفضل العروض على رحلات الطيران",
    city: "Jeddah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Skyscanner",
    redirect_url: "https://www.skyscanner.com",
    image_url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "من 2250 ﷼"
  },
  {
    id: "ext-4",
    listing_type: "transport" as "hotel" | "flight" | "transport",
    name: "النقل بين مكة والمدينة",
    description: "خدمة نقل موثوقة بين المدن المقدسة",
    city: "Both" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "GetYourGuide",
    redirect_url: "https://www.getyourguide.com",
    image_url: "https://images.unsplash.com/photo-1623000237628-e150a1533cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "من 190 ﷼ للشخص"
  }
];
