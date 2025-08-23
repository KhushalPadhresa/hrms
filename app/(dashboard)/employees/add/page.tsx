"use client";

import { EmployeeForm } from "@/components/employee-form";
import { useEmployee } from "@/contexts/employee-context";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const { handleSaveEmployee } = useEmployee();
  const router = useRouter();

  const onSave = (employee: any) => {
    handleSaveEmployee(employee);
    router.push("/employees");
  };

  const onCancel = () => {
    router.push("/employees");
  };

  return <EmployeeForm mode="add" onSave={onSave} onCancel={onCancel} />;
}
