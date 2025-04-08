
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
    "auth.quickLogin": "Quick Login for Demo",
    "auth.loginAsUser": "Login as User",
    "auth.loginAsAdmin": "Login as Admin",
    "auth.loginAsProvider": "Login as Provider",
    "auth.demoNotice": "Demo accounts are for demonstration purposes only",
    "auth.areYouProvider": "Are you a service provider?",
    "auth.registerAsProvider": "Register here",
    "auth.alreadyAccount": "Already have an account?",
    "auth.login": "Sign in",
    "auth.register": "Register",
    "auth.createAccount": "Create an account",
    "auth.signUpDescription": "Sign up to start booking your spiritual journey",
    "auth.signInTitle": "Sign in to your account",
    "auth.signInDescription": "Enter your email and password below to sign in",
    "auth.unexpectedError": "An unexpected error occurred. Please try again.",
    "auth.registering": "Creating account...",
    "auth.termsAgreement": "By registering, you agree to our",
    "auth.termsOfService": "Terms of Service",
    "auth.and": "and",
    "auth.privacyPolicy": "Privacy Policy",
    "auth.fullNamePlaceholder": "Your Full Name",
    "auth.emailPlaceholder": "your.email@example.com",
    "auth.passwordPlaceholder": "••••••••",
    "auth.confirmPasswordPlaceholder": "••••••••",
    "auth.providerRegisterSuccess": "Registration successful",
    "auth.providerRegisterSuccessDescription": "Your provider account request has been submitted. We'll review your application and notify you soon.",
    "auth.personalInformation": "Personal Information",
    "auth.companyInformation": "Company Information",
    "auth.companyName": "Company Name",
    "auth.companyNamePlaceholder": "Your Company or Organization Name",
    "auth.companyAddress": "Company Address",
    "auth.companyAddressPlaceholder": "Business Address (Optional)",
    "auth.contactPhone": "Contact Phone",
    "auth.contactPhonePlaceholder": "Business Phone Number (Optional)",
    "auth.serviceDescription": "Service Description",
    "auth.serviceDescriptionPlaceholder": "Brief description of your services (Optional)",
    "auth.registerAsProvider": "Register as a Provider",
    "auth.providerRegisterDescription": "Submit your details to register as a service provider on InstaSafar",
    "auth.providerRegistration": "Provider Registration",
    
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
    
    // Navigation items
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

    // Dashboard
    "dashboard.newBooking": "New booking received",
    "dashboard.newBookingDesc": "A new booking has been made",
    "dashboard.fetchError": "Failed to fetch dashboard data",
    "dashboard.tryAgain": "Please try again later.",
    
    // Why Choose Us section
    "whyChooseUs.title": "Why Choose Us",
    "whyChooseUs.journeyTitle": "Making Your Journey Spiritual & Comfortable",
    "whyChooseUs.journeyDescription": "We understand the significance of Hajj and Umrah in your life. Our services are designed to make your sacred journey peaceful and fulfilling",
    "support247.title": "Support 24/7",
    "support247.description": "Continuous assistance throughout your pilgrimage whenever you need it",
    "trustedService.title": "Trusted Service",
    "trustedService.description": "Safe, reliable and authenticated service providers for your journey",
    "spiritualGuidance.title": "Spiritual Guidance",
    "spiritualGuidance.description": "Expert guides to help you perform rituals correctly and meaningfully",
    "customizedPackages.title": "Customized Packages",
    "customizedPackages.description": "Tailored travel plans that fit your schedule, preferences, and budget",
    
    // Featured section
    "featured.title": "Our Selection",
    "featured.hotels": "Featured Hotels",
    "featured.packages": "Featured Packages",
    "bestPrice.guarantee": "Best Price Guaranteed",
    "securePayments": "Secure Payments",
    "support247": "Customer Support 24/7",
    "localGuides": "Local guides & experts"
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
    "auth.quickLogin": "تسجيل دخول سريع للعرض التوضيحي",
    "auth.loginAsUser": "تسجيل الدخول كمستخدم",
    "auth.loginAsAdmin": "تسجيل الدخول كمسؤول",
    "auth.loginAsProvider": "تسجيل الدخول كمزود خدمة",
    "auth.demoNotice": "حسابات العرض التوضيحي مخصصة لأغراض العرض فقط",
    "auth.areYouProvider": "هل أنت مزود خدمة؟",
    "auth.registerAsProvider": "سجل هنا",
    "auth.alreadyAccount": "لديك حساب بالفعل؟",
    "auth.login": "تسجيل الدخول",
    "auth.register": "التسجيل",
    "auth.createAccount": "إنشاء حساب",
    "auth.signUpDescription": "سجل للبدء في حجز رحلتك الروحية",
    "auth.signInTitle": "تسجيل الدخول إلى حسابك",
    "auth.signInDescription": "أدخل بريدك الإلكتروني وكلمة المرور أدناه لتسجيل الدخول",
    "auth.unexpectedError": "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    "auth.registering": "جاري إنشاء الحساب...",
    "auth.termsAgreement": "بالتسجيل، فإنك توافق على",
    "auth.termsOfService": "شروط الخدمة",
    "auth.and": "و",
    "auth.privacyPolicy": "سياسة الخصوصية",
    "auth.fullNamePlaceholder": "اسمك الكامل",
    "auth.emailPlaceholder": "بريدك@example.com",
    "auth.passwordPlaceholder": "••••••••",
    "auth.confirmPasswordPlaceholder": "••••••••",
    "auth.providerRegisterSuccess": "تم التسجيل بنجاح",
    "auth.providerRegisterSuccessDescription": "تم تقديم طلب حساب مزود الخدمة الخاص بك. سنراجع طلبك ونعلمك قريبًا.",
    "auth.personalInformation": "المعلومات الشخصية",
    "auth.companyInformation": "معلومات الشركة",
    "auth.companyName": "اسم الشركة",
    "auth.companyNamePlaceholder": "اسم شركتك أو مؤسستك",
    "auth.companyAddress": "عنوان الشركة",
    "auth.companyAddressPlaceholder": "عنوان العمل (اختياري)",
    "auth.contactPhone": "هاتف الاتصال",
    "auth.contactPhonePlaceholder": "رقم هاتف العمل (اختياري)",
    "auth.serviceDescription": "وصف الخدمة",
    "auth.serviceDescriptionPlaceholder": "وصف موجز لخدماتك (اختياري)",
    "auth.registerAsProvider": "التسجيل كمزود خدمة",
    "auth.providerRegisterDescription": "قدم تفاصيلك للتسجيل كمزود خدمة في انستاسفر",
    "auth.providerRegistration": "تسجيل مزود الخدمة",
    
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
    
    // Navigation items
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

    // Dashboard
    "dashboard.newBooking": "تم استلام حجز جديد",
    "dashboard.newBookingDesc": "تم إجراء حجز جديد",
    "dashboard.fetchError": "فشل في جلب بيانات لوحة التحكم",
    "dashboard.tryAgain": "يرجى المحاولة مرة أخرى لاحقًا.",
    
    // Why Choose Us section
    "whyChooseUs.title": "لماذا تختارنا",
    "whyChooseUs.journeyTitle": "جعل رحلتك روحانية ومريحة",
    "whyChooseUs.journeyDescription": "نحن نتفهم أهمية الحج والعمرة في حياتك. خدماتنا مصممة لجعل رحلتك المقدسة هادئة ومُرضية",
    "support247.title": "دعم على مدار الساعة",
    "support247.description": "مساعدة مستمرة طوال فترة حجك كلما احتجت إليها",
    "trustedService.title": "خدمة موثوقة",
    "trustedService.description": "مزودو خدمة آمنون وموثوقون ومعتمدون لرحلتك",
    "spiritualGuidance.title": "إرشاد روحاني",
    "spiritualGuidance.description": "مرشدون خبراء لمساعدتك على أداء المناسك بشكل صحيح وذو معنى",
    "customizedPackages.title": "باقات مخصصة",
    "customizedPackages.description": "خطط سفر مصممة خصيصًا لتناسب جدولك وتفضيلاتك وميزانيتك",
    
    // Featured section
    "featured.title": "اختيارنا",
    "featured.hotels": "الفنادق المميزة",
    "featured.packages": "الباقات المميزة",
    "bestPrice.guarantee": "ضمان أفضل سعر",
    "securePayments": "مدفوعات آمنة",
    "support247": "دعم العملاء 24/7",
    "localGuides": "مرشدون محليون وخبراء"
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
