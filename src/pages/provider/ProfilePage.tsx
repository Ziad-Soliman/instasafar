
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Edit, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Calendar, 
  FileCheck
} from "lucide-react";

// Mock provider data
const mockProviderData = {
  id: "provider-123",
  user_id: "user-456",
  company_name: "Al-Haram Hotels & Services",
  contact_email: "info@alharamhotels.com",
  contact_phone: "+966 12 345 6789",
  address: "King Abdul Aziz Road, Makkah, Saudi Arabia",
  status: "approved",
  created_at: "2022-05-10T14:30:00Z",
  updated_at: "2023-10-15T08:45:00Z",
  description: "Al-Haram Hotels & Services is a leading provider of premium accommodations and Hajj/Umrah packages in Makkah and Madinah. With over 15 years of experience, we specialize in offering comfortable stays close to the holy sites.",
  logo_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&h=300&q=80",
  website: "https://www.alharamhotels.com",
  social_media: {
    facebook: "https://facebook.com/alharamhotels",
    instagram: "https://instagram.com/alharamhotels",
    twitter: "https://twitter.com/alharamhotels"
  },
  business_license: {
    number: "SA12345678",
    expiry_date: "2024-12-31",
    verified: true
  }
};

const ProviderProfilePage: React.FC = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [providerData, setProviderData] = useState(mockProviderData);
  const [formData, setFormData] = useState(mockProviderData);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSaveChanges = () => {
    setProviderData(formData);
    setIsEditMode(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      variant: "default"
    });
  };
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Provider Profile</h1>
          <p className="text-muted-foreground">
            Manage your company information and settings
          </p>
        </div>
        {!isEditMode ? (
          <Button onClick={() => setIsEditMode(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Company Profile</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>
        
        {/* Company Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Logo and Upload Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-2 border-primary/20">
                      <AvatarImage src={providerData.logo_url} />
                      <AvatarFallback className="text-3xl">
                        {providerData.company_name.split(' ').map(word => word[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditMode && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 bg-background"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-primary flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    {providerData.status === 'approved' ? 'Verified Provider' : 'Pending Verification'}
                  </Badge>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Member since {new Date(providerData.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Company Details Form */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name" className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        Company Name
                      </Label>
                      {isEditMode ? (
                        <Input 
                          id="company_name"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="font-medium">{providerData.company_name}</div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </Label>
                      {isEditMode ? (
                        <Input 
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="font-medium text-primary hover:underline">
                          <a href={providerData.website} target="_blank" rel="noopener noreferrer">
                            {providerData.website}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact_email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact Email
                      </Label>
                      {isEditMode ? (
                        <Input 
                          id="contact_email"
                          name="contact_email"
                          value={formData.contact_email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="font-medium">{providerData.contact_email}</div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact_phone" className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact Phone
                      </Label>
                      {isEditMode ? (
                        <Input 
                          id="contact_phone"
                          name="contact_phone"
                          value={formData.contact_phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="font-medium">{providerData.contact_phone}</div>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address" className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        Address
                      </Label>
                      {isEditMode ? (
                        <Input 
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <div className="font-medium">{providerData.address}</div>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description" className="flex items-center">
                        Company Description
                      </Label>
                      {isEditMode ? (
                        <Textarea 
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={5}
                        />
                      ) : (
                        <div className="text-sm text-muted-foreground">{providerData.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your business social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    value={providerData.social_media.facebook}
                    readOnly={!isEditMode}
                    placeholder="https://facebook.com/yourbusiness"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    value={providerData.social_media.instagram}
                    readOnly={!isEditMode}
                    placeholder="https://instagram.com/yourbusiness"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input 
                    id="twitter" 
                    value={providerData.social_media.twitter}
                    readOnly={!isEditMode}
                    placeholder="https://twitter.com/yourbusiness"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Verification</CardTitle>
              <CardDescription>Your business verification status and documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    providerData.business_license.verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {providerData.business_license.verified ? 
                      <FileCheck className="h-5 w-5" /> : 
                      <Clock className="h-5 w-5" />
                    }
                  </div>
                  <div className="ml-4">
                    <div className="font-medium">
                      {providerData.business_license.verified ? 'Business Verified' : 'Verification Pending'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {providerData.business_license.verified ? 
                        'Your business has been verified by InstaSafar' : 
                        'We are reviewing your submitted documents'}
                    </div>
                  </div>
                </div>
                <Badge variant={providerData.business_license.verified ? 'default' : 'secondary'}>
                  {providerData.business_license.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="license_number">Business License Number</Label>
                  <Input 
                    id="license_number" 
                    value={providerData.business_license.number}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license_expiry">License Expiry Date</Label>
                  <Input 
                    id="license_expiry" 
                    value={providerData.business_license.expiry_date}
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Documents</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <FileCheck className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                    <div className="text-sm font-medium">Business License</div>
                    <div className="text-xs text-muted-foreground">Uploaded on {new Date(providerData.created_at).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center mb-4">
                      <FileCheck className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                    <div className="text-sm font-medium">ID Verification</div>
                    <div className="text-xs text-muted-foreground">Uploaded on {new Date(providerData.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              {!providerData.business_license.verified && (
                <div className="flex justify-center mt-4">
                  <Button>Upload Additional Documents</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notify_bookings"
                        defaultChecked
                        className="form-checkbox rounded"
                      />
                      <Label htmlFor="notify_bookings">New booking notifications</Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notify_messages"
                        defaultChecked
                        className="form-checkbox rounded"
                      />
                      <Label htmlFor="notify_messages">Customer message notifications</Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="notify_updates"
                        defaultChecked
                        className="form-checkbox rounded"
                      />
                      <Label htmlFor="notify_updates">Platform updates and announcements</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login & Security</h3>
                <Button variant="outline">Change Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language & Region</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <select 
                      id="language"
                      className="w-full p-2 border rounded-md"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية (Arabic)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select 
                      id="timezone"
                      className="w-full p-2 border rounded-md"
                      defaultValue="Asia/Riyadh"
                    >
                      <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
                      <option value="Asia/Dubai">Dubai (GMT+4)</option>
                      <option value="Europe/London">London (GMT+0/+1)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Adding missing Globe component for this file only
const Globe = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Adding missing Clock component for this file only
const Clock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default ProviderProfilePage;
