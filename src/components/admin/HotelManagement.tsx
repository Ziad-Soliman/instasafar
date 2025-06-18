
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface HotelFormData {
  name: string;
  city: string;
  address: string;
  description: string;
  distance_to_haram: string;
  rating: number;
  price_per_night: number;
  thumbnail: string;
  amenities: string[];
  provider_id?: string;
}

interface HotelManagementProps {
  onHotelAdded: () => void;
}

const HotelManagement: React.FC<HotelManagementProps> = ({ onHotelAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAmenity, setNewAmenity] = useState("");
  const [providers, setProviders] = useState<Array<{id: string, company_name: string}>>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    city: "",
    address: "",
    description: "",
    distance_to_haram: "",
    rating: 0,
    price_per_night: 0,
    thumbnail: "",
    amenities: [],
    provider_id: ""
  });

  // Fetch providers for admin assignment
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data, error } = await supabase
          .from('providers')
          .select('id, company_name')
          .order('company_name');
        
        if (error) throw error;
        console.log('Fetched providers:', data);
        setProviders(data || []);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    if (open) {
      fetchProviders();
    }
  }, [open]);

  const handleInputChange = (field: keyof HotelFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Hotel name is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.city.trim()) {
      toast({
        title: "Validation Error", 
        description: "City is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.address.trim()) {
      toast({
        title: "Validation Error",
        description: "Address is required.",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.price_per_night || formData.price_per_night <= 0) {
      toast({
        title: "Validation Error",
        description: "Valid price per night is required.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateProviderId = async (providerId: string | undefined): Promise<string | null> => {
    if (!providerId || providerId === "") {
      console.log('No provider ID specified, using null');
      return null;
    }

    try {
      console.log('Validating provider ID:', providerId);
      const { data, error } = await supabase
        .from('providers')
        .select('id')
        .eq('id', providerId)
        .single();

      if (error || !data) {
        console.log('Provider ID not found, using null instead');
        return null;
      }

      console.log('Provider ID validated successfully:', providerId);
      return providerId;
    } catch (error) {
      console.error('Error validating provider ID:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Validate and get the correct provider_id
      const validatedProviderId = await validateProviderId(formData.provider_id);
      
      // Prepare hotel data with validated provider_id
      const hotelInsertData = {
        name: formData.name.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        description: formData.description.trim() || null,
        distance_to_haram: formData.distance_to_haram.trim() || null,
        rating: formData.rating || 0,
        price_per_night: formData.price_per_night,
        thumbnail: formData.thumbnail.trim() || null,
        provider_id: validatedProviderId
      };

      console.log('Creating hotel with validated data:', hotelInsertData);

      // Create the hotel record
      const { data: createdHotel, error: hotelError } = await supabase
        .from('hotels')
        .insert(hotelInsertData)
        .select('id')
        .single();

      if (hotelError) {
        console.error('Hotel creation error:', hotelError);
        throw hotelError;
      }

      console.log('Hotel created successfully:', createdHotel);

      // Add amenities if any
      if (formData.amenities.length > 0 && createdHotel) {
        const amenitiesData = formData.amenities.map(amenity => ({
          hotel_id: createdHotel.id,
          name: amenity
        }));

        console.log('Adding amenities:', amenitiesData);
        const { error: amenitiesError } = await supabase
          .from('hotel_amenities')
          .insert(amenitiesData);

        if (amenitiesError) {
          console.error('Error adding amenities:', amenitiesError);
          // Don't fail the whole operation for amenities
        } else {
          console.log('Amenities added successfully');
        }
      }

      toast({
        title: "Success",
        description: "Hotel added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        city: "",
        address: "",
        description: "",
        distance_to_haram: "",
        rating: 0,
        price_per_night: 0,
        thumbnail: "",
        amenities: [],
        provider_id: ""
      });

      setOpen(false);
      onHotelAdded();

    } catch (error: any) {
      console.error('Error adding hotel:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add hotel. Please try again.",
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
          <Plus className="w-4 h-4 mr-2" /> Add New Hotel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Hotel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Hotel Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                placeholder="Enter hotel name"
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Makkah">Makkah</SelectItem>
                  <SelectItem value="Medina">Medina</SelectItem>
                  <SelectItem value="Riyadh">Riyadh</SelectItem>
                  <SelectItem value="Jeddah">Jeddah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
              placeholder="Enter hotel address"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              placeholder="Enter hotel description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="distance_to_haram">Distance to Haram</Label>
              <Input
                id="distance_to_haram"
                value={formData.distance_to_haram}
                onChange={(e) => handleInputChange('distance_to_haram', e.target.value)}
                placeholder="e.g., 0.5 km"
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating (0-5)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price_per_night">Price per Night (USD) *</Label>
              <Input
                id="price_per_night"
                type="number"
                min="0"
                step="0.01"
                value={formData.price_per_night}
                onChange={(e) => handleInputChange('price_per_night', parseFloat(e.target.value) || 0)}
                required
                placeholder="Enter price"
              />
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
          </div>

          <div>
            <Label htmlFor="provider_id">Assign to Provider (Optional)</Label>
            <Select 
              value={formData.provider_id} 
              onValueChange={(value) => handleInputChange('provider_id', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No specific provider</SelectItem>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.company_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              />
              <Button type="button" onClick={addAmenity} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeAmenity(amenity)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Hotel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HotelManagement;
