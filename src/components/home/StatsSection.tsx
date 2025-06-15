
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, MapPin, Star, Clock } from 'lucide-react';

const StatsSection = () => {
  const { t, isRTL } = useLanguage();

  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: t('home.stats.pilgrims', 'Happy Pilgrims'),
      description: t('home.stats.pilgrimsDesc', 'Served worldwide'),
    },
    {
      icon: MapPin,
      value: "25+",
      label: t('home.stats.cities', 'Cities'),
      description: t('home.stats.citiesDesc', 'Across Saudi Arabia'),
    },
    {
      icon: Star,
      value: "4.9",
      label: t('home.stats.rating', 'Rating'),
      description: t('home.stats.ratingDesc', 'Customer satisfaction'),
    },
    {
      icon: Clock,
      value: "24/7",
      label: t('home.stats.support', 'Support'),
      description: t('home.stats.supportDesc', 'Always available'),
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-saudi-green-600 via-saudi-green-500 to-saudi-green-700 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {t('home.stats.title', 'Trusted by Thousands')}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('home.stats.subtitle', 'Your journey to the holy lands is our mission')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-white/5 scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="mb-2"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent">
                  {stat.value}
                </div>
              </motion.div>
              
              <div className={isRTL ? "text-right" : "text-left"}>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        ></motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
