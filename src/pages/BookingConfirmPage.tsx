
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

// Define interfaces for the booking data
interface BookingItem {
  id: string;
  name: string;
  type: "hotel" | "package";
  image: string;
  price: number;
  nights?: number;
  days?: number;
  start_date: Date;
  end_date: Date;
  guests: number;
}

// Define form schema
const formSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  special_requests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { t, isRTL } = useLanguage();
  
  const [bookingItem, setBookingItem] = useState<BookingItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone_number || "",
      special_requests: "",
    },
  });

  // Extract booking details from location state or redirect to search
  useEffect(() => {
    if (!loading) {
      if (!user) {
        // User not logged in, redirect to login
        toast({
          title: t("booking.login"),
          description: "Please sign in to continue with booking",
          variant: "destructive",
        });
        navigate("/auth/login", { state: { from: location } });
        return;
      }

      // Check if we have booking details
      const state = location.state as { bookingItem?: BookingItem } | null;
      if (!state || !state.bookingItem) {
        // No booking details, redirect to search
        navigate("/search");
        return;
      }

      setBookingItem(state.bookingItem);
    }
  }, [loading, user, location, navigate, t]);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!bookingItem) return;

    try {
      setIsSubmitting(true);

      // In a real app, this would call Supabase to create a booking record
      // For now, we'll just simulate success
      console.log("Booking data:", { 
        ...values, 
        user_id: user?.id,
        item_id: bookingItem.id,
        item_type: bookingItem.type,
        start_date: bookingItem.start_date,
        end_date: bookingItem.end_date,
        guests: bookingItem.guests,
        price: bookingItem.price,
        status: "pending" 
      });

      // Mock successful booking with a booking reference
      const bookingRef = `INS-${Date.now().toString().slice(-8)}`;
      
      // Success - redirect to success page
      navigate("/booking/success", { 
        state: { 
          bookingRef, 
          itemName: bookingItem.name,
          itemType: bookingItem.type,
        } 
      });
      
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!bookingItem) return 0;
    
    if (bookingItem.type === "hotel") {
      return bookingItem.price * (bookingItem.nights || 0);
    } else {
      return bookingItem.price * bookingItem.guests;
    }
  };

  // If still loading auth state or booking item not set, show loading
  if (loading || !bookingItem) {
    return (
      <div className="container mx-auto py-8 px-4 min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">{t("loading")}...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t("booking.confirm.title")}</h1>
          <p className="text-muted-foreground mb-8">{t("booking.confirm.subtitle")}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Booking Summary */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{t("booking.summary")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative overflow-hidden rounded-md bg-muted">
                    <img
                      src={bookingItem.image || "/placeholder.svg"}
                      alt={bookingItem.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{bookingItem.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {bookingItem.type}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium mb-1">{t("booking.dates")}</p>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>{t("date.from")}:</span>
                        <span>{format(bookingItem.start_date, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t("date.to")}:</span>
                        <span>{format(bookingItem.end_date, "MMM d, yyyy")}</span>
                      </div>
                      {bookingItem.nights && (
                        <div className="flex justify-between mt-1 text-muted-foreground">
                          <span>Total:</span>
                          <span>{bookingItem.nights} nights</span>
                        </div>
                      )}
                      {bookingItem.days && (
                        <div className="flex justify-between mt-1 text-muted-foreground">
                          <span>Duration:</span>
                          <span>{bookingItem.days} {t("date.days")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">{t("booking.guests")}</p>
                    <div className="text-sm flex justify-between">
                      <span>Total:</span>
                      <span>{bookingItem.guests}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm font-medium mb-1">{t("booking.price")}</p>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span>
                          {bookingItem.type === "hotel" 
                            ? `$${bookingItem.price} × ${bookingItem.nights} nights`
                            : `$${bookingItem.price} × ${bookingItem.guests} guests`
                          }
                        </span>
                        <span>${calculateTotalPrice()}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>{t("booking.price.total")}:</span>
                        <span>${calculateTotalPrice()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Guest Information Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{t("booking.guestInfo")}</CardTitle>
                <p className="text-sm text-muted-foreground">{t("booking.guestInfo.subtitle")}</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("auth.fullName")}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("auth.email")}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("auth.phone")}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="special_requests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Any special requirements or requests for your stay.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting 
                          ? `${t("loading")}...` 
                          : t("booking.submit")
                        }
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="bg-muted/20 flex flex-col items-start">
                <p className="text-sm text-muted-foreground">
                  By confirming this booking, you agree to the terms and conditions.
                  No payment will be taken now - this is just a booking request.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmPage;
