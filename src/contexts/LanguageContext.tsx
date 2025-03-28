
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
});

// English translations
const enTranslations: Record<string, string> = {
  // Common
  "app.name": "InstaSafar",
  "app.tagline": "Your spiritual journey made simple",

  // Navigation
  "nav.home": "Home",
  "nav.search": "Search",
  "nav.packages": "Packages",
  "nav.hotels": "Hotels",
  "nav.about": "About Us",
  "nav.contact": "Contact",
  "nav.login": "Login",
  "nav.signup": "Sign Up",
  "nav.profile": "Profile",
  "nav.bookings": "My Bookings",
  "nav.logout": "Logout",
  
  // Homepage
  "home.hero.title": "Hajj & Umrah Journey",
  "home.hero.subtitle": "Begin your spiritual journey with us",
  "home.featured.title": "Featured Hotels",
  "home.featured.subtitle": "Discover our handpicked selection of hotels in Makkah and Madinah offering comfort, convenience, and spiritual serenity.",
  "home.packages.title": "Complete Packages",
  "home.packages.subtitle": "All-inclusive Hajj and Umrah packages featuring accommodation, transportation, and guided visits to holy sites.",
  "home.external.title": "More Options",
  "home.external.subtitle": "Explore additional hotels and packages from our trusted partners and booking platforms.",
  "home.cta.title": "Ready to start your spiritual journey?",
  "home.cta.subtitle": "Let us help you plan your Hajj or Umrah pilgrimage with our expert services and comprehensive offerings.",
  
  // Buttons
  "button.explore": "Explore Packages",
  "button.viewAll": "View All",
  "button.learnMore": "Learn More",
  "button.bookNow": "Book Now",
  "button.viewDetails": "View Details",
  "button.findPackages": "Find Packages",
  "button.contactUs": "Contact Us",
  "button.search": "Search",
  
  // Search
  "search.title": "Search Results",
  "search.filters": "Filters",
  "search.price": "Price Range",
  "search.location": "Location",
  "search.rating": "Rating",
  "search.apply": "Apply Filters",
  "search.all": "All Results",
  "search.hotels": "Hotels",
  "search.packages": "Packages",
  "search.external": "External Sites",

  // Auth
  "auth.login.title": "Welcome back",
  "auth.login.subtitle": "Sign in to your account to continue",
  "auth.register.title": "Create an account",
  "auth.register.subtitle": "Sign up to start booking your spiritual journey",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.confirmPassword": "Confirm Password",
  "auth.fullName": "Full Name",
  "auth.forgotPassword": "Forgot password?",
  "auth.noAccount": "Don't have an account?",
  "auth.haveAccount": "Already have an account?",
  "auth.signIn": "Sign In",
  "auth.signUp": "Sign Up",
  "auth.createAccount": "Create Account",
  "auth.quickLogin": "Quick Login",
  "auth.loginAsUser": "Login as User",
  "auth.loginAsAdmin": "Login as Admin",
  "auth.privacyPolicy": "Privacy Policy",
  "auth.termsOfService": "Terms of Service",
  
  // Account
  "account.profile": "Profile",
  "account.bookings": "My Bookings",
  "account.profile.update": "Update Profile",
  "account.phone": "Phone Number",
  "account.preferredLanguage": "Preferred Language",
  
  // Booking
  "booking.confirm.title": "Confirm Booking",
  "booking.details": "Booking Details",
  "booking.dates": "Dates",
  "booking.guests": "Guests",
  "booking.price": "Price",
  "booking.guestInfo": "Guest Information",
  "booking.success.title": "Booking Successful",
  "booking.success.message": "Your booking has been confirmed",
  "booking.reference": "Booking Reference",
  "booking.status": "Status",
  "booking.pending": "Pending",
  "booking.confirmed": "Confirmed",
  "booking.cancelled": "Cancelled",
  
  // Admin
  "admin.dashboard": "Admin Dashboard",
  "admin.users": "Users",
  "admin.hotels": "Hotels",
  "admin.packages": "Packages",
  "admin.bookings": "Bookings",
  "admin.externalListings": "External Listings",
  "admin.reviews": "Reviews",
  
  // Provider
  "provider.dashboard": "Provider Dashboard",
  "provider.listings": "My Listings",
  "provider.bookings": "Bookings",
  "provider.profile": "Provider Profile",
  "provider.addListing": "Add New Listing",
  "provider.editListing": "Edit Listing",
  
  // Misc
  "loading": "Loading...",
  "error": "Something went wrong",
  "notFound": "Page not found",
  "backToHome": "Back to Home",
};

