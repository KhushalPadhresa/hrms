"use client";

import { LeaveManagement } from "@/components/leave-management";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";

export default function LeaveManagementPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <LeaveManagement />
      </DashboardLayout>
    </AuthGuard>
  );
}
