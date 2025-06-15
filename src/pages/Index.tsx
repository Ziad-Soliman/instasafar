
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
  CheckCircle
} from 'lucide-react';
import PackageCard from '@/components/cards/PackageCard';
import HotelCard from '@/components/cards/HotelCard';
import { mockPackages } from '@/data/mockData';
import { hotels } from '@/data/hotels';

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
                    src="/lovable-uploads/03288ca0-787e-4fff-9f1f-497e0e6eb4ad.png"
                    alt="Masjid an-Nabawi"
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
                className={cn("text-center space-y-2", isRTL && "text-right")}
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
            className={cn("text-center mb-12", isRTL && "text-right")}
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
              className={cn("text-center mb-12", isRTL && "text-right")}
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
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={cn("text-center mb-12", isRTL && "text-right")}
            >
              <h2 className="text-3xl font-bold mb-4">{t('hotels.featuredHotels')}</h2>
              <p className="text-muted-foreground text-lg">{t('hotels.searchHotels', 'Find the perfect accommodation for your spiritual journey')}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <HotelCard hotel={hotel} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/search')}
                variant="outline" 
                size="lg"
              >
                {t('hotels.searchHotels')} →
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
