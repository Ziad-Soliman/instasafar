
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Calendar, MapPin, Users, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BookingSuccessPage: React.FC = () => {
  // In a real app, this would come from route state or API call
  const bookingDetails = {
    bookingRef: "INST-" + Math.floor(100000 + Math.random() * 900000),
    hotelName: "Grand Makkah Hotel",
    roomType: "Deluxe Double Room",
    checkIn: "2023-11-10",
    checkOut: "2023-11-13",
    guests: 2,
    totalAmount: 750,
    status: "confirmed",
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your booking request has been received and confirmed. Thank you for choosing InstaSafar.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Booking Details</h2>
                <div className="space-y-3">
                  <div className="flex">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-muted-foreground">Booking Reference</div>
                      <div className="font-medium">{bookingDetails.bookingRef}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-muted-foreground">Stay Dates</div>
                      <div className="font-medium">
                        {formatDate(bookingDetails.checkIn)} - {formatDate(bookingDetails.checkOut)}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-muted-foreground">Guests</div>
                      <div className="font-medium">{bookingDetails.guests} Adults</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Accommodation Details</h2>
                <div className="space-y-3">
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-2" />
                    <div>
                      <div className="text-sm text-muted-foreground">Hotel</div>
                      <div className="font-medium">{bookingDetails.hotelName}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="h-5 w-5 mr-2" /> {/* Spacer for alignment */}
                    <div>
                      <div className="text-sm text-muted-foreground">Room Type</div>
                      <div className="font-medium">{bookingDetails.roomType}</div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="h-5 w-5 mr-2" /> {/* Spacer for alignment */}
                    <div>
                      <div className="text-sm text-muted-foreground">Amount Paid</div>
                      <div className="font-medium">${bookingDetails.totalAmount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You'll receive a confirmation email with all the details of your booking. Our team might contact you if additional information is needed.
              </p>
              <div className="flex items-center text-sm text-primary">
                <p>We're looking forward to hosting you on your spiritual journey</p>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/account/bookings">View My Bookings</Link>
          </Button>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSuccessPage;
