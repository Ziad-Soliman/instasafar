
// Mock data for external listings

export const externalListings = [
  {
    id: "ext-1",
    listing_type: "hotel" as "hotel" | "flight" | "transport",
    name: "Hilton Makkah Convention Hotel",
    description: "فندق فاخر مع إطلالات خلابة على الحرم",
    city: "Makkah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Booking.com",
    redirect_url: "https://www.booking.com",
    image_url: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٧٥٠ ر.س",
    rating_indication: "8.9"
  },
  {
    id: "ext-2",
    listing_type: "hotel" as "hotel" | "flight" | "transport",
    name: "Pullman ZamZam Makkah",
    description: "فندق عصري بالقرب من المسجد الحرام",
    city: "Makkah" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "Agoda",
    redirect_url: "https://www.agoda.com",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٦٨٠ ر.س",
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
    image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "٢٢٥٠ ر.س"
  },
  {
    id: "ext-4",
    listing_type: "transport" as "hotel" | "flight" | "transport",
    name: "النقل بين مكة والمدينة",
    description: "خدمة نقل موثوقة بين المدن المقدسة",
    city: "Both" as "Makkah" | "Madinah" | "Jeddah" | "Other",
    provider_name: "GetYourGuide",
    redirect_url: "https://www.getyourguide.com",
    image_url: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    price_indication: "١٩٠ ر.س"
  }
];
