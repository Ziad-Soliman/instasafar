import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, ChevronRight, Star, Users, MapPin, 
  Calendar, Shield, Compass, Plane, Bus, Hotel, Package,
  Sparkles, Heart, Award, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTab, setSearchTab] = useState("hotel");
  const [date, setDate] = useState<Date>();
  
  // Enhanced benefits with Saudi theme
  const benefits = [
    {
      title: "Customized Packages",
      description: "Tailored spiritual journeys designed specifically for your needs, schedule, and budget preferences",
      icon: Package,
      gradient: "from-saudi-green-500 to-saudi-green-600"
    },
    {
      title: "Expert Spiritual Guidance",
      description: "Knowledgeable guides to help you perform all rituals correctly with deep spiritual meaning",
      icon: Compass,
      gradient: "from-saudi-green-600 to-saudi-green-700"
    },
    {
      title: "Verified & Trusted",
      description: "All our service providers are authenticated and verified for your safety and peace of mind",
      icon: Shield,
      gradient: "from-saudi-green-400 to-saudi-green-500"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your sacred journey whenever you need help",
      icon: Users,
      gradient: "from-saudi-green-700 to-saudi-green-800"
    },
  ];

  // Enhanced statistics
  const stats = [
    { number: "50,000+", label: "Pilgrims Served", icon: Users },
    { number: "4.9/5", label: "Average Rating", icon: Star },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];
  
  // Enhanced testimonials
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Khan",
      location: "United Kingdom",
      rating: 5,
      text: "InstaSafar made my Umrah journey absolutely perfect. From the moment I booked until I returned home, every detail was handled with care and professionalism.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=60",
      badge: "Verified Pilgrim"
    },
    {
      id: 2,
      name: "Fatima Rahman",
      location: "Canada",
      rating: 5,
      text: "As a first-time visitor to the Holy Cities, I was nervous about the journey. InstaSafar's team guided me through everything with patience and expertise.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format&q=60",
      badge: "First-time Pilgrim"
    },
    {
      id: 3,
      name: "Omar Abdullah",
      location: "United States",
      rating: 4,
      text: "The Hajj package was comprehensive and well-organized. The accommodations were excellent and the spiritual guidance made the experience truly meaningful.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format&q=60",
      badge: "Hajj Pilgrim"
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-saudi-green-50 via-background to-saudi-green-50 py-20 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 0.1, scale: 1, rotate: 45 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-saudi-gradient"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 0.1, scale: 1, rotate: -45 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            className="absolute top-60 -left-40 w-96 h-96 rounded-full bg-saudi-gradient-light"
          />
          <div className="absolute inset-0 pattern-dots opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="flex flex-col items-start space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="py-2 px-4 text-sm font-medium mb-6" variant="saudi">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Hajj & Umrah Specialists
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                Your <span className="text-saudi-green bg-gradient-to-r from-saudi-green-600 to-saudi-green-700 bg-clip-text text-transparent">spiritual journey</span>{" "}
                <br />made <span className="relative">
                  simple
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-2 left-0 right-0 h-3 bg-saudi-green/20 -z-10"
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-muted-foreground text-xl max-w-xl leading-relaxed"
              >
                Experience the sacred journey of a lifetime with our expertly curated Hajj and Umrah packages. 
                We handle every detail so you can focus on your spiritual connection.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  asChild 
                  variant="saudi" 
                  size="xl" 
                  effect="shimmer"
                  className="group"
                >
                  <Link to="/search">
                    Explore Packages
                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="saudi-outline" size="xl">
                  <Link to="/packages">Learn More</Link>
                </Button>
              </motion.div>
              
              {/* Enhanced trust indicators */}
              <motion.div 
                variants={staggerChildren}
                className="grid grid-cols-2 gap-4 mt-8 w-full"
              >
                {[
                  { icon: Clock, text: "24/7 Customer Support" },
                  { icon: Shield, text: "Best Price Guarantee" },
                  { icon: Award, text: "Expert Local Guides" },
                  { icon: Heart, text: "Secure Payments" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    className="flex items-center p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-2 rounded-full bg-saudi-green/10 mr-3">
                      <item.icon size={16} className="text-saudi-green" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:flex justify-center hidden"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-saudi-gradient rounded-3xl transform rotate-3 scale-105 blur-xl opacity-30"></div>
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                  alt="Kaaba, Makkah"
                  className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center">
                    <div className="p-3 rounded-xl bg-saudi-green/10 mr-4">
                      <Users size={24} className="text-saudi-green" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">50,000+</p>
                      <p className="text-sm text-muted-foreground">Pilgrims served</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-8 -right-8 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <div className="flex items-center">
                    <div className="p-3 rounded-xl bg-saudi-green/10 mr-4">
                      <Star size={24} className="text-saudi-green" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">4.9 Rating</p>
                      <p className="text-sm text-muted-foreground">From 5000+ reviews</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-16 bg-saudi-green text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-saudi-green-100 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8 border border-saudi-green/10"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Start Your Sacred Journey</h2>
            <p className="text-muted-foreground">Find the perfect package for your spiritual needs</p>
          </div>

          <Tabs defaultValue={searchTab} onValueChange={setSearchTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full mb-8 bg-saudi-green/5">
              <TabsTrigger value="hotel" className="flex items-center gap-2 data-[state=active]:bg-saudi-green data-[state=active]:text-white">
                <Hotel className="h-4 w-4" />
                <span className="hidden sm:inline">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="package" className="flex items-center gap-2 data-[state=active]:bg-saudi-green data-[state=active]:text-white">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Packages</span>
              </TabsTrigger>
              <TabsTrigger value="flight" className="flex items-center gap-2 data-[state=active]:bg-saudi-green data-[state=active]:text-white">
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Flights</span>
              </TabsTrigger>
              <TabsTrigger value="transport" className="flex items-center gap-2 data-[state=active]:bg-saudi-green data-[state=active]:text-white">
                <Bus className="h-4 w-4" />
                <span className="hidden sm:inline">Transport</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Hotel Search Tab */}
            <TabsContent value="hotel" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Destination</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Check-in Date</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Duration</Label>
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
                  <Button className="w-full" variant="saudi" size="lg" asChild>
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
                  <Label className="text-sm font-medium mb-2 block">Package Type</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Start Date</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Duration</Label>
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
                  <Label className="text-sm font-medium mb-2 block">From</Label>
                  <Input placeholder="Departure City/Airport" />
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">To</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Departure Date</Label>
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
                  <Label className="text-sm font-medium mb-2 block">From</Label>
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
                  <Label className="text-sm font-medium mb-2 block">To</Label>
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
                  <Label className="text-sm font-medium mb-2 block">Date</Label>
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

      {/* Enhanced Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-saudi-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4" variant="saudi">Why Choose InstaSafar</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Making Your Journey <span className="text-saudi-green">Spiritual & Comfortable</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We understand the profound significance of Hajj and Umrah in your spiritual life. Every aspect of our service is designed to enhance your sacred journey with comfort, convenience, and deep meaning.
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
                variants={scaleIn}
                className="group cursor-pointer"
              >
                <Card variant="interactive" className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-white overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="text-white h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-saudi-green transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
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
              <Badge className="mb-3" variant="outline">Our Selection</Badge>
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
              <Badge className="mb-3" variant="outline">Complete Solutions</Badge>
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

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-saudi-green-900 to-saudi-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge className="mb-4 bg-white text-saudi-green">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stories from <span className="text-saudi-green-200">Our Pilgrims</span></h2>
            <p className="text-saudi-green-100 text-lg leading-relaxed">
              Read about the transformative experiences of fellow pilgrims who have journeyed with us to the Holy Cities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={scaleIn}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <div className="flex items-center text-sm text-saudi-green-200 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {testimonial.location}
                          </div>
                          <Badge variant="outline" className="text-xs border-white/30 text-white">
                            {testimonial.badge}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={cn(
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-white/90 text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-saudi-green-600 via-saudi-green-700 to-saudi-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-grid opacity-10"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={staggerChildren}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-saudi-green-200" />
              </motion.div>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Ready to begin your 
                <br />
                <span className="text-saudi-green-200">sacred journey?</span>
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-saudi-green-100 text-xl leading-relaxed max-w-2xl mx-auto"
              >
                Join thousands of pilgrims who have trusted us with their spiritual journey. Let us help you create memories that will last a lifetime.
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-6 pt-4"
              >
                <Button 
                  asChild 
                  variant="secondary" 
                  size="xl" 
                  effect="glow"
                  className="bg-white text-saudi-green hover:bg-saudi-green-50 shadow-xl"
                >
                  <Link to="/packages" className="flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Explore Packages
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="saudi-outline" size="xl" className="border-white text-white hover:bg-white hover:text-saudi-green">
                  <Link to="/contact">
                    <Heart className="mr-2 h-5 w-5" />
                    Contact Us
                  </Link>
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
