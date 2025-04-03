
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, ChevronRight, Star, Users, MapPin, 
  Calendar, Shield, Compass, Plane, Bus, Hotel, Package 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import ExternalListingCard from "@/components/cards/ExternalListingCard";
import { featuredHotels, featuredPackages, externalListings } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
    }
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTab, setSearchTab] = useState("hotel");
  const [date, setDate] = useState<Date>();
  
  // Benefits list
  const benefits = [
    {
      title: "Customized Packages",
      description: "Tailored travel plans that fit your schedule, preferences, and budget",
      icon: Package,
    },
    {
      title: "Spiritual Guidance",
      description: "Expert guides to help you perform rituals correctly and meaningfully",
      icon: Compass,
    },
    {
      title: "Trusted Service",
      description: "Safe, reliable and authenticated service providers for your journey",
      icon: Shield,
    },
    {
      title: "24/7 Support",
      description: "Continuous assistance throughout your pilgrimage whenever you need it",
      icon: Users,
    },
  ];
  
  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Khan",
      location: "United Kingdom",
      rating: 5,
      text: "The Umrah package was perfect. Everything from flights to hotel was well arranged, and the spiritual guidance made the experience truly meaningful.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=60",
    },
    {
      id: 2,
      name: "Fatima Rahman",
      location: "Canada",
      rating: 5,
      text: "As a first-time visitor to Makkah, I was nervous about the journey. InstaSafar made it seamless with their excellent customer service and attention to detail.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=60",
    },
    {
      id: 3,
      name: "Omar Abdullah",
      location: "United States",
      rating: 4,
      text: "The Hajj package was comprehensive and well-organized. The guides were knowledgeable and the accommodations were comfortable, making our spiritual journey stress-free.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=60",
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-60 -left-40 w-96 h-96 rounded-full bg-secondary/5"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  }
                }
              }}
              className="flex flex-col items-start space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="py-1 px-3 text-sm font-medium mb-4">
                  Hajj & Umrah
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                Your spiritual journey{" "}
                <span className="text-primary">made simple</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground text-lg max-w-xl"
              >
                Book your Hajj and Umrah journey with ease. We offer the best hotels, flights, and transport services to make your pilgrimage comfortable and memorable.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Button asChild size="lg" className="rounded-full group">
                  <Link to="/search">
                    Explore Packages
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/packages">Learn More</Link>
                </Button>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div 
                variants={staggerChildren}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
              >
                {[
                  "24/7 Customer Support",
                  "Best Price Guarantee",
                  "Local guides & experts",
                  "Secure Payments"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex items-center"
                  >
                    <CheckCircle size={18} className="text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:flex justify-center hidden"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105"></div>
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                  alt="Kaaba, Makkah"
                  className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-xl"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-background rounded-lg shadow-lg p-4 z-20"
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">5000+ Pilgrims</p>
                      <p className="text-xs text-muted-foreground">Served last year</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute -top-6 -right-6 bg-background rounded-lg shadow-lg p-4 z-20"
                >
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-lg mr-3">
                      <Star size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">4.9 Rating</p>
                      <p className="text-xs text-muted-foreground">From 2000+ reviews</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-slate-900 shadow-xl rounded-xl p-6 border"
        >
          <Tabs defaultValue={searchTab} onValueChange={setSearchTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="hotel" className="flex items-center gap-2">
                <Hotel className="h-4 w-4" />
                <span className="hidden sm:inline">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="package" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Packages</span>
              </TabsTrigger>
              <TabsTrigger value="flight" className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Flights</span>
              </TabsTrigger>
              <TabsTrigger value="transport" className="flex items-center gap-2">
                <Bus className="h-4 w-4" />
                <span className="hidden sm:inline">Transport</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Hotel Search Tab */}
            <TabsContent value="hotel" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Destination</label>
                  <Select defaultValue="makkah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Makkah</SelectItem>
                      <SelectItem value="madinah">Madinah</SelectItem>
                      <SelectItem value="both">Both Cities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="21">21 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/search" className="flex items-center justify-center">
                      Search Hotels
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Package Search Tab */}
            <TabsContent value="package" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Package Type</label>
                  <Select defaultValue="umrah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hajj">Hajj Package</SelectItem>
                      <SelectItem value="umrah">Umrah Package</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Select defaultValue="14">
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                      <SelectItem value="21">21 Days</SelectItem>
                      <SelectItem value="30">30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/packages" className="flex items-center justify-center">
                      Find Packages
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Flight Search Tab */}
            <TabsContent value="flight" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Input placeholder="Departure City/Airport" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Select defaultValue="jeddah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jeddah">Jeddah (JED)</SelectItem>
                      <SelectItem value="madinah">Madinah (MED)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Departure Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/flights" className="flex items-center justify-center">
                      Search Flights
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Transport Search Tab */}
            <TabsContent value="transport" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Select defaultValue="jeddah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jeddah">Jeddah Airport</SelectItem>
                      <SelectItem value="makkah">Makkah City</SelectItem>
                      <SelectItem value="madinah">Madinah City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Select defaultValue="makkah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Makkah City</SelectItem>
                      <SelectItem value="madinah">Madinah City</SelectItem>
                      <SelectItem value="jeddah">Jeddah Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/transport" className="flex items-center justify-center">
                      Find Transport
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-3">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold mb-4">Making Your Journey Spiritual & Comfortable</h2>
            <p className="text-muted-foreground">
              We understand the significance of Hajj and Umrah in your life. Our services are designed to make your sacred journey peaceful and fulfilling.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl transform transition-transform group-hover:scale-105 duration-300"></div>
                <Card className="relative bg-transparent border-none shadow-none h-full">
                  <CardHeader className="pb-0">
                    <div className="bg-primary/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                      <benefit.icon className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Badge className="mb-3">Our Selection</Badge>
              <h2 className="text-3xl font-bold">Featured Hotels</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Discover our handpicked selection of hotels in Makkah and Madinah offering comfort, convenience, and spiritual serenity.
              </p>
            </motion.div>
            
            <Button variant="outline" asChild>
              <Link to="/search?type=hotel" className="hidden md:flex items-center">
                View All Hotels
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredHotels.slice(0, 3).map((hotel, index) => (
              <motion.div
                key={hotel.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <HotelCard 
                  hotel={hotel} 
                  className="h-full transition-all duration-300 hover:shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          <Button variant="outline" asChild className="mt-8 md:hidden w-full">
            <Link to="/search?type=hotel">
              View All Hotels
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Badge className="mb-3">Complete Solutions</Badge>
              <h2 className="text-3xl font-bold">Hajj & Umrah Packages</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                All-inclusive packages featuring accommodation, transportation, and guided visits to holy sites.
              </p>
            </motion.div>
            
            <Button variant="outline" asChild>
              <Link to="/packages" className="hidden md:flex items-center">
                Explore All Packages
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {featuredPackages.slice(0, 2).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <PackageCard 
                  package={pkg} 
                  className="h-full transition-all duration-300 hover:shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          <Button variant="outline" asChild className="mt-8 md:hidden w-full">
            <Link to="/packages">
              Explore All Packages
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-3">Testimonials</Badge>
            <h2 className="text-3xl font-bold mb-4">What Pilgrims Say About Us</h2>
            <p className="text-muted-foreground">
              Read about the experiences of pilgrims who have traveled with us on their spiritual journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-md transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-base">{testimonial.name}</h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={cn(
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-4">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-4"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold"
              >
                Ready to start your spiritual journey?
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground text-lg"
              >
                Let us help you plan your Hajj or Umrah pilgrimage with our expert services and comprehensive offerings.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/packages" className="flex items-center">
                    Find Packages
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
