
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PackageCard from '@/components/cards/PackageCard';
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

const FeaturedPackagesSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .limit(3)
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

    fetchFeaturedPackages();
  }, []);

  // Transform packages to match PackageCard expected format
  const transformedPackages = packages.map(pkg => ({
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
    rating: 4.5, // Default rating since it's not in packages table
    review_count: 0, // Default since reviews are separate
    includes: [
      ...(pkg.includes_hotel ? ['Hotel'] : []),
      ...(pkg.includes_flight ? ['Flight'] : []),
      ...(pkg.includes_transport ? ['Transport'] : [])
    ],
    type: 'custom' as const, // Default type since packages table doesn't have type field
    is_featured: true
  }));

  if (loading) {
    return (
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (transformedPackages.length === 0) {
    return null;
  }

  return (
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
          {transformedPackages.map((pkg, index) => (
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
  );
};

export default FeaturedPackagesSection;
