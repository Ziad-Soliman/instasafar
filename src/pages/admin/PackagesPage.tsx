
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PackageManagement from "@/components/admin/PackageManagement";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface Package {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_days: number;
  start_date?: string;
  end_date?: string;
  includes_hotel: boolean;
  includes_flight: boolean;
  includes_transport: boolean;
  city?: string;
  provider_id?: string;
  thumbnail?: string;
}

const AdminPackages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [editFormData, setEditFormData] = useState<Package | null>(null);
  const { toast } = useToast();

  const fetchPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPackages(data || []);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch packages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDeletePackage = async (packageId: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Package deleted successfully.",
      });
      
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: "Error",
        description: "Failed to delete package. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setEditFormData(pkg);
  };

  const handleUpdatePackage = async () => {
    if (!editFormData) return;

    try {
      const { error } = await supabase
        .from('packages')
        .update({
          name: editFormData.name,
          description: editFormData.description,
          price: editFormData.price,
          duration_days: editFormData.duration_days,
          start_date: editFormData.start_date || null,
          end_date: editFormData.end_date || null,
          city: editFormData.city,
          includes_hotel: editFormData.includes_hotel,
          includes_flight: editFormData.includes_flight,
          includes_transport: editFormData.includes_transport,
          thumbnail: editFormData.thumbnail || null
        })
        .eq('id', editFormData.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Package updated successfully.",
      });

      setEditingPackage(null);
      setEditFormData(null);
      fetchPackages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pkg.city && pkg.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading packages...</div>
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
            <h1 className="text-3xl font-bold">Packages</h1>
            <p className="text-muted-foreground">Manage your travel packages</p>
          </div>
          <PackageManagement onPackageAdded={fetchPackages} />
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search packages..." 
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
        
        <div className="space-y-4">
          {filteredPackages.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {searchTerm ? "No packages found matching your search." : "No packages found."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      </div>
                      <p className="text-muted-foreground mt-1">{pkg.description || 'No description available'}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                            <div className="text-sm">{pkg.duration_days} days</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <div className="text-xs text-muted-foreground">Location</div>
                            <div className="text-sm">{pkg.city || 'Not specified'}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Travel Dates</div>
                          <div className="text-sm">
                            {formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-xl font-bold">${Number(pkg.price).toFixed(0)}</div>
                      <div className="text-sm text-muted-foreground mb-4">per person</div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPackage(pkg)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeletePackage(pkg.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.includes_hotel && (
                      <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                        Hotel
                      </div>
                    )}
                    {pkg.includes_flight && (
                      <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                        Flight
                      </div>
                    )}
                    {pkg.includes_transport && (
                      <div className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-xs">
                        Transport
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{filteredPackages.length}</span> packages
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>

        {/* Edit Package Dialog */}
        <Dialog open={!!editingPackage} onOpenChange={() => setEditingPackage(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Package</DialogTitle>
            </DialogHeader>
            {editFormData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Package Name</Label>
                    <Input
                      id="edit-name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-city">City</Label>
                    <Select 
                      value={editFormData.city || ''} 
                      onValueChange={(value) => setEditFormData({...editFormData, city: value})}
                    >
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
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-price">Price (USD)</Label>
                    <Input
                      id="edit-price"
                      type="number"
                      min="0"
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({...editFormData, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-duration">Duration (Days)</Label>
                    <Input
                      id="edit-duration"
                      type="number"
                      min="1"
                      value={editFormData.duration_days}
                      onChange={(e) => setEditFormData({...editFormData, duration_days: parseInt(e.target.value) || 1})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-start-date">Start Date</Label>
                    <Input
                      id="edit-start-date"
                      type="date"
                      value={editFormData.start_date || ''}
                      onChange={(e) => setEditFormData({...editFormData, start_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-end-date">End Date</Label>
                    <Input
                      id="edit-end-date"
                      type="date"
                      value={editFormData.end_date || ''}
                      onChange={(e) => setEditFormData({...editFormData, end_date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="edit-thumbnail"
                    type="url"
                    value={editFormData.thumbnail || ''}
                    onChange={(e) => setEditFormData({...editFormData, thumbnail: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-4">
                  <Label>Package Includes</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-includes-hotel"
                      checked={editFormData.includes_hotel}
                      onCheckedChange={(checked) => setEditFormData({...editFormData, includes_hotel: checked})}
                    />
                    <Label htmlFor="edit-includes-hotel">Hotel Accommodation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-includes-flight"
                      checked={editFormData.includes_flight}
                      onCheckedChange={(checked) => setEditFormData({...editFormData, includes_flight: checked})}
                    />
                    <Label htmlFor="edit-includes-flight">Flight</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-includes-transport"
                      checked={editFormData.includes_transport}
                      onCheckedChange={(checked) => setEditFormData({...editFormData, includes_transport: checked})}
                    />
                    <Label htmlFor="edit-includes-transport">Transport</Label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingPackage(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdatePackage}>
                    Update Package
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default AdminPackages;
