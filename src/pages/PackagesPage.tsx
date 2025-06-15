
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import BreadcrumbEnhanced from '@/components/ui/breadcrumb-enhanced';
import PackageCard from '@/components/cards/PackageCard';
import { Filter, Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface Package {
  id: string;
  name: string;
  name_ar?: string;
  description?: string;
  description_ar?: string;
  thumbnail?: string;
  price: number;
  duration_days: number;
  city?: string;
  city_ar?: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  created_at: string;
}

const PackagesPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('type') as 'hajj' | 'umrah' | 'custom' | null;
  
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching packages:', error);
          return;
        }

        setPackages(data || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Transform packages to match expected format
  const allPackages = useMemo(() => {
    return packages.map(pkg => ({
      id: pkg.id,
      title: pkg.name,
      name: pkg.name,
      name_ar: pkg.name_ar,
      image: pkg.thumbnail || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop',
      duration: `${pkg.duration_days} days`,
      price: Number(pkg.price),
      location: pkg.city || 'Saudi Arabia',
      city: pkg.city,
      city_ar: pkg.city_ar,
      rating: 4.5, // Default rating
      review_count: 0, // Default since reviews are separate
      includes: [
        ...(pkg.includes_hotel ? ['Hotel'] : []),
        ...(pkg.includes_flight ? ['Flight'] : []),
        ...(pkg.includes_transport ? ['Transport'] : [])
      ],
      type: 'custom' as const,
      is_featured: false // We can add a featured flag to packages table later if needed
    }));
  }, [packages]);

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    type: packageType || 'all',
    priceRange: [0, 10000],
    duration: 'all',
    location: 'all',
    rating: 0
  });

  // Available filter options
  const filterOptions = useMemo(() => {
    return {
      locations: [...new Set(allPackages.map(pkg => pkg.location).filter(Boolean))],
      durations: [...new Set(allPackages.map(pkg => pkg.duration))],
      maxPrice: Math.max(...allPackages.map(pkg => pkg.price), 10000)
    };
  }, [allPackages]);

  // Update price range when data loads
  useEffect(() => {
    if (filterOptions.maxPrice > 0 && filters.priceRange[1] === 10000) {
      setFilters(prev => ({
        ...prev,
        priceRange: [0, filterOptions.maxPrice]
      }));
    }
  }, [filterOptions.maxPrice]);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return allPackages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           pkg.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'all' || pkg.type === filters.type;
      const matchesPrice = pkg.price >= filters.priceRange[0] && pkg.price <= filters.priceRange[1];
      const matchesDuration = filters.duration === 'all' || pkg.duration === filters.duration;
      const matchesLocation = filters.location === 'all' || pkg.location === filters.location;
      const matchesRating = pkg.rating >= filters.rating;

      return matchesSearch && matchesType && matchesPrice && matchesDuration && matchesLocation && matchesRating;
    });
  }, [allPackages, filters]);

  const featuredPackages = filteredPackages.filter(pkg => pkg.is_featured);
  const regularPackages = filteredPackages.filter(pkg => !pkg.is_featured);

  const pageTitle = packageType 
    ? t('packages.pageTitle', `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Packages`, { packageType: t(`packages.${packageType}`, packageType.charAt(0).toUpperCase() + packageType.slice(1)) })
    : t('packages.defaultPageTitle', 'Travel Packages');

  const breadcrumbItems = [
    { label: t('packages.breadcrumbPackages', 'Packages'), href: '/packages' },
    ...(packageType ? [{ label: t(`packages.${packageType}`, packageType.charAt(0).toUpperCase() + packageType.slice(1)), href: `/packages?type=${packageType}` }] : [])
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded w-96 mx-auto mb-4"></div>
              <div className="h-6 bg-muted rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <BreadcrumbEnhanced items={breadcrumbItems} className="mb-6" />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-saudi-green to-saudi-green/80 bg-clip-text text-transparent">
            {pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('packages.pageDescription', 'Discover amazing travel packages designed for your perfect Saudi Arabian experience')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-saudi-green" />
                  <h3 className="text-lg font-semibold">{t('packages.filters', 'Filters')}</h3>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('common.search', 'Search')}</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder={t('packages.searchPlaceholder', 'Search packages...')}
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Package Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('packages.packageType', 'Package Type')}</label>
                    <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('packages.allTypes', 'All Types')}</SelectItem>
                        <SelectItem value="hajj">{t('packages.hajj', 'Hajj')}</SelectItem>
                        <SelectItem value="umrah">{t('packages.umrah', 'Umrah')}</SelectItem>
                        <SelectItem value="custom">{t('packages.customTours', 'Custom Tours')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('packages.priceRangeWithValues', `Price Range: $${filters.priceRange[0]} - $${filters.priceRange[1]}`, { min: filters.priceRange[0], max: filters.priceRange[1]})}
                    </label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                      max={filterOptions.maxPrice}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('common.location', 'Location')}</label>
                    <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('packages.allLocations', 'All Locations')}</SelectItem>
                        {filterOptions.locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('common.duration', 'Duration')}</label>
                    <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('packages.anyDuration', 'Any Duration')}</SelectItem>
                        {filterOptions.durations.map(duration => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('packages.minRating', `Minimum Rating: ${filters.rating}+`, { rating: filters.rating })}
                    </label>
                    <Slider
                      value={[filters.rating]}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      search: '',
                      type: 'all',
                      priceRange: [0, filterOptions.maxPrice],
                      duration: 'all',
                      location: 'all',
                      rating: 0
                    })}
                    className="w-full"
                  >
                    {t('packages.clearFilters', 'Clear Filters')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {t('packages.resultsFound', '{count} {entity} Found', {
                      count: filteredPackages.length,
                      entity: filteredPackages.length === 1 ? t('packages.packageSingular', 'Package') : t('packages.packagePlural', 'Packages')
                  })}
                </h2>
                <p className="text-muted-foreground">
                  {t('packages.showingResults', 'Showing results for your selected criteria')}
                </p>
              </div>
            </div>

            {/* Featured Packages */}
            {featuredPackages.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="saudi" className="text-sm">{t('packages.featured', 'Featured')}</Badge>
                  <h3 className="text-lg font-semibold">{t('packages.featuredPackages', 'Featured Packages')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {featuredPackages.map(pkg => (
                    <PackageCard key={pkg.id} package={pkg} />
                  ))}
                </div>
              </div>
            )}

            {/* All Packages */}
            {regularPackages.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6">{t('packages.allPackages', 'All Packages')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {regularPackages.map(pkg => (
                    <PackageCard key={pkg.id} package={pkg} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredPackages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('packages.noPackagesFound', 'No packages found')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('packages.noPackagesFoundDesc', 'Try adjusting your filters to see more results')}
                </p>
                <Button 
                  variant="saudi"
                  onClick={() => setFilters({
                    search: '',
                    type: 'all',
                    priceRange: [0, filterOptions.maxPrice],
                    duration: 'all',
                    location: 'all',
                    rating: 0
                  })}
                >
                  {t('packages.clearAllFilters', 'Clear All Filters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
