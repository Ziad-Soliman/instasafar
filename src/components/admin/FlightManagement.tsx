
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FlightFormData {
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
  aircraft_type: string;
}

interface FlightManagementProps {
  onFlightAdded: () => void;
}

const FlightManagement: React.FC<FlightManagementProps> = ({ onFlightAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FlightFormData>({
    airline_name: "",
    flight_number: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    price: 0,
    class: "economy",
    available_seats: 0,
    total_seats: 0,
    aircraft_type: ""
  });

  const cities = [
    "Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Taif", 
    "Dubai", "Doha", "Kuwait City", "Cairo", "Istanbul"
  ];

  const handleInputChange = (field: keyof FlightFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('flights')
        .insert({
          airline_name: formData.airline_name,
          flight_number: formData.flight_number,
          origin: formData.origin,
          destination: formData.destination,
          departure_time: formData.departure_time,
          arrival_time: formData.arrival_time,
          price: formData.price,
          class: formData.class,
          available_seats: formData.available_seats,
          total_seats: formData.total_seats,
          aircraft_type: formData.aircraft_type || null
        })
        .select('id')
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Flight added successfully!",
      });

      // Reset form
      setFormData({
        airline_name: "",
        flight_number: "",
        origin: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        price: 0,
        class: "economy",
        available_seats: 0,
        total_seats: 0,
        aircraft_type: ""
      });

      setOpen(false);
      onFlightAdded();

    } catch (error) {
      console.error('Error adding flight:', error);
      toast({
        title: "Error",
        description: "Failed to add flight. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add New Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Flight</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="airline_name">Airline Name *</Label>
              <Input
                id="airline_name"
                value={formData.airline_name}
                onChange={(e) => handleInputChange('airline_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="flight_number">Flight Number *</Label>
              <Input
                id="flight_number"
                value={formData.flight_number}
                onChange={(e) => handleInputChange('flight_number', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Origin *</Label>
              <Select value={formData.origin} onValueChange={(value) => handleInputChange('origin', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure_time">Departure Time *</Label>
              <Input
                id="departure_time"
                type="datetime-local"
                value={formData.departure_time}
                onChange={(e) => handleInputChange('departure_time', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="arrival_time">Arrival Time *</Label>
              <Input
                id="arrival_time"
                type="datetime-local"
                value={formData.arrival_time}
                onChange={(e) => handleInputChange('arrival_time', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (USD) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="total_seats">Total Seats</Label>
              <Input
                id="total_seats"
                type="number"
                min="0"
                value={formData.total_seats}
                onChange={(e) => handleInputChange('total_seats', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="available_seats">Available Seats</Label>
              <Input
                id="available_seats"
                type="number"
                min="0"
                value={formData.available_seats}
                onChange={(e) => handleInputChange('available_seats', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label htmlFor="aircraft_type">Aircraft Type</Label>
              <Input
                id="aircraft_type"
                value={formData.aircraft_type}
                onChange={(e) => handleInputChange('aircraft_type', e.target.value)}
                placeholder="e.g., Boeing 737"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Flight"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlightManagement;
