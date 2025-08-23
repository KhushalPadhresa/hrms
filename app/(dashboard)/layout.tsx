"use client";

import type React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, handleLogout } = useEmployee();

  return (
    <AuthGuard>
      <div className="flex h-screen bg-background">
        <AppSidebar user={user || undefined} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>{" "}
    </AuthGuard>
  );
}
