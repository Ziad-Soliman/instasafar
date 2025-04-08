
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Mail, Lock, User, Phone, MapPin, FileText } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRtlHelpers } from "@/utils/rtl-helpers";
import AuthPage from "./AuthPage";

// Define the form schema
const providerSchema = z.object({
  full_name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z.string(),
  company_name: z.string().min(2, { message: "Please enter your company name" }),
  company_address: z.string().optional(),
  contact_phone: z.string().optional(),
  description: z.string().optional(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type ProviderFormValues = z.infer<typeof providerSchema>;

const ProviderRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerProvider, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const { getDirectionalClasses } = useRtlHelpers();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // If user is already logged in, redirect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      company_name: "",
      company_address: "",
      contact_phone: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProviderFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await registerProvider(
        data.email,
        data.password,
        data.full_name,
        data.company_name,
        data.company_address,
        data.contact_phone
      );
      
      if (result.success) {
        toast({
          title: t("auth.providerRegisterSuccess", "Registration successful"),
          description: t(
            "auth.providerRegisterSuccessDescription",
            "Your provider account request has been submitted. We'll review your application and notify you soon."
          ),
        });
        navigate("/auth/login");
      } else if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Provider registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const providerContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {t("auth.personalInformation", "Personal Information")}
          </div>
          
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.fullName", "Full Name")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Input
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      placeholder={t("auth.fullNamePlaceholder", "Your Full Name")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
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
                <FormLabel>{t("auth.email", "Email")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Input
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      type="email"
                      placeholder={t("auth.emailPlaceholder", "your.email@example.com")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.password", "Password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                        getDirectionalClasses("left-3", "right-3")
                      }`} />
                      <Input
                        className={getDirectionalClasses("pl-10", "pr-10")}
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.passwordPlaceholder", "••••••••")}
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
                          getDirectionalClasses("right-3", "left-3")
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.confirmPassword", "Confirm Password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                        getDirectionalClasses("left-3", "right-3")
                      }`} />
                      <Input
                        className={getDirectionalClasses("pl-10", "pr-10")}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("auth.confirmPasswordPlaceholder", "••••••••")}
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
                          getDirectionalClasses("right-3", "left-3")
                        }`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {t("auth.companyInformation", "Company Information")}
          </div>
          
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.companyName", "Company Name")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building2 className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Input
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      placeholder={t("auth.companyNamePlaceholder", "Your Company or Organization Name")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="company_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.companyAddress", "Company Address")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Input
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      placeholder={t("auth.companyAddressPlaceholder", "Business Address (Optional)")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.contactPhone", "Contact Phone")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Input
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      placeholder={t("auth.contactPhonePlaceholder", "Business Phone Number (Optional)")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.serviceDescription", "Service Description")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <FileText className={`absolute left-3 top-2.5 h-4 w-4 text-muted-foreground ${
                      getDirectionalClasses("left-3", "right-3")
                    }`} />
                    <Textarea
                      className={getDirectionalClasses("pl-10", "pr-10")}
                      placeholder={t("auth.serviceDescriptionPlaceholder", "Brief description of your services (Optional)")}
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground">
          {t(
            "auth.termsAgreement",
            "By registering, you agree to our"
          )}{" "}
          <Link to="/terms" className="text-primary hover:underline">
            {t("auth.termsOfService", "Terms of Service")}
          </Link>{" "}
          {t("auth.and", "and")}{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            {t("auth.privacyPolicy", "Privacy Policy")}
          </Link>
          .
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 
            t("auth.registering", "Submitting application...") : 
            t("auth.registerAsProvider", "Submit Provider Application")}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mt-4">
            {t("auth.alreadyAccount", "Already have an account?")}{" "}
            <Link to="/auth/login" className="text-primary hover:underline">
              {t("auth.login", "Sign in")}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );

  return (
    <AuthPage
      title={t("auth.registerAsProvider", "Register as a Provider")}
      description={t(
        "auth.providerRegisterDescription", 
        "Submit your details to register as a service provider on InstaSafar"
      )}
      tabs={[
        {
          id: "provider",
          label: t("auth.providerRegistration", "Provider Registration"),
          content: providerContent,
        },
      ]}
    />
  );
};

export default ProviderRegisterPage;
