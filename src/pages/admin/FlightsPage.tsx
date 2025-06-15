
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash, Plane } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import FlightManagement from "@/components/admin/FlightManagement";

interface Flight {
  id: string;
  airline_name: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  class: string;
  available_seats: number;
  total_seats: number;
  aircraft_type?: string;
}

const AdminFlights: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('flights')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFlights(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch flights.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleDeleteFlight = async (flightId: string) => {
    if (!confirm("Are you sure you want to delete this flight?")) return;
    
    try {
      const { error } = await supabase
        .from('flights')
        .delete()
        .eq('id', flightId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flight deleted successfully.",
      });

      fetchFlights();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete flight.",
        variant: "destructive",
      });
    }
  };

  const filteredFlights = flights.filter(flight =>
    flight.airline_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.flight_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading flights...</div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Flights</h1>
            <p className="text-muted-foreground">Manage flight listings</p>
          </div>
          <FlightManagement onFlightAdded={fetchFlights} />
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search flights..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">Flight</th>
                  <th className="text-left py-3 px-4 font-medium">Route</th>
                  <th className="text-left py-3 px-4 font-medium">Departure</th>
                  <th className="text-left py-3 px-4 font-medium">Arrival</th>
                  <th className="text-left py-3 px-4 font-medium">Class</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Seats</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFlights.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                      {searchTerm ? "No flights found matching your search." : "No flights found."}
                    </td>
                  </tr>
                ) : (
                  filteredFlights.map((flight) => (
                    <tr key={flight.id}>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{flight.airline_name}</div>
                          <div className="text-sm text-muted-foreground">{flight.flight_number}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span>{flight.origin}</span>
                          <Plane className="h-4 w-4 mx-2 text-muted-foreground" />
                          <span>{flight.destination}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{formatDateTime(flight.departure_time)}</td>
                      <td className="py-3 px-4 text-sm">{formatDateTime(flight.arrival_time)}</td>
                      <td className="py-3 px-4 capitalize">{flight.class}</td>
                      <td className="py-3 px-4">${Number(flight.price).toFixed(0)}</td>
                      <td className="py-3 px-4">{flight.available_seats || 0}/{flight.total_seats || 0}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteFlight(flight.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="py-4 px-6 bg-muted/50 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredFlights.length}</span> flights
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminFlights;
