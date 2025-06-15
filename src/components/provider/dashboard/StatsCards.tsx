
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Calendar, DollarSign, Eye, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  stats: {
    totalListings?: number;
    totalBookings?: number;
    totalRevenue?: number;
    totalViews?: number;
  } | null;
  formatCurrency: (amount: number) => string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, formatCurrency }) => {
  const statsData = [
    {
      title: "Total Listings",
      value: stats?.totalListings || 0,
      icon: Hotel,
      gradient: "bg-gradient-to-br from-saudi-green-400 to-saudi-green-600",
      bgLight: "bg-saudi-green-50 dark:bg-saudi-green-900/20",
      trend: "+12%",
      trendUp: true,
      description: "Active properties"
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: Calendar,
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      trend: "+8%",
      trendUp: true,
      description: "Confirmed reservations"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.totalRevenue || 0)),
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
      trend: "+23%",
      trendUp: true,
      description: "Earnings this month"
    },
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      icon: Eye,
      gradient: "bg-gradient-to-br from-teal-400 to-teal-600",
      bgLight: "bg-teal-50 dark:bg-teal-900/20",
      trend: "+15%",
      trendUp: true,
      description: "Property views"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] overflow-hidden hover:scale-105 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                stat.trendUp ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
              }`}>
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-semibold ${
                  stat.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-navy-700 dark:text-white">
                {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
              </h3>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{stat.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
