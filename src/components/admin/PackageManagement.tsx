
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PackageFormData {
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
  city: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  thumbnail: string;
}

interface PackageManagementProps {
  onPackageAdded: () => void;
}

const PackageManagement: React.FC<PackageManagementProps> = ({ onPackageAdded }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    description: "",
    price: 0,
    duration_days: 1,
    start_date: "",
    end_date: "",
    city: "",
    includes_hotel: false,
    includes_flight: false,
    includes_transport: false,
    thumbnail: ""
  });

  const handleInputChange = (field: keyof PackageFormData, value: string | number | boolean) => {
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
        .from('packages')
        .insert({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          duration_days: formData.duration_days,
          start_date: formData.start_date || null,
          end_date: formData.end_date || null,
          city: formData.city,
          includes_hotel: formData.includes_hotel,
          includes_flight: formData.includes_flight,
          includes_transport: formData.includes_transport,
          thumbnail: formData.thumbnail || null
        })
        .select('id')
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Package added successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        duration_days: 1,
        start_date: "",
        end_date: "",
        city: "",
        includes_hotel: false,
        includes_flight: false,
        includes_transport: false,
        thumbnail: ""
      });

      setOpen(false);
      onPackageAdded();

    } catch (error) {
      console.error('Error adding package:', error);
      toast({
        title: "Error",
        description: "Failed to add package. Please try again.",
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
          <Plus className="w-4 h-4 mr-2" /> Add New Package
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Package Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
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
                  <SelectItem value="Madinah">Madinah</SelectItem>
                  <SelectItem value="Riyadh">Riyadh</SelectItem>
                  <SelectItem value="Jeddah">Jeddah</SelectItem>
                  <SelectItem value="Dammam">Dammam</SelectItem>
                  <SelectItem value="Taif">Taif</SelectItem>
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
              <Label htmlFor="duration_days">Duration (Days) *</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) => handleInputChange('duration_days', parseInt(e.target.value) || 1)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
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

          <div className="space-y-4">
            <Label>Package Includes</Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="includes_hotel"
                checked={formData.includes_hotel}
                onCheckedChange={(checked) => handleInputChange('includes_hotel', checked)}
              />
              <Label htmlFor="includes_hotel">Hotel Accommodation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="includes_flight"
                checked={formData.includes_flight}
                onCheckedChange={(checked) => handleInputChange('includes_flight', checked)}
              />
              <Label htmlFor="includes_flight">Flight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="includes_transport"
                checked={formData.includes_transport}
                onCheckedChange={(checked) => handleInputChange('includes_transport', checked)}
              />
              <Label htmlFor="includes_transport">Transport</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PackageManagement;
