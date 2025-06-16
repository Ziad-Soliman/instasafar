
import React, { useState, ChangeEvent, FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams } from "react-router-dom";
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from '@/components/ui/modern-animated-sign-in';
import { Plane, MapPin, Calendar, Users, Star, Heart } from "lucide-react";

type FormData = {
  email: string;
  password: string;
  fullName?: string;
  confirmPassword?: string;
};

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const AuthPage: React.FC = () => {
  const { signIn, register } = useAuth();
  const { t, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'login';
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab === 'register' ? 'register' : 'login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const iconsArray: OrbitIcon[] = [
    {
      component: () => <Plane className="w-6 h-6 text-saudi-green" />,
      className: 'size-[40px] border-none bg-transparent',
      duration: 20,
      delay: 20,
      radius: 100,
      path: false,
      reverse: false,
    },
    {
      component: () => <MapPin className="w-6 h-6 text-saudi-green" />,
      className: 'size-[40px] border-none bg-transparent',
      duration: 20,
      delay: 10,
      radius: 100,
      path: false,
      reverse: false,
    },
    {
      component: () => <Calendar className="w-6 h-6 text-saudi-green" />,
      className: 'size-[50px] border-none bg-transparent',
      radius: 210,
      duration: 20,
      path: false,
      reverse: false,
    },
    {
      component: () => <Users className="w-6 h-6 text-saudi-green" />,
      className: 'size-[50px] border-none bg-transparent',
      radius: 210,
      duration: 20,
      delay: 20,
      path: false,
      reverse: false,
    },
    {
      component: () => <Star className="w-6 h-6 text-saudi-green" />,
      className: 'size-[40px] border-none bg-transparent',
      duration: 20,
      delay: 20,
      radius: 150,
      path: false,
      reverse: true,
    },
    {
      component: () => <Heart className="w-6 h-6 text-saudi-green" />,
      className: 'size-[40px] border-none bg-transparent',
      duration: 20,
      delay: 10,
      radius: 150,
      path: false,
      reverse: true,
    },
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    const value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await signIn(formData.email, formData.password);
      if (!result.success && result.error) {
        setError(result.error.message);
      }
    } catch (err: any) {
      setError(err.message || t("auth.loginFailed", "Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.validation.passwordMismatch", "Passwords don't match"));
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await register(formData.email, formData.password, formData.fullName || '');
      if (!result.success && result.error) {
        setError(result.error.message);
      }
    } catch (err: any) {
      setError(err.message || t("auth.registerFailed", "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  const loginFormFields = {
    header: t("auth.signInTitle", "Welcome back"),
    subHeader: t("auth.signInDescription", "Sign in to your account"),
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: t("auth.emailPlaceholder", "Enter your email address"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: t("auth.passwordPlaceholder", "Enter your password"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: t("auth.signIn", "Sign in"),
    textVariantButton: t("auth.noAccount", "Don't have an account? Sign up"),
  };

  const registerFormFields = {
    header: t("auth.createAccount", "Create account"),
    subHeader: t("auth.signUpDescription", "Sign up to start booking your spiritual journey"),
    fields: [
      {
        label: 'Full Name',
        required: true,
        type: 'text',
        placeholder: t("auth.fullNamePlaceholder", "Your Full Name"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'fullName'),
      },
      {
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: t("auth.emailPlaceholder", "Enter your email address"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password',
        placeholder: t("auth.passwordPlaceholder", "Enter your password"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
      {
        label: 'Confirm Password',
        required: true,
        type: 'password',
        placeholder: t("auth.confirmPasswordPlaceholder", "Confirm your password"),
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'confirmPassword'),
      },
    ],
    submitButton: t("auth.signUp", "Sign up"),
    textVariantButton: t("auth.alreadyAccount", "Already have an account? Sign in"),
  };

  const switchTab = () => {
    setActiveTab(activeTab === 'login' ? 'register' : 'login');
    setError(null);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <section className='flex max-lg:justify-center'>
        {/* Left Side - Animated Logo and Icons */}
        <span className='flex flex-col justify-center w-1/2 max-lg:hidden relative'>
          <Ripple mainCircleSize={100} />
          <TechOrbitDisplay iconsArray={iconsArray} text="InstaSafar" />
        </span>

        {/* Right Side - Auth Form */}
        <span className='w-1/2 h-[100dvh] flex flex-col justify-center items-center max-lg:w-full max-lg:px-[10%]'>
          <AuthTabs
            formFields={activeTab === 'login' ? loginFormFields : registerFormFields}
            goTo={switchTab}
            handleSubmit={activeTab === 'login' ? handleLogin : handleRegister}
            isLoading={isLoading}
            errorField={error}
          />
        </span>
      </section>
    </motion.div>
  );
};

export default AuthPage;
