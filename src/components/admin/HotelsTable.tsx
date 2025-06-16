
import React from "react";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash } from "lucide-react";

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

interface HotelsTableProps {
  hotels: Hotel[];
  searchTerm: string;
  onEdit: (hotel: Hotel) => void;
  onDelete: (hotelId: string) => void;
}

const HotelsTable: React.FC<HotelsTableProps> = ({ 
  hotels, 
  searchTerm, 
  onEdit, 
  onDelete 
}) => {
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left py-3 px-4 font-medium">Hotel Name</th>
              <th className="text-left py-3 px-4 font-medium">City</th>
              <th className="text-left py-3 px-4 font-medium">Distance to Haram</th>
              <th className="text-left py-3 px-4 font-medium">Rating</th>
              <th className="text-left py-3 px-4 font-medium">Price/Night</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredHotels.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  {searchTerm ? "No hotels found matching your search." : "No hotels found."}
                </td>
              </tr>
            ) : (
              filteredHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="py-3 px-4">
                    <div className="font-medium">{hotel.name}</div>
                    <div className="text-xs text-muted-foreground">ID: {hotel.id}</div>
                  </td>
                  <td className="py-3 px-4">{hotel.city}</td>
                  <td className="py-3 px-4">{hotel.distance_to_haram || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>{Number(hotel.rating ?? 0).toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">${Number(hotel.price_per_night).toFixed(0)}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit(hotel)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(hotel.id)}
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
          Showing <span className="font-medium">{filteredHotels.length}</span> of <span className="font-medium">{hotels.length}</span> hotels
        </div>
      </div>
    </div>
  );
};

export default HotelsTable;
