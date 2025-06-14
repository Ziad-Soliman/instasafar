import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Globe, Phone, Settings, Shield, BellRing } from "lucide-react";

// Form validation schema
const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters." }),
  preferredLanguage: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const { user, updateProfile, loading } = useAuth();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Provide defaults from user/user_metadata, fallback to ""
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.full_name || user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: user?.user_metadata?.contact_phone || "",
      preferredLanguage: user?.user_metadata?.preferred_language || "en",
    },
  });
  
  // Update form when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        fullName: user.full_name || user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.contact_phone || "",
        preferredLanguage: user.user_metadata?.preferred_language || "en",
      });
    }
  }, [user, form]);
  
  // Handle form submission
  async function onSubmit(values: ProfileFormValues) {
    setIsSubmitting(true);
    
    try {
      const success = await updateProfile({
        full_name: values.fullName,
        contact_phone: values.phone,
        preferred_language: values.preferredLanguage,
      });

      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your account information and preferences</p>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the name that will be displayed on your profile and bookings.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} disabled />
                            </FormControl>
                            <FormDescription>
                              Your email address cannot be changed. Contact support if you need to update it.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 123 456 7890" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your phone number will be used for booking confirmations and updates.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              This will be the default language for communications and notifications.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="h-10 w-10 text-primary" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <User className="w-4 h-4 mt-1 mr-3 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Full Name</div>
                            <div className="text-sm text-muted-foreground">{user?.full_name || user?.user_metadata?.full_name || "Not set"}</div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-start">
                          <Globe className="w-4 h-4 mt-1 mr-3 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Language</div>
                            <div className="text-sm text-muted-foreground">
                              {(user?.user_metadata?.preferred_language === "ar" || user?.preferred_language === "ar")
                                ? "Arabic"
                                : (user?.user_metadata?.preferred_language === "fr" || user?.preferred_language === "fr")
                                ? "French"
                                : (user?.user_metadata?.preferred_language === "es" || user?.preferred_language === "es")
                                ? "Spanish"
                                : "English"}
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-start">
                          <Phone className="w-4 h-4 mt-1 mr-3 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Phone</div>
                            <div className="text-sm text-muted-foreground">{user?.user_metadata?.contact_phone || "Not set"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">Active</span>
                      </div>
                      <Button variant="outline" size="sm">Verify Email</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Your account is in good standing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Manage how we contact you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellRing className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Booking Confirmations</div>
                        <div className="text-sm text-muted-foreground">
                          Receive booking confirmations and updates
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellRing className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Special Offers</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications about special offers and discounts
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Disabled</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellRing className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">Travel Tips</div>
                        <div className="text-sm text-muted-foreground">
                          Receive helpful travel tips and guides for your destination
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Enabled</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Last changed: Never
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage devices that are currently logged in to your account
                  </p>
                  <Button variant="outline">View Active Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
