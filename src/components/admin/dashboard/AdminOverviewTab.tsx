
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AdminStats {
  total_hotels?: number;
  total_packages?: number;
  total_users?: number;
}

interface AdminOverviewTabProps {
  stats: AdminStats | null;
}

const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
        <CardContent className="p-6 !bg-gradient-to-br from-orange-400 to-orange-600 rounded-[20px] text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">{stats?.total_hotels || 0}</h3>
            <p className="font-medium">Active Hotels</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
        <CardContent className="p-6 !bg-gradient-to-br from-green-400 to-green-600 rounded-[20px] text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">{stats?.total_packages || 0}</h3>
            <p className="font-medium">Active Packages</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px] hover:scale-105 transition-transform duration-300">
        <CardContent className="p-6 !bg-gradient-to-br from-blue-400 to-blue-600 rounded-[20px] text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">{stats?.total_users || 0}</h3>
            <p className="font-medium">Registered Users</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverviewTab;
