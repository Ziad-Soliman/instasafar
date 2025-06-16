
import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import AuthPage from "@/pages/auth/AuthPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProviderRegisterPage from "@/pages/auth/ProviderRegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UpdatePasswordPage from "@/pages/auth/UpdatePasswordPage";
import AuthCallbackPage from "@/pages/auth/AuthCallbackPage";

const AuthRoutes = () => (
  <Route path="/auth" element={<AuthLayout />}>
    <Route index element={<AuthPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="provider-register" element={<ProviderRegisterPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="update-password" element={<UpdatePasswordPage />} />
    <Route path="callback" element={<AuthCallbackPage />} />
  </Route>
);

export default AuthRoutes;
