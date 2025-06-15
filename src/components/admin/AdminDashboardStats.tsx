
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, Hotel, Package, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRtlLayout } from '@/utils/rtl-layout-helpers';
import RtlContainer from '@/components/layout/RtlContainer';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, description, icon, trend }) => {
  const { isRTL } = useRtlLayout();
  const { getFlexDirection, getTextAlign } = useRtlLayout();

  return (
    <Card>
      <CardHeader className={`${getFlexDirection('row')} items-center justify-between space-y-0 pb-2`}>
        <CardTitle className={`text-sm font-medium ${getTextAlign('left')}`}>
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getTextAlign('left')}`}>
          {value}
        </div>
        <p className={`text-xs text-muted-foreground ${getTextAlign('left')}`}>
          {description}
        </p>
        {trend && (
          <div className={`${getFlexDirection('row')} items-center ${isRTL ? 'justify-end' : 'justify-start'} mt-2`}>
            <span className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            <span className={`text-xs text-muted-foreground ${isRTL ? 'mr-1' : 'ml-1'}`}>
              from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AdminDashboardStats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('admin.totalUsers', 'Total Users'),
      value: '2,431',
      description: t('admin.totalUsersDesc', 'Active users on platform'),
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: t('admin.totalBookings', 'Total Bookings'),
      value: '1,234',
      description: t('admin.totalBookingsDesc', 'All time bookings'),
      icon: <BookOpen className="h-4 w-4" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: t('admin.totalRevenue', 'Total Revenue'),
      value: '2,456,789 SAR',
      description: t('admin.totalRevenueDesc', 'Total platform revenue'),
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: 15, isPositive: true }
    },
    {
      title: t('admin.totalHotels', 'Total Hotels'),
      value: '156',
      description: t('admin.totalHotelsDesc', 'Listed hotels'),
      icon: <Hotel className="h-4 w-4" />,
      trend: { value: 3, isPositive: true }
    },
    {
      title: t('admin.totalPackages', 'Total Packages'),
      value: '89',
      description: t('admin.totalPackagesDesc', 'Available packages'),
      icon: <Package className="h-4 w-4" />,
      trend: { value: 6, isPositive: true }
    },
    {
      title: t('admin.pendingBookings', 'Pending Bookings'),
      value: '23',
      description: t('admin.pendingBookingsDesc', 'Awaiting approval'),
      icon: <Clock className="h-4 w-4" />,
      trend: { value: 2, isPositive: false }
    }
  ];

  return (
    <RtlContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </RtlContainer>
  );
};

export default AdminDashboardStats;
