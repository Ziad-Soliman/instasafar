
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Check, Hotel, MapPin, Plane, User, Users } from "lucide-react";

// Form validation schema
const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters." }),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingConfirmPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if valid booking data is present in location state
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // In a real implementation, we would get this data from location state or query parameters
    // For now, we'll mock it
    
    // Mock booking data (this would come from the hotel/package detail page)
    const mockBookingData = {
      itemType: "hotel", // or "package"
      itemId: "hotel-1",
      itemName: "Grand Makkah Hotel",
      itemImage: "/placeholder.svg",
      dates: {
        checkIn: "2023-12-10",
        checkOut: "2023-12-15",
      },
      guests: {
        adults: 2,
        children: 1,
      },
      price: {
        perNight: 240,
        total: 1200,
        taxes: 120,
        fees: 60,
        grandTotal: 1380,
      },
      city: "Makkah",
    };
    
    setBookingData(mockBookingData);
    
    // If the user is not logged in, redirect to login
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to continue with your booking.",
        variant: "destructive",
      });
      navigate("/auth/login", { state: { from: location } });
    }
  }, [loading, user, navigate, location, toast]);
  
  // Setup form with default values from user profile
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: user?.full_name || "",
      email: user?.email || "",
      phone: "",
      specialRequests: "",
    },
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate number of nights
  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Handle form submission
  async function onSubmit(values: BookingFormValues) {
    if (!bookingData) return;
    
    setIsProcessing(true);
    
    try {
      // In a real implementation, we would save the booking to Supabase here
      
      // Mock API call - would be replaced with Supabase insert
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bookingRef = `BK${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      // Show success toast
      toast({
        title: "Booking confirmed!",
        description: `Your booking reference is ${bookingRef}`,
      });
      
      // Redirect to success page
      navigate("/booking/success", { 
        state: { 
          bookingRef,
          itemName: bookingData.itemName,
          checkIn: bookingData.dates.checkIn,
          checkOut: bookingData.dates.checkOut,
        } 
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }
  
  if (loading || !bookingData) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  const nights = calculateNights(bookingData.dates.checkIn, bookingData.dates.checkOut);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-muted-foreground mb-8">Please review your booking details and provide your information</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
                <CardDescription>Please enter your details for this booking</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormDescription>
                            Please enter your name as it appears on your ID or passport.
                          </FormDescription>
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              We'll send your booking confirmation to this email.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 123 456 7890" {...field} />
                            </FormControl>
                            <FormDescription>
                              For contact regarding your booking if needed.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Any special requests or requirements" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll do our best to accommodate your requests, though they cannot be guaranteed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Confirm Booking"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Item Details */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                    <img src={bookingData.itemImage} alt={bookingData.itemName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{bookingData.itemName}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{bookingData.city}</span>
                    </div>
                    {bookingData.itemType === "hotel" ? (
                      <div className="mt-1 flex items-center text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit">
                        <Hotel className="w-3 h-3 mr-1" />
                        <span>Hotel</span>
                      </div>
                    ) : (
                      <div className="mt-1 flex items-center text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit">
                        <Plane className="w-3 h-3 mr-1" />
                        <span>Package</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                {/* Dates */}
                <div>
                  <h4 className="font-medium mb-2">Dates</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Check-in</div>
                      <div className="text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(bookingData.dates.checkIn)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Check-out</div>
                      <div className="text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(bookingData.dates.checkOut)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </div>
                </div>
                
                <Separator />
                
                {/* Guests */}
                <div>
                  <h4 className="font-medium mb-2">Guests</h4>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {bookingData.guests.adults} {bookingData.guests.adults === 1 ? 'adult' : 'adults'}
                      {bookingData.guests.children > 0 && `, ${bookingData.guests.children} ${bookingData.guests.children === 1 ? 'child' : 'children'}`}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                {/* Price Breakdown */}
                <div>
                  <h4 className="font-medium mb-2">Price Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>${bookingData.price.perNight} × {nights} nights</span>
                      <span>${bookingData.price.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${bookingData.price.taxes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${bookingData.price.fees}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Total */}
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${bookingData.price.grandTotal}</span>
                </div>
                
                {/* Booking Benefits */}
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Booking Benefits</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">Instant confirmation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">No booking fees</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">24/7 customer support</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmPage;
