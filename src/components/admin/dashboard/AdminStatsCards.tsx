
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Wallet, Hotel, Package, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface AdminStatsCardsProps {
  stats: {
    total_users: number;
    total_bookings: number;
    total_revenue: number;
    total_hotels: number;
    total_packages: number;
    pending_bookings: number;
  } | null;
  formatCurrency: (amount: number) => string;
}

const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({ stats, formatCurrency }) => {
  const statsData = [
    {
      title: "Total Users",
      value: stats?.total_users || 0,
      icon: Users,
      color: "text-blue-600",
      bgGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Total Bookings", 
      value: stats?.total_bookings || 0,
      icon: Calendar,
      color: "text-green-600",
      bgGradient: "bg-gradient-to-br from-green-400 to-green-600",
      bgLight: "bg-green-50 dark:bg-green-900/20",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.total_revenue || 0)),
      icon: Wallet,
      color: "text-purple-600",
      bgGradient: "bg-gradient-to-br from-purple-400 to-purple-600",
      bgLight: "bg-purple-50 dark:bg-purple-900/20",
      trend: "+23%",
      trendUp: true
    },
    {
      title: "Hotels",
      value: stats?.total_hotels || 0,
      icon: Hotel,
      color: "text-orange-600",
      bgGradient: "bg-gradient-to-br from-orange-400 to-orange-600",
      bgLight: "bg-orange-50 dark:bg-orange-900/20",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Packages",
      value: stats?.total_packages || 0,
      icon: Package,
      color: "text-brand-600",
      bgGradient: "bg-gradient-to-br from-brand-400 to-brand-600",
      bgLight: "bg-brand-50 dark:bg-brand-900/20",
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Pending Bookings",
      value: stats?.pending_bookings || 0,
      icon: Clock,
      color: "text-red-600",
      bgGradient: "bg-gradient-to-br from-red-400 to-red-600",
      bgLight: "bg-red-50 dark:bg-red-900/20",
      trend: "-3%",
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <div className={`w-14 h-14 ${stat.bgGradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">
                  {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                    stat.trendUp ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}>
                    {stat.trendUp ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs font-semibold ${
                      stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatsCards;
