"use client";

import { EmployeeProfile } from "@/components/employee-profile";
import { useEmployee } from "@/contexts/employee-context";

export default function ProfilePage() {
  const { user, setUser } = useEmployee();

  return <EmployeeProfile user={user} onUpdateUser={setUser} />;
}
