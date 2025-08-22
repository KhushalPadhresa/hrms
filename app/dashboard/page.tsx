"use client";

import { DashboardOverview } from "@/components/dashboard-overview";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";
import { useEmployee } from "@/contexts/employee-context";

export default function Dashboard() {
  const { employees } = useEmployee();

  return (
    <AuthGuard>
      <DashboardLayout>
        <DashboardOverview employees={employees} />
      </DashboardLayout>
    </AuthGuard>
  );
}
