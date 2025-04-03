import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useSupabaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login: contextLogin, register: contextRegister, logout: contextLogout } = useAuth();

  // Initialize Supabase auth session
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            // Get user data from session
            const userData = {
              id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata.full_name,
              role: session.user.user_metadata.role || 'user',
              name: session.user.user_metadata.full_name,
              avatar: session.user.user_metadata.avatar_url
            };
            
            // Update auth context
            await contextLogin(session.user.email!, 'dummy-password-for-context');
          } catch (error) {
            console.error('Error handling auth state change:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          // Handle sign out in context
          await contextLogout();
        }
      }
    );

    // Check for existing session on startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Existing session found
        console.log('Existing session found');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [contextLogin, contextLogout]);

  // Register a new user
  const registerWithSupabase = async (email: string, password: string, full_name: string, role: 'user' | 'provider' = 'user', additionalData = {}) => {
    try {
      setLoading(true);
      
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            role,
            ...additionalData
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Call the original register function to update context
      await contextRegister(email, password, full_name);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      
      return { success: true, data };
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Log in a user
  const loginWithSupabase = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Login with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      // Call the original login function to update context
      await contextLogin(email, password);
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
      
      return { success: true, data };
      
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Log out
  const logoutFromSupabase = async () => {
    try {
      setLoading(true);
      
      // Logout from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Call the original logout function to update context
      await contextLogout();
      
      toast({
        title: "Logged out successfully",
      });
      
      return { success: true };
      
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Provider registration with additional company data
  const registerProvider = async (email: string, password: string, full_name: string, company_name: string, company_address: string = '', contact_phone: string = '') => {
    return registerWithSupabase(email, password, full_name, 'provider', {
      company_name,
      company_address,
      contact_phone
    });
  };

  return {
    loading,
    registerWithSupabase,
    loginWithSupabase,
    logoutFromSupabase,
    registerProvider
  };
};
