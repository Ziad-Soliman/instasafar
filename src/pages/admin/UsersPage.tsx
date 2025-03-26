
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Edit, Mail, Phone, Calendar, Lock, Unlock } from "lucide-react";

const AdminUsers: React.FC = () => {
  // This would typically fetch user data from your API
  const users = [
    {
      id: "1",
      full_name: "Mohammed Ali",
      email: "mohammed@example.com",
      phone_number: "+966 51 234 5678",
      role: "user",
      preferred_language: "en",
      created_at: "2023-05-10",
      last_login: "2023-10-25",
      status: "active",
      bookings_count: 3,
    },
    {
      id: "2",
      full_name: "Fatima Khan",
      email: "fatima@example.com",
      phone_number: "+966 50 987 6543",
      role: "user",
      preferred_language: "ar",
      created_at: "2023-06-15",
      last_login: "2023-10-28",
      status: "active",
      bookings_count: 1,
    },
    {
      id: "3",
      full_name: "Ahmed Hassan",
      email: "ahmed@example.com",
      phone_number: "+966 55 123 4567",
      role: "user",
      preferred_language: "en",
      created_at: "2023-04-20",
      last_login: "2023-09-15",
      status: "inactive",
      bookings_count: 0,
    },
    {
      id: "4",
      full_name: "Zainab Omar",
      email: "zainab@example.com",
      phone_number: "+966 50 111 2222",
      role: "admin",
      preferred_language: "ar",
      created_at: "2023-03-05",
      last_login: "2023-10-30",
      status: "active",
      bookings_count: 0,
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage user accounts</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Mail className="w-4 h-4 mr-2" /> Send Email to All
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search users by name or email..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">User</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Bookings</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Joined</th>
                  <th className="text-left py-3 px-4 font-medium">Last Login</th>
                  <th className="text-center py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium mr-3">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{user.full_name}</div>
                          <div className="text-xs text-muted-foreground">
                            Preferred: {user.preferred_language === "en" ? "English" : "Arabic"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-sm mb-1">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{user.phone_number || "Not provided"}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === "admin" ? "default" : "outline"} className="capitalize">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-center">{user.bookings_count}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {user.status === "active" ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{formatDate(user.created_at)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-sm">{formatDate(user.last_login)}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          {user.status === "active" ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="py-4 px-6 bg-muted/50 border-t flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminUsers;
