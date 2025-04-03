
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Calendar, CreditCard, Hotel, Package, Percent, Tag, Users } from "lucide-react";

// Mock data for the dashboard
const mockBookingStats = [
  { month: 'Jan', bookings: 30 },
  { month: 'Feb', bookings: 40 },
  { month: 'Mar', bookings: 45 },
  { month: 'Apr', bookings: 60 },
  { month: 'May', bookings: 75 },
  { month: 'Jun', bookings: 65 },
  { month: 'Jul', bookings: 90 },
  { month: 'Aug', bookings: 120 },
  { month: 'Sep', bookings: 80 },
  { month: 'Oct', bookings: 70 },
  { month: 'Nov', bookings: 50 },
  { month: 'Dec', bookings: 45 },
];

const mockRevenueStats = [
  { month: 'Jan', revenue: 3000 },
  { month: 'Feb', revenue: 4000 },
  { month: 'Mar', revenue: 4500 },
  { month: 'Apr', revenue: 6000 },
  { month: 'May', revenue: 7500 },
  { month: 'Jun', revenue: 6500 },
  { month: 'Jul', revenue: 9000 },
  { month: 'Aug', revenue: 12000 },
  { month: 'Sep', revenue: 8000 },
  { month: 'Oct', revenue: 7000 },
  { month: 'Nov', revenue: 5000 },
  { month: 'Dec', revenue: 4500 },
];

const mockHotels = [
  {
    id: "hotel-1",
    name: "فندق جراند مكة",
    city: "Makkah",
    address: "طريق الملك عبد العزيز",
    description: "فندق فاخر مع إطلالة على الحرم",
    rating: 4.7,
    price_per_night: 750,
    distance_to_haram: "500م",
    amenities: ["واي فاي مجاني", "فطور", "موقف سيارات", "غرفة صلاة"],
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  },
  {
    id: "hotel-2",
    name: "فندق هيلتون المدينة",
    city: "Madinah",
    address: "شارع قربان",
    description: "فندق فاخر قريب من المسجد النبوي",
    rating: 4.5,
    price_per_night: 650,
    distance_to_haram: "300م",
    amenities: ["واي فاي مجاني", "مطعم", "مسبح", "مواقف سيارات"],
    thumbnail: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=800&q=80",
    is_internal: true
  }
];

const mockPackages = [
  {
    id: "package-1",
    name: "باقة العمرة الممتازة",
    description: "تجربة عمرة شاملة لمدة 10 أيام مع إقامة 5 نجوم",
    price: 5500,
    duration_days: 10,
    start_date: "2023-12-15",
    end_date: "2023-12-25",
    thumbnail: "https://images.unsplash.com/photo-1519074069390-2e4a98b5cc21?auto=format&fit=crop&w=800&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Makkah",
    is_internal: true,
    package_type: "Umrah" as "Hajj" | "Umrah" | "Custom"
  },
  {
    id: "package-2",
    name: "باقة الحج الاقتصادية",
    description: "تجربة حج شاملة لمدة 14 يوم بأسعار معقولة",
    price: 12000,
    duration_days: 14,
    start_date: "2024-06-01",
    end_date: "2024-06-15",
    thumbnail: "https://images.unsplash.com/photo-1604693617852-c40c3092a6a5?auto=format&fit=crop&w=800&q=80",
    includes_hotel: true,
    includes_flight: true,
    includes_transport: true,
    city: "Both",
    is_internal: true,
    package_type: "Hajj" as "Hajj" | "Umrah" | "Custom"
  }
];

const mockRecentBookings = [
  {
    id: "booking-1",
    customer_name: "محمد أحمد",
    item_name: "فندق جراند مكة",
    booking_date: "2023-11-05",
    check_in: "2023-12-15",
    check_out: "2023-12-20",
    amount: 3750,
    status: "confirmed"
  },
  {
    id: "booking-2",
    customer_name: "سارة خان",
    item_name: "باقة العمرة الممتازة",
    booking_date: "2023-11-02",
    check_in: "2023-12-10",
    check_out: "2023-12-20",
    amount: 5500,
    status: "pending"
  },
  {
    id: "booking-3",
    customer_name: "عبدالله علي",
    item_name: "فندق جراند مكة",
    booking_date: "2023-10-28",
    check_in: "2023-11-15",
    check_out: "2023-11-20",
    amount: 3750,
    status: "confirmed"
  },
  {
    id: "booking-4",
    customer_name: "فاطمة حسن",
    item_name: "باقة العمرة القياسية",
    booking_date: "2023-10-25",
    check_in: "2023-11-10",
    check_out: "2023-11-17",
    amount: 4250,
    status: "confirmed"
  }
];

const ProviderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{language === 'ar' ? 'لوحة تحكم المزود' : 'Provider Dashboard'}</h1>
          <p className="text-muted-foreground">
            {language === 'ar' ? 'مرحباً بعودتك، فنادق وخدمات الحرم' : 'Welcome back, Al-Haram Hotels & Services'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/provider/listings')}>
            {language === 'ar' ? 'إدارة القوائم' : 'Manage Listings'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/provider/bookings')}>
            {language === 'ar' ? 'عرض الحجوزات' : 'View Bookings'}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1.5">
                <span className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'إجمالي القوائم' : 'Total Listings'}
                </span>
                <span className="text-3xl font-bold">8</span>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+2 {language === 'ar' ? 'هذا الشهر' : 'this month'}</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Building className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1.5">
                <span className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'الحجوزات النشطة' : 'Active Bookings'}
                </span>
                <span className="text-3xl font-bold">24</span>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+5 {language === 'ar' ? 'منذ الأسبوع الماضي' : 'since last week'}</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1.5">
                <span className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'الإيرادات الشهرية' : 'Monthly Revenue'}
                </span>
                <span className="text-3xl font-bold">٥٥,٧٠٠ {t("currency.sar")}</span>
                <div className="flex items-center text-xs text-green-500 mt-1">
                  <span>+12% {language === 'ar' ? 'عن الشهر الماضي' : 'from last month'}</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1.5">
                <span className="text-muted-foreground text-sm">
                  {language === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
                </span>
                <span className="text-3xl font-bold">4.8/5</span>
                <div className="flex items-center text-xs text-amber-500 mt-1">
                  <span>{language === 'ar' ? 'بناءً على ١٥٦ تقييم' : 'Based on 156 reviews'}</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Percent className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'اتجاهات الحجز' : 'Booking Trends'}</CardTitle>
            <CardDescription>
              {language === 'ar' ? 'اتجاهات الحجز الشهرية للأشهر الـ 12 الماضية' : 'Monthly booking trends for the last 12 months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockBookingStats}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ${language === 'ar' ? 'حجز' : 'bookings'}`, '']}
                    labelFormatter={(label) => language === 'ar' ? `شهر ${label}` : `Month ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="hsl(var(--primary))" 
                    fill="hsla(var(--primary), 0.1)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'نظرة عامة على الإيرادات' : 'Revenue Overview'}</CardTitle>
            <CardDescription>
              {language === 'ar' ? 'الإيرادات الشهرية (بالريال السعودي) للأشهر الـ 12 الماضية' : 'Monthly revenue (in SAR) for the last 12 months'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockRevenueStats}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ${t("currency.sar")}`, '']}
                    labelFormatter={(label) => language === 'ar' ? `شهر ${label}` : `Month ${label}`}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="hsla(var(--primary), 0.8)"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{language === 'ar' ? 'الحجوزات الأخيرة' : 'Recent Bookings'}</CardTitle>
            <CardDescription>
              {language === 'ar' ? 'أحدث طلبات الحجز والتأكيدات' : 'Your most recent booking requests and confirmations'}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/provider/bookings')}>
            {language === 'ar' ? 'عرض الكل' : 'View All'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">
                    {language === 'ar' ? 'العميل' : 'Customer'}
                  </th>
                  <th className="text-left p-2 font-medium">
                    {language === 'ar' ? 'العنصر' : 'Item'}
                  </th>
                  <th className="text-left p-2 font-medium">
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </th>
                  <th className="text-left p-2 font-medium">
                    {language === 'ar' ? 'المبلغ' : 'Amount'}
                  </th>
                  <th className="text-left p-2 font-medium">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockRecentBookings.map(booking => (
                  <tr key={booking.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">{booking.customer_name}</td>
                    <td className="p-2">{booking.item_name}</td>
                    <td className="p-2">{booking.check_in} {language === 'ar' ? 'إلى' : 'to'} {booking.check_out}</td>
                    <td className="p-2">{booking.amount} {t("currency.sar")}</td>
                    <td className="p-2">
                      <Badge 
                        variant={
                          booking.status === "confirmed" ? "default" : 
                          booking.status === "pending" ? "secondary" : 
                          "destructive"
                        }
                      >
                        {language === 'ar' 
                          ? (booking.status === "confirmed" ? "مؤكد" : 
                             booking.status === "pending" ? "قيد الانتظار" : "ملغى")
                          : (booking.status.charAt(0).toUpperCase() + booking.status.slice(1))
                        }
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Featured Listings Preview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{language === 'ar' ? 'القوائم الخاصة بك' : 'Your Listings'}</CardTitle>
            <CardDescription>
              {language === 'ar' ? 'معاينة للعروض الحالية' : 'A preview of your current offerings'}
            </CardDescription>
          </div>
          <Button onClick={() => navigate('/provider/listings')}>
            {language === 'ar' ? 'إدارة جميع القوائم' : 'Manage All'}
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hotels">
            <TabsList className="mb-4">
              <TabsTrigger value="hotels">
                {language === 'ar' ? 'الفنادق' : 'Hotels'}
              </TabsTrigger>
              <TabsTrigger value="packages">
                {language === 'ar' ? 'الباقات' : 'Packages'}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hotels" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockHotels.map(hotel => (
                  <motion.div key={hotel.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <HotelCard 
                      hotel={hotel} 
                      buttonText={language === 'ar' ? 'عرض التفاصيل' : 'View Details'} 
                      onButtonClick={() => navigate(`/provider/listings/hotels/${hotel.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="packages" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPackages.map(pkg => (
                  <motion.div key={pkg.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <PackageCard 
                      package={pkg} 
                      buttonText={language === 'ar' ? 'عرض التفاصيل' : 'View Details'} 
                      onButtonClick={() => navigate(`/provider/listings/packages/${pkg.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
