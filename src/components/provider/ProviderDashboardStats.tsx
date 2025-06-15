
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, DollarSign, List } from 'lucide-react';
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
              {t('dashboard.fromLastMonth', 'from last month')}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProviderDashboardStats: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.totalBookings', 'Total Bookings'),
      value: '247',
      description: t('dashboard.totalBookingsDesc', 'Total number of bookings received'),
      icon: <BookOpen className="h-4 w-4" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: t('dashboard.pendingBookings', 'Pending Bookings'),
      value: '12',
      description: t('dashboard.pendingBookingsDesc', 'Bookings awaiting confirmation'),
      icon: <Clock className="h-4 w-4" />,
      trend: { value: 8, isPositive: false }
    },
    {
      title: t('dashboard.totalRevenue', 'Total Revenue'),
      value: '456,789 SAR',
      description: t('dashboard.totalRevenueDesc', 'Total revenue from all bookings'),
      icon: <DollarSign className="h-4 w-4" />,
      trend: { value: 15, isPositive: true }
    },
    {
      title: t('dashboard.activeListings', 'Active Listings'),
      value: '18',
      description: t('dashboard.activeListingsDesc', 'Your active hotel and package listings'),
      icon: <List className="h-4 w-4" />,
      trend: { value: 3, isPositive: true }
    }
  ];

  return (
    <RtlContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </RtlContainer>
  );
};

export default ProviderDashboardStats;
