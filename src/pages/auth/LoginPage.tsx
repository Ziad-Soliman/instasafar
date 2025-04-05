
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { signIn, signUp, user } = useSupabaseAuth();
  
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await signIn(loginEmail, loginPassword);
      // Redirects will happen automatically via the auth state change listener
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form
    if (!registerEmail || !registerPassword || !registerConfirmPassword || !fullName) {
      setError("Please fill in all fields");
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp(registerEmail, registerPassword, {
        full_name: fullName,
        role: "user",
      });
      // Show the login tab after successful registration
      setActiveTab("login");
    } catch (error: any) {
      setError(error.message || "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-10" dir={isRTL ? "rtl" : "ltr"}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {activeTab === "login" ? t("auth.login") : t("auth.register")}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === "login" 
                ? t("auth.loginDescription") 
                : t("auth.registerDescription")}
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
                <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
              </TabsList>
            </div>
            
            {error && (
              <div className="px-6 pt-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}
            
            <CardContent className="p-6">
              <TabsContent value="login" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                        {t("auth.forgotPassword")}
                      </Link>
                    </div>
                    <Input 
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("auth.signingIn") : t("auth.login")}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="mt-0">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">{t("auth.fullName")}</Label>
                    <Input 
                      id="full-name"
                      placeholder={t("auth.fullNamePlaceholder")}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t("auth.email")}</Label>
                    <Input 
                      id="register-email"
                      type="email"
                      placeholder="example@example.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t("auth.password")}</Label>
                    <Input 
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("auth.confirmPassword")}</Label>
                    <Input 
                      id="confirm-password"
                      type="password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => 
                        setAgreeToTerms(checked === true)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      {t("auth.agreeToTerms")} <Link to="/terms" className="text-primary hover:underline">{t("auth.termsAndConditions")}</Link>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("auth.signingUp") : t("auth.register")}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="p-6 pt-0 flex flex-col gap-4">
              <div className="text-center text-sm">
                {activeTab === "login"
                  ? (
                    <div>
                      {t("auth.dontHaveAccount")}{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setActiveTab("register")}
                      >
                        {t("auth.register")}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {t("auth.alreadyHaveAccount")}{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setActiveTab("login")}
                      >
                        {t("auth.login")}
                      </button>
                    </div>
                  )
                }
              </div>
              
              <div className="text-center text-sm">
                <Link to="/" className="text-primary hover:underline">
                  {t("auth.backToHome")}
                </Link>
              </div>
              
              <div className="text-center text-sm">
                <Link to="/auth/register-provider" className="text-primary hover:underline">
                  {t("auth.registerAsProvider")}
                </Link>
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
