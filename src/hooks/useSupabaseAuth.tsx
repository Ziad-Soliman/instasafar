
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthResult {
  success: boolean;
  error?: {
    message: string;
  };
}

export function useSupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Regular user registration
  const registerUser = async (email: string, password: string, fullName: string): Promise<AuthResult> => {
    setLoading(true);
    
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
        error: { message: 'An unexpected error occurred during registration.' } 
      };
    } finally {
      setLoading(false);
    }
  };

  // Provider registration
  const registerProvider = async (
    email: string, 
    password: string, 
    fullName: string,
    companyName: string,
    companyAddress?: string,
    contactPhone?: string
  ): Promise<AuthResult> => {
    setLoading(true);
    
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
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    
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
        error: { message: 'An unexpected error occurred during login.' } 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<AuthResult> => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { success: false, error: { message: error.message } };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: { message: 'An unexpected error occurred during logout.' } 
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    registerUser,
    registerProvider,
    login,
    logout
  };
}
