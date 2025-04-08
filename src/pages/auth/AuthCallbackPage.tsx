
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get auth type from URL
        const result = await supabase.auth.getUser();
        
        if (result.error) {
          setError(result.error.message);
          toast({
            title: t("auth.authError", "Authentication Error"),
            description: result.error.message,
            variant: "destructive",
          });
          // Redirect to login after a short delay
          setTimeout(() => navigate("/auth/login"), 2000);
        } else if (result.data?.user) {
          // Check if we need to create profile, etc.
          
          // Redirect based on user role
          const role = result.data.user.user_metadata?.role || 'user';
          
          if (role === 'admin') {
            navigate("/admin/dashboard");
          } else if (role === 'provider') {
            navigate("/provider/dashboard");
          } else {
            navigate("/");
          }
          
          toast({
            title: t("auth.loginSuccess", "Login Successful"),
            description: t("auth.welcomeBack", "Welcome back to InstaSafar!"),
          });
        } else {
          // No user found, redirect to login
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        setError("An unexpected error occurred during authentication");
        // Redirect to login after a short delay
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate, toast, t]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {error ? (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-destructive">
            {t("auth.authError", "Authentication Error")}
          </h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <p className="mt-4">
            {t("auth.redirectingToLogin", "Redirecting to login page...")}
          </p>
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <h1 className="text-xl font-semibold">
            {t("auth.authenticating", "Completing Authentication")}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {t("auth.pleaseWait", "Please wait while we authenticate your account...")}
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthCallbackPage;
