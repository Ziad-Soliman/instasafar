
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BreadcrumbEnhanced } from '@/components/ui/breadcrumb-enhanced';
import PackageCard from '@/components/cards/PackageCard';
import { Filter, Search, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { packages } from '@/data/packages';
import { mockPackages } from '@/data/mockData';

const PackagesPage = () => {
  const [searchParams] = useSearchParams();
  const packageType = searchParams.get('type') as 'hajj' | 'umrah' | 'custom' | null;
  
  // Combine packages from both sources and ensure consistent format
  const allPackages = useMemo(() => {
    const combinedPackages = [
      ...packages.map(pkg => ({
        id: pkg.id,
        title: pkg.title,
        image: pkg.image,
        duration: pkg.duration,
        price: pkg.price,
        location: pkg.location,
        rating: pkg.rating,
        review_count: pkg.review_count,
        includes: pkg.includes || [],
        type: pkg.type,
        is_featured: pkg.is_featured
      })),
      ...mockPackages.map(pkg => ({
        id: pkg.id,
        title: pkg.title,
        image: pkg.image,
        duration: pkg.duration,
        price: pkg.price,
        location: pkg.location,
        rating: pkg.rating,
        review_count: pkg.review_count,
        includes: pkg.includes || [],
        type: pkg.type,
        is_featured: pkg.is_featured
      }))
    ];
    
    // Remove duplicates based on ID
    const uniquePackages = combinedPackages.filter((pkg, index, self) => 
      index === self.findIndex((p) => p.id === pkg.id)
    );
    
    return uniquePackages;
  }, []);

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
      locations: [...new Set(allPackages.map(pkg => pkg.location))],
      durations: [...new Set(allPackages.map(pkg => pkg.duration))],
      maxPrice: Math.max(...allPackages.map(pkg => pkg.price))
    };
  }, [allPackages]);

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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    ...(packageType ? [{ label: packageType.charAt(0).toUpperCase() + packageType.slice(1), href: `/packages?type=${packageType}` }] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <BreadcrumbEnhanced items={breadcrumbItems} className="mb-6" />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-saudi-green to-saudi-green/80 bg-clip-text text-transparent">
            {packageType ? `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Packages` : 'Travel Packages'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing travel packages designed for your perfect Saudi Arabian experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-saudi-green" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search packages..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Package Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Package Type</label>
                    <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hajj">Hajj</SelectItem>
                        <SelectItem value="umrah">Umrah</SelectItem>
                        <SelectItem value="custom">Custom Tours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
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
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {filterOptions.locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Duration</label>
                    <Select value={filters.duration} onValueChange={(value) => setFilters(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Duration</SelectItem>
                        {filterOptions.durations.map(duration => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Minimum Rating: {filters.rating}+
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
                    Clear Filters
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
                  {filteredPackages.length} {filteredPackages.length === 1 ? 'Package' : 'Packages'} Found
                </h2>
                <p className="text-muted-foreground">
                  Showing results for your selected criteria
                </p>
              </div>
            </div>

            {/* Featured Packages */}
            {featuredPackages.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="saudi" className="text-sm">Featured</Badge>
                  <h3 className="text-lg font-semibold">Featured Packages</h3>
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
                <h3 className="text-lg font-semibold mb-6">All Packages</h3>
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
                <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
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
                  Clear All Filters
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
