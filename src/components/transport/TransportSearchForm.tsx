
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Search } from "lucide-react";

interface TransportSearchFormProps {
  fromCity: string;
  setFromCity: (city: string) => void;
  toCity: string;
  setToCity: (city: string) => void;
  travelDate: Date | undefined;
  setTravelDate: (date: Date | undefined) => void;
  passengers: number;
  setPassengers: (passengers: number) => void;
  transportType: string;
  setTransportType: (type: string) => void;
  onSearch: () => void;
}

const TransportSearchForm: React.FC<TransportSearchFormProps> = ({
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  travelDate,
  setTravelDate,
  passengers,
  setPassengers,
  transportType,
  setTransportType,
  onSearch,
}) => {
  const { t, language } = useLanguage();

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="from">{t("transport.from", "From")}</Label>
            <Select defaultValue={fromCity} onValueChange={setFromCity}>
              <SelectTrigger id="from">
                <SelectValue placeholder={t("home.search.destinationPlaceholder", "Select city")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Makkah">{language === 'ar' ? 'مكة المكرمة' : 'Makkah'}</SelectItem>
                <SelectItem value="Madinah">{language === 'ar' ? 'المدينة المنورة' : 'Madinah'}</SelectItem>
                <SelectItem value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</SelectItem>
                <SelectItem value="Riyadh">{language === 'ar' ? 'الرياض' : 'Riyadh'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="to">{t("transport.to", "To")}</Label>
            <Select defaultValue={toCity} onValueChange={setToCity}>
              <SelectTrigger id="to">
                <SelectValue placeholder={t("home.search.destinationPlaceholder", "Select city")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Makkah">{language === 'ar' ? 'مكة المكرمة' : 'Makkah'}</SelectItem>
                <SelectItem value="Madinah">{language === 'ar' ? 'المدينة المنورة' : 'Madinah'}</SelectItem>
                <SelectItem value="Jeddah">{language === 'ar' ? 'جدة' : 'Jeddah'}</SelectItem>
                <SelectItem value="Riyadh">{language === 'ar' ? 'الرياض' : 'Riyadh'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="travel-date">{t("home.search.departureDate", "Travel Date")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !travelDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {travelDate ? format(travelDate, "PPP") : <span>{t("home.search.departurePlaceholder", "Pick a date")}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={travelDate}
                  onSelect={setTravelDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="passengers">{t("common.passengers", "Passengers")}</Label>
            <Select defaultValue={passengers.toString()} onValueChange={(val) => setPassengers(parseInt(val))}>
              <SelectTrigger id="passengers">
                <SelectValue placeholder={t("common.passengers", "Select passengers")} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 6, 8, 10, 15, 20].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? t("common.passenger", "passenger") : t("common.passengers", "passengers")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-4">
          <Label>{t("transport.type", "Transport Type")}</Label>
          <RadioGroup 
            defaultValue={transportType} 
            onValueChange={setTransportType}
            className="flex mt-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-transport" />
              <Label htmlFor="all-transport">{t("transport.allTypes", "All Types")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intercity" id="bus" />
              <Label htmlFor="bus">{t("transport.intercity", "Bus")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="airport_transfer" id="shuttle" />
              <Label htmlFor="shuttle">{t("transport.airportTransfer", "Airport Transfer")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private_car" id="car" />
              <Label htmlFor="car">{t("transport.privateCar", "Private Car")}</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onSearch} className="px-8">
            <Search className="mr-2 h-4 w-4" /> {t("search.searchButton", "Search Transport")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportSearchForm;
