"use client";

import { EmployeeForm } from "@/components/employee-form";
import { DashboardLayout } from "@/components/dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditEmployee() {
  const { employees, handleSaveEmployee } = useEmployee();
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string;

  const employee = employees.find((emp) => emp.id === employeeId);

  const onSave = (employee: any) => {
    handleSaveEmployee(employee);
    router.push("/employees");
  };

  const onCancel = () => {
    router.push("/employees");
  };

  if (!employee) {
    router.push("/employees");
    return null;
  }

  return (
    <AuthGuard>
      <DashboardLayout>
        <EmployeeForm
          mode="edit"
          employee={employee}
          onSave={onSave}
          onCancel={onCancel}
        />
      </DashboardLayout>
    </AuthGuard>
  );
}
