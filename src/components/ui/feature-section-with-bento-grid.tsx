import { MapPin, Shield, Heart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useRtlHelpers } from '@/utils/rtl-helpers';
import { cn } from '@/lib/utils';

function Feature() {
  const { t, isRTL } = useLanguage();
  const { getDirectionalClasses } = useRtlHelpers();

  return (
    <div className={cn("w-full py-20 lg:py-40", isRTL && "rtl")}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-center text-center">
            <div>
              <Badge variant="saudi">{t('home.services.badge', 'Our Services')}</Badge>
            </div>
            <div className="flex gap-2 flex-col items-center">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-center">
                {t('home.services.title', 'Why Choose Our Pilgrimage Services?')}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-center">
                {t('home.services.subtitle', 'Experience unmatched comfort and spiritual guidance on your sacred journey to the holy lands.')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={cn(
              "relative bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col",
              isRTL ? "text-right" : "text-left"
            )}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <MapPin className="w-8 h-8 stroke-1 text-saudi-green" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">{t('home.services.guidance.title', 'Expert Spiritual Guidance')}</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  {t('home.services.guidance.description', 'Our knowledgeable guides provide comprehensive spiritual support and religious education throughout your pilgrimage journey.')}
                </p>
              </div>
            </div>
            <div className={cn(
              "relative bg-muted rounded-md aspect-square p-6 flex justify-between flex-col",
              isRTL ? "text-right" : "text-left"
            )}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Shield className="w-8 h-8 stroke-1 text-saudi-green" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">{t('home.services.safety.title', 'Safety & Security')}</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  {t('home.services.safety.description', 'Your safety is our priority with 24/7 support and comprehensive travel insurance coverage.')}
                </p>
              </div>
            </div>

            <div className={cn(
              "relative bg-muted rounded-md aspect-square p-6 flex justify-between flex-col",
              isRTL ? "text-right" : "text-left"
            )}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Heart className="w-8 h-8 stroke-1 text-saudi-green" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">{t('home.services.comfort.title', 'Premium Comfort')}</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  {t('home.services.comfort.description', 'Enjoy luxury accommodations and comfortable transportation designed for your spiritual focus.')}
                </p>
              </div>
            </div>
            <div className={cn(
              "relative bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col",
              isRTL ? "text-right" : "text-left"
            )}>
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <Clock className="w-8 h-8 stroke-1 text-saudi-green" />
              <div className="flex flex-col">
                <h3 className="text-xl tracking-tight">{t('home.services.support.title', '24/7 Dedicated Support')}</h3>
                <p className="text-muted-foreground max-w-xs text-base">
                  {t('home.services.support.description', 'Round-the-clock assistance ensuring your pilgrimage experience is smooth, peaceful, and spiritually fulfilling from start to finish.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
