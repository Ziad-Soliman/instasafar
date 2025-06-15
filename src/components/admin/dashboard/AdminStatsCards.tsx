
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
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Bookings",
      value: stats?.total_bookings || 0,
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Revenue",
      value: formatCurrency(Number(stats?.total_revenue || 0)),
      icon: Wallet,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      title: "Hotels",
      value: stats?.total_hotels || 0,
      icon: Hotel,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      title: "Packages",
      value: stats?.total_packages || 0,
      icon: Package,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Pending Bookings",
      value: stats?.pending_bookings || 0,
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStatsCards;
