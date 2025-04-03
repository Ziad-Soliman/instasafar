
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { loginWithSupabase, loading } = useSupabaseAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email.trim()) newErrors.email = t("validation.required");
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t("validation.email");
    
    if (!password) newErrors.password = t("validation.required");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      const { success, data } = await loginWithSupabase(email, password);
      
      if (success && data) {
        // Determine where to redirect based on user role
        const role = data.user?.user_metadata?.role;
        
        if (role === 'admin') {
          navigate("/admin/dashboard");
        } else if (role === 'provider') {
          navigate("/provider/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex justify-center items-center min-h-[80vh] px-4"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
          <CardDescription>
            {t("auth.loginDescription")}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      const { email, ...rest } = errors;
                      setErrors(rest);
                    }
                  }}
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                  placeholder={t("auth.emailPlaceholder")}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Link to="/auth/reset-password" className="text-xs text-primary hover:underline">
                  {t("auth.forgotPassword")}
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      const { password, ...rest } = errors;
                      setErrors(rest);
                    }
                  }}
                  className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                  placeholder={t("auth.passwordPlaceholder")}
                />
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? t("auth.loggingIn") : t("auth.login")}
            </Button>
            
            <div className="text-center text-sm">
              {t("auth.noAccount")} <Link to="/auth/register" className="text-primary hover:underline">{t("auth.register")}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
