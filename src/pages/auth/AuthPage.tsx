
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthPageProps {
  defaultTab?: string;
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  title: string;
  description?: string;
}

const AuthPage: React.FC<AuthPageProps> = ({ defaultTab, tabs, title, description }) => {
  const { t, isRTL } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
    >
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground mt-2">{description}</p>}
      </div>
      
      {tabs.length > 1 ? (
        <Tabs defaultValue={defaultTab || tabs[0].id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  {tab.content}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="w-full">
          <CardContent className="pt-6">
            {tabs[0].content}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default AuthPage;
