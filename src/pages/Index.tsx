
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/cards/HotelCard";
import PackageCard from "@/components/cards/PackageCard";
import ExternalListingCard from "@/components/cards/ExternalListingCard";
import { featuredHotels, featuredPackages, externalListings } from "@/data/mockData";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5"></div>
          <div className="absolute top-60 -left-40 w-80 h-80 rounded-full bg-secondary/5"></div>
        </div>

        <div className="container-custom relative z-10 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start space-y-6"
            >
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Hajj & Umrah
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your spiritual journey <br />
                <span className="text-primary">made simple</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Book your Hajj and Umrah journey with ease. We offer the best hotels, flights, and transport services to make your pilgrimage comfortable and memorable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/search">Explore Packages</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-primary mr-2" />
                  <span className="text-sm">24/7 Customer Support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-primary mr-2" />
                  <span className="text-sm">Best Price Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-primary mr-2" />
                  <span className="text-sm">Local guides & experts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-primary mr-2" />
                  <span className="text-sm">Secure Payments</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:flex justify-center hidden"
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105"></div>
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                  alt="Kaaba, Makkah"
                  className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container-custom -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-slate-900 shadow-xl rounded-xl p-6 border"
        >
          <SearchBar />
        </motion.div>
      </section>

      {/* Featured Hotels Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">Featured Hotels</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Discover our handpicked selection of hotels in Makkah and Madinah offering comfort, convenience, and spiritual serenity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <HotelCard hotel={hotel} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/search?type=hotel">View All Hotels</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">Complete Packages</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                All-inclusive Hajj and Umrah packages featuring accommodation, transportation, and guided visits to holy sites.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/search?type=package">Explore All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* External Listings Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">More Options</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Explore additional hotels and packages from our trusted partners and booking platforms.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {externalListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ExternalListingCard listing={listing} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to start your spiritual journey?</h2>
              <p className="text-muted-foreground text-lg">
                Let us help you plan your Hajj or Umrah pilgrimage with our expert services and comprehensive offerings.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/search">Find Packages</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
