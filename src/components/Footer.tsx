
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Footer links organized by section
  const footerLinks = {
    company: [
      { label: t("footer.aboutUs", "About Us"), href: "/about" },
      { label: t("footer.ourServices", "Our Services"), href: "/services" },
      { label: t("footer.contactUs", "Contact Us"), href: "/contact" },
      { label: t("footer.careers", "Career"), href: "/careers" },
    ],
    services: [
      { label: t("footer.hajjPackages", "Hajj Packages"), href: "/packages?type=hajj" },
      { label: t("footer.umrahPackages", "Umrah Packages"), href: "/packages?type=umrah" },
      { label: t("footer.hotelBooking", "Hotel Booking"), href: "/search" },
      { label: t("footer.flightBooking", "Flight Booking"), href: "/flights" },
      { label: t("footer.transportServices", "Transport Services"), href: "/transport" },
    ],
    support: [
      { label: t("footer.helpCenter", "Help Center"), href: "/help" },
      { label: t("footer.faqs", "FAQs"), href: "/faqs" },
      { label: t("footer.visaInfo", "Visa Information"), href: "/visa-info" },
      { label: t("footer.termsAndConditions", "Terms & Conditions"), href: "/terms" },
      { label: t("footer.privacyPolicyLink", "Privacy Policy"), href: "/privacy" },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary">InstaSafar</span>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("footer.tagline", "Your trusted partner for Hajj and Umrah journeys, committed to making your spiritual experience memorable and comfortable.")}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4 mt-4">
              <a
                href="#"
                className="bg-background text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-background text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-background text-foreground hover:text-primary p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-sm font-semibold mb-3">{t("footer.contactUs", "Contact Us")}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{t("footer.address", "123 Business Avenue, Makkah, Saudi Arabia")}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>{t("footer.phone", "+966 123 456 7890")}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-2 flex-shrink-0" />
                  <span>{t("footer.email", "info@instasafar.com")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-sm font-semibold">
              {t("footer.company", "Company")}
            </motion.h3>
            <motion.ul variants={containerVariants} className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-sm font-semibold">
              {t("footer.services", "Services")}
            </motion.h3>
            <motion.ul variants={containerVariants} className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Support & Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-sm font-semibold">
              {t("footer.support", "Support")}
            </motion.h3>
            <motion.ul variants={containerVariants} className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-sm font-semibold mb-3">{t("footer.newsletter", "Newsletter")}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("footer.newsletterTagline", "Subscribe to receive updates on new packages and offers.")}
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder={t("footer.yourEmail", "Your email")}
                  className="max-w-[220px]"
                />
                <Button size="sm">{t("footer.subscribe", "Subscribe")}</Button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Provider Link & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <div className="mb-4 md:mb-0">
            <Link
              to="/provider"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Building size={16} className="mr-2" />
              {t("footer.providerPortal", "Provider Portal")}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright', `© {year} InstaSafar. All rights reserved.`, { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
