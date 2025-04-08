
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LanguageType = "en" | "ar";

interface LanguageContextType {
  language: LanguageType;
  locale: string;
  setLanguage: (language: LanguageType) => void;
  isRTL: boolean;
  t: (key: string, defaultValue?: string) => string;
}

// Create a context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  locale: "en-US",
  setLanguage: () => {},
  isRTL: false,
  t: (key, defaultValue) => defaultValue || key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

// Expanded translations for the application
const translations: Record<LanguageType, Record<string, string>> = {
  en: {
    // App general
    "app.name": "InstaSafar",
    "app.tagline": "Your Trusted Hajj & Umrah Companion",
    
    // Homepage
    "home.hero.title": "Discover the Ultimate Hajj & Umrah Experience",
    "home.hero.subtitle": "Book your sacred journey with ease and confidence",
    "home.featured.title": "Featured Hajj & Umrah Packages",
    "home.featured.viewAll": "View All Packages",
    "home.recommended.title": "Recommended Hotels",
    "home.recommended.subtitle": "Top-rated accommodations in Makkah and Madinah",
    "home.external.title": "More Options from Our Partners",
    
    // Search
    "search.title": "Search Results",
    "search.filters": "Filters",
    "search.price": "Price Range",
    "search.location": "Location",
    "search.location.makkah": "Makkah",
    "search.location.madinah": "Madinah",
    "search.location.all": "All Locations",
    "search.rating": "Rating",
    "search.applyFilters": "Apply Filters",
    "search.tab.all": "All Results",
    "search.tab.hotels": "Hotels",
    "search.tab.packages": "Packages",
    "search.tab.external": "External Sites",
    "search.noResults": "No results found. Try adjusting your filters.",
    
    // Listing types and badges
    "listing.internal": "Book Direct",
    "listing.external": "External",
    "listing.viewDetails": "View Details",
    "listing.bookNow": "Book Now",
    "listing.viewOn": "View on",
    "listing.perNight": "/night",
    "listing.person": "/person",
    "listing.type.hotel": "Hotel",
    "listing.type.flight": "Flight",
    "listing.type.transport": "Transport",

    // Auth pages
    "auth.login.title": "Sign in to your account",
    "auth.login.subtitle": "Enter your credentials to access your account",
    "auth.register.title": "Create an account",
    "auth.register.subtitle": "Sign up to start booking your spiritual journey",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.phone": "Phone Number",
    "auth.forgotPassword": "Forgot Password?",
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign Up",
    "auth.noAccount": "Don't have an account?",
    "auth.haveAccount": "Already have an account?",
    "auth.terms": "By registering, you agree to our Terms of Service and Privacy Policy.",
    "auth.quickLogin": "Quick Login",
    "auth.loginAsUser": "Login as User",
    "auth.loginAsAdmin": "Login as Admin",
    
    // Account pages
    "account.profile.title": "Your Profile",
    "account.profile.subtitle": "Manage your personal information",
    "account.profile.update": "Update Profile",
    "account.bookings.title": "Your Bookings",
    "account.bookings.subtitle": "View and manage your booking history",
    "account.bookings.noBookings": "You don't have any bookings yet.",
    "account.bookings.viewDetails": "View Details",
    
    // Booking flow
    "booking.confirm.title": "Confirm Your Booking",
    "booking.confirm.subtitle": "Review the details before finalizing your booking",
    "booking.summary": "Booking Summary",
    "booking.dates": "Dates",
    "booking.guests": "Guests",
    "booking.price": "Price Details",
    "booking.price.total": "Total Price",
    "booking.guestInfo": "Guest Information",
    "booking.guestInfo.subtitle": "Please provide the main guest's details",
    "booking.submit": "Confirm Booking",
    "booking.login": "Please login to book",
    "booking.success.title": "Booking Successful!",
    "booking.success.subtitle": "Your booking request has been received",
    "booking.success.reference": "Booking Reference",
    "booking.success.viewBookings": "View My Bookings",
    "booking.status.pending": "Pending",
    "booking.status.confirmed": "Confirmed",
    "booking.status.cancelled": "Cancelled",
    
    // Common actions
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.search": "Search",
    "action.filter": "Filter",
    "action.sort": "Sort",
    "action.back": "Back",
    "action.continue": "Continue",
    "action.viewDetails": "View Details",
    "loading": "Loading",
    "more": "more",
    
    // Dates and location formatting
    "date.from": "From",
    "date.to": "To",
    "date.days": "days",
    "distance.from": "from",
    "distance.haram": "Haram",
    
    // Location names
    "location.makkah": "Makkah",
    "location.madinah": "Madinah",
    "location.jeddah": "Jeddah",
    
    // Package types
    "package.type.hajj": "Hajj",
    "package.type.umrah": "Umrah",
    "package.type.custom": "Custom",
    "package.includes.hotel": "Hotel Included",
    "package.includes.flight": "Flight Included",
    "package.includes.transport": "Transport Included",
    "package.duration": "Duration",
    "package.days": "days",
    
    // Navigation items - FIXED removing the "nav." prefix
    "home": "Home",
    "search": "Search",
    "packages": "Packages",
    "flights": "Flights",
    "transport": "Transport",
    "profile": "Profile",
    "bookings": "Bookings",
    "wishlist": "Wishlist",
    "logout": "Logout",
    
    // New additions
    "wishlist.add": "Add to Wishlist",
    "wishlist.remove": "Remove from Wishlist",
    "wishlist.empty": "Your wishlist is empty",
    "notification.new": "New notification",
    "notification.empty": "No notifications",
    "search.placeholder": "Search for hotels, packages...",
    "review.rating": "Rating",
    "review.comment": "Comment",
    "review.submit": "Submit Review",
    "review.date": "Review Date",
    "review.helpful": "Was this review helpful?",
    "currency.sar": "SAR",
    
    // Language
    "language.select": "Select language",
    "language.changedToEnglish": "Language changed to English",
    "language.changedToArabic": "Language changed to Arabic",
    "language.pageWillRefresh": "The page will refresh with English content",
    "language.pageWillRefreshAr": "The page will refresh with Arabic content",
  },
  ar: {
    // App general
    "app.name": "انستاسفر",
    "app.tagline": "رفيقك الموثوق للحج والعمرة",
    
    // Homepage
    "home.hero.title": "اكتشف تجربة الحج والعمرة المثالية",
    "home.hero.subtitle": "احجز رحلتك المقدسة بسهولة وثقة",
    "home.featured.title": "باقات الحج والعمرة المميزة",
    "home.featured.viewAll": "عرض جميع الباقات",
    "home.recommended.title": "الفنادق الموصى بها",
    "home.recommended.subtitle": "أماكن إقامة ذات تقييم عالٍ في مكة والمدينة",
    "home.external.title": "المزيد من الخيارات من شركائنا",
    
    // Search
    "search.title": "نتائج البحث",
    "search.filters": "التصفية",
    "search.price": "نطاق السعر",
    "search.location": "الموقع",
    "search.location.makkah": "مكة",
    "search.location.madinah": "المدينة",
    "search.location.all": "جميع المواقع",
    "search.rating": "التقييم",
    "search.applyFilters": "تطبيق الفلاتر",
    "search.tab.all": "جميع النتائج",
    "search.tab.hotels": "الفنادق",
    "search.tab.packages": "الباقات",
    "search.tab.external": "المواقع الخارجية",
    "search.noResults": "لم يتم العثور على نتائج. حاول تعديل الفلاتر.",
    
    // Listing types and badges
    "listing.internal": "احجز مباشرة",
    "listing.external": "خارجي",
    "listing.viewDetails": "عرض التفاصيل",
    "listing.bookNow": "احجز الآن",
    "listing.viewOn": "عرض على",
    "listing.perNight": "/ليلة",
    "listing.person": "/شخص",
    "listing.type.hotel": "فندق",
    "listing.type.flight": "رحلة طيران",
    "listing.type.transport": "مواصلات",
    
    // Auth pages
    "auth.login.title": "تسجيل الدخول إلى حسابك",
    "auth.login.subtitle": "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك",
    "auth.register.title": "إنشاء حساب",
    "auth.register.subtitle": "سجل للبدء في حجز رحلتك الروحية",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.phone": "رقم الهاتف",
    "auth.forgotPassword": "نسيت كلمة المرور؟",
    "auth.signIn": "تسجيل الدخول",
    "auth.signUp": "إنشاء حساب",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.haveAccount": "لديك حساب بالفعل؟",
    "auth.terms": "بالتسجيل، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.",
    "auth.quickLogin": "تسجيل دخول سريع",
    "auth.loginAsUser": "تسجيل الدخول كمستخدم",
    "auth.loginAsAdmin": "تسجيل الدخول كمسؤول",
    
    // Account pages
    "account.profile.title": "ملفك الشخصي",
    "account.profile.subtitle": "إدارة معلوماتك الشخصية",
    "account.profile.update": "تحديث الملف الشخصي",
    "account.bookings.title": "حجوزاتك",
    "account.bookings.subtitle": "عرض وإدارة تاريخ الحجوزات",
    "account.bookings.noBookings": "ليس لديك أي حجوزات حتى الآن.",
    "account.bookings.viewDetails": "عرض التفاصيل",
    
    // Booking flow
    "booking.confirm.title": "تأكيد الحجز",
    "booking.confirm.subtitle": "راجع التفاصيل قبل الانتهاء من الحجز",
    "booking.summary": "ملخص الحجز",
    "booking.dates": "التواريخ",
    "booking.guests": "الضيوف",
    "booking.price": "تفاصيل السعر",
    "booking.price.total": "السعر الإجمالي",
    "booking.guestInfo": "معلومات الضيف",
    "booking.guestInfo.subtitle": "يرجى تقديم تفاصيل الضيف الرئيسي",
    "booking.submit": "تأكيد الحجز",
    "booking.login": "الرجاء تسجيل الدخول للحجز",
    "booking.success.title": "تم الحجز بنجاح!",
    "booking.success.subtitle": "تم استلام طلب الحجز الخاص بك",
    "booking.success.reference": "مرجع الحجز",
    "booking.success.viewBookings": "عرض حجوزاتي",
    "booking.status.pending": "قيد الانتظار",
    "booking.status.confirmed": "مؤكد",
    "booking.status.cancelled": "ملغى",
    
    // Common actions
    "action.save": "حفظ",
    "action.cancel": "إلغاء",
    "action.edit": "تعديل",
    "action.delete": "حذف",
    "action.search": "بحث",
    "action.filter": "تصفية",
    "action.sort": "ترتيب",
    "action.back": "رجوع",
    "action.continue": "متابعة",
    "action.viewDetails": "عرض التفاصيل",
    "loading": "جاري التحميل",
    "more": "المزيد",
    
    // Dates and location formatting
    "date.from": "من",
    "date.to": "إلى",
    "date.days": "أيام",
    "distance.from": "من",
    "distance.haram": "الحرم",
    
    // Location names
    "location.makkah": "مكة المكرمة",
    "location.madinah": "المدينة المنورة",
    "location.jeddah": "جدة",
    
    // Package types
    "package.type.hajj": "حج",
    "package.type.umrah": "عمرة",
    "package.type.custom": "مخصص",
    "package.includes.hotel": "يشمل الفندق",
    "package.includes.flight": "يشمل الطيران",
    "package.includes.transport": "يشمل المواصلات",
    "package.duration": "المدة",
    "package.days": "أيام",
    
    // Navigation items - FIXED adding translations
    "home": "الرئيسية",
    "search": "البحث",
    "packages": "الباقات",
    "flights": "الرحلات الجوية",
    "transport": "المواصلات",
    "profile": "الملف الشخصي",
    "bookings": "الحجوزات",
    "wishlist": "المفضلة",
    "logout": "تسجيل الخروج",
    
    // New additions
    "wishlist.add": "أضف إلى المفضلة",
    "wishlist.remove": "إزالة من المفضلة",
    "wishlist.empty": "قائمة المفضلة فارغة",
    "notification.new": "إشعار جديد",
    "notification.empty": "لا توجد إشعارات",
    "search.placeholder": "ابحث عن فنادق وباقات...",
    "review.rating": "التقييم",
    "review.comment": "التعليق",
    "review.submit": "إرسال المراجعة",
    "review.date": "تاريخ المراجعة",
    "review.helpful": "هل كانت هذه المراجعة مفيدة؟",
    "currency.sar": "ر.س",
    
    // Language
    "language.select": "اختر اللغة",
    "language.changedToEnglish": "تم تغيير اللغة إلى الإنجليزية",
    "language.changedToArabic": "تم تغيير اللغة إلى العربية",
    "language.pageWillRefresh": "ستتم إعادة تحميل الصفحة بالمحتوى الإنجليزي",
    "language.pageWillRefreshAr": "ستتم إعادة تحميل الصفحة بالمحتوى العربي",
  },
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>("en");
  const isRTL = language === "ar";
  const locale = language === "ar" ? "ar-SA" : "en-US"; // Add locale value

  useEffect(() => {
    // Check for saved language preference on component mount
    const savedLang = localStorage.getItem("instasafar_language") as LanguageType | null;
    if (savedLang) {
      setLanguageState(savedLang);
      applyLanguageSettings(savedLang);
    }
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    applyLanguageSettings(lang);
  };

  const applyLanguageSettings = (lang: LanguageType) => {
    // Apply RTL for Arabic, LTR for English
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
      document.body.classList.add("font-arabic"); // Add a class for Arabic font if needed
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
      document.body.classList.remove("font-arabic");
    }
  };

  // Translation function
  const t = (key: string, defaultValue?: string): string => {
    return translations[language][key] || defaultValue || key;
  };

  return (
    <LanguageContext.Provider value={{ language, locale, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
