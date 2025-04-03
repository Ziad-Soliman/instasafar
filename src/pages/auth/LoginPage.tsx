
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Building, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define the form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMode, setLoginMode] = useState<"user" | "provider">("user");

  // Get the redirect path from state or default to home
  const from = (location.state as any)?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      
      // Show success toast
      toast({
        title: loginMode === "provider" ? "Provider Login Successful" : "Login Successful",
        description: "Welcome back to InstaSafar!",
        variant: "default",
      });
      
      // Redirect based on login type
      if (loginMode === "provider") {
        navigate("/provider/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {loginMode === "provider" 
                ? t("auth.providerLogin.title") || "Provider Login" 
                : t("auth.login.title")}
            </CardTitle>
            <CardDescription className="text-center">
              {loginMode === "provider"
                ? t("auth.providerLogin.subtitle") || "Access your provider dashboard to manage your listings and bookings"
                : t("auth.login.subtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Toggle between user and provider login */}
            <Tabs 
              defaultValue={loginMode} 
              onValueChange={(v) => setLoginMode(v as "user" | "provider")}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full mb-4">
                <TabsTrigger value="user" className="flex items-center justify-center gap-2">
                  <User size={16} />
                  <span>User</span>
                </TabsTrigger>
                <TabsTrigger value="provider" className="flex items-center justify-center gap-2">
                  <Building size={16} />
                  <span>Provider</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...register("email")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Link
                    to="/auth/reset-password"
                    className="text-xs text-primary hover:underline"
                  >
                    {t("auth.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...register("password")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full group"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    {t("loading")}...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {loginMode === "provider" ? "Access Provider Dashboard" : t("auth.signIn")}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            {loginMode === "user" ? (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("auth.noAccount")}{" "}
                  <Link
                    to="/auth/register"
                    className="text-primary font-medium hover:underline"
                  >
                    {t("auth.signUp")}
                  </Link>
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Want to become a provider?{" "}
                  <Link
                    to="/provider/register"
                    className="text-primary font-medium hover:underline"
                  >
                    Apply here
                  </Link>
                </p>
              </div>
            )}

            {/* Quick Login Options */}
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t("auth.quickLogin")}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {loginMode === "provider" ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      login("provider@example.com", "password");
                      navigate("/provider/dashboard", { replace: true });
                    }}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    {t("auth.loginAsProvider")}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        login("user@example.com", "password");
                        navigate(from, { replace: true });
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      {t("auth.loginAsUser")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        login("admin@example.com", "password");
                        navigate("/admin", { replace: true });
                      }}
                    >
                      {t("auth.loginAsAdmin")}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
