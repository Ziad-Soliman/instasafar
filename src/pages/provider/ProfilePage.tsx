
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building, Mail, Phone, MapPin, Save } from "lucide-react";

const ProviderProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Mock provider data
  const [providerData, setProviderData] = useState({
    company_name: "Safar Travel & Tours",
    contact_email: user?.email || "",
    contact_phone: "+966 50 123 4567",
    address: "King Fahd Road, Makkah, Saudi Arabia",
    description: "We are a trusted travel agency specializing in Hajj and Umrah services. With over 15 years of experience, we provide exceptional accommodations and transportation services for pilgrims.",
    website: "www.safartravel.com",
    logo_url: "/placeholder.svg"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProviderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the provider profile in the database
    console.log("Updated provider data:", providerData);
    // Show success message
    alert("Profile updated successfully");
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Provider Profile</h1>
          <p className="text-muted-foreground">Manage your company information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Company Information</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4 overflow-hidden">
                {providerData.logo_url ? (
                  <img 
                    src={providerData.logo_url} 
                    alt="Company Logo" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <Building className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-center">{providerData.company_name}</h3>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{providerData.contact_email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{providerData.contact_phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{providerData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start pt-2">
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{providerData.website}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-full">
                <Button variant="outline" className="w-full">
                  Upload New Logo
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input 
                      id="company_name" 
                      name="company_name" 
                      value={providerData.company_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input 
                      id="contact_email" 
                      name="contact_email" 
                      type="email"
                      value={providerData.contact_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input 
                      id="contact_phone" 
                      name="contact_phone" 
                      value={providerData.contact_phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      value={providerData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={providerData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    value={providerData.description}
                    onChange={handleInputChange}
                    rows={5}
                  />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProviderProfilePage;
