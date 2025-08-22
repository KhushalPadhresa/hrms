"use client";

import { LoginPage } from "@/components/auth/login-page";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { isAuthenticated, handleLogin } = useEmployee();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onLogin = (email: string, password: string) => {
    handleLogin(email, password);
    router.push("/dashboard");
  };

  const onSwitchToSignup = () => {
    router.push("/signup");
  };

  if (isAuthenticated) {
    return null;
  }

  return <LoginPage onLogin={onLogin} onSwitchToSignup={onSwitchToSignup} />;
}
