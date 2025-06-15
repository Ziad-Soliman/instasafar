
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailPasswordForm, { EmailPasswordFormValues } from "@/components/auth/EmailPasswordForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, user, createDemoAccounts } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [loginType, setLoginType] = useState<'user' | 'provider' | 'admin'>('user');
  
  useEffect(() => {
    // Create demo accounts on component mount
    createDemoAccounts();
  }, [createDemoAccounts]);

  useEffect(() => {
    if (user) {
      const userRole = user.role || 'user';
      
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else if (userRole === 'provider') {
        navigate("/provider/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (data: EmailPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(data.email, data.password);
      
      if (!result.success && result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType: 'user' | 'provider' | 'admin') => {
    setIsLoading(true);
    setError(null);

    try {
      let email: string;
      let password = "password123";

      if (userType === 'admin') {
        email = "admin@instasafar.com";
      } else if (userType === 'provider') {
        email = "provider@instasafar.com";
      } else {
        email = "user@instasafar.com";
      }

      const result = await signIn(email, password);
      
      if (!result.success && result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Demo login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormTitle = () => {
    switch(loginType) {
      case 'admin':
        return t("auth.login.adminTitle", "Admin Sign In");
      case 'provider':
        return t("auth.login.providerTitle", "Provider Sign In");
      default:
        return t("auth.signInTitle", "Sign in to your account");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">{getFormTitle()}</h1>
        <p className="text-muted-foreground mt-2">{t("auth.signInDescription", "Enter your email and password below to sign in")}</p>
      </div>
      
      <Card className="w-full">
        <CardContent className="pt-6">
          <Tabs className="w-full mb-6" value={loginType} onValueChange={(value) => setLoginType(value as 'user' | 'provider' | 'admin')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="user">{t("auth.login.userTab", "User")}</TabsTrigger>
              <TabsTrigger value="provider">{t("auth.login.providerTab", "Provider")}</TabsTrigger>
              <TabsTrigger value="admin">{t("auth.login.adminTab", "Admin")}</TabsTrigger>
            </TabsList>
          </Tabs>

          <EmailPasswordForm
            onSubmit={handleLogin}
            submitButtonText={t("auth.signIn", "Sign In")}
            isLoading={isLoading}
            error={error}
          />
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t("auth.forgotPassword", "Forgot Password?")}
              </Link>
            </div>
          </div>
          
          <SocialLoginButtons 
            isLoading={isLoading}
            onStartLoading={() => setIsLoading(true)} 
          />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("auth.noAccount", "Don't have an account?")}{" "}
              <Link
                to="/auth/register"
                className="text-primary font-medium hover:underline"
              >
                {t("auth.createAccount", "Create Account")}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t("auth.areYouProvider", "Are you a service provider?")}{" "}
              <Link
                to="/auth/provider-register"
                className="text-primary font-medium hover:underline"
              >
                {t("auth.registerAsProvider", "Register here")}
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-center text-sm font-medium mb-4">{t("auth.quickLogin", "Quick Login for Demo")}</h3>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('user')}
                disabled={isLoading}
              >
                {t("auth.loginAsUser", "Login as User")}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('provider')}
                disabled={isLoading}
              >
                {t("auth.loginAsProvider", "Login as Provider")}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
              >
                {t("auth.loginAsAdmin", "Login as Admin")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t("auth.demoNotice", "Demo accounts are for demonstration purposes only")}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
