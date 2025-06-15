
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define the form schema
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
        toast({
          title: t(
            "auth.passwordResetEmailSent",
            "Password reset email sent"
          ),
          description: t(
            "auth.checkEmailForInstructions",
            "Please check your email for password reset instructions"
          ),
        });
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Error sending password reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPasswordContent = isSubmitted ? (
    <div className="text-center py-8">
      <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 mx-auto flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium">
        {t("auth.checkYourEmail", "Check your email")}
      </h3>
      <p className="text-muted-foreground mt-2">
        {t(
          "auth.passwordResetEmailSentDescription",
          "We've sent you a password reset link to your email address. Please check your inbox."
        )}
      </p>
      <div className="mt-6">
        <Link to="/auth/login">
          <Button variant="outline" className="w-full">
            {t("auth.backToLogin", "Back to Login")}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.email", "Email address")}</FormLabel>
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

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? t("auth.sendingResetLink", "Sending reset link...")
              : t("auth.sendResetLink", "Send password reset link")}
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
        <h1 className="text-2xl font-bold">{t("auth.forgotPassword", "Forgot Password")}</h1>
        <p className="text-muted-foreground mt-2">{t(
          "auth.forgotPasswordDescription",
          "Enter your email address and we'll send you a password reset link"
        )}</p>
      </div>
      
      <Card className="w-full">
        <CardContent className="pt-6">
          {forgotPasswordContent}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ForgotPasswordPage;
