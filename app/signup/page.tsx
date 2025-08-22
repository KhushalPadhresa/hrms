"use client";

import { SignupPage } from "@/components/auth/signup-page";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signup() {
  const { isAuthenticated, handleSignup } = useEmployee();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSignup = (name: string, email: string, password: string) => {
    handleSignup(name, email, password);
    router.push("/dashboard");
  };

  const onSwitchToLogin = () => {
    router.push("/login");
  };

  if (isAuthenticated) {
    return null;
  }

  return <SignupPage onSignup={onSignup} onSwitchToLogin={onSwitchToLogin} />;
}
