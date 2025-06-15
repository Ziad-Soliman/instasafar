
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, Wallet, Hotel, Package, Clock } from "lucide-react";

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
      color: "text-brand-600",
      bgColor: "bg-brand-50",
      borderColor: "border-brand-200",
      percentage: "+2.45%",
      trend: "up"
    },
    {
      title: "Total Bookings",
      value: stats?.total_bookings || 0,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      percentage: "+12.5%",
      trend: "up"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.total_revenue || 0)),
      icon: Wallet,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      percentage: "+8.2%",
      trend: "up"
    },
    {
      title: "Hotels",
      value: stats?.total_hotels || 0,
      icon: Hotel,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      percentage: "+1.8%",
      trend: "up"
    },
    {
      title: "Packages",
      value: stats?.total_packages || 0,
      icon: Package,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      percentage: "+5.4%",
      trend: "up"
    },
    {
      title: "Pending Bookings",
      value: stats?.pending_bookings || 0,
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      percentage: "-2.1%",
      trend: "down"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg shadow-gray-100 dark:shadow-gray-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </h3>
                <div className="flex items-center">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-green-800 bg-green-100' 
                      : 'text-red-800 bg-red-100'
                  }`}>
                    {stat.percentage}
                  </span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bgColor} ${stat.borderColor} border`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            
            {/* Gradient background effect */}
            <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${
              stat.color.includes('brand') ? 'from-brand-500 to-brand-600' :
              stat.color.includes('green') ? 'from-green-500 to-green-600' :
              stat.color.includes('purple') ? 'from-purple-500 to-purple-600' :
              stat.color.includes('orange') ? 'from-orange-500 to-orange-600' :
              stat.color.includes('indigo') ? 'from-indigo-500 to-indigo-600' :
              'from-red-500 to-red-600'
            }`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatsCards;
