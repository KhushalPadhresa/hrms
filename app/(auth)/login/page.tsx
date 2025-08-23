"use client";

import { LoginPage } from "@/components/auth/login-page";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";

export default function Login() {
  const { handleLogin } = useEmployee();
  const router = useRouter();

  const onLogin = (email: string, password: string) => {
    handleLogin(email, password);
    router.push("/dashboard");
  };

  const onSwitchToSignup = () => {
    router.push("/signup");
  };

  return <LoginPage onLogin={onLogin} onSwitchToSignup={onSwitchToSignup} />;
}
