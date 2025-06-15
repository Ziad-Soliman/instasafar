
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import ProviderSidebarContent from "./ProviderSidebarContent";

interface ProviderMobileHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProviderMobileHeader: React.FC<ProviderMobileHeaderProps> = ({ open, setOpen }) => {
  const { user } = useAuth();

  return (
    <div className="lg:hidden bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-600 sticky top-0 z-30 shadow-sm">
      <div className="flex h-16 items-center px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] px-0 py-0 bg-white dark:bg-navy-800">
            <div className="flex flex-col h-full">
              <ProviderSidebarContent onItemClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center mx-auto">
          <h1 className="text-lg font-semibold text-navy-700 dark:text-white">Provider Portal</h1>
        </div>

        <div className="ml-auto">
          <div className="w-8 h-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'P'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderMobileHeader;
