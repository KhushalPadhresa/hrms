"use client";

import { DashboardOverview } from "@/components/dashboard-overview";
import { useEmployee } from "@/contexts/employee-context";

export default function Dashboard() {
  const { employees } = useEmployee();

  return <DashboardOverview employees={employees} />;
}
