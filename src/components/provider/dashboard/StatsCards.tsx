
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, DollarSign, Hotel, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  index: number;
  percentage?: string;
  trend?: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  color, 
  bgColor, 
  index, 
  percentage,
  trend = 'up'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg shadow-gray-100 dark:shadow-gray-900/20 hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </CardTitle>
          <div className={`p-3 rounded-2xl ${bgColor} border border-opacity-20`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <div className={`text-2xl font-bold text-gray-900 dark:text-white mb-1`}>
                {value}
              </div>
              {percentage && (
                <div className="flex items-center mb-2">
                  <TrendingUp className={`h-3 w-3 mr-1 ${
                    trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'
                  }`} />
                  <span className={`text-xs font-semibold ${
                    trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {percentage}
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
          
          {/* Subtle gradient background */}
          <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${
            color.includes('blue') ? 'from-blue-500 to-blue-600' :
            color.includes('yellow') ? 'from-yellow-500 to-yellow-600' :
            color.includes('green') ? 'from-green-500 to-green-600' :
            'from-purple-500 to-purple-600'
          }`} />
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
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
      percentage: "+12.5%",
      trend: "up" as const,
    },
    {
      title: t("dashboard.pendingBookings", "Pending Bookings"),
      value: stats.pendingBookings,
      description: t("dashboard.pendingBookingsDesc", "Bookings awaiting confirmation"),
      icon: <Calendar className="h-5 w-5 text-yellow-600" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
      percentage: "+3.2%",
      trend: "up" as const,
    },
    {
      title: t("dashboard.totalRevenue", "Total Revenue"),
      value: formatCurrency(stats.totalRevenue),
      description: t("dashboard.totalRevenueDesc", "Total revenue from all bookings"),
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
      percentage: "+8.7%",
      trend: "up" as const,
    },
    {
      title: t("dashboard.activeListings", "Active Listings"),
      value: stats.activeListings,
      description: t("dashboard.activeListingsDesc", "Your active hotel and package listings"),
      icon: <Hotel className="h-5 w-5 text-purple-600" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
      percentage: "+2.1%",
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {statCards.map((card, index) => (
        <StatsCard
          key={index}
          index={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          color={card.color}
          bgColor={card.bgColor}
          percentage={card.percentage}
          trend={card.trend}
        />
      ))}
    </div>
  );
};

export default StatsCards;
