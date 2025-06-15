
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const StatsSection = () => {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      value: "24/7",
      label: t('home.stats.support', 'Support'),
    },
    {
      value: "15+",
      label: t('home.stats.experience', 'Years'),
    },
    {
      value: "4.9",
      label: t('home.stats.rating', 'Rating'),
    },
    {
      value: "50K+",
      label: t('home.stats.pilgrims', 'Pilgrims'),
    },
  ];

  return (
    <section className="py-12 bg-saudi-green text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
