
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  // In a real app, this would come from query params or context
  const bookingDetails = {
    type: "hotel", // or "package"
    hotelName: "Grand Makkah Hotel",
    roomType: "Deluxe Double Room",
    checkIn: "2023-11-10",
    checkOut: "2023-11-13",
    nights: 3,
    guests: 2,
    pricePerNight: 240,
    totalPrice: 720,
    serviceFee: 30,
    grandTotal: 750,
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.full_name || "",
      email: user?.email || "",
      phone: user?.phone_number || "",
      specialRequests: "",
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    
    try {
      // In a real app, this would send the booking data to your API
      console.log("Booking data:", { ...data, ...bookingDetails });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking submitted!",
        description: "Your booking request has been received.",
      });
      
      // Redirect to success page
      navigate("/booking/success");
    } catch (error) {
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
        <p className="text-muted-foreground mb-6">Please review your booking details and provide your information.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
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
                            <Input placeholder="Any special requirements or requests" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full md:w-auto" disabled={submitting}>
                        {submitting ? "Processing..." : "Confirm Booking"}
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
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{bookingDetails.hotelName}</h3>
                    <p className="text-muted-foreground">{bookingDetails.roomType}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="font-medium">Check-in</div>
                      <div>{formatDate(bookingDetails.checkIn)}</div>
                    </div>
                    <div>
                      <div className="font-medium">Check-out</div>
                      <div>{formatDate(bookingDetails.checkOut)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="font-medium">Nights</div>
                      <div>{bookingDetails.nights}</div>
                    </div>
                    <div>
                      <div className="font-medium">Guests</div>
                      <div>{bookingDetails.guests}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>${bookingDetails.pricePerNight} x {bookingDetails.nights} nights</span>
                      <span>${bookingDetails.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${bookingDetails.serviceFee}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${bookingDetails.grandTotal}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-4">
                    <p>By confirming this booking, you agree to our terms and conditions.</p>
                  </div>
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
