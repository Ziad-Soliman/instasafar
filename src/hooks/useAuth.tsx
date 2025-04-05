
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    role?: 'user' | 'provider' | 'admin';
  };
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
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  registerProvider: (
    email: string, 
    password: string, 
    fullName: string,
    companyName: string,
    companyAddress?: string,
    contactPhone?: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  registerProvider: async () => ({ success: false }),
  signOut: async () => {},
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
        setUser(session?.user as User | null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user as User | null);
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

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, registerProvider, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
