
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Users, CreditCard, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface QuickBookingFormProps {
  itemType: 'hotel' | 'package' | 'flight' | 'transport';
  itemName: string;
  basePrice: number;
  onSubmit: (bookingData: any) => void;
  className?: string;
}

const QuickBookingForm: React.FC<QuickBookingFormProps> = ({
  itemType,
  itemName,
  basePrice,
  onSubmit,
  className
}) => {
  const { t } = useLanguage();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('standard');

  const roomTypes = [
    { value: 'standard', label: 'Standard Room', price: 0 },
    { value: 'deluxe', label: 'Deluxe Room', price: 200 },
    { value: 'suite', label: 'Suite', price: 500 }
  ];

  const calculateTotal = () => {
    const roomPriceAddon = roomTypes.find(r => r.value === selectedRoom)?.price || 0;
    const nights = checkInDate && checkOutDate ? 
      Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 1;
    return (basePrice + roomPriceAddon) * nights;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      itemType,
      itemName,
      checkInDate,
      checkOutDate,
      adults,
      children,
      selectedRoom,
      totalPrice: calculateTotal()
    });
  };

  return (
    <Card className={cn("sticky top-4", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Quick Booking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkInDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkOutDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date < (checkInDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Adults</Label>
              <Select value={adults.toString()} onValueChange={(v) => setAdults(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Children</Label>
              <Select value={children.toString()} onValueChange={(v) => setChildren(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Room Type */}
          {itemType === 'hotel' && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Room Type</Label>
              <div className="space-y-2">
                {roomTypes.map((room) => (
                  <div
                    key={room.value}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      selectedRoom === room.value ? "border-saudi-green bg-saudi-green/5" : "border-border hover:border-saudi-green/50"
                    )}
                    onClick={() => setSelectedRoom(room.value)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{room.label}</div>
                        {room.price > 0 && (
                          <div className="text-sm text-muted-foreground">
                            +SAR {room.price}/night
                          </div>
                        )}
                      </div>
                      {selectedRoom === room.value && (
                        <Badge variant="saudi">Selected</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Price Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Base price per night</span>
              <span>SAR {basePrice}</span>
            </div>
            {selectedRoom !== 'standard' && (
              <div className="flex justify-between text-sm">
                <span>Room upgrade</span>
                <span>+SAR {roomTypes.find(r => r.value === selectedRoom)?.price}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Nights</span>
              <span>{checkInDate && checkOutDate ? 
                Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) : 1}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-saudi-green">SAR {calculateTotal()}</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded-md">
            <Shield className="h-4 w-4" />
            <span>Secure booking with instant confirmation</span>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            variant="saudi"
            disabled={!checkInDate || !checkOutDate}
          >
            Book Now - SAR {calculateTotal()}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuickBookingForm;
