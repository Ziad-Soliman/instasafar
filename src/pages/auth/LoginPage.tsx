
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import EmailPasswordForm, { EmailPasswordFormValues } from "@/components/auth/EmailPasswordForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import AuthPage from "./AuthPage";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      const userRole = user.role || 'user';
      
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else if (userRole === 'provider') {
        navigate("/provider/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const handleLogin = async (data: EmailPasswordFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn(data.email, data.password);
      
      if (!result.success && result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError(t(
        "auth.unexpectedError",
        "An unexpected error occurred. Please try again."
      ));
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginContent = (
    <>
      <EmailPasswordForm
        onSubmit={handleLogin}
        submitButtonText={t("auth.signIn", "Sign In")}
        isLoading={isLoading}
        error={error}
      />
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            {t("auth.forgotPassword", "Forgot Password?")}
          </Link>
        </div>
      </div>
      
      <SocialLoginButtons 
        isLoading={isLoading}
        onStartLoading={() => setIsLoading(true)} 
      />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t("auth.noAccount", "Don't have an account?")}{" "}
          <Link
            to="/auth/register"
            className="text-primary font-medium hover:underline"
          >
            {t("auth.createAccount", "Create Account")}
          </Link>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {t("auth.areYouProvider", "Are you a service provider?")}{" "}
          <Link
            to="/auth/register-provider"
            className="text-primary font-medium hover:underline"
          >
            {t("auth.registerAsProvider", "Register here")}
          </Link>
        </p>
      </div>
    </>
  );

  return (
    <AuthPage
      title={t("auth.signInTitle", "Sign in to your account")}
      description={t("auth.signInDescription", "Enter your email and password below to sign in")}
      tabs={[
        {
          id: "login",
          label: t("auth.login", "Login"),
          content: loginContent,
        },
      ]}
    />
  );
};

export default LoginPage;
