
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Define booking type locally to avoid TypeScript issues
interface BookingDetails {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  listing_title: string;
  listing_type: 'hotel' | 'package';
  created_at: string;
}

const BookingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock booking data - replace with actual data fetching
  const booking: BookingDetails = {
    id: id || '1',
    guest_name: 'Ahmed Al-Rashid',
    guest_email: 'ahmed.rashid@email.com',
    guest_phone: '+966 50 123 4567',
    check_in_date: '2024-07-15',
    check_out_date: '2024-07-20',
    total_amount: 2500,
    status: 'confirmed',
    special_requests: 'Late check-in requested, vegetarian meals preferred',
    listing_title: 'Luxury Desert Resort Experience',
    listing_type: 'hotel',
    created_at: '2024-06-01T10:30:00Z'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">تفاصيل الحجز</h1>
          <p className="text-muted-foreground">رقم الحجز: {booking.id}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(booking.status)}
          <Badge variant={getStatusVariant(booking.status)}>
            {booking.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Guest Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              معلومات النزيل
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{booking.guest_name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{booking.guest_email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{booking.guest_phone}</span>
            </div>
          </CardContent>
        </Card>

        {/* Booking Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              تفاصيل الحجز
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>تاريخ الوصول: {formatDate(booking.check_in_date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>تاريخ المغادرة: {formatDate(booking.check_out_date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>تاريخ الحجز: {formatDate(booking.created_at)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Listing Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              معلومات الإقامة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">{booking.listing_title}</p>
              <p className="text-sm text-muted-foreground">
                نوع الخدمة: {booking.listing_type === 'hotel' ? 'فندق' : 'باقة سياحية'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              معلومات الدفع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>المبلغ الإجمالي:</span>
              <span className="font-bold text-lg">{formatCurrency(booking.total_amount)}</span>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              تم استلام الدفع بنجاح
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Requests */}
      {booking.special_requests && (
        <Card>
          <CardHeader>
            <CardTitle>طلبات خاصة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{booking.special_requests}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline">
          طباعة
        </Button>
        <Button variant="saudi">
          تحديث الحالة
        </Button>
      </div>
    </div>
  );
};

export default BookingDetailPage;