// Arabic translations
const arTranslations: Record<string, string> = {
  // Common
  "app.name": "إنستا سفر",
  "app.tagline": "رحلتك الروحية بشكل أسهل",

  // Navigation
  "nav.home": "الرئيسية",
  "nav.search": "البحث",
  "nav.packages": "الباقات",
  "nav.hotels": "الفنادق",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "nav.login": "تسجيل الدخول",
  "nav.signup": "إنشاء حساب",
  "nav.profile": "الملف الشخصي",
  "nav.bookings": "حجوزاتي",
  "nav.logout": "تسجيل الخروج",
  
  // Homepage
  "home.hero.title": "رحلة الحج والعمرة",
  "home.hero.subtitle": "ابدأ رحلتك الروحية معنا",
  "home.featured.title": "فنادق مميزة",
  "home.featured.subtitle": "اكتشف مجموعة مختارة من الفنادق في مكة المكرمة والمدينة المنورة التي توفر الراحة والملاءمة والسكينة الروحية.",
  "home.packages.title": "باقات متكاملة",
  "home.packages.subtitle": "باقات شاملة للحج والعمرة تتضمن الإقامة والنقل والزيارات بإرشاد إلى المواقع المقدسة.",
  "home.external.title": "خيارات إضافية",
  "home.external.subtitle": "استكشف فنادق وباقات إضافية من شركائنا الموثوقين ومنصات الحجز.",
  "home.cta.title": "هل أنت مستعد لبدء رحلتك الروحية؟",
  "home.cta.subtitle": "دعنا نساعدك في تخطيط رحلة الحج أو العمرة بخدماتنا المتخصصة وعروضنا الشاملة.",
  
  // Buttons
  "button.explore": "استكشف الباقات",
  "button.viewAll": "عرض الكل",
  "button.learnMore": "معرفة المزيد",
  "button.bookNow": "احجز الآن",
  "button.viewDetails": "عرض التفاصيل",
  "button.findPackages": "ابحث عن الباقات",
  "button.contactUs": "اتصل بنا",
  "button.search": "بحث",
  
  // Search
  "search.title": "نتائج البحث",
  "search.filters": "التصفية",
  "search.price": "نطاق السعر",
  "search.location": "الموقع",
  "search.rating": "التقييم",
  "search.apply": "تطبيق التصفية",
  "search.all": "جميع النتائج",
  "search.hotels": "الفنادق",
  "search.packages": "الباقات",
  "search.external": "مواقع خارجية",

  // Auth
  "auth.login.title": "مرحبًا بعودتك",
  "auth.login.subtitle": "قم بتسجيل الدخول إلى حسابك للمتابعة",
  "auth.register.title": "إنشاء حساب",
  "auth.register.subtitle": "قم بالتسجيل لبدء حجز رحلتك الروحية",
  "auth.email": "البريد الإلكتروني",
  "auth.password": "كلمة المرور",
  "auth.confirmPassword": "تأكيد كلمة المرور",
  "auth.fullName": "الاسم الكامل",
  "auth.forgotPassword": "نسيت كلمة المرور؟",
  "auth.noAccount": "ليس لديك حساب؟",
  "auth.haveAccount": "لديك حساب بالفعل؟",
  "auth.signIn": "تسجيل الدخول",
  "auth.signUp": "التسجيل",
  "auth.createAccount": "إنشاء حساب",
  "auth.quickLogin": "تسجيل دخول سريع",
  "auth.loginAsUser": "تسجيل الدخول كمستخدم",
  "auth.loginAsAdmin": "تسجيل الدخول كمسؤول",
  "auth.privacyPolicy": "سياسة الخصوصية",
  "auth.termsOfService": "شروط الخدمة",
  
  // Account
  "account.profile": "الملف الشخصي",
  "account.bookings": "حجوزاتي",
  "account.profile.update": "تحديث الملف الشخصي",
  "account.phone": "رقم الهاتف",
  "account.preferredLanguage": "اللغة المفضلة",
  
  // Booking
  "booking.confirm.title": "تأكيد الحجز",
  "booking.details": "تفاصيل الحجز",
  "booking.dates": "التواريخ",
  "booking.guests": "الضيوف",
  "booking.price": "السعر",
  "booking.guestInfo": "معلومات الضيف",
  "booking.success.title": "تم الحجز بنجاح",
  "booking.success.message": "تم تأكيد حجزك",
  "booking.reference": "رقم مرجعي للحجز",
  "booking.status": "الحالة",
  "booking.pending": "قيد الانتظار",
  "booking.confirmed": "مؤكد",
  "booking.cancelled": "ملغى",
  
  // Admin
  "admin.dashboard": "لوحة تحكم المسؤول",
  "admin.users": "المستخدمون",
  "admin.hotels": "الفنادق",
  "admin.packages": "الباقات",
  "admin.bookings": "الحجوزات",
  "admin.externalListings": "القوائم الخارجية",
  "admin.reviews": "التقييمات",
  
  // Provider
  "provider.dashboard": "لوحة تحكم المزود",
  "provider.listings": "قوائمي",
  "provider.bookings": "الحجوزات",
  "provider.profile": "ملف المزود",
  "provider.addListing": "إضافة قائمة جديدة",
  "provider.editListing": "تعديل القائمة",
  
  // Misc
  "loading": "جارٍ التحميل...",
  "error": "حدث خطأ ما",
  "notFound": "الصفحة غير موجودة",
  "backToHome": "العودة إلى الرئيسية",
};

// Provider component that will wrap our app
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");
  const isRTL = language === "ar";

  // Initialize language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem("instasafar_language") as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Update language handler
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("instasafar_language", lang);
    
    // Apply RTL/LTR settings
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("font-arabic");
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("font-arabic");
    }
  };

  // Translation function
  const translate = (key: string): string => {
    const translations = language === "en" ? enTranslations : arTranslations;
    return translations[key] || key; // Fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translate,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
