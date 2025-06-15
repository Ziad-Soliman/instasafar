
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRtlHelpers } from "@/utils/rtl-helpers";

// Define the form schema
const updatePasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { getDirectionalClasses } = useRtlHelpers();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  // Check if we have an access token in the URL
  useEffect(() => {
    // This effect checks if there's a recovery token in the URL 
    // which should be handled automatically by Supabase client
    const checkRecoveryToken = async () => {
      const urlHash = window.location.hash;
      // If the hash is empty, it's likely that we don't have a valid recovery process
      if (!urlHash && !isComplete) {
        toast({
          title: t("auth.invalidResetLink", "Invalid reset link"),
          description: t(
            "auth.requestNewLink",
            "This password reset link is invalid or has expired. Please request a new one."
          ),
          variant: "destructive",
        });
        navigate("/auth/forgot-password");
      }
    };

    checkRecoveryToken();
  }, [t, toast, navigate, isComplete]);

  const onSubmit = async (data: UpdatePasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // The token and type parameters are handled automatically by Supabase
      // when the updateUser method is called from the reset password page
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsComplete(true);
        toast({
          title: t("auth.passwordUpdated", "Password updated"),
          description: t(
            "auth.passwordUpdatedDescription",
            "Your password has been updated successfully. You can now sign in with your new password."
          ),
        });
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Error updating password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePasswordContent = isComplete ? (
    <div className="text-center py-8">
      <div className="mb-4 rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 mx-auto flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium">
        {t("auth.passwordResetComplete", "Password Reset Complete")}
      </h3>
      <p className="text-muted-foreground mt-2">
        {t(
          "auth.passwordResetSuccessDescription",
          "Your password has been reset successfully. You can now log in with your new password."
        )}
      </p>
      <div className="mt-6">
        <Link to="/auth/login">
          <Button className="w-full">
            {t("auth.proceedToLogin", "Proceed to Login")}
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.newPassword", "New Password")}</FormLabel>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? t("auth.updatingPassword", "Updating password...")
              : t("auth.updatePassword", "Update Password")}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.rememberedPassword", "Remembered your password?")}{" "}
          <Link to="/auth/login" className="text-primary font-medium hover:underline">
            {t("auth.backToLogin", "Back to login")}
          </Link>
        </p>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">{t("auth.resetPassword", "Reset Your Password")}</h1>
        <p className="text-muted-foreground mt-2">{t(
          "auth.resetPasswordDescription",
          "Create a new password for your account"
        )}</p>
      </div>
      
      <Card className="w-full">
        <CardContent className="pt-6">
          {updatePasswordContent}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpdatePasswordPage;
