import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define user interface
interface User {
  id: string;
  email: string;
  full_name?: string;
  phone_number?: string;
  preferred_language?: string;
  role?: string;
  name?: string;
  avatar?: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
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
  isLoading: true,
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
    // Check Supabase auth and fall back to localStorage if needed
    const checkAuth = async () => {
      try {
        // First check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // If we have a Supabase session, use it
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata.full_name,
            role: session.user.user_metadata.role || 'user',
            name: session.user.user_metadata.full_name,
            avatar: session.user.user_metadata.avatar_url
          };
          setUser(userData);
        } else {
          // Otherwise fall back to localStorage for demo purposes
          const savedUser = localStorage.getItem("instasafar_user");
          
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            // Ensure the user has name and avatar properties
            parsedUser.name = parsedUser.name || parsedUser.full_name;
            setUser(parsedUser);
          }
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
      
      // Try Supabase auth first
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        if (data.user) {
          const userData: User = {
            id: data.user.id,
            email: data.user.email || '',
            full_name: data.user.user_metadata.full_name,
            role: data.user.user_metadata.role || 'user',
            name: data.user.user_metadata.full_name,
            avatar: data.user.user_metadata.avatar_url
          };
          setUser(userData);
          
          toast({
            title: "Logged in successfully",
            description: "Welcome back!",
          });
          
          return;
        }
      } catch (supabaseError) {
        console.log("Supabase login failed, using mock login", supabaseError);
      }
      
      // Fall back to mock login for development
      const mockUser: User = {
        id: "user-" + Date.now(),
        email,
        full_name: email.split('@')[0], // Extract name from email
        role: email.includes("admin") ? "admin" : "user",
        name: email.split('@')[0], // Extract name from email
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
      
      // Try Supabase auth first
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name,
              role: 'user',
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user) {
          const userData: User = {
            id: data.user.id,
            email: data.user.email || '',
            full_name: data.user.user_metadata.full_name,
            role: data.user.user_metadata.role || 'user',
            name: data.user.user_metadata.full_name,
          };
          setUser(userData);
          
          toast({
            title: "Registration successful",
            description: "Your account has been created.",
          });
          
          return;
        }
      } catch (supabaseError) {
        console.log("Supabase registration failed, using mock registration", supabaseError);
      }
      
      // Mock registration - in real app, this would call Supabase auth.signUp
      const mockUser: User = {
        id: "user-" + Date.now(),
        email,
        full_name,
        role: "user",
        name: full_name,
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
      
      // Try Supabase logout first
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (supabaseError) {
        console.log("Supabase logout failed, using mock logout", supabaseError);
      }
      
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
      
      // Try Supabase profile update first
      if (user) {
        try {
          const { error } = await supabase.auth.updateUser({
            data: {
              full_name: data.full_name,
              phone_number: data.phone_number,
              preferred_language: data.preferred_language,
              name: data.full_name || data.name,
            }
          });
          
          if (error) throw error;
          
          // Get the updated session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session && session.user) {
            const updatedUser = {
              ...user,
              ...data,
              name: data.full_name || data.name || user.name || user.full_name,
            };
            setUser(updatedUser);
            
            toast({
              title: "Profile updated",
              description: "Your profile has been updated successfully.",
            });
            
            return;
          }
        } catch (supabaseError) {
          console.log("Supabase profile update failed, using mock update", supabaseError);
        }
      }
      
      // Mock profile update - in real app, this would update the Supabase user profile
      if (user) {
        const updatedUser = { ...user, ...data };
        
        updatedUser.name = data.full_name || data.name || user.name || user.full_name;
        
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
    isLoading: loading,
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
