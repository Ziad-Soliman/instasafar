
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  Clock,
  Award,
  Star,
  Users
} from 'lucide-react';

const StatsSection = () => {
  const { t, isRTL } = useLanguage();

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

  return (
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
              className="text-center space-y-2"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-white/90" />
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
