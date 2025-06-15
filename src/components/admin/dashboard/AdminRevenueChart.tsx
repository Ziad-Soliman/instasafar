
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, DollarSign } from "lucide-react";

interface MonthlyData {
  name: string;
  revenue: number;
}

interface AdminRevenueChartProps {
  monthlyData: MonthlyData[];
  formatCurrency: (amount: number) => string;
}

const AdminRevenueChart: React.FC<AdminRevenueChartProps> = ({ 
  monthlyData, 
  formatCurrency 
}) => {
  const totalRevenue = monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / monthlyData.length;

  return (
    <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
      <CardHeader className="border-b border-gray-200 dark:border-navy-600 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-navy-700 dark:text-white flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-green-500" />
              Revenue Analytics
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
              Monthly revenue performance and trends
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
            <div className="text-2xl font-bold text-navy-700 dark:text-white">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="flex items-center text-green-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12.5% from last period
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#422AFB" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#422AFB" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                className="text-xs"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                className="text-xs"
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), "Revenue"]} 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)',
                  fontWeight: '500'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#422AFB" 
                strokeWidth={3}
                fill="url(#revenueGradient)"
                dot={{ fill: '#422AFB', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 8, stroke: '#422AFB', strokeWidth: 2, fill: '#ffffff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-navy-600">
          <div className="text-center p-4 bg-gray-50 dark:bg-navy-700 rounded-2xl">
            <div className="text-2xl font-bold text-navy-700 dark:text-white">
              {formatCurrency(avgRevenue)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Monthly</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-navy-700 rounded-2xl">
            <div className="text-2xl font-bold text-green-600">
              +24.5%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-navy-700 rounded-2xl">
            <div className="text-2xl font-bold text-brand-600">
              {monthlyData.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Periods Tracked</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRevenueChart;
