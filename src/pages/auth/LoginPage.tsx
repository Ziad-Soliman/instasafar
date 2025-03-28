
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
import { Eye, EyeOff, Building } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isProviderLogin, setIsProviderLogin] = useState(false);

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
      
      // Redirect based on login type
      if (isProviderLogin) {
        navigate("/provider/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProviderLogin = () => {
    setIsProviderLogin(!isProviderLogin);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isProviderLogin ? "Provider Login" : t("auth.login.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isProviderLogin 
            ? "Access your provider dashboard to manage your listings and bookings" 
            : t("auth.login.subtitle")}
        </p>
      </div>

      {/* Toggle between user and provider login */}
      <div className="mb-6 flex">
        <Button
          type="button"
          variant={isProviderLogin ? "outline" : "default"}
          className="w-1/2 rounded-r-none"
          onClick={() => setIsProviderLogin(false)}
        >
          User Login
        </Button>
        <Button
          type="button"
          variant={isProviderLogin ? "default" : "outline"}
          className="w-1/2 rounded-l-none"
          onClick={() => setIsProviderLogin(true)}
        >
          <Building className="mr-2 h-4 w-4" />
          Provider Login
        </Button>
      </div>

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
            />
            <button
              type="button"
              className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-muted-foreground`}
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
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? `${t("loading")}...` : (isProviderLogin ? "Sign in to Provider Dashboard" : t("auth.signIn"))}
        </Button>
      </form>

      {!isProviderLogin && (
        <div className="mt-6 text-center">
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
      )}

      {isProviderLogin && (
        <div className="mt-6 text-center">
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
      <div className="mt-8">
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
          {isProviderLogin ? (
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
    </div>
  );
};

export default LoginPage;
