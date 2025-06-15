
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Users, Star, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';
import RtlContainer from '@/components/layout/RtlContainer';
import PackageCard from '@/components/cards/PackageCard';

// Mock data for packages
const mockPackages = [
  {
    id: '1',
    title: 'Premium Umrah Package',
    name: 'Premium Umrah Package',
    name_ar: 'باقة العمرة المميزة',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400',
    duration: '7 Days',
    price: 2500,
    location: 'Makkah & Madinah',
    city: 'Makkah',
    city_ar: 'مكة المكرمة',
    rating: 4.8,
    review_count: 124,
    includes: ['5-Star Hotels', 'Transportation', 'Guided Tours', 'Meals'],
    type: 'umrah' as const,
    is_featured: true,
  },
  {
    id: '2',
    title: 'Hajj Complete Package',
    name: 'Hajj Complete Package',
    name_ar: 'باقة الحج الكاملة',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
    duration: '14 Days',
    price: 5500,
    location: 'Makkah, Madinah, Mina',
    city: 'Makkah',
    city_ar: 'مكة المكرمة',
    rating: 4.9,
    review_count: 89,
    includes: ['Premium Accommodation', 'All Transportation', 'Full Board', 'Spiritual Guide'],
    type: 'hajj' as const,
    is_featured: true,
  },
  {
    id: '3',
    title: 'Riyadh City Tour',
    name: 'Riyadh City Tour',
    name_ar: 'جولة مدينة الرياض',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    duration: '3 Days',
    price: 800,
    location: 'Riyadh',
    city: 'Riyadh',
    city_ar: 'الرياض',
    rating: 4.6,
    review_count: 67,
    includes: ['Hotel', 'City Tour', 'Museum Visits', 'Local Guide'],
    type: 'custom' as const,
    is_featured: false,
  },
];

const PackagesPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { getFlexDirection, getTextAlign, getSpacing } = useRtlLayout();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <RtlContainer className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mb-8 ${getTextAlign('center')}`}
        >
          <h1 className="text-4xl font-bold mb-4">
            {t('packages.title', 'Travel Packages')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('packages.description', 'Discover our carefully curated packages for Hajj, Umrah, and cultural tours across Saudi Arabia')}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              {/* Search Bar */}
              <div className={`${getFlexDirection('row')} items-center gap-4 mb-6`}>
                <div className="relative flex-1">
                  <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                  <Input
                    placeholder={t('search.searchPackages', 'Search packages...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Filters */}
              <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${getFlexDirection('row')}`}>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue placeholder={t('search.destination', 'Destination')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all', 'All Cities')}</SelectItem>
                    <SelectItem value="makkah">{t('cities.makkah', 'Makkah')}</SelectItem>
                    <SelectItem value="madinah">{t('cities.madinah', 'Madinah')}</SelectItem>
                    <SelectItem value="riyadh">{t('cities.riyadh', 'Riyadh')}</SelectItem>
                    <SelectItem value="jeddah">{t('cities.jeddah', 'Jeddah')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue placeholder={t('packages.packageType', 'Package Type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('common.all', 'All Types')}</SelectItem>
                    <SelectItem value="hajj">{t('packages.hajjPackage', 'Hajj Package')}</SelectItem>
                    <SelectItem value="umrah">{t('packages.umrahPackage', 'Umrah Package')}</SelectItem>
                    <SelectItem value="custom">{t('packages.cityTour', 'City Tour')}</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue placeholder={t('search.sortBy', 'Sort by')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">{t('packages.featured', 'Featured')}</SelectItem>
                    <SelectItem value="price-low">{t('search.priceLowToHigh', 'Price: Low to High')}</SelectItem>
                    <SelectItem value="price-high">{t('search.priceHighToLow', 'Price: High to Low')}</SelectItem>
                    <SelectItem value="rating">{t('common.rating', 'Rating')}</SelectItem>
                    <SelectItem value="duration">{t('packages.duration', 'Duration')}</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full">
                  <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('search.filters', 'Filters')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${getFlexDirection('row')} items-center justify-between mb-6`}
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {t('packages.availablePackages', 'Available Packages')}
            </h2>
            <p className="text-muted-foreground">
              {mockPackages.length} {t('search.resultsFound', 'packages found')}
            </p>
          </div>
          
          <div className={`${getFlexDirection('row')} items-center gap-2`}>
            <Button variant="outline" size="sm">
              <MapPin className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('common.map', 'Map View')}
            </Button>
          </div>
        </motion.div>

        {/* Package Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <PackageCard package={pkg} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button variant="outline" size="lg">
            {t('search.loadMore', 'Load More Packages')}
          </Button>
        </motion.div>
      </div>
    </RtlContainer>
  );
};

export default PackagesPage;
