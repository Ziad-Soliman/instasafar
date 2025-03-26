
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

// Define user interface
interface User {
  id: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  preferred_language?: string;
  role?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
});

// Create provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Initialize and check for existing session
  useEffect(() => {
    // Mock function to simulate loading user from localStorage
    const checkAuth = async () => {
      try {
        // In a real app, this would be fetching from Supabase auth
        const savedUser = localStorage.getItem("instasafar_user");
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Mock login - in real app, this would call Supabase auth.signIn
      // For demo purposes, we'll accept any email/password and create a mock user
      const mockUser: User = {
        id: "user-" + Date.now(),
        email,
        full_name: email.split('@')[0], // Extract name from email
        role: email.includes("admin") ? "admin" : "user"
      };
      
      // Save to localStorage for persistence
      localStorage.setItem("instasafar_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, full_name: string) => {
    try {
      setLoading(true);
      
      // Mock registration - in real app, this would call Supabase auth.signUp
      const mockUser: User = {
        id: "user-" + Date.now(),
        email,
        full_name,
        role: "user"
      };
      
      // Save to localStorage for persistence
      localStorage.setItem("instasafar_user", JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      // Mock logout - in real app, this would call Supabase auth.signOut
      localStorage.removeItem("instasafar_user");
      setUser(null);
      
      toast({
        title: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      
      // Mock profile update - in real app, this would update the Supabase user profile
      if (user) {
        const updatedUser = { ...user, ...data };
        localStorage.setItem("instasafar_user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Profile update failed",
        description: "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create custom hook
export const useAuth = () => useContext(AuthContext);
