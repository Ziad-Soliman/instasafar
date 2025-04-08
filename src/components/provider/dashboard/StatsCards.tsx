
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, DollarSign, Hotel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={`p-2 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${color}`}>{value}</div>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
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
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      title: t("dashboard.pendingBookings", "Pending Bookings"),
      value: stats.pendingBookings,
      description: t("dashboard.pendingBookingsDesc", "Bookings awaiting confirmation"),
      icon: <Calendar className="h-5 w-5" />,
      color: "text-yellow-500",
    },
    {
      title: t("dashboard.totalRevenue", "Total Revenue"),
      value: formatCurrency(stats.totalRevenue),
      description: t("dashboard.totalRevenueDesc", "Total revenue from all bookings"),
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      title: t("dashboard.activeListings", "Active Listings"),
      value: stats.activeListings,
      description: t("dashboard.activeListingsDesc", "Your active hotel and package listings"),
      icon: <Hotel className="h-5 w-5" />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, index) => (
        <StatsCard
          key={index}
          index={index}
          title={card.title}
          value={card.value}
          description={card.description}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
