
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Check, Clock, Download, FileText, Hotel, User } from "lucide-react";

const BookingSuccessPage: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    // Get booking details from location state
    if (location.state && location.state.bookingRef) {
      setBookingDetails(location.state);
    } else {
      // If no booking details are present, redirect to home
      // This prevents accessing this page directly without completing a booking
      navigate("/");
    }
  }, [location, navigate]);
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (!bookingDetails) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your booking has been successfully processed. We've sent a confirmation to your email.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="bg-muted/20">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <CardTitle>Booking Reference</CardTitle>
                <CardDescription>Keep this information for your records</CardDescription>
              </div>
              <div className="text-2xl font-mono font-bold text-primary">
                {bookingDetails.bookingRef}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">{bookingDetails.itemName}</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Check-in: </span>
                      {formatDate(bookingDetails.checkIn)}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Check-out: </span>
                      {formatDate(bookingDetails.checkOut)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Booking Date: </span>
                    {formatDate(new Date().toISOString())}
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Status: </span>
                    <span className="text-emerald-600 font-medium">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
            <Button className="w-full sm:w-auto" asChild>
              <Link to="/account/bookings">
                <FileText className="w-4 h-4 mr-2" /> View My Bookings
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" /> Download Confirmation
            </Button>
          </CardFooter>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">What's Next?</h3>
                <p className="text-sm text-muted-foreground">
                  You will receive a confirmation email with all the details of your booking.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Hotel className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Your Reservation</h3>
                <p className="text-sm text-muted-foreground">
                  The property has been notified of your booking and is awaiting your arrival.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer support team is available 24/7 to assist you with any questions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="mx-auto" asChild>
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccessPage;
