
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserMetadata {
  full_name?: string;
  role?: 'user' | 'provider' | 'admin';
  company_name?: string;
  company_address?: string;
  contact_phone?: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  // Add the properties being used in components
  name?: string;
  avatar?: string;
  full_name?: string;
  phone_number?: string;
  preferred_language?: string;
  role?: 'user' | 'provider' | 'admin';
}

interface AuthResult {
  success: boolean;
  error?: {
    message: string;
  };
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean; // Alias for loading for compatibility
  isAdmin: boolean; // For AdminLayout
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  register: (email: string, password: string, fullName: string) => Promise<AuthResult>; // Alias for signUp
  registerProvider: (
    email: string, 
    password: string, 
    fullName: string,
    companyName: string,
    companyAddress?: string,
    contactPhone?: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>; // Alias for signOut for compatibility
  updateProfile: (data: Partial<UserMetadata>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoading: true,
  isAdmin: false,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  register: async () => ({ success: false }),
  registerProvider: async () => ({ success: false }),
  signOut: async () => {},
  logout: async () => {},
  updateProfile: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const userData: User = {
            ...session.user,
            name: session.user.user_metadata?.full_name,
            full_name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
            phone_number: session.user.user_metadata?.phone_number,
            preferred_language: session.user.user_metadata?.preferred_language || 'en',
            role: session.user.user_metadata?.role || 'user'
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData: User = {
          ...session.user,
          name: session.user.user_metadata?.full_name,
          full_name: session.user.user_metadata?.full_name,
          avatar: session.user.user_metadata?.avatar_url,
          phone_number: session.user.user_metadata?.phone_number,
          preferred_language: session.user.user_metadata?.preferred_language || 'en',
          role: session.user.user_metadata?.role || 'user'
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred during sign in.' } 
      };
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user'
          }
        }
      });

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred during sign up.' } 
      };
    }
  };

  const registerProvider = async (
    email: string, 
    password: string, 
    fullName: string,
    companyName: string,
    companyAddress?: string,
    contactPhone?: string
  ): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'provider',
            company_name: companyName,
            company_address: companyAddress,
            contact_phone: contactPhone
          }
        }
      });

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred during provider registration.' } 
      };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (userData: Partial<UserMetadata>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "An unexpected error occurred while updating your profile.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Check if user has admin role
  const isAdmin = user?.role === 'admin' || user?.user_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoading: loading,
      isAdmin,
      signIn, 
      signUp,
      register: signUp, // Alias for compatibility
      registerProvider, 
      signOut,
      logout: signOut, // Alias for compatibility
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
