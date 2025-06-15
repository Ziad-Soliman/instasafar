
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TransportFormData {
  name: string;
  description: string;
  type: string;
  from_city: string;
  to_city: string;
  price: number;
  duration_hours: number;
  departure_time: string;
  arrival_time: string;
  capacity: number;
  available_seats: number;
  thumbnail: string;
}

interface TransportManagementProps {
  onTransportAdded: () => void;
}

const TransportManagement: React.FC<TransportManagementProps> = ({ onTransportAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<TransportFormData>({
    name: "",
    description: "",
    type: "",
    from_city: "",
    to_city: "",
    price: 0,
    duration_hours: 0,
    departure_time: "",
    arrival_time: "",
    capacity: 0,
    available_seats: 0,
    thumbnail: ""
  });

  const cities = ["Makkah", "Madinah", "Riyadh", "Jeddah", "Dammam", "Taif"];
  const transportTypes = ["Bus", "Car", "Van", "Train", "Shuttle"];

  const handleInputChange = (field: keyof TransportFormData, value: string | number) => {
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
        .from('transport_options')
        .insert({
          name: formData.name,
          description: formData.description || null,
          type: formData.type,
          from_city: formData.from_city,
          to_city: formData.to_city,
          price: formData.price,
          duration_hours: formData.duration_hours || null,
          departure_time: formData.departure_time || null,
          arrival_time: formData.arrival_time || null,
          capacity: formData.capacity || null,
          available_seats: formData.available_seats || null,
          thumbnail: formData.thumbnail || null
        })
        .select('id')
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport option added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        type: "",
        from_city: "",
        to_city: "",
        price: 0,
        duration_hours: 0,
        departure_time: "",
        arrival_time: "",
        capacity: 0,
        available_seats: 0,
        thumbnail: ""
      });

      setOpen(false);
      onTransportAdded();

    } catch (error) {
      console.error('Error adding transport:', error);
      toast({
        title: "Error",
        description: "Failed to add transport option. Please try again.",
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
          <Plus className="w-4 h-4 mr-2" /> Add New Transport
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Transport Option</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Transport Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {transportTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from_city">From City *</Label>
              <Select value={formData.from_city} onValueChange={(value) => handleInputChange('from_city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select from city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="to_city">To City *</Label>
              <Select value={formData.to_city} onValueChange={(value) => handleInputChange('to_city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select to city" />
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
              <Label htmlFor="duration_hours">Duration (Hours)</Label>
              <Input
                id="duration_hours"
                type="number"
                min="0"
                step="0.5"
                value={formData.duration_hours}
                onChange={(e) => handleInputChange('duration_hours', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="departure_time">Departure Time</Label>
              <Input
                id="departure_time"
                type="time"
                value={formData.departure_time}
                onChange={(e) => handleInputChange('departure_time', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="arrival_time">Arrival Time</Label>
              <Input
                id="arrival_time"
                type="time"
                value={formData.arrival_time}
                onChange={(e) => handleInputChange('arrival_time', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="0"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
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
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              type="url"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange('thumbnail', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Transport"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransportManagement;
