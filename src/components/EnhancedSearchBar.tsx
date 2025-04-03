
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, Users, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const EnhancedSearchBar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState("hotel");
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("makkah");
  const [guests, setGuests] = useState("2");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSearch = () => {
    // Handle search based on current tab
    switch (searchTab) {
      case "hotel":
        navigate(`/search?destination=${location}&checkin=${date ? format(date, "yyyy-MM-dd") : ''}`);
        break;
      case "flight":
        navigate(`/flights?destination=jeddah&departure=${date ? format(date, "yyyy-MM-dd") : ''}`);
        break;
      case "package":
        navigate(`/packages?type=umrah&date=${date ? format(date, "yyyy-MM-dd") : ''}`);
        break;
      case "transport":
        navigate(`/transport?from=jeddah&to=${location}`);
        break;
      default:
        navigate("/search");
    }
  };
  
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border p-4 md:p-6"
    >
      <Tabs defaultValue={searchTab} onValueChange={(value) => {
        setSearchTab(value);
        setIsExpanded(false);
      }} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="hotel" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Hotels</span>
          </TabsTrigger>
          <TabsTrigger value="package" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Packages</span>
          </TabsTrigger>
          <TabsTrigger value="flight" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Flights</span>
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Transport</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Initial search bar (collapsed state) */}
        {!isExpanded && (
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={
                searchTab === "hotel"
                  ? "Search for hotels in Makkah or Madinah..."
                  : searchTab === "package"
                  ? "Find Hajj or Umrah packages..."
                  : searchTab === "flight"
                  ? "Search for flights to Jeddah or Madinah..."
                  : "Find transport services..."
              }
              className="pl-10 pr-24 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
            />
            <Button 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        )}
        
        {/* Expanded search form */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <TabsContent value="hotel" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Destination</label>
                  <Select 
                    defaultValue={location} 
                    onValueChange={setLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Makkah</SelectItem>
                      <SelectItem value="madinah">Madinah</SelectItem>
                      <SelectItem value="both">Both Cities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Check-in Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Guests</label>
                  <Select 
                    defaultValue={guests} 
                    onValueChange={setGuests}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={handleSearch}>
                Search Hotels
              </Button>
            </TabsContent>
            
            <TabsContent value="package" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Package Type</label>
                  <Select defaultValue="umrah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hajj">Hajj Package</SelectItem>
                      <SelectItem value="umrah">Umrah Package</SelectItem>
                      <SelectItem value="custom">Custom Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Budget (per person)</label>
                  <Select defaultValue="1000-2000">
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<1000">Under $1,000</SelectItem>
                      <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                      <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                      <SelectItem value="3000+">$3,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={handleSearch}>
                Find Packages
              </Button>
            </TabsContent>
            
            <TabsContent value="flight" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Input placeholder="Departure City/Airport" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Select defaultValue="jeddah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jeddah">Jeddah (JED)</SelectItem>
                      <SelectItem value="madinah">Madinah (MED)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Departure Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={handleSearch}>
                Search Flights
              </Button>
            </TabsContent>
            
            <TabsContent value="transport" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Select defaultValue="jeddah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jeddah">Jeddah Airport</SelectItem>
                      <SelectItem value="makkah">Makkah City</SelectItem>
                      <SelectItem value="madinah">Madinah City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">To</label>
                  <Select defaultValue="makkah">
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="makkah">Makkah City</SelectItem>
                      <SelectItem value="madinah">Madinah City</SelectItem>
                      <SelectItem value="jeddah">Jeddah Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={handleSearch}>
                Find Transport
              </Button>
            </TabsContent>
          </motion.div>
        )}
      </Tabs>
    </motion.div>
  );
};

export default EnhancedSearchBar;
