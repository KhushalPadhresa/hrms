"use client";

import { EmployeeProfile } from "@/components/employee-profile";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";
import { useEmployee } from "@/contexts/employee-context";

export default function ProfilePage() {
  const { user, setUser } = useEmployee();

  return (
    <AuthGuard>
      <DashboardLayout>
        <EmployeeProfile user={user} onUpdateUser={setUser} />
      </DashboardLayout>
    </AuthGuard>
  );
}
