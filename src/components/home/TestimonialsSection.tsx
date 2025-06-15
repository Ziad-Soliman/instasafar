
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';

const TestimonialsSection = () => {
  const { t, isRTL } = useLanguage();

  const testimonials = [
    {
      text: t('home.testimonials.testimonial1.text'),
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: t('home.testimonials.testimonial1.name'),
      role: t('home.testimonials.testimonial1.role'),
    },
    {
      text: t('home.testimonials.testimonial2.text'),
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: t('home.testimonials.testimonial2.name'),
      role: t('home.testimonials.testimonial2.role'),
    },
    {
      text: t('home.testimonials.testimonial3.text'),
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: t('home.testimonials.testimonial3.name'),
      role: t('home.testimonials.testimonial3.role'),
    },
    {
      text: t('home.testimonials.testimonial4.text'),
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: t('home.testimonials.testimonial4.name'),
      role: t('home.testimonials.testimonial4.role'),
    },
    {
      text: t('home.testimonials.testimonial5.text'),
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: t('home.testimonials.testimonial5.name'),
      role: t('home.testimonials.testimonial5.role'),
    },
    {
      text: t('home.testimonials.testimonial6.text'),
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: t('home.testimonials.testimonial6.name'),
      role: t('home.testimonials.testimonial6.role'),
    },
    {
      text: t('home.testimonials.testimonial7.text'),
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: t('home.testimonials.testimonial7.name'),
      role: t('home.testimonials.testimonial7.role'),
    },
    {
      text: t('home.testimonials.testimonial8.text'),
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: t('home.testimonials.testimonial8.name'),
      role: t('home.testimonials.testimonial8.role'),
    },
    {
      text: t('home.testimonials.testimonial9.text'),
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: t('home.testimonials.testimonial9.name'),
      role: t('home.testimonials.testimonial9.role'),
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">{t('home.testimonials.badge')}</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center">
            {t('home.testimonials.title')}
          </h2>
          <p className={cn("text-center mt-5 opacity-75", isRTL && "text-right")}>
            {t('home.testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
