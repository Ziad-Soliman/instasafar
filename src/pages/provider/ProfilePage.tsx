
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  Globe,
  ShieldCheck,
  LucideIcon,
  Save,
  Camera,
  PenLine,
  BookUser
} from "lucide-react";

// Mock provider data
const mockProviderProfile = {
  id: "provider-1",
  user_id: "user-123",
  status: "approved", // "pending", "approved", "rejected"
  company_name: "Al Barakah Tours & Travels",
  contact_email: "info@albarakah-tours.com",
  contact_phone: "+966 55 123 4567",
  website: "https://albarakah-tours.com",
  business_type: "Tour Operator",
  license_number: "LIC123456789",
  year_established: "2010",
  description: "Al Barakah Tours & Travels is a leading provider of Hajj and Umrah services with over 10 years of experience. We specialize in providing exceptional accommodations and memorable spiritual journeys for pilgrims from around the world.",
  address: {
    street: "123 King Fahd Road",
    city: "Makkah",
    postal_code: "21955",
    country: "Saudi Arabia"
  },
  logo: "/placeholder.svg",
  created_at: "2022-05-10T08:30:00Z",
  updated_at: "2023-09-15T14:45:00Z"
};

const ProviderProfilePage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  
  // State for profile
  const [profile, setProfile] = useState(mockProviderProfile);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for form
  const [formValues, setFormValues] = useState({
    company_name: profile.company_name,
    contact_email: profile.contact_email,
    contact_phone: profile.contact_phone,
    website: profile.website,
    business_type: profile.business_type,
    license_number: profile.license_number,
    year_established: profile.year_established,
    description: profile.description,
    street: profile.address.street,
    city: profile.address.city,
    postal_code: profile.address.postal_code,
    country: profile.address.country
  });
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update profile
    setProfile({
      ...profile,
      company_name: formValues.company_name,
      contact_email: formValues.contact_email,
      contact_phone: formValues.contact_phone,
      website: formValues.website,
      business_type: formValues.business_type,
      license_number: formValues.license_number,
      year_established: formValues.year_established,
      description: formValues.description,
      address: {
        street: formValues.street,
        city: formValues.city,
        postal_code: formValues.postal_code,
        country: formValues.country
      },
      updated_at: new Date().toISOString()
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your provider profile has been updated successfully.",
      variant: "default",
    });
  };
  
  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/90">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/90">Pending Approval</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/90">Rejected</Badge>;
      default:
        return <Badge className="bg-slate-500/90">Unknown</Badge>;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Info item component
  interface InfoItemProps {
    icon: LucideIcon;
    label: string;
    value: string;
  }
  
  const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start mb-4">
      <Icon className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Provider Profile</h1>
        {isEditing ? (
          <Button onClick={() => setIsEditing(false)} variant="outline">
            Cancel Editing
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <PenLine className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile summary card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.logo} alt={profile.company_name} />
                  <AvatarFallback>
                    {profile.company_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-center mb-1">{profile.company_name}</h2>
              <div className="mb-2">{getStatusBadge(profile.status)}</div>
              <p className="text-sm text-muted-foreground text-center mb-4">{profile.business_type}</p>
              
              <Separator className="mb-4" />
              
              <div className="w-full">
                <InfoItem 
                  icon={Calendar} 
                  label="Member Since" 
                  value={formatDate(profile.created_at)} 
                />
                <InfoItem 
                  icon={Calendar} 
                  label="Established" 
                  value={profile.year_established} 
                />
                <InfoItem 
                  icon={ShieldCheck} 
                  label="License Number" 
                  value={profile.license_number} 
                />
                <InfoItem 
                  icon={Globe} 
                  label="Website" 
                  value={profile.website} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main profile content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue={isEditing ? "edit" : "overview"}>
            <TabsList>
              <TabsTrigger value="overview" disabled={isEditing}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="edit" disabled={!isEditing}>
                Edit Profile
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Company Information</CardTitle>
                  <CardDescription>
                    Your business details and contact information visible to customers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                      <InfoItem 
                        icon={Building} 
                        label="Company Name" 
                        value={profile.company_name} 
                      />
                      <InfoItem 
                        icon={Mail} 
                        label="Email Address" 
                        value={profile.contact_email} 
                      />
                      <InfoItem 
                        icon={Phone} 
                        label="Phone Number" 
                        value={profile.contact_phone} 
                      />
                      <InfoItem 
                        icon={MapPin} 
                        label="Address" 
                        value={`${profile.address.street}, ${profile.address.city}, ${profile.address.postal_code}, ${profile.address.country}`} 
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Information</h3>
                      <InfoItem 
                        icon={Building} 
                        label="Business Type" 
                        value={profile.business_type} 
                      />
                      <InfoItem 
                        icon={BookUser} 
                        label="Account Status" 
                        value={profile.status.charAt(0).toUpperCase() + profile.status.slice(1)} 
                      />
                      <InfoItem 
                        icon={Calendar} 
                        label="Last Updated" 
                        value={formatDate(profile.updated_at)} 
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">About Company</h3>
                    <p className="text-muted-foreground">{profile.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="edit">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle className="text-xl">Edit Profile Information</CardTitle>
                    <CardDescription>
                      Update your business details and contact information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="company_name">Company Name</Label>
                          <Input
                            id="company_name"
                            name="company_name"
                            value={formValues.company_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="contact_email">Contact Email</Label>
                          <Input
                            id="contact_email"
                            name="contact_email"
                            type="email"
                            value={formValues.contact_email}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="contact_phone">Contact Phone</Label>
                          <Input
                            id="contact_phone"
                            name="contact_phone"
                            value={formValues.contact_phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={formValues.website}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="business_type">Business Type</Label>
                          <Select 
                            defaultValue={formValues.business_type} 
                            onValueChange={(value) => handleSelectChange("business_type", value)}
                          >
                            <SelectTrigger id="business_type">
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tour Operator">Tour Operator</SelectItem>
                              <SelectItem value="Hotel">Hotel</SelectItem>
                              <SelectItem value="Transport Provider">Transport Provider</SelectItem>
                              <SelectItem value="Travel Agency">Travel Agency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="license_number">License Number</Label>
                          <Input
                            id="license_number"
                            name="license_number"
                            value={formValues.license_number}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="year_established">Year Established</Label>
                          <Input
                            id="year_established"
                            name="year_established"
                            value={formValues.year_established}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label htmlFor="description">Company Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formValues.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Address Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            name="street"
                            value={formValues.street}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Select 
                            defaultValue={formValues.city} 
                            onValueChange={(value) => handleSelectChange("city", value)}
                          >
                            <SelectTrigger id="city">
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Makkah">Makkah</SelectItem>
                              <SelectItem value="Madinah">Madinah</SelectItem>
                              <SelectItem value="Jeddah">Jeddah</SelectItem>
                              <SelectItem value="Riyadh">Riyadh</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input
                            id="postal_code"
                            name="postal_code"
                            value={formValues.postal_code}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Select 
                            defaultValue={formValues.country} 
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                              <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                              <SelectItem value="Qatar">Qatar</SelectItem>
                              <SelectItem value="Kuwait">Kuwait</SelectItem>
                              <SelectItem value="Bahrain">Bahrain</SelectItem>
                              <SelectItem value="Oman">Oman</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};

export default ProviderProfilePage;
