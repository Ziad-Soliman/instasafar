
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Calendar, Users, Star, Plane, Hotel, Car, Package } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Hotel,
      title: t("features.hotels.title", "Premium Hotels"),
      description: t("features.hotels.desc", "Book from thousands of verified hotels near the holy sites"),
      href: "/search"
    },
    {
      icon: Package,
      title: t("features.packages.title", "Hajj & Umrah Packages"),
      description: t("features.packages.desc", "Complete spiritual journey packages with all services included"),
      href: "/packages"
    },
    {
      icon: Plane,
      title: t("features.flights.title", "Flight Booking"),
      description: t("features.flights.desc", "Find and book the best flights to Saudi Arabia"),
      href: "/flights"
    },
    {
      icon: Car,
      title: t("features.transport.title", "Transportation"),
      description: t("features.transport.desc", "Reliable transport services between cities and holy sites"),
      href: "/transport"
    }
  ];

  const popularDestinations = [
    {
      name: t("cities.makkah", "Makkah"),
      description: t("cities.makkah.desc", "The holiest city in Islam"),
      image: "/placeholder-makkah.jpg",
      hotels: "500+",
      packages: "50+"
    },
    {
      name: t("cities.madinah", "Madinah"),
      description: t("cities.madinah.desc", "The Prophet's city"),
      image: "/placeholder-madinah.jpg",
      hotels: "300+",
      packages: "30+"
    },
    {
      name: t("cities.riyadh", "Riyadh"),
      description: t("cities.riyadh.desc", "The capital of Saudi Arabia"),
      image: "/placeholder-riyadh.jpg",
      hotels: "200+",
      packages: "20+"
    }
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-saudi-green to-saudi-green/80 text-white">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("hero.title", "Your Spiritual Journey Starts Here")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t("hero.subtitle", "Book hotels, packages, and transportation for your Hajj and Umrah pilgrimage")}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button asChild size="lg" variant="secondary" className="text-saudi-green">
                <Link to="/packages">
                  {t("hero.cta.packages", "Browse Packages")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-saudi-green">
                <Link to="/search">
                  {t("hero.cta.hotels", "Find Hotels")}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("features.title", "Everything You Need for Your Journey")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("features.subtitle", "From accommodation to transportation, we provide all services for a comfortable pilgrimage")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <Link to={feature.href}>
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 bg-saudi-green/10 rounded-full flex items-center justify-center group-hover:bg-saudi-green/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-saudi-green" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("destinations.title", "Popular Destinations")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("destinations.subtitle", "Discover the most sought-after destinations for your spiritual journey")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-saudi-green/20 to-saudi-green/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-saudi-green/60" />
                    </div>
                    <Badge className="absolute top-4 left-4" variant="saudi">
                      {t("common.popular", "Popular")}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{destination.name}</span>
                      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">4.8</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{destination.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex justify-between text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{destination.hotels} {t("common.hotels", "Hotels")}</span>
                      <span>{destination.packages} {t("common.packages", "Packages")}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-saudi-green text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("cta.title", "Ready to Begin Your Spiritual Journey?")}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t("cta.subtitle", "Join thousands of pilgrims who trust us with their sacred journey")}
            </p>
            <Button asChild size="lg" variant="secondary" className="text-saudi-green">
              <Link to="/packages">
                {t("cta.button", "Start Planning Now")}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
