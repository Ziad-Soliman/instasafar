
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
    },
    {
      icon: MapPin,
      value: "25+",
      label: t('home.stats.cities', 'Cities'),
    },
    {
      icon: Star,
      value: "4.9",
      label: t('home.stats.rating', 'Rating'),
    },
    {
      icon: Clock,
      value: "24/7",
      label: t('home.stats.support', 'Support'),
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      <div className={`container mx-auto px-4 relative z-10 ${isRTL ? 'rtl' : 'ltr'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center ${isRTL ? 'font-arabic' : ''}`}>
            {t('home.stats.title', 'Trusted by Thousands')}
          </h2>
          <div className="w-16 h-1 bg-saudi-green mx-auto rounded-full mb-4"></div>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto text-center ${isRTL ? 'font-arabic' : ''}`}>
            {t('home.stats.subtitle', 'Your journey to the holy lands is our mission')}
          </p>
        </motion.div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 ${isRTL ? 'direction-rtl' : ''}`}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Icon container */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-saudi-green to-saudi-green-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-saudi-green/20 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                </div>
              </div>
              
              {/* Value */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="mb-3"
              >
                <div className={`text-4xl md:text-5xl font-bold text-gray-900 text-center ${isRTL ? 'font-arabic' : ''}`}>
                  {stat.value}
                </div>
              </motion.div>
              
              {/* Label */}
              <div className={`text-base md:text-lg font-medium text-gray-700 text-center ${isRTL ? 'font-arabic' : ''}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        ></motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
