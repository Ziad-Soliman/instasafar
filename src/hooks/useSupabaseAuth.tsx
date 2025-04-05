
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './useAuth';

interface AuthResult {
  success: boolean;
  error?: {
    message: string;
  };
}

export function useSupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();

  // Map existing useAuth functions for compatibility
  const user = auth.user;
  const signIn = auth.signIn;
  const signUp = auth.signUp;

  // Regular user registration
  const registerUser = async (email: string, password: string, fullName: string): Promise<AuthResult> => {
    setLoading(true);
    
    try {
      const result = await auth.signUp(email, password, fullName);
      return result;
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
      const result = await auth.registerProvider(
        email, 
        password, 
        fullName, 
        companyName, 
        companyAddress, 
        contactPhone
      );
      return result;
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
      const result = await auth.signIn(email, password);
      return result;
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
      await auth.signOut();
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
    user,
    loading,
    registerUser,
    registerProvider,
    login,
    logout,
    signIn,
    signUp
  };
}
