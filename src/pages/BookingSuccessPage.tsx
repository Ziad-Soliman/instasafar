
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookingSuccessState {
  bookingRef: string;
  itemName: string;
  itemType: "hotel" | "package";
}

const BookingSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  
  // Extract booking details from location state
  const state = location.state as BookingSuccessState | null;
  
  // If there's no booking reference, redirect to home
  useEffect(() => {
    if (!state || !state.bookingRef) {
      navigate("/");
    }
  }, [state, navigate]);
  
  // If state is still loading or missing, show placeholder
  if (!state || !state.bookingRef) {
    return (
      <div className="container mx-auto py-8 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">{t("loading")}...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("booking.success.title")}</CardTitle>
            <p className="text-muted-foreground mt-1">
              {t("booking.success.subtitle")}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-center text-sm text-muted-foreground mb-1">
                {t("booking.success.reference")}
              </p>
              <p className="text-center text-xl font-mono font-semibold">
                {state.bookingRef}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground">
                Your booking for
              </p>
              <p className="font-medium text-lg">
                {state.itemName}
              </p>
              <p className="text-muted-foreground">
                has been submitted successfully.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md text-sm">
              <p className="text-blue-600 dark:text-blue-400">
                We'll review your booking request and confirm it shortly. You'll receive a notification via email when the status changes.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link to="/account/bookings">
                {t("booking.success.viewBookings")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/">
                Return to Home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingSuccessPage;
