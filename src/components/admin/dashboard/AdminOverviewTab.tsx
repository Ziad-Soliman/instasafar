
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Package, Users, TrendingUp } from "lucide-react";

interface AdminStats {
  total_hotels?: number;
  total_packages?: number;
  total_users?: number;
}

interface AdminOverviewTabProps {
  stats: AdminStats | null;
}

const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ stats }) => {
  const overviewCards = [
    {
      title: "Active Hotels",
      value: stats?.total_hotels || 0,
      icon: Hotel,
      gradient: "bg-gradient-to-br from-orange-400 to-orange-600",
      description: "Hotels currently listed"
    },
    {
      title: "Active Packages",
      value: stats?.total_packages || 0,
      icon: Package,
      gradient: "bg-gradient-to-br from-green-400 to-green-600",
      description: "Package deals available"
    },
    {
      title: "Registered Users",
      value: stats?.total_users || 0,
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
      description: "Total platform users"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {overviewCards.map((card, index) => (
        <Card key={index} className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] overflow-hidden hover:scale-105 transition-transform duration-300">
          <CardContent className="p-0">
            <div className={`${card.gradient} p-6 text-white relative overflow-hidden`}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <card.icon className="h-7 w-7 text-white" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-white/80" />
                </div>
                
                <h3 className="text-3xl font-bold mb-2">
                  {card.value.toLocaleString()}
                </h3>
                <p className="text-white/90 font-medium text-lg mb-1">{card.title}</p>
                <p className="text-white/70 text-sm">{card.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminOverviewTab;
