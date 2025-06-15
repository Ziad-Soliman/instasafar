
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, MapPin, TrendingUp } from "lucide-react";

interface CustomerStats {
  total_bookings?: number;
  upcoming_bookings?: number;
  total_spent?: string | number;
  favorite_city?: string;
}

interface CustomerStatsCardsProps {
  stats: CustomerStats | null;
  formatCurrency: (amount: number) => string;
}

const CustomerStatsCards: React.FC<CustomerStatsCardsProps> = ({
  stats,
  formatCurrency,
}) => {
  const statsData = [
    {
      title: "Total Bookings",
      value: stats?.total_bookings || 0,
      icon: Calendar,
      gradient: "from-blue-400 to-blue-600",
      trend: "+12%",
      trendColor: "text-green-200",
    },
    {
      title: "Upcoming Trips",
      value: stats?.upcoming_bookings || 0,
      icon: Clock,
      gradient: "from-green-400 to-green-600",
      trend: "+5%",
      trendColor: "text-green-200",
    },
    {
      title: "Total Spent",
      value: formatCurrency(Number(stats?.total_spent || 0)),
      icon: CreditCard,
      gradient: "from-purple-400 to-purple-600",
      trend: "+18%",
      trendColor: "text-green-200",
      isAmount: true,
    },
    {
      title: "Favorite City",
      value: stats?.favorite_city || 'N/A',
      icon: MapPin,
      gradient: "from-orange-400 to-orange-600",
      subtitle: "Most visited",
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card
          key={stat.title}
          className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300"
        >
          <CardContent className={`p-6 !bg-gradient-to-br ${stat.gradient} rounded-[20px] text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">{stat.title}</p>
                <h3 className={`font-bold text-white ${stat.isAmount ? 'text-2xl' : stat.isText ? 'text-lg' : 'text-3xl'}`}>
                  {stat.value}
                </h3>
                {stat.trend && (
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-200 mr-1" />
                    <span className={`text-sm font-medium ${stat.trendColor}`}>{stat.trend}</span>
                  </div>
                )}
                {stat.subtitle && (
                  <p className="text-sm text-white/70 mt-1">{stat.subtitle}</p>
                )}
              </div>
              <div className="p-3 rounded-xl bg-white/20">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerStatsCards;
