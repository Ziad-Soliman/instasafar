
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AdminStats {
  total_bookings?: number;
  pending_bookings?: number;
}

interface MonthlyData {
  name: string;
  bookings: number;
}

interface AdminChartsSectionProps {
  stats: AdminStats | null;
  monthlyData: MonthlyData[];
}

const AdminChartsSection: React.FC<AdminChartsSectionProps> = ({ 
  stats, 
  monthlyData 
}) => {
  const pieColors = ['#422AFB', '#7551FF'];
  
  const bookingsPieData = [
    { name: 'Paid Bookings', value: stats?.total_bookings ? stats.total_bookings - (stats.pending_bookings || 0) : 0 },
    { name: 'Pending Bookings', value: stats?.pending_bookings || 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 !bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
        <CardHeader className="!bg-gradient-to-br from-brand-400 to-brand-400 rounded-t-[20px] text-white">
          <CardTitle className="text-xl font-bold text-white">Monthly Bookings</CardTitle>
          <CardDescription className="text-white/80">Booking trends over time</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="adminBookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#422AFB" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#422AFB" stopOpacity={0.3}/>
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
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                  }}
                />
                <Bar 
                  dataKey="bookings" 
                  fill="url(#adminBookingsGradient)" 
                  radius={[8, 8, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="!bg-white dark:!bg-navy-800 shadow-xl shadow-shadow-500 dark:shadow-none border-0 rounded-[20px]">
        <CardHeader className="!bg-gradient-to-br from-brand-400 to-brand-400 rounded-t-[20px] text-white">
          <CardTitle className="text-xl font-bold text-white">Booking Status</CardTitle>
          <CardDescription className="text-white/80">Distribution overview</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="paidGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#422AFB" />
                    <stop offset="100%" stopColor="#422AFB" />
                  </linearGradient>
                  <linearGradient id="pendingGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7551FF" />
                    <stop offset="100%" stopColor="#7551FF" />
                  </linearGradient>
                </defs>
                <Pie
                  data={bookingsPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="url(#paidGradient)" />
                  <Cell fill="url(#pendingGradient)" />
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0px 18px 40px rgba(112, 144, 176, 0.12)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminChartsSection;
