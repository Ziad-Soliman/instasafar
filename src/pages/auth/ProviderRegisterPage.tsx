import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const ProviderRegisterPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerProvider, loading } = useSupabaseAuth();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyAddress: "",
    contactPhone: ""
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = t("validation.required");
    if (!formData.email.trim()) newErrors.email = t("validation.required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("validation.email");
    
    if (!formData.password) newErrors.password = t("validation.required");
    else if (formData.password.length < 6) newErrors.password = t("validation.password.length");
    
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = t("validation.password.match");
    
    if (!formData.companyName.trim()) newErrors.companyName = t("validation.required");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      const { success, error } = await registerProvider(
        formData.email,
        formData.password,
        formData.fullName,
        formData.companyName,
        formData.companyAddress,
        formData.contactPhone
      );
      
      if (success) {
        toast({
          title: t("auth.registerSuccess"),
          description: t("auth.providerRegisterSuccess"),
        });
        navigate("/provider/dashboard");
      } else if (error) {
        toast({
          title: t("auth.registerFailed"),
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: t("auth.registerFailed"),
        description: t("error.unexpected"),
        variant: "destructive",
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex justify-center items-center min-h-[80vh] px-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{t("auth.registerAsProvider")}</CardTitle>
          <CardDescription>
            {t("auth.providerRegisterDescription")}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t("auth.personalInformation")}
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`pl-10 ${errors.fullName ? 'border-destructive' : ''}`}
                      placeholder={t("auth.fullNamePlaceholder")}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                      placeholder={t("auth.emailPlaceholder")}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="password">{t("auth.password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                        placeholder={t("auth.passwordPlaceholder")}
                      />
                    </div>
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                        placeholder={t("auth.confirmPasswordPlaceholder")}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-2 space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {t("auth.companyInformation")}
              </div>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="companyName">{t("auth.companyName")}</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`pl-10 ${errors.companyName ? 'border-destructive' : ''}`}
                      placeholder={t("auth.companyNamePlaceholder")}
                    />
                  </div>
                  {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName}</p>}
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="companyAddress">{t("auth.companyAddress")}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyAddress"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder={t("auth.companyAddressPlaceholder")}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="contactPhone">{t("auth.contactPhone")}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder={t("auth.contactPhonePlaceholder")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? t("auth.registering") : t("auth.register")}
            </Button>
            
            <div className="text-center text-sm">
              {t("auth.alreadyAccount")} <Link to="/auth/login" className="text-primary hover:underline">{t("auth.login")}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default ProviderRegisterPage;
