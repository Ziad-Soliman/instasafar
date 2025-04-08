
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import AuthPage from "./AuthPage";
import { useRtlHelpers } from "@/utils/rtl-helpers";

// Define the form schema
const registerSchema = z.object({
  full_name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
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

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signUp(data.email, data.password, data.full_name);
      
      if (result.success) {
        toast({
          title: t("auth.registerSuccess", "Registration successful"),
          description: t("auth.registerSuccessDescription", "Your account has been created successfully."),
        });
        navigate("/");
      } else if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerContent = (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.fullName", "Full Name")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t("auth.fullNamePlaceholder", "Your Full Name")}
                    autoComplete="name"
                    disabled={isLoading}
                    {...field}
                  />
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
                  <Input 
                    type="email"
                    placeholder={t("auth.emailPlaceholder", "your.email@example.com")}
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password", "Password")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.passwordPlaceholder", "••••••••")}
                      autoComplete="new-password"
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
                    <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("auth.confirmPasswordPlaceholder", "••••••••")}
                      autoComplete="new-password"
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
            {isLoading ? t("auth.registering", "Creating account...") : t("auth.register", "Create Account")}
          </Button>
        </form>
      </Form>

      <SocialLoginButtons 
        isLoading={isLoading}
        onStartLoading={() => setIsLoading(true)} 
      />

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.alreadyAccount", "Already have an account?")}{" "}
          <Link
            to="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            {t("auth.login", "Sign in")}
          </Link>
        </p>
      </div>
    </>
  );

  return (
    <AuthPage
      title={t("auth.createAccount", "Create an account")}
      description={t("auth.signUpDescription", "Sign up to start booking your spiritual journey")}
      tabs={[
        {
          id: "register",
          label: t("auth.register", "Register"),
          content: registerContent,
        },
      ]}
    />
  );
};

export default RegisterPage;
