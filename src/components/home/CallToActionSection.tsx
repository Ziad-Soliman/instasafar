
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Star } from 'lucide-react';

const CallToActionSection = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saudi-green via-saudi-green-600 to-saudi-green-800" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full" />
      </div>

      {/* Floating Icons */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-16 right-20 text-white/20"
      >
        <Plane size={32} />
      </motion.div>
      
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-16 left-20 text-white/20"
      >
        <MapPin size={28} />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute top-1/3 left-1/2 text-white/20"
      >
        <Star size={24} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              {t('home.cta.badge', 'Start Your Journey')}
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
          >
            {t('home.cta.title')}
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
          >
            {t('home.cta.subtitle')}
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/packages')} 
              className="bg-white text-saudi-green hover:bg-white/90 hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl"
            >
              <MapPin className="w-5 h-5 mr-2" />
              {t('home.cta.browsePackages')}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth/register')} 
              className="border-2 border-white text-white hover:bg-white hover:text-saudi-green transition-all duration-300 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Plane className="w-5 h-5 mr-2" />
              {t('home.cta.startJourney')}
            </Button>
          </motion.div>

          {/* Additional CTA Text */}
          <motion.p 
            variants={itemVariants}
            className="text-white/70 text-sm mt-8 max-w-md mx-auto"
          >
            {t('home.cta.additionalText', 'Join thousands of satisfied travelers who have experienced the journey of a lifetime')}
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-16 fill-background"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
};

export default CallToActionSection;
