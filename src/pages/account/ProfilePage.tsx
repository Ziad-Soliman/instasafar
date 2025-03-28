
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema
const profileFormSchema = z.object({
  full_name: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
  phone_number: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  preferred_language: z.enum(["en", "ar"], {
    message: "Please select a language.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfilePage: React.FC = () => {
  const { user, updateProfile, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      preferred_language: (user?.preferred_language as "en" | "ar") || language,
    },
  });
  
  // Update form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.reset({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        preferred_language: (user?.preferred_language as "en" | "ar") || language,
      });
    }
  }, [user, form, language]);
  
  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Update user profile
      await updateProfile({
        full_name: data.full_name,
        phone_number: data.phone_number,
        preferred_language: data.preferred_language,
      });
      
      // Update language if changed
      if (data.preferred_language !== language) {
        setLanguage(data.preferred_language);
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Profile update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show loading state if auth is still loading
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse text-center">{t("loading")}...</div>
        </div>
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t("account.profile.title")}</h1>
          <p className="text-muted-foreground mb-6">{t("account.profile.subtitle")}</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.fullName")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.email")}</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormDescription>
                          Email cannot be changed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.phone")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="preferred_language"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred Language</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="en" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <span className="mr-1">🇺🇸</span> English
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ar" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                <span className="mr-1">🇸🇦</span> العربية (Arabic)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? `${t("loading")}...` : t("account.profile.update")}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="bg-muted/20 flex flex-col items-start">
              <p className="text-sm text-muted-foreground">
                Your data is securely stored and will only be used to improve your 
                experience with InstaSafar.
              </p>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
