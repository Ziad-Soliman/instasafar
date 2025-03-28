
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  Plus, 
  Check, 
  X, 
  Building, 
  MapPin, 
  Phone, 
  Mail,
  FileText,
  User,
  Clock
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Provider type
interface Provider {
  id: string;
  user_id: string;
  user_email: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  listings_count: number;
}

// Mock providers data
const mockProviders: Provider[] = [
  {
    id: "prov-1",
    user_id: "user-1",
    user_email: "makkah.grand@example.com",
    company_name: "Grand Makkah Hospitality",
    contact_name: "Ahmed Al-Faisal",
    contact_email: "ahmed@grandmakkah.com",
    contact_phone: "+966 12 345 6789",
    address: "King Fahd Road, Makkah",
    status: "approved",
    created_at: "2023-06-15T10:30:00Z",
    updated_at: "2023-06-16T08:45:00Z",
    listings_count: 4
  },
  {
    id: "prov-2",
    user_id: "user-2",
    user_email: "madinah.plaza@example.com",
    company_name: "Madinah Plaza Hotels",
    contact_name: "Mohammed Al-Harbi",
    contact_email: "mohammed@madinahplaza.com",
    contact_phone: "+966 14 876 5432",
    address: "Central District, Madinah",
    status: "approved",
    created_at: "2023-07-10T14:20:00Z",
    updated_at: "2023-07-11T09:15:00Z",
    listings_count: 3
  },
  {
    id: "prov-3",
    user_id: "user-3",
    user_email: "umrah.specialists@example.com",
    company_name: "Umrah Specialists",
    contact_name: "Fatima Al-Zahrani",
    contact_email: "fatima@umrahspecialists.com",
    contact_phone: "+966 12 987 6543",
    address: "Al Aziziyah, Makkah",
    status: "pending",
    created_at: "2023-10-05T11:45:00Z",
    updated_at: "2023-10-05T11:45:00Z",
    listings_count: 0
  },
  {
    id: "prov-4",
    user_id: "user-4",
    user_email: "hajjservices@example.com",
    company_name: "Hajj Premium Services",
    contact_name: "Abdullah Al-Qahtani",
    contact_email: "abdullah@hajjpremium.com",
    contact_phone: "+966 13 456 7890",
    address: "King Abdullah Road, Jeddah",
    status: "rejected",
    created_at: "2023-09-20T16:30:00Z",
    updated_at: "2023-09-22T10:10:00Z",
    listings_count: 0
  },
  {
    id: "prov-5",
    user_id: "user-5",
    user_email: "madinah.luxury@example.com",
    company_name: "Madinah Luxury Accommodations",
    contact_name: "Aisha Al-Omar",
    contact_email: "aisha@madinahluxury.com",
    contact_phone: "+966 14 234 5678",
    address: "Prophet's Mosque Area, Madinah",
    status: "pending",
    created_at: "2023-10-15T09:20:00Z",
    updated_at: "2023-10-15T09:20:00Z",
    listings_count: 0
  }
];

// Status badge component
const StatusBadge: React.FC<{ status: Provider['status'] }> = ({ status }) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">
          Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="text-red-500 border-red-500">
          Rejected
        </Badge>
      );
    default:
      return null;
  }
};

