
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, DollarSign, Hotel, TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  trend: string;
  trendUp: boolean;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  color, 
  bgGradient,
  trend,
  trendUp,
  index 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className={`${bgGradient} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/50 dark:bg-black/20`}>
                {icon}
              </div>
              <div className="flex items-center space-x-1">
                {trendUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {trend}
                </span>
              </div>
            </div>
            
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              {title}
            </CardTitle>
            
            <div className={`text-3xl font-bold text-gray-900 dark:text-white mb-2`}>
              {value}
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface StatsCardsProps {
  stats: {
    totalBookings: number;
    pendingBookings: number;
    totalRevenue: number;
    activeListings: number;
  };
  formatCurrency: (amount: number) => string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, formatCurrency }) => {
  const { t } = useLanguage();

  const statCards = [
    {
      title: t("dashboard.totalBookings", "Total Bookings"),
      value: stats.totalBookings,
      description: t("dashboard.totalBookingsDesc", "Total number of bookings received"),
      icon: <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      color: "text-blue-600 dark:text-blue-400",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      trend: "+12%",
      trendUp: true
    },
    {
      title: t("dashboard.pendingBookings", "Pending Bookings"),
      value: stats.pendingBookings,
      description: t("dashboard.pendingBookingsDesc", "Bookings awaiting confirmation"),
      icon: <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />,
      color: "text-orange-600 dark:text-orange-400",
      bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      trend: "-5%",
      trendUp: false
    },
    {
      title: t("dashboard.totalRevenue", "Total Revenue"),
      value: formatCurrency(stats.totalRevenue),
      description: t("dashboard.totalRevenueDesc", "Total revenue from all bookings"),
      icon: <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />,
      color: "text-green-600 dark:text-green-400",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      trend: "+23%",
      trendUp: true
    },
    {
      title: t("dashboard.activeListings", "Active Listings"),
      value: stats.activeListings,
      description: t("dashboard.activeListingsDesc", "Your active hotel and package listings"),
      icon: <Hotel className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      color: "text-purple-600 dark:text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      trend: "+8%",
      trendUp: true
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <StatsCard
          key={index}
          index={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          color={card.color}
          bgGradient={card.bgGradient}
          trend={card.trend}
          trendUp={card.trendUp}
        />
      ))}
    </div>
  );
};

export default StatsCards;
