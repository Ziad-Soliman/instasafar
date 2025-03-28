
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Users, MapPin, Plane, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

// Types
type SearchType = "hotel" | "package" | "flight" | "transport";
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
  
  // Flight search specific states
  const [origin, setOrigin] = useState("");
  const [flightDate, setFlightDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  );
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  
  // Transport search specific states
  const [transportType, setTransportType] = useState("airport_transfer");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  // Handle search submission
  const handleSearch = () => {
    switch (searchType) {
      case "hotel":
      case "package":
        // Construct search query for hotels/packages
        const params = new URLSearchParams();
        params.append("type", searchType);
        if (destination) params.append("destination", destination);
        if (checkIn) params.append("checkIn", checkIn.toISOString());
        if (checkOut) params.append("checkOut", checkOut.toISOString());
        params.append("guests", guests.toString());
        
        // Navigate to search page with query params
        navigate(`/search?${params.toString()}`);
        break;
        
      case "flight":
        // Construct search query for flights
        const flightParams = new URLSearchParams();
        if (origin) flightParams.append("origin", origin);
        if (destination) flightParams.append("destination", destination);
        if (flightDate) flightParams.append("departureDate", flightDate.toISOString());
        if (isRoundTrip && returnDate) flightParams.append("returnDate", returnDate.toISOString());
        flightParams.append("passengers", guests.toString());
        flightParams.append("tripType", isRoundTrip ? "roundtrip" : "oneway");
        
        // Navigate to flight search page with query params
        navigate(`/flights?${flightParams.toString()}`);
        break;
        
      case "transport":
        // Construct search query for transport
        const transportParams = new URLSearchParams();
        transportParams.append("type", transportType);
        if (pickupLocation) transportParams.append("pickup", pickupLocation);
        if (dropoffLocation) transportParams.append("dropoff", dropoffLocation);
        if (checkIn) transportParams.append("date", checkIn.toISOString());
        transportParams.append("passengers", guests.toString());
        
        // Navigate to transport search page with query params
        navigate(`/transport?${transportParams.toString()}`);
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm">
      <Tabs
        defaultValue="hotel"
        value={searchType}
        onValueChange={(value) => setSearchType(value as SearchType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 h-12 rounded-t-lg rounded-b-none">
          <TabsTrigger 
            value="hotel" 
            className="rounded-tl-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Hotels
          </TabsTrigger>
          <TabsTrigger 
            value="package" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Packages
          </TabsTrigger>
          <TabsTrigger 
            value="flight" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
          >
            <Plane className="mr-2 h-4 w-4" />
            Flights
          </TabsTrigger>
          <TabsTrigger 
            value="transport" 
            className="rounded-tr-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900"
          >
            <Car className="mr-2 h-4 w-4" />
            Transport
          </TabsTrigger>
        </TabsList>

        <div className="p-4">
          {/* Hotel & Package Search Fields */}
          {(searchType === "hotel" || searchType === "package") && (
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
          )}
          
          {/* Flight Search Fields */}
          {searchType === "flight" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="origin" className="text-sm font-medium">
                  From
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <select
                    id="origin"
                    className="w-full pl-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="">Select origin</option>
                    <option value="JED">Jeddah (JED)</option>
                    <option value="RUH">Riyadh (RUH)</option>
                    <option value="LHR">London (LHR)</option>
                    <option value="IST">Istanbul (IST)</option>
                    <option value="DXB">Dubai (DXB)</option>
                    <option value="CAI">Cairo (CAI)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="flightDestination" className="text-sm font-medium">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <select
                    id="flightDestination"
                    className="w-full pl-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value as Destination)}
                  >
                    <option value="">Select destination</option>
                    <option value="makkah">Makkah</option>
                    <option value="madinah">Madinah</option>
                    <option value="JED">Jeddah (JED)</option>
                    <option value="RUH">Riyadh (RUH)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="tripType" className="text-sm font-medium">
                    Trip Type
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      id="roundTrip"
                      checked={isRoundTrip}
                      onChange={(e) => setIsRoundTrip(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="roundTrip" className="text-xs">
                      Round Trip
                    </label>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {flightDate ? (
                        <span>
                          {format(flightDate, "MMM d")}
                          {isRoundTrip && returnDate ? ` - ${format(returnDate, "MMM d, yyyy")}` : ""}
                        </span>
                      ) : (
                        <span>Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex flex-col sm:flex-row p-2 gap-2">
                      <div>
                        <p className="text-sm mb-2 font-medium">Departure</p>
                        <CalendarComponent
                          mode="single"
                          selected={flightDate}
                          onSelect={setFlightDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className="p-3 pointer-events-auto"
                        />
                      </div>
                      {isRoundTrip && (
                        <div>
                          <p className="text-sm mb-2 font-medium">Return</p>
                          <CalendarComponent
                            mode="single"
                            selected={returnDate}
                            onSelect={setReturnDate}
                            initialFocus
                            disabled={(date) => date < (flightDate || new Date())}
                            className="p-3 pointer-events-auto"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-2 border-t">
                      <Button 
                        className="w-full"
                      >
                        Done
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="flightGuests" className="text-sm font-medium">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="flightGuests"
                    type="number"
                    min="1"
                    max="10"
                    className="pl-10"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-end">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </div>
            </div>
          )}
          
          {/* Transport Search Fields */}
          {searchType === "transport" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label htmlFor="transportType" className="text-sm font-medium">
                  Service Type
                </label>
                <select
                  id="transportType"
                  className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  value={transportType}
                  onChange={(e) => setTransportType(e.target.value)}
                >
                  <option value="airport_transfer">Airport Transfer</option>
                  <option value="intercity">Intercity Bus/Car</option>
                  <option value="ziyarat_tour">Ziyarat Tour</option>
                  <option value="private_car">Private Car</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="pickupLocation" className="text-sm font-medium">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <select
                    id="pickupLocation"
                    className="w-full pl-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  >
                    <option value="">Select pickup location</option>
                    <option value="JED_Airport">Jeddah Airport</option>
                    <option value="MED_Airport">Madinah Airport</option>
                    <option value="Makkah_Hotels">Makkah Hotels</option>
                    <option value="Madinah_Hotels">Madinah Hotels</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dropoffLocation" className="text-sm font-medium">
                  Dropoff Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <select
                    id="dropoffLocation"
                    className="w-full pl-10 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                  >
                    <option value="">Select dropoff location</option>
                    <option value="JED_Airport">Jeddah Airport</option>
                    <option value="MED_Airport">Madinah Airport</option>
                    <option value="Makkah_Hotels">Makkah Hotels</option>
                    <option value="Madinah_Hotels">Madinah Hotels</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="transportDate" className="text-sm font-medium">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn ? (
                        <span>{format(checkIn, "MMM d, yyyy")}</span>
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-2">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className="p-3 pointer-events-auto"
                      />
                    </div>
                    <div className="p-2 border-t">
                      <Button className="w-full">
                        Done
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="lg:col-span-2 flex items-end">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search Transport
                </Button>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
