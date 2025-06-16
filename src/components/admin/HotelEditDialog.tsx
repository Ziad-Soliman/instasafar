
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Hotel {
  id: string;
  name: string;
  city: string;
  distance_to_haram: string | null;
  rating: number | null;
  price_per_night: number;
  provider_id?: string;
  address: string;
  description?: string | null;
  thumbnail?: string | null;
  created_at?: string;
  updated_at?: string;
  name_ar?: string | null;
  description_ar?: string | null;
  city_ar?: string | null;
  address_ar?: string | null;
}

interface HotelEditDialogProps {
  hotel: Hotel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (hotel: Hotel) => Promise<void>;
}

const HotelEditDialog: React.FC<HotelEditDialogProps> = ({ 
  hotel, 
  open, 
  onOpenChange, 
  onSave 
}) => {
  const [editFormData, setEditFormData] = useState<Hotel | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (hotel) {
      setEditFormData({ ...hotel });
    }
  }, [hotel]);

  const handleFormDataChange = (field: keyof Hotel, value: any) => {
    setEditFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSave = async () => {
    if (!editFormData) return;

    setUpdateLoading(true);
    try {
      await onSave(editFormData);
      onOpenChange(false);
      setEditFormData(null);
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setEditFormData(null);
  };

  if (!editFormData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Hotel: {editFormData.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Hotel Name *</Label>
              <Input
                id="edit-name"
                value={editFormData.name || ''}
                onChange={(e) => handleFormDataChange('name', e.target.value)}
                placeholder="Enter hotel name"
              />
            </div>
            <div>
              <Label htmlFor="edit-city">City *</Label>
              <Select 
                value={editFormData.city || ''} 
                onValueChange={(value) => handleFormDataChange('city', value)}
              >
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
            <Label htmlFor="edit-address">Address *</Label>
            <Input
              id="edit-address"
              value={editFormData.address || ''}
              onChange={(e) => handleFormDataChange('address', e.target.value)}
              placeholder="Enter hotel address"
            />
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editFormData.description || ''}
              onChange={(e) => handleFormDataChange('description', e.target.value)}
              rows={3}
              placeholder="Enter hotel description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-distance">Distance to Haram</Label>
              <Input
                id="edit-distance"
                value={editFormData.distance_to_haram || ''}
                onChange={(e) => handleFormDataChange('distance_to_haram', e.target.value)}
                placeholder="e.g., 0.5 km"
              />
            </div>
            <div>
              <Label htmlFor="edit-rating">Rating (0-5)</Label>
              <Input
                id="edit-rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={editFormData.rating || 0}
                onChange={(e) => handleFormDataChange('rating', e.target.value ? parseFloat(e.target.value) : 0)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-price">Price per Night (USD) *</Label>
              <Input
                id="edit-price"
                type="number"
                min="1"
                value={editFormData.price_per_night || 0}
                onChange={(e) => handleFormDataChange('price_per_night', e.target.value ? parseFloat(e.target.value) : 0)}
                placeholder="Enter price"
              />
            </div>
            <div>
              <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
              <Input
                id="edit-thumbnail"
                type="url"
                value={editFormData.thumbnail || ''}
                onChange={(e) => handleFormDataChange('thumbnail', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={updateLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={updateLoading || !editFormData?.name || !editFormData?.city || !editFormData?.address || !editFormData?.price_per_night}
            >
              {updateLoading ? "Updating..." : "Update Hotel"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HotelEditDialog;
