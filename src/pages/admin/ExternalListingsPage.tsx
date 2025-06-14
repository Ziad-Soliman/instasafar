
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Search, Edit, Trash, ExternalLink, MapPin } from "lucide-react";
import { ExternalListingData } from "@/components/cards/ExternalListingCard";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const externalListingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  listing_type: z.enum(["hotel", "flight", "activity"], { 
    required_error: "Please select a listing type.",
  }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  city: z.enum(["Makkah", "Madinah", "Jeddah", "Other"], { 
    required_error: "Please select a city.",
  }),
  provider_name: z.string().min(2, { message: "Provider name is required." }),
  redirect_url: z.string().url({ message: "Please enter a valid URL." }),
  image_url: z.string().optional(),
  price_indication: z.string().optional(),
  rating_indication: z.string().optional(),
});

type ExternalListingFormValues = z.infer<typeof externalListingSchema>;

const AdminExternalListings: React.FC = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // This would typically fetch external listing data from your API
  const externalListings: ExternalListingData[] = [
    {
      id: "1",
      listing_type: "hotel",
      name: "Makkah Hilton Hotel",
      description: "5-star hotel with excellent amenities near Haram",
      city: "Makkah",
      provider_name: "Booking.com",
      redirect_url: "https://booking.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $200/night",
      rating_indication: "4.7 (1,245 reviews)",
    },
    {
      id: "2",
      listing_type: "hotel",
      name: "Madinah Oberoi",
      description: "Luxury hotel with spacious rooms and great service",
      city: "Madinah",
      provider_name: "Agoda",
      redirect_url: "https://agoda.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $180/night",
      rating_indication: "4.5 (980 reviews)",
    },
    {
      id: "3",
      listing_type: "flight",
      name: "Jeddah to Makkah Flights",
      description: "Direct flights from major cities to Jeddah",
      city: "Jeddah",
      provider_name: "Skyscanner",
      redirect_url: "https://skyscanner.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $450",
      rating_indication: "Multiple airlines",
    },
    {
      id: "4",
      listing_type: "activity",
      name: "Makkah-Madinah Transport",
      description: "Comfortable transportation between holy cities",
      city: "Other",
      provider_name: "GetYourGuide",
      redirect_url: "https://getyourguide.com/example",
      image_url: "/placeholder.svg",
      price_indication: "From $50",
      rating_indication: "4.6 (350 reviews)",
    },
  ];
  
  // Set up form with default values
  const form = useForm<ExternalListingFormValues>({
    resolver: zodResolver(externalListingSchema),
    defaultValues: {
      name: "",
      listing_type: "hotel",
      description: "",
      city: "Makkah",
      provider_name: "",
      redirect_url: "",
      image_url: "/placeholder.svg",
      price_indication: "",
      rating_indication: "",
    },
  });
  
  // Handle form submission
  async function onSubmit(values: ExternalListingFormValues) {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would save the external listing to Supabase here
      
      // Mock API call - would be replaced with Supabase insert
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast({
        title: "External listing created",
        description: "The external listing has been created successfully.",
      });
      
      // Close dialog and reset form
      setIsAddDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating external listing:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // Handle delete
  const handleDelete = (id: string) => {
    // In a real implementation, we would delete the external listing from Supabase
    toast({
      title: "External listing deleted",
      description: "The external listing has been deleted successfully.",
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
            <h1 className="text-3xl font-bold">External Listings</h1>
            <p className="text-muted-foreground">Manage redirections to external booking platforms</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" /> Add New Listing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add External Listing</DialogTitle>
                <DialogDescription>
                  Create a new external listing that will redirect users to a partner website.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter listing name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="listing_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listing Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hotel">Hotel</SelectItem>
                              <SelectItem value="flight">Flight</SelectItem>
                              <SelectItem value="activity">Activity</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Makkah">Makkah</SelectItem>
                              <SelectItem value="Madinah">Madinah</SelectItem>
                              <SelectItem value="Jeddah">Jeddah</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of the listing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="provider_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Provider Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Booking.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="redirect_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Redirect URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price_indication"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Indication</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., From $100/night" {...field} />
                          </FormControl>
                          <FormDescription>
                            Price range or starting price with unit
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rating_indication"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating Indication</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 4.5 (200 reviews)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Rating with number of reviews if available
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave empty to use default placeholder image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Listing"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search external listings..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {externalListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="h-40 bg-muted">
                <img 
                  src={listing.image_url} 
                  alt={listing.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="capitalize">
                    {listing.listing_type}
                  </Badge>
                  <Button variant="ghost" size="icon" asChild>
                    <a 
                      href={listing.redirect_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{listing.name}</h3>
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{listing.city}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {listing.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <div className="font-medium">{listing.price_indication}</div>
                    <div className="text-muted-foreground text-xs">{listing.rating_indication}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Via {listing.provider_name}</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminExternalListings;
