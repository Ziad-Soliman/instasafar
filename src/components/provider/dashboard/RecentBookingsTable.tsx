
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useRtlHelpers } from "@/utils/rtl-helpers";

interface BookingData {
  id: string;
  booking_type: string;
  total_price: number;
  status: string;
  payment_status: string;
  created_at: string;
  check_in_date?: string | null;
  check_out_date?: string | null;
  adults: number;
  children: number;
  hotel?: {
    name: string;
    city: string;
  } | null;
  package?: {
    name: string;
    city: string;
  } | null;
  user?: {
    id: string;
    full_name?: string | null;
    email?: string | null;
  } | null;
  user_id?: string;
}

interface RecentBookingsTableProps {
  bookings: BookingData[];
  bookingFilter: 'all' | 'pending' | 'confirmed' | 'cancelled';
  setBookingFilter: (value: 'all' | 'pending' | 'confirmed' | 'cancelled') => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string | null | undefined) => string;
}

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({
  bookings,
  bookingFilter,
  setBookingFilter,
  formatCurrency,
  formatDate
}) => {
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage();
  const { getDirectionalClasses } = useRtlHelpers();

  const filteredBookings = bookings.filter(booking => 
    bookingFilter === 'all' || booking.status === bookingFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderBookingsTable = () => {
    if (filteredBookings.length === 0) {
      return (
        <div className="text-center p-6 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">{t("dashboard.noBookings", "No recent bookings found")}</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-start">{t("dashboard.bookingId", "Booking ID")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.customer", "Customer")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.type", "Type")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.item", "Item")}</th>
              <th className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>{t("dashboard.amount", "Amount")}</th>
              <th className="px-4 py-3 text-center">{t("dashboard.status", "Status")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.checkIn", "Check-in")}</th>
              <th className="px-4 py-3 text-start">{t("dashboard.checkOut", "Check-out")}</th>
              <th className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>{t("dashboard.date", "Date")}</th>
              <th className="px-4 py-3 text-center">{t("dashboard.actions", "Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <motion.tr 
                key={booking.id} 
                className="border-b hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 py-3 font-mono text-xs">{booking.id.substring(0, 8)}...</td>
                <td className="px-4 py-3">{booking.user?.full_name || t("dashboard.anonymous", "Anonymous")}</td>
                <td className="px-4 py-3 capitalize">{t(`booking.type.${booking.booking_type}`, booking.booking_type)}</td>
                <td className="px-4 py-3">
                  {booking.booking_type === 'hotel' 
                    ? booking.hotel?.name || t("dashboard.unknownHotel", "Unknown Hotel")
                    : booking.package?.name || t("dashboard.unknownPackage", "Unknown Package")}
                </td>
                <td className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>
                  {formatCurrency(booking.total_price)}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs inline-block text-center
                    ${getStatusColor(booking.status)}`}>
                    {t(`booking.status.${booking.status}`, booking.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_in_date)}
                </td>
                <td className="px-4 py-3">
                  {formatDate(booking.check_out_date)}
                </td>
                <td className={`px-4 py-3 ${isRTL ? 'text-start' : 'text-end'}`}>
                  {new Date(booking.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                </td>
                <td className="px-4 py-3 text-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/provider/bookings/${booking.id}`)}
                  >
                    {t("dashboard.view", "View")}
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("dashboard.recentBookings", "Recent Bookings")}</CardTitle>
          <CardDescription>{t("dashboard.recentBookingsDesc", "Your most recent booking activity")}</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={bookingFilter}
            onValueChange={(value) => setBookingFilter(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("dashboard.filterByStatus", "Filter by status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("dashboard.allBookings", "All Bookings")}</SelectItem>
              <SelectItem value="pending">{t("booking.status.pending", "Pending")}</SelectItem>
              <SelectItem value="confirmed">{t("booking.status.confirmed", "Confirmed")}</SelectItem>
              <SelectItem value="cancelled">{t("booking.status.cancelled", "Cancelled")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {renderBookingsTable()}
      </CardContent>
      <CardFooter className={cn("justify-end", isRTL && "justify-start")}>
        <Button variant="link" onClick={() => navigate("/provider/bookings")}>
          {t("dashboard.viewAll", "View All Bookings")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentBookingsTable;
