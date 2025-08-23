"use client";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useEmployee();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);
  if (isAuthenticated) {
    return null;
  }
  return <div>{children}</div>;
};

export default Layout;
