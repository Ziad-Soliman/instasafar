
import { BarChart3, Hotel, Package, UserCircle } from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    path: "/provider/dashboard",
  },
  {
    title: "My Listings",
    icon: Hotel,
    path: "/provider/listings",
  },
  {
    title: "Bookings",
    icon: Package,
    path: "/provider/bookings",
  },
  {
    title: "Profile",
    icon: UserCircle,
    path: "/provider/profile",
  },
];
