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
  userRole: 'user' | 'provider' | 'admin' | null;
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
  userRole: null,
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
  const [userRole, setUserRole] = useState<'user' | 'provider' | 'admin' | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('get_user_role', { _user_id: userId });
      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const role = await fetchUserRole(session.user.id);
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            user_metadata: session.user.user_metadata,
            name: session.user.user_metadata?.full_name,
            full_name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
            phone_number: session.user.user_metadata?.phone_number,
            preferred_language: session.user.user_metadata?.preferred_language || 'en',
            role: role || session.user.user_metadata?.role || 'user'
          };
          setUser(userData);
          setUserRole(role || session.user.user_metadata?.role || 'user');
        } else {
          setUser(null);
          setUserRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const role = await fetchUserRole(session.user.id);
        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          user_metadata: session.user.user_metadata,
          name: session.user.user_metadata?.full_name,
          full_name: session.user.user_metadata?.full_name,
          avatar: session.user.user_metadata?.avatar_url,
          phone_number: session.user.user_metadata?.phone_number,
          preferred_language: session.user.user_metadata?.preferred_language || 'en',
          role: role || session.user.user_metadata?.role || 'user'
        };
        setUser(userData);
        setUserRole(role || session.user.user_metadata?.role || 'user');
      } else {
        setUser(null);
        setUserRole(null);
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
        const { data: adminData } = await supabase.auth.signUp({
          email: 'admin@instasafar.com',
          password: 'password123',
          options: {
            data: {
              full_name: 'Admin User',
              role: 'admin'
            }
          }
        });
        
        if (adminData.user) {
          await supabase.from('user_roles').insert({
            user_id: adminData.user.id,
            role: 'admin'
          });
        }
      } catch (error) {
        // Account might already exist
      }

      // Create provider account
      try {
        const { data: providerData } = await supabase.auth.signUp({
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
        
        if (providerData.user) {
          await supabase.from('user_roles').insert({
            user_id: providerData.user.id,
            role: 'provider'
          });
        }
      } catch (error) {
        // Account might already exist
      }

      // Create regular user account
      try {
        const { data: userData } = await supabase.auth.signUp({
          email: 'user@instasafar.com',
          password: 'password123',
          options: {
            data: {
              full_name: 'Regular User',
              role: 'user'
            }
          }
        });
        
        if (userData.user) {
          await supabase.from('user_roles').insert({
            user_id: userData.user.id,
            role: 'user'
          });
        }
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

      // Add user role to user_roles table
      if (data.user) {
        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: 'user'
        });
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

      // Add provider role to user_roles table
      if (data.user) {
        await supabase.from('user_roles').insert({
          user_id: data.user.id,
          role: 'provider'
        });
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

  const isAdmin = userRole === 'admin';
  const isProvider = userRole === 'provider';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isLoading: loading,
      isAdmin,
      isProvider,
      userRole,
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
