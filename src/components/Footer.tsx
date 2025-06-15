import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Facebook, Instagram, Twitter, MapPin, Mail, Phone, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <footer className="relative border-t bg-muted/20 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info with Newsletter */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Link to="/" className="flex items-center">
                <span className="mb-4 text-3xl font-bold tracking-tight text-primary">InstaSafar</span>
              </Link>
              <p className="mb-6 text-muted-foreground">
                {t("footer.tagline", "Your trusted partner for Hajj and Umrah journeys, committed to making your spiritual experience memorable and comfortable.")}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold">{t("footer.newsletter", "Newsletter")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("footer.newsletterTagline", "Subscribe to receive updates on new packages and offers.")}
              </p>
              <form className="relative">
                <Input
                  type="email"
                  placeholder={t("footer.yourEmail", "Your email")}
                  className="pr-12 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">{t("footer.subscribe", "Subscribe")}</span>
                </Button>
              </form>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-lg font-semibold mb-3">{t("footer.contactUs", "Contact Us")}</h3>
              <address className="space-y-2 text-sm text-muted-foreground not-italic">
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
              </address>
            </motion.div>

            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-lg font-semibold">
              {t("footer.company", "Company")}
            </motion.h3>
            <motion.nav variants={containerVariants} className="space-y-2 text-sm">
              {footerLinks.company.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="block transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-lg font-semibold">
              {t("footer.services", "Services")}
            </motion.h3>
            <motion.nav variants={containerVariants} className="space-y-2 text-sm">
              {footerLinks.services.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="block transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>

          {/* Support & Social */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="relative space-y-4"
          >
            <motion.h3 variants={itemVariants} className="text-lg font-semibold">
              {t("footer.support", "Support")}
            </motion.h3>
            <motion.nav variants={containerVariants} className="space-y-2 text-sm">
              {footerLinks.support.map((link, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Link
                    to={link.href}
                    className="block transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Provider & Admin Links & Copyright */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 mb-4 md:mb-0">
            <Link
              to="/provider"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Building size={16} className="mr-2" />
              {t("footer.providerPortal", "Provider Portal")}
            </Link>
            <Link
              to="/admin"
              className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Shield size={16} className="mr-2" />
              {t("footer.adminPortal", "Admin Portal")}
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
