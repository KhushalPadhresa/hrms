"use client";

import { EmployeeManagement } from "@/components/employee-management";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";

export default function Employees() {
  const { employees, handleDeleteEmployee } = useEmployee();
  const router = useRouter();

  const handleEditEmployee = (employee: any) => {
    router.push(`/employees/edit/${employee.id}`);
  };

  const handleAddEmployee = () => {
    router.push("/employees/add");
  };

  return (
    <EmployeeManagement
      employees={employees}
      onEditEmployee={handleEditEmployee}
      onDeleteEmployee={handleDeleteEmployee}
      onAddEmployee={handleAddEmployee}
    />
  );
}
