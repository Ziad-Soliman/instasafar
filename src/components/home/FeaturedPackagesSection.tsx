
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PackageCard from '@/components/cards/PackageCard';
import { mockPackages } from '@/data/mockData';

const FeaturedPackagesSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const featuredPackages = mockPackages.filter(pkg => pkg.is_featured).slice(0, 3);

  if (featuredPackages.length === 0) {
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
  );
};

export default FeaturedPackagesSection;
