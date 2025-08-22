"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserCheck, Calendar, DollarSign, Award } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  salary: number;
  joinDate: string;
  avatar?: string;
}

interface DashboardOverviewProps {
  employees: Employee[];
}

export function DashboardOverview({ employees }: DashboardOverviewProps) {
  const activeEmployees = employees.filter((emp) => emp.status === "active");
  const onLeaveEmployees = employees.filter((emp) => emp.status === "on-leave");
  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "inactive"
  );

  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalSalary / employees.length;

  const recentJoins = employees
    .sort(
      (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    )
    .slice(0, 5);

  const departmentStats = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your company.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Employees
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees.length}</div>
            <p className="text-xs text-muted-foreground">
              {((activeEmployees.length / employees.length) * 100).toFixed(1)}%
              of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onLeaveEmployees.length}</div>
            <p className="text-xs text-muted-foreground">
              {onLeaveEmployees.length > 0
                ? "Temporary absences"
                : "All present"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Salary
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageSalary.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total payroll: ${totalSalary.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Employees */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Hires</CardTitle>
            <CardDescription>
              Latest employees who joined the company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJoins.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={employee.avatar || "/placeholder.svg"}
                      alt={employee.name}
                    />
                    <AvatarFallback>
                      {employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {employee.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {employee.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        employee.status === "active"
                          ? "default"
                          : employee.status === "on-leave"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {employee.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>
              Employee distribution by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(departmentStats).map(([dept, count]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium">{dept}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {count} employees
                    </span>
                    <Badge variant="outline">
                      {((count / employees.length) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">View All Employees</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Manage Leave Requests</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Process Payroll</span>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Performance Reviews</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
