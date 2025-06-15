
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  return (
    <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
      <CardHeader className="!bg-gradient-to-br from-green-400 to-green-600 rounded-t-[20px] text-white">
        <CardTitle className="text-xl font-bold text-white">Revenue Trends</CardTitle>
        <CardDescription className="text-white/80">Monthly performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), "Revenue"]} 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={4}
                dot={{ fill: '#10B981', strokeWidth: 3, r: 6 }}
                activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2, fill: '#ffffff' }}
                fill="url(#revenueAreaGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRevenueChart;
