
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSchema = useMemo(() => z.object({
    fullName: z.string().min(2, {
      message: t("auth.validation.fullNameRequired", "Full name must be at least 2 characters"),
    }),
    email: z.string().email({
      message: t("auth.validation.emailInvalid", "Please enter a valid email address"),
    }),
    password: z.string().min(6, {
      message: t("auth.validation.passwordMin", "Password must be at least 6 characters"),
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t("auth.validation.passwordMismatch", "Passwords don't match"),
    path: ["confirmPassword"],
  }), [t]);

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: FormValues) => {
    setError(null);
    setIsLoading(true);
    try {
      await register(data.email, data.password, data.fullName);
    } catch (err: any) {
      setError(err.message || t("auth.registerFailed", "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{t("auth.createAccount", "Create an account")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("auth.signUpDescription", "Sign up to start booking your spiritual journey")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("auth.signUp", "Sign Up")}</CardTitle>
          <CardDescription>
            {t("auth.signUpDescription", "Sign up to start booking your spiritual journey")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.fullName", "Full Name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.fullNamePlaceholder", "Your Full Name")}
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
                          disabled={isLoading}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.confirmPassword", "Confirm Password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("auth.confirmPasswordPlaceholder", "••••••••")}
                          disabled={isLoading}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth.registering", "Creating account...") : t("auth.signUp", "Sign Up")}
              </Button>
            </form>
          </Form>

          <SocialLoginButtons 
            isLoading={isLoading}
            onStartLoading={() => setIsLoading(true)}
          />

          <div className="text-center text-sm text-muted-foreground">
            {t("auth.termsAgreement", "By registering, you agree to our")}{" "}
            <Link to="/terms" className="text-primary hover:underline">
              {t("auth.termsOfService", "Terms of Service")}
            </Link>{" "}
            {t("auth.and", "and")}{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              {t("auth.privacyPolicy", "Privacy Policy")}
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.alreadyAccount", "Already have an account?")}{" "}
        <Link to="/auth?tab=login" className="text-primary hover:underline">
          {t("auth.signIn", "Sign in")}
        </Link>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
