
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { differenceInDays, isAfter } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface HotelBookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: {
    id: string;
    name: string;
    price_per_night: number;
    thumbnail?: string | null;
  };
  userId?: string | null;
}

const HotelBookingModal: React.FC<HotelBookingModalProps> = ({
  open, onOpenChange, hotel, userId
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const today = new Date();
  const [checkIn, setCheckIn] = useState<Date | undefined>(today);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [loading, setLoading] = useState(false);

  const nights = checkIn && checkOut && isAfter(checkOut, checkIn)
    ? Math.max(1, differenceInDays(checkOut, checkIn))
    : 1;

  const totalPrice = hotel.price_per_night * nights;

  const isFormValid =
    !!checkIn &&
    !!checkOut &&
    isAfter(checkOut!, checkIn!) &&
    adults > 0 &&
    nights > 0;

  async function handleBooking() {
    if (!userId) {
      toast({
        title: t("booking.loginRequired", "Please log in to book"),
        description: t("booking.loginToProceed", "You must be logged in to proceed with booking."),
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("bookings").insert([{
      user_id: userId,
      hotel_id: hotel.id,
      booking_type: "hotel",
      check_in_date: checkIn?.toISOString().slice(0, 10),
      check_out_date: checkOut?.toISOString().slice(0, 10),
      adults,
      children,
      total_price: totalPrice,
    }]);
    setLoading(false);
    if (error) {
      toast({
        title: t("booking.failed", "Booking failed"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t("booking.success", "Booking confirmed!"),
        description: t("booking.seeBookings", "Check your account for booking details."),
      });
      onOpenChange(false);
      // reset form
      setCheckIn(today);
      setCheckOut(undefined);
      setAdults(1);
      setChildren(0);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("booking.bookHotel", "Book") + " " + hotel.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-2">
          <div>
            <label className="block font-medium mb-1">{t("booking.checkIn", "Check-in")}</label>
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              initialFocus
              disabled={(date) => date < today}
              className="p-3 pointer-events-auto"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">{t("booking.checkOut", "Check-out")}</label>
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              initialFocus
              disabled={(date) => !checkIn ? date < today : date <= checkIn}
              className="p-3 pointer-events-auto"
            />
          </div>
          <div className="flex gap-3">
            <div>
              <label className="block font-medium mb-1">{t("booking.adults", "Adults")}</label>
              <Input type="number" min={1} max={10} value={adults} onChange={e => setAdults(Number(e.target.value))} />
            </div>
            <div>
              <label className="block font-medium mb-1">{t("booking.children", "Children")}</label>
              <Input type="number" min={0} max={10} value={children} onChange={e => setChildren(Number(e.target.value))} />
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 border rounded bg-accent/30 text-sm space-y-1">
          <div>
            <span className="font-semibold">{t("booking.dates", "Dates")}: </span>
            {checkIn?.toLocaleDateString()} &rarr; {checkOut?.toLocaleDateString() || t("booking.select", "Select")}
          </div>
          <div>
            <span className="font-semibold">{t("booking.nights", "Nights")}: </span>
            {nights}
          </div>
          <div>
            <span className="font-semibold">{t("booking.guests", "Guests")}: </span>
            {adults} {t("booking.adults", "Adults")}, {children} {t("booking.children", "Children")}
          </div>
          <div className="font-bold mt-2 text-lg">{t("booking.total", "Total")}: ${totalPrice}</div>
        </div>
        <DialogFooter>
          <Button loading={loading} disabled={!isFormValid || loading} onClick={handleBooking} className="w-full">
            {loading ? t("booking.submitting", "Processing...") : t("booking.confirm", "Confirm Booking")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HotelBookingModal;
