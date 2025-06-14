
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const AuthPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <p className="text-muted-foreground mt-2">Sign in to your account or create a new one</p>
      </div>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <LoginPage />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="register" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <RegisterPage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AuthPage;
