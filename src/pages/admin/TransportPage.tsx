
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TransportManagement from "@/components/admin/TransportManagement";

interface Transport {
  id: string;
  name: string;
  description?: string;
  type: string;
  from_city: string;
  to_city: string;
  price: number;
  duration_hours?: number;
  departure_time?: string;
  arrival_time?: string;
  capacity?: number;
  available_seats?: number;
}

const AdminTransport: React.FC = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchTransports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transport_options')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransports(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch transport options.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleDeleteTransport = async (transportId: string) => {
    if (!confirm("Are you sure you want to delete this transport option?")) return;
    
    try {
      const { error } = await supabase
        .from('transport_options')
        .delete()
        .eq('id', transportId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Transport option deleted successfully.",
      });

      fetchTransports();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transport option.",
        variant: "destructive",
      });
    }
  };

  const filteredTransports = transports.filter(transport =>
    transport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.from_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transport.to_city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-pulse">Loading transport options...</div>
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
            <h1 className="text-3xl font-bold">Transport</h1>
            <p className="text-muted-foreground">Manage transport options</p>
          </div>
          <TransportManagement onTransportAdded={fetchTransports} />
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search transport options..." 
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
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Route</th>
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Capacity</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTransports.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      {searchTerm ? "No transport options found matching your search." : "No transport options found."}
                    </td>
                  </tr>
                ) : (
                  filteredTransports.map((transport) => (
                    <tr key={transport.id}>
                      <td className="py-3 px-4">
                        <div className="font-medium">{transport.name}</div>
                      </td>
                      <td className="py-3 px-4 capitalize">{transport.type}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span>{transport.from_city}</span>
                          <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
                          <span>{transport.to_city}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {transport.duration_hours ? `${transport.duration_hours}h` : 'N/A'}
                      </td>
                      <td className="py-3 px-4">${Number(transport.price).toFixed(0)}</td>
                      <td className="py-3 px-4">
                        {transport.available_seats || 0}/{transport.capacity || 0}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTransport(transport.id)}
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
              Showing <span className="font-medium">{filteredTransports.length}</span> transport options
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTransport;
