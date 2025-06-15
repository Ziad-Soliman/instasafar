
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmailPasswordForm, { EmailPasswordFormValues } from "@/components/auth/EmailPasswordForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("user");

  const handleLogin = async (data: EmailPasswordFormValues) => {
    setError(null);
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      setError(err.message || t("auth.loginFailed", "Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType: 'user' | 'provider' | 'admin') => {
    const demoCredentials = {
      user: { email: "user@demo.com", password: "demo123" },
      provider: { email: "provider@demo.com", password: "demo123" },
      admin: { email: "admin@demo.com", password: "demo123" }
    };

    await handleLogin(demoCredentials[userType]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{t("auth.signInTitle", "Sign in to your account")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("auth.signInDescription", "Enter your email and password below to sign in")}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user">{t("auth.login.userTab", "User")}</TabsTrigger>
          <TabsTrigger value="provider">{t("auth.login.providerTab", "Provider")}</TabsTrigger>
          <TabsTrigger value="admin">{t("auth.login.adminTab", "Admin")}</TabsTrigger>
        </TabsList>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>{t("auth.signIn", "Sign In")}</CardTitle>
              <CardDescription>
                {t("auth.signInDescription", "Enter your email and password below to sign in")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmailPasswordForm
                onSubmit={handleLogin}
                submitButtonText={t("auth.signIn", "Sign In")}
                isLoading={isLoading}
                error={error}
              />
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleDemoLogin('user')}
                  disabled={isLoading}
                  className="w-full"
                >
                  {t("auth.loginAsUser", "Login as User")}
                </Button>
              </div>

              <SocialLoginButtons 
                isLoading={isLoading}
                onStartLoading={() => setIsLoading(true)}
              />

              <div className="text-center text-sm">
                <Link to="/auth/forgot-password" className="text-primary hover:underline">
                  {t("auth.forgotPassword", "Forgot Password?")}
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="provider">
          <Card>
            <CardHeader>
              <CardTitle>{t("auth.login.providerTitle", "Provider Sign In")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('provider')}
                disabled={isLoading}
                className="w-full"
              >
                {t("auth.loginAsProvider", "Login as Provider")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>{t("auth.login.adminTitle", "Admin Sign In")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => handleDemoLogin('admin')}
                disabled={isLoading}
                className="w-full"
              >
                {t("auth.loginAsAdmin", "Login as Admin")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.noAccount", "Don't have an account?")}{" "}
        <Link to="/auth?tab=register" className="text-primary hover:underline">
          {t("auth.signUp", "Sign up")}
        </Link>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          {t("auth.demoNotice", "Demo accounts are for demonstration purposes only")}
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
