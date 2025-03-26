
import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  openSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ openSidebar }) => {
  return (
    <header className="sticky top-0 z-30 bg-background border-b h-16 px-4 flex items-center">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={openSidebar}
        >
          <Menu size={20} />
        </Button>
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="flex-1 mx-4 md:mx-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="p-3 cursor-default">
                <div>
                  <p className="font-medium text-sm">New Booking Request</p>
                  <p className="text-xs text-muted-foreground">
                    Ahmad has booked Al Safwah Hotel (2 nights)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 minutes ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-default">
                <div>
                  <p className="font-medium text-sm">New Review</p>
                  <p className="text-xs text-muted-foreground">
                    Fatima left a 5-star review for Premium Umrah Package
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 hour ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-default">
                <div>
                  <p className="font-medium text-sm">System Update</p>
                  <p className="text-xs text-muted-foreground">
                    The system will undergo maintenance tonight at 2 AM
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    5 hours ago
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
