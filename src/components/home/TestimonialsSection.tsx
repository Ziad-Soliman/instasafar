
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const { t, isRTL } = useLanguage();

  const testimonials = [
    {
      name: t('home.testimonials.testimonial1.name'),
      text: t('home.testimonials.testimonial1.text'),
      rating: 5,
      location: t('home.testimonials.testimonial1.location'),
    },
    {
      name: t('home.testimonials.testimonial2.name'),
      text: t('home.testimonials.testimonial2.text'),
      rating: 5,
      location: t('home.testimonials.testimonial2.location'),
    },
    {
      name: t('home.testimonials.testimonial3.name'),
      text: t('home.testimonials.testimonial3.text'),
      rating: 5,
      location: t('home.testimonials.testimonial3.location'),
    },
  ];

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{t('home.testimonials.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('home.testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className={cn("h-8 w-8 text-saudi-green mb-4", isRTL && "transform scale-x-[-1]")} />
                  <p className={cn("text-muted-foreground mb-4 leading-relaxed", isRTL && "text-right")}>
                    "{testimonial.text}"
                  </p>
                  <div className={cn("flex items-center gap-1 mb-3", isRTL && "flex-row-reverse justify-end")}>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className={cn(isRTL && "text-right")}>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
