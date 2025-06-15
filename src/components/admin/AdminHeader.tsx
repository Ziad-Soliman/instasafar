
import React from "react";
import { Menu, Bell, Search, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  openSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ openSidebar }) => {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-600 h-20 px-4 md:px-6 flex items-center shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700"
          onClick={openSidebar}
        >
          <Menu size={20} />
        </Button>
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-navy-700 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Control your business operations</p>
        </div>
      </div>

      <div className="flex-1 mx-4 md:mx-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-700 focus:ring-brand-400 focus:border-brand-400 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Messages */}
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700">
          <MessageSquare size={18} />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-brand-400 text-white text-xs border-2 border-white dark:border-navy-800">
            3
          </Badge>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700">
              <Bell size={18} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs border-2 border-white dark:border-navy-800">
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-600 rounded-2xl shadow-xl">
            <DropdownMenuLabel className="text-navy-700 dark:text-white font-bold text-lg px-4 py-3">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-navy-600" />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="p-4 cursor-default hover:bg-gray-50 dark:hover:bg-navy-700 rounded-xl mx-2 my-1">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Bell className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-700 dark:text-white text-sm">New Booking Request</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Ahmad has booked Al Safwah Hotel (2 nights)
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      2 minutes ago
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-default hover:bg-gray-50 dark:hover:bg-navy-700 rounded-xl mx-2 my-1">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-700 dark:text-white text-sm">New Review</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Fatima left a 5-star review for Premium Umrah Package
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-default hover:bg-gray-50 dark:hover:bg-navy-700 rounded-xl mx-2 my-1">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-700 dark:text-white text-sm">System Update</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      The system will undergo maintenance tonight at 2 AM
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      5 hours ago
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-navy-600" />
            <DropdownMenuItem className="justify-center font-semibold text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-xl mx-2 my-1 py-3">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700">
          <Settings size={18} />
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
