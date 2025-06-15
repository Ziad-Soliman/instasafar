
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
      color: "text-blue-600 dark:text-blue-400",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Total Bookings", 
      value: stats?.total_bookings || 0,
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      bgGradient: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.total_revenue || 0)),
      icon: Wallet,
      color: "text-purple-600 dark:text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      trend: "+23%",
      trendUp: true
    },
    {
      title: "Hotels",
      value: stats?.total_hotels || 0,
      icon: Hotel,
      color: "text-orange-600 dark:text-orange-400",
      bgGradient: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Packages",
      value: stats?.total_packages || 0,
      icon: Package,
      color: "text-indigo-600 dark:text-indigo-400",
      bgGradient: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
      trend: "+15%",
      trendUp: true
    },
    {
      title: "Pending Bookings",
      value: stats?.pending_bookings || 0,
      icon: Clock,
      color: "text-red-600 dark:text-red-400",
      bgGradient: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      trend: "-3%",
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className={`${stat.bgGradient} p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <div className={`p-2 rounded-lg bg-white/50 dark:bg-black/20`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {stat.trendUp ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.trend}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">vs last month</span>
                  </div>
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
