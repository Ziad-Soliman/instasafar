
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HotelManagement from "@/components/admin/HotelManagement";
import HotelsSearchBar from "@/components/admin/HotelsSearchBar";
import HotelsTable from "@/components/admin/HotelsTable";
import HotelEditDialog from "@/components/admin/HotelEditDialog";
import { useHotelManagement } from "@/hooks/useHotelManagement";

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

const AdminHotels: React.FC = () => {
  const { hotels, loading, fetchHotels, deleteHotel, updateHotel } = useHotelManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleEditHotel = (hotel: Hotel) => {
    console.log('Opening edit dialog for hotel:', hotel);
    setEditingHotel(hotel);
  };

  const handleUpdateHotel = async (hotel: Hotel) => {
    await updateHotel(hotel);
  };

  const handleCloseEditDialog = (open: boolean) => {
    if (!open) {
      setEditingHotel(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading hotels...</div>
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
            <h1 className="text-3xl font-bold">Hotels</h1>
            <p className="text-muted-foreground">Manage hotel listings</p>
            <p className="text-sm text-muted-foreground">
              Total hotels: {hotels.length}
            </p>
          </div>
          <HotelManagement onHotelAdded={fetchHotels} />
        </div>
        
        <HotelsSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onRefresh={fetchHotels}
        />
        
        <HotelsTable
          hotels={hotels}
          searchTerm={searchTerm}
          onEdit={handleEditHotel}
          onDelete={deleteHotel}
        />

        <HotelEditDialog
          hotel={editingHotel}
          open={!!editingHotel}
          onOpenChange={handleCloseEditDialog}
          onSave={handleUpdateHotel}
        />
      </motion.div>
    </div>
  );
};

export default AdminHotels;
