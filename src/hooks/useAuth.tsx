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
  isLoading: boolean;
  isAdmin: boolean;
  isProvider: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  register: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  registerProvider: (
    email: string, 
    password: string, 
    fullName: string,
    companyName: string,
    companyAddress?: string,
    contactPhone?: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserMetadata>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string) => Promise<AuthResult>;
  createDemoAccounts: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoading: true,
  isAdmin: false,
  isProvider: false,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  register: async () => ({ success: false }),
  registerProvider: async () => ({ success: false }),
  signOut: async () => {},
  logout: async () => {},
  updateProfile: async () => false,
  resetPassword: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  createDemoAccounts: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: session.user.user_metadata,
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

  const createDemoAccounts = async (): Promise<void> => {
    try {
      // Create admin account
      try {
        await supabase.auth.signUp({
          email: 'admin@instasafar.com',
          password: 'password123',
          options: {
            data: {
              full_name: 'Admin User',
              role: 'admin'
            }
          }
        });
      } catch (error) {
        // Account might already exist
      }

      // Create provider account
      try {
        await supabase.auth.signUp({
          email: 'provider@instasafar.com',
          password: 'password123',
          options: {
            data: {
              full_name: 'Provider User',
              role: 'provider',
              company_name: 'Example Provider'
            }
          }
        });
      } catch (error) {
        // Account might already exist
      }

      // Create regular user account
      try {
        await supabase.auth.signUp({
          email: 'user@instasafar.com',
          password: 'password123',
          options: {
            data: {
              full_name: 'Regular User',
              role: 'user'
            }
          }
        });
      } catch (error) {
        // Account might already exist
      }
    } catch (error) {
      console.error('Error creating demo accounts:', error);
    }
  };

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

  const resetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred while sending the password reset email.' } 
      };
    }
  };

  const updatePassword = async (password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred while updating your password.' } 
      };
    }
  };

  const isAdmin = user?.role === 'admin' || user?.user_metadata?.role === 'admin';
  const isProvider = user?.role === 'provider' || user?.user_metadata?.role === 'provider';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoading: loading,
      isAdmin,
      isProvider,
      signIn, 
      signUp,
      register: signUp,
      registerProvider, 
      signOut,
      logout: signOut,
      updateProfile,
      resetPassword,
      updatePassword,
      createDemoAccounts
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
