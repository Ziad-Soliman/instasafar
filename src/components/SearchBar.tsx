
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

// Types
type SearchType = "hotel" | "package";
type Destination = "makkah" | "madinah" | "";

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>("hotel");
  const [destination, setDestination] = useState<Destination>("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  );
  const [guests, setGuests] = useState(2);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Handle search submission
  const handleSearch = () => {
    // Construct search query
    const params = new URLSearchParams();
    params.append("type", searchType);
    if (destination) params.append("destination", destination);
    if (checkIn) params.append("checkIn", checkIn.toISOString());
    if (checkOut) params.append("checkOut", checkOut.toISOString());
    params.append("guests", guests.toString());

    // Navigate to search page with query params
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm">
      <Tabs
        defaultValue="hotel"
        onValueChange={(value) => setSearchType(value as SearchType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 h-12 rounded-t-lg rounded-b-none">
          <TabsTrigger value="hotel" className="rounded-tl-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
            <Search className="mr-2 h-4 w-4" />
            Hotels
          </TabsTrigger>
          <TabsTrigger value="package" className="rounded-tr-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
            <Calendar className="mr-2 h-4 w-4" />
            Packages
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="space-y-2">
              <label htmlFor="destination" className="text-sm font-medium">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select
                  id="destination"
                  className="w-full pl-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value as Destination)}
                >
                  <option value="">Select city</option>
                  <option value="makkah">Makkah</option>
                  <option value="madinah">Madinah</option>
                </select>
              </div>
            </div>

            {/* Check-in / Check-out dates */}
            <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">
                Dates
              </label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {checkIn && checkOut ? (
                      <span>
                        {format(checkIn, "MMM d")} - {format(checkOut, "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span>Select dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="flex flex-col sm:flex-row p-2 gap-2">
                    <div>
                      <p className="text-sm mb-2 font-medium">Check-in</p>
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </div>
                    <div>
                      <p className="text-sm mb-2 font-medium">Check-out</p>
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        disabled={(date) => date < (checkIn || new Date())}
                        className="p-3 pointer-events-auto"
                      />
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <Button 
                      className="w-full" 
                      onClick={() => setCalendarOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label htmlFor="guests" className="text-sm font-medium">
                Guests
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  className="pl-10"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <Button
                className="w-full"
                size="lg"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
