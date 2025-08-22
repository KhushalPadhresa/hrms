"use client";

import { PayrollManagement } from "@/components/payroll-management";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";

export default function PayrollPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <PayrollManagement />
      </DashboardLayout>
    </AuthGuard>
  );
}
