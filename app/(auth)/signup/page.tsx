"use client";

import { SignupPage } from "@/components/auth/signup-page";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { handleSignup } = useEmployee();
  const router = useRouter();

  const onSignup = (name: string, email: string, password: string) => {
    handleSignup(name, email, password);
    router.push("/dashboard");
  };

  const onSwitchToLogin = () => {
    router.push("/login");
  };

  return <SignupPage onSignup={onSignup} onSwitchToLogin={onSwitchToLogin} />;
}
