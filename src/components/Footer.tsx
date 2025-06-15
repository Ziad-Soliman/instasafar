
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';
import RtlContainer from '@/components/layout/RtlContainer';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { getFlexDirection, getTextAlign, getSpacing } = useRtlLayout();

  const footerLinks = {
    services: [
      { label: t('hotels', 'Hotels'), href: '/hotels' },
      { label: t('packages', 'Packages'), href: '/packages' },
      { label: t('flights', 'Flights'), href: '/flights' },
      { label: t('transport', 'Transport'), href: '/transport' },
    ],
    support: [
      { label: t('common.help', 'Help Center'), href: '/help' },
      { label: t('common.contact', 'Contact Us'), href: '/contact' },
      { label: t('bookings', 'My Bookings'), href: '/bookings' },
      { label: t('common.support', 'Customer Support'), href: '/support' },
    ],
    company: [
      { label: t('common.about', 'About Us'), href: '/about' },
      { label: t('common.careers', 'Careers'), href: '/careers' },
      { label: t('common.blog', 'Blog'), href: '/blog' },
      { label: t('common.partners', 'Partners'), href: '/partners' },
    ],
    legal: [
      { label: t('common.terms', 'Terms of Service'), href: '/terms' },
      { label: t('common.privacy', 'Privacy Policy'), href: '/privacy' },
      { label: t('common.cookies', 'Cookie Policy'), href: '/cookies' },
      { label: t('common.refund', 'Refund Policy'), href: '/refund' },
    ]
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' },
    { icon: <Youtube className="h-5 w-5" />, href: '#', label: 'YouTube' },
  ];

  return (
    <RtlContainer>
      <footer className="bg-muted/20 border-t">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className={`${getFlexDirection('row')} items-center ${getSpacing('margin', 'right', '2')} mb-4`}>
                <div className="w-8 h-8 bg-saudi-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">I</span>
                </div>
                <span className={`text-xl font-bold ${getSpacing('margin', 'left', '2')}`}>InstaSafar</span>
              </div>
              
              <p className={`text-muted-foreground mb-4 ${getTextAlign('left')}`}>
                {t('footer.description', 'Your trusted partner for Hajj, Umrah, and travel experiences across Saudi Arabia. Book with confidence and create unforgettable memories.')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className={`${getFlexDirection('row')} items-center gap-2`}>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">+966 11 123 4567</span>
                </div>
                <div className={`${getFlexDirection('row')} items-center gap-2`}>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">info@instasafar.com</span>
                </div>
                <div className={`${getFlexDirection('row')} items-center gap-2`}>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {t('footer.address', 'Riyadh, Saudi Arabia')}
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className={`font-semibold mb-4 ${getTextAlign('left')}`}>
                {t('footer.services', 'Services')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${getTextAlign('left')} block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className={`font-semibold mb-4 ${getTextAlign('left')}`}>
                {t('footer.support', 'Support')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${getTextAlign('left')} block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className={`font-semibold mb-4 ${getTextAlign('left')}`}>
                {t('footer.company', 'Company')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${getTextAlign('left')} block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className={`font-semibold mb-4 ${getTextAlign('left')}`}>
                {t('footer.legal', 'Legal')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${getTextAlign('left')} block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={`pt-8 border-t ${getFlexDirection('row')} flex-col md:flex-row items-center justify-between gap-4`}>
            <div className={`${getFlexDirection('row')} items-center gap-4`}>
              <p className="text-sm text-muted-foreground">
                © 2024 InstaSafar. {t('common.allRightsReserved', 'All rights reserved')}.
              </p>
            </div>
            
            {/* Social Links */}
            <div className={`${getFlexDirection('row')} items-center gap-4`}>
              <span className="text-sm text-muted-foreground">
                {t('footer.followUs', 'Follow us:')}
              </span>
              <div className={`${getFlexDirection('row')} items-center gap-2`}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </RtlContainer>
  );
};

export default Footer;
