
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, LineChart, Line 
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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("dashboard.monthlyBookings", "Monthly Bookings")}</CardTitle>
          <CardDescription>{t("dashboard.monthlyBookingsDesc", "Number of bookings per month")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value) => [value, t("dashboard.bookings", "Bookings")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                />
                <Bar dataKey="bookings" fill="#3b82f6" name={t("dashboard.bookings", "Bookings")} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("dashboard.revenueTrend", "Revenue Trend")}</CardTitle>
          <CardDescription>{t("dashboard.revenueTrendDesc", "Monthly revenue in SAR")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value) => [formatCurrency(value as number), t("dashboard.revenue", "Revenue")]} 
                  labelFormatter={(label) => t(`months.${label.toLowerCase()}`, label)}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