const AdminProviders: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Filter providers
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle status change
  const handleStatusChange = (providerId: string, newStatus: Provider['status']) => {
    setProviders(providers.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: newStatus, updated_at: new Date().toISOString() } 
        : provider
    ));
    
    // Close the details modal if open
    if (isDetailsOpen && selectedProvider?.id === providerId) {
      setIsDetailsOpen(false);
    }
    
    // Show toast notification
    toast({
      title: `Provider ${newStatus}`,
      description: `Provider has been ${newStatus} successfully.`,
    });
  };
  
  // Handle view details
  const handleViewDetails = (provider: Provider) => {
    setSelectedProvider(provider);
    setIsDetailsOpen(true);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Providers</h1>
            <p className="text-muted-foreground">Manage travel service providers and their accounts</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" /> Add New Provider
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search providers..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" /> More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Providers</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredProviders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No providers found</p>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Company</th>
                        <th className="py-3 px-4 text-left font-medium">Contact</th>
                        <th className="py-3 px-4 text-left font-medium">Location</th>
                        <th className="py-3 px-4 text-left font-medium">Listings</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                        <th className="py-3 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProviders.map((provider) => (
                        <tr key={provider.id} className="bg-background hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="font-medium">{provider.company_name}</div>
                            <div className="text-xs text-muted-foreground">
                              Since {new Date(provider.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{provider.contact_name}</div>
                            <div className="text-xs text-muted-foreground">{provider.contact_email}</div>
                          </td>
                          <td className="py-3 px-4">{provider.address}</td>
                          <td className="py-3 px-4">{provider.listings_count}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={provider.status} />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleViewDetails(provider)}
                              >
                                Details
                              </Button>
                              
                              {provider.status === "pending" && (
                                <>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => handleStatusChange(provider.id, "approved")}
                                  >
                                    <Check className="h-4 w-4 mr-1" /> Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleStatusChange(provider.id, "rejected")}
                                  >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {/* Similar to "all" tab but filtered for pending status */}
            {filteredProviders.filter(p => p.status === "pending").length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No pending providers</p>
                <p className="text-muted-foreground">All provider applications have been processed</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProviders
                  .filter(p => p.status === "pending")
                  .map(provider => (
                    <Card key={provider.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <StatusBadge status={provider.status} />
                              <span className="ml-2 text-sm text-muted-foreground">
                                Applied on {formatDate(provider.created_at)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold">{provider.company_name}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{provider.contact_name}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{provider.contact_email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{provider.contact_phone}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{provider.address}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-row md:flex-col gap-2 justify-end">
                            <Button 
                              variant="default"
                              className="flex-1"
                              onClick={() => handleStatusChange(provider.id, "approved")}
                            >
                              <Check className="h-4 w-4 mr-2" /> Approve
                            </Button>
                            <Button 
                              variant="destructive"
                              className="flex-1"
                              onClick={() => handleStatusChange(provider.id, "rejected")}
                            >
                              <X className="h-4 w-4 mr-2" /> Reject
                            </Button>
                            <Button 
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleViewDetails(provider)}
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {/* Similar content to the "all" tab but filtered for approved status */}
            {filteredProviders.filter(p => p.status === "approved").length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No approved providers found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProviders
                  .filter(p => p.status === "approved")
                  .map(provider => (
                    <Card key={provider.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold">{provider.company_name}</h3>
                            <StatusBadge status={provider.status} />
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-muted-foreground">{provider.listings_count} listings</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-muted-foreground">{provider.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-muted-foreground">{provider.contact_email}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="px-4 py-3 bg-muted/30 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Approved on {new Date(provider.updated_at).toLocaleDateString()}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(provider)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            {/* Similar content for rejected providers */}
            {filteredProviders.filter(p => p.status === "rejected").length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No rejected providers found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProviders
                  .filter(p => p.status === "rejected")
                  .map(provider => (
                    <Card key={provider.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <StatusBadge status={provider.status} />
                              <span className="ml-2 text-sm text-muted-foreground">
                                Rejected on {formatDate(provider.updated_at)}
                              </span>
                            </div>
                            <h3 className="font-semibold">{provider.company_name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {provider.contact_name} • {provider.contact_email}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(provider)}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleStatusChange(provider.id, "approved")}
                            >
                              <Check className="h-4 w-4 mr-1" /> Approve Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Provider Details Dialog */}
        {selectedProvider && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedProvider.company_name}</span>
                  <StatusBadge status={selectedProvider.status} />
                </DialogTitle>
                <DialogDescription>
                  Provider ID: {selectedProvider.id}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Company Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedProvider.company_name}</p>
                        <p className="text-sm text-muted-foreground">{selectedProvider.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">{selectedProvider.listings_count} active listings</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p className="text-sm">Registered on {formatDate(selectedProvider.created_at)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{selectedProvider.contact_name}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{selectedProvider.contact_email}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{selectedProvider.contact_phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Account Information</h3>
                <div className="bg-muted/30 p-3 rounded-md">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Login Email: {selectedProvider.user_email}</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {selectedProvider.status === "pending" && (
                  <>
                    <Button 
                      variant="default"
                      onClick={() => handleStatusChange(selectedProvider.id, "approved")}
                    >
                      <Check className="h-4 w-4 mr-2" /> Approve Provider
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleStatusChange(selectedProvider.id, "rejected")}
                    >
                      <X className="h-4 w-4 mr-2" /> Reject Provider
                    </Button>
                  </>
                )}
                
                {selectedProvider.status === "rejected" && (
                  <Button 
                    variant="default"
                    onClick={() => handleStatusChange(selectedProvider.id, "approved")}
                  >
                    <Check className="h-4 w-4 mr-2" /> Approve Provider
                  </Button>
                )}
                
                {selectedProvider.status === "approved" && (
                  <Button 
                    variant="destructive"
                    onClick={() => handleStatusChange(selectedProvider.id, "rejected")}
                  >
                    <X className="h-4 w-4 mr-2" /> Suspend Provider
                  </Button>
                )}
                
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProviders;
