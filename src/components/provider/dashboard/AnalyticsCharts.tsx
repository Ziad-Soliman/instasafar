
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, LineChart, Line, Area, AreaChart 
} from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface MonthlyData {
  name: string;
  bookings: number;
  revenue: number;
}

interface AnalyticsChartsProps {
  monthlyData: MonthlyData[];
  formatCurrency: (amount: number) => string;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ monthlyData, formatCurrency }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg shadow-gray-100 dark:shadow-gray-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {t("dashboard.monthlyBookings", "Monthly Bookings")}
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                {t("dashboard.monthlyBookingsDesc", "Number of bookings per month")}
              </CardDescription>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <RechartsTooltip 
                  formatter={(value) => [value, t("dashboard.bookings", "Bookings")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar 
                  dataKey="bookings" 
                  fill="url(#bookingsGradient)" 
                  radius={[6, 6, 0, 0]}
                  name={t("dashboard.bookings", "Bookings")} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg shadow-gray-100 dark:shadow-gray-900/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                {t("dashboard.revenueTrend", "Revenue Trend")}
              </CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                {t("dashboard.revenueTrendDesc", "Monthly revenue in SAR")}
              </CardDescription>
            </div>
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <RechartsTooltip 
                  formatter={(value) => [formatCurrency(value as number), t("dashboard.revenue", "Revenue")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
