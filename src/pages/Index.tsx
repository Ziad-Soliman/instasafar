
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Star, 
  Users, 
  Shield, 
  CreditCard, 
  MapPin, 
  Calendar as CalendarIcon,
  Clock,
  Award,
  CheckCircle,
  Quote
} from 'lucide-react';
import PackageCard from '@/components/cards/PackageCard';
import HotelCard from '@/components/cards/HotelCard';
import { mockPackages, hotels } from '@/data/mockData';

const Index = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('packages');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [duration, setDuration] = useState('');

  const featuredPackages = mockPackages.filter(pkg => pkg.is_featured).slice(0, 3);
  const featuredHotels = hotels.filter(hotel => hotel.is_featured).slice(0, 3);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (departureDate) params.append('date', format(departureDate, 'yyyy-MM-dd'));
    if (duration) params.append('duration', duration);

    switch (searchType) {
      case 'packages':
        navigate(`/packages?${params.toString()}`);
        break;
      case 'hotels':
        navigate(`/search?${params.toString()}`);
        break;
      case 'flights':
        navigate(`/flights?${params.toString()}`);
        break;
      case 'transport':
        navigate(`/transport?${params.toString()}`);
        break;
    }
  };

  const stats = [
    {
      icon: Clock,
      value: t('home.stats.support'),
      label: t('home.stats.supportDesc'),
    },
    {
      icon: Award,
      value: t('home.stats.experience'),
      label: t('home.stats.experienceDesc'),
    },
    {
      icon: Star,
      value: t('home.stats.rating'),
      label: t('home.stats.ratingDesc'),
    },
    {
      icon: Users,
      value: t('home.stats.pilgrims'),
      label: t('home.stats.pilgrimsDesc'),
    },
  ];

  const features = [
    {
      icon: CheckCircle,
      title: t('home.features.bestPrice'),
    },
    {
      icon: Clock,
      title: t('home.features.customerSupport'),
    },
    {
      icon: Shield,
      title: t('home.features.securePayments'),
    },
    {
      icon: MapPin,
      title: t('home.features.expertGuides'),
    },
  ];

  const testimonials = [
    {
      name: t('home.testimonials.testimonial1.name'),
      text: t('home.testimonials.testimonial1.text'),
      rating: 5,
      location: t('home.testimonials.testimonial1.location'),
    },
    {
      name: t('home.testimonials.testimonial2.name'),
      text: t('home.testimonials.testimonial2.text'),
      rating: 5,
      location: t('home.testimonials.testimonial2.location'),
    },
    {
      name: t('home.testimonials.testimonial3.name'),
      text: t('home.testimonials.testimonial3.text'),
      rating: 5,
      location: t('home.testimonials.testimonial3.location'),
    },
  ];

  return (
    <div className={cn("min-h-screen", isRTL && "rtl")}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-saudi-green/5 via-background to-muted/20 pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className={cn("space-y-8", isRTL && "text-right")}
            >
              <div className="space-y-6">
                <Badge variant="saudi" className="text-sm px-4 py-2">
                  {t('home.hero.badge')}
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="text-foreground">{t('home.hero.title').split(' ').slice(0, 1).join(' ')} </span>
                  <span className="text-saudi-green">{t('home.hero.title').split(' ').slice(1, 3).join(' ')} </span>
                  <span className="text-foreground">{t('home.hero.title').split(' ').slice(3).join(' ')}</span>
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {t('home.hero.subtitle')}
                </p>
                
                <div className={cn("flex flex-col sm:flex-row gap-4", isRTL && "sm:flex-row-reverse")}>
                  <Button size="lg" className="bg-saudi-green hover:bg-saudi-green/90">
                    {t('home.hero.explorePackages')}
                  </Button>
                  <Button size="lg" variant="outline">
                    {t('home.hero.learnMore')}
                  </Button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}
                  >
                    <feature.icon className="h-5 w-5 text-saudi-green flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image/Card */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1564769625392-651b64d96e7f?auto=format&fit=crop&w=800&q=80"
                    alt={t('home.hero.kaaba')}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Rating overlay */}
                  <div className={cn(
                    "absolute top-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg",
                    isRTL ? "right-4" : "left-4"
                  )}>
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{t('home.hero.rating')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('home.hero.fromReviews')}
                    </p>
                  </div>

                  {/* Pilgrims count overlay */}
                  <div className={cn(
                    "absolute bottom-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg",
                    isRTL ? "right-4" : "left-4"
                  )}>
                    <div className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                      <Users className="h-4 w-4 text-saudi-green" />
                      <span className="font-semibold">{t('home.hero.pilgrimsServed')}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-saudi-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn("text-center space-y-2", isRTL && "text-center")}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-white/90" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn("text-center mb-12", isRTL && "text-center")}
          >
            <h2 className="text-3xl font-bold mb-4">{t('home.search.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.search.subtitle')}</p>
          </motion.div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              {/* Search Type Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['packages', 'hotels', 'flights', 'transport'].map((type) => (
                  <Button
                    key={type}
                    variant={searchType === type ? 'default' : 'outline'}
                    onClick={() => setSearchType(type)}
                    className="flex-1 min-w-[120px]"
                  >
                    {t(`home.search.${type}`)}
                  </Button>
                ))}
              </div>

              {/* Search Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('home.search.destination')}</label>
                  <Input
                    placeholder={t('home.search.destinationPlaceholder')}
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('home.search.departureDate')}</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground",
                          isRTL && "text-right"
                        )}
                      >
                        <CalendarIcon className={cn("mr-2 h-4 w-4", isRTL && "ml-2 mr-0")} />
                        {departureDate ? format(departureDate, "PPP") : t('home.search.departurePlaceholder')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={setDepartureDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('home.search.duration')}</label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('home.search.durationPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">{t('common.days', '3 Days')}</SelectItem>
                      <SelectItem value="7">{t('common.days', '7 Days')}</SelectItem>
                      <SelectItem value="14">{t('common.days', '14 Days')}</SelectItem>
                      <SelectItem value="21">{t('common.days', '21 Days')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-0">Search</label>
                  <Button onClick={handleSearch} className="w-full bg-saudi-green hover:bg-saudi-green/90">
                    {t('home.search.searchButton')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Packages Section */}
      {featuredPackages.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={cn("text-center mb-12", isRTL && "text-center")}
            >
              <h2 className="text-3xl font-bold mb-4">{t('packages.featuredPackages')}</h2>
              <p className="text-muted-foreground text-lg">{t('packages.pageDescription', 'Discover amazing travel packages designed for your perfect Saudi Arabian experience')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PackageCard package={pkg} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/packages')}
                variant="outline" 
                size="lg"
              >
                {t('packages.title')} →
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Hotels Section */}
      {featuredHotels.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-background via-muted/10 to-saudi-green/5 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-saudi-green rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-saudi-green/50 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={cn("text-center mb-16", isRTL && "text-center")}
            >
              <div className="inline-flex items-center gap-2 bg-saudi-green/10 text-saudi-green px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-saudi-green rounded-full animate-pulse"></span>
                {t('hotels.featuredHotels')}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-saudi-green bg-clip-text text-transparent">
                {t('hotels.featuredHotels')}
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('hotels.searchHotels', 'Find the perfect accommodation for your spiritual journey')}
              </p>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center mt-8">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-saudi-green to-transparent rounded-full"></div>
              </div>
            </motion.div>

            {/* Hotels Grid with enhanced styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-saudi-green/20 to-saudi-green/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Card with enhanced styling */}
                    <div className="relative bg-card border border-border/50 rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 group-hover:border-saudi-green/30 backdrop-blur-sm">
                      <HotelCard hotel={hotel} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                onClick={() => navigate('/search')}
                size="lg"
                className="group bg-gradient-to-r from-saudi-green to-saudi-green-light hover:from-saudi-green-light hover:to-saudi-green text-white px-8 py-4 rounded-full font-semibold text-lg shadow-saudi hover:shadow-saudi-lg transform hover:-translate-y-1 transition-all duration-300 min-w-[200px]"
              >
                <span className="flex items-center gap-3">
                  {t('hotels.searchHotels')}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    →
                  </motion.div>
                </span>
              </Button>
              
              {/* Additional info */}
              <p className="text-sm text-muted-foreground mt-4 font-medium">
                {t('common.viewAll', 'View all available accommodations')}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn("text-center mb-12", isRTL && "text-center")}
          >
            <h2 className="text-3xl font-bold mb-4">{t('home.testimonials.title')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.testimonials.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <Quote className={cn("h-8 w-8 text-saudi-green mb-4", isRTL && "transform scale-x-[-1]")} />
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className={cn("flex items-center gap-1 mb-3", isRTL && "flex-row-reverse")}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className={cn(isRTL && "text-right")}>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-saudi-green text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn("text-center max-w-3xl mx-auto", isRTL && "text-center")}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              {t('home.cta.subtitle')}
            </p>
            <div className={cn("flex flex-col sm:flex-row gap-4 justify-center", isRTL && "sm:flex-row-reverse")}>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/packages')}
                className="bg-white text-saudi-green hover:bg-white/90"
              >
                {t('home.cta.browsePackages')}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/auth/register')}
                className="border-white text-white hover:bg-white/10"
              >
                {t('home.cta.startJourney')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
