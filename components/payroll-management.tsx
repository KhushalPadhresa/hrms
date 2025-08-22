"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DollarSign,
  Download,
  Eye,
  CalendarIcon,
  Users,
  TrendingUp,
  FileText,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending" | "processing";
  payDate?: string;
}

interface SalarySlip {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  month: string;
  year: number;
  basicSalary: number;
  hra: number;
  transportAllowance: number;
  medicalAllowance: number;
  otherAllowances: number;
  providentFund: number;
  tax: number;
  otherDeductions: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  payDate: string;
}

const mockPayrollRecords: PayrollRecord[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    month: "December",
    year: 2024,
    basicSalary: 75000,
    allowances: 15000,
    deductions: 12000,
    netSalary: 78000,
    status: "paid",
    payDate: "2024-12-31",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Jane Smith",
    month: "December",
    year: 2024,
    basicSalary: 85000,
    allowances: 17000,
    deductions: 14000,
    netSalary: 88000,
    status: "paid",
    payDate: "2024-12-31",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Mike Johnson",
    month: "December",
    year: 2024,
    basicSalary: 65000,
    allowances: 13000,
    deductions: 10000,
    netSalary: 68000,
    status: "pending",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "Sarah Wilson",
    month: "December",
    year: 2024,
    basicSalary: 70000,
    allowances: 14000,
    deductions: 11000,
    netSalary: 73000,
    status: "processing",
  },
];

const mockSalarySlips: SalarySlip[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    month: "December",
    year: 2024,
    basicSalary: 75000,
    hra: 7500,
    transportAllowance: 2500,
    medicalAllowance: 2000,
    otherAllowances: 3000,
    providentFund: 9000,
    tax: 2500,
    otherDeductions: 500,
    grossSalary: 90000,
    totalDeductions: 12000,
    netSalary: 78000,
    payDate: "2024-12-31",
  },
];

export function PayrollManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSlip, setSelectedSlip] = useState<SalarySlip | null>(null);

  const filteredRecords = mockPayrollRecords.filter((record) => {
    const matchesSearch = record.employeeName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPayroll = mockPayrollRecords.reduce(
    (sum, record) => sum + record.netSalary,
    0
  );
  const paidRecords = mockPayrollRecords.filter(
    (record) => record.status === "paid"
  );
  const pendingRecords = mockPayrollRecords.filter(
    (record) => record.status === "pending"
  );

  const SalarySlipModal = ({ slip }: { slip: SalarySlip }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          Salary Slip - {slip.month} {slip.year}
        </DialogTitle>
        <DialogDescription>Employee: {slip.employeeName}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h2 className="text-xl font-bold">Company Name</h2>
          <p className="text-sm text-muted-foreground">
            Salary Slip for {slip.month} {slip.year}
          </p>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">Employee Name</Label>
            <p className="text-sm">{slip.employeeName}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Position</Label>
            <p className="text-sm">{slip.position}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Department</Label>
            <p className="text-sm">{slip.department}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Pay Date</Label>
            <p className="text-sm">{slip.payDate}</p>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="grid grid-cols-2 gap-6">
          {/* Earnings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Earnings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Basic Salary</span>
                <span>${slip.basicSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>HRA</span>
                <span>${slip.hra.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transport Allowance</span>
                <span>${slip.transportAllowance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Medical Allowance</span>
                <span>${slip.medicalAllowance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Allowances</span>
                <span>${slip.otherAllowances.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t pt-2">
                <span>Gross Salary</span>
                <span>${slip.grossSalary.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Deductions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Deductions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Provident Fund</span>
                <span>${slip.providentFund.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${slip.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Deductions</span>
                <span>${slip.otherDeductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium border-t pt-2">
                <span>Total Deductions</span>
                <span>${slip.totalDeductions.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Net Salary */}
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Net Salary</span>
              <span className="text-2xl font-bold text-primary">
                ${slip.netSalary.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Payroll Management
        </h1>
        <p className="text-muted-foreground">
          Manage employee salaries, generate pay slips, and track payroll
          history.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalPayroll.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paid Employees
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paidRecords.length}</div>
            <p className="text-xs text-muted-foreground">
              Out of {mockPayrollRecords.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRecords.length}</div>
            <p className="text-xs text-muted-foreground">Requires processing</p>
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
              $
              {Math.round(
                totalPayroll / mockPayrollRecords.length
              ).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payroll" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payroll">Payroll Management</TabsTrigger>
          <TabsTrigger value="salary-slips">Salary Slips</TabsTrigger>
          <TabsTrigger value="salary-history">Salary History</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Payroll</CardTitle>
                  <CardDescription>
                    Manage and process employee salaries for December 2024
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Process Payroll
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month/Year</TableHead>
                    <TableHead>Basic Salary</TableHead>
                    <TableHead>Allowances</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.employeeName}
                      </TableCell>
                      <TableCell>
                        {record.month} {record.year}
                      </TableCell>
                      <TableCell>
                        ${record.basicSalary.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${record.allowances.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        ${record.deductions.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        ${record.netSalary.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "paid"
                              ? "default"
                              : record.status === "processing"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary-slips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Salary Slips</CardTitle>
              <CardDescription>
                Generate and view detailed salary slips for employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockSalarySlips.map((slip) => (
                  <Card
                    key={slip.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src="/placeholder.svg"
                            alt={slip.employeeName}
                          />
                          <AvatarFallback>
                            {slip.employeeName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm">
                            {slip.employeeName}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {slip.position}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Period:</span>
                          <span>
                            {slip.month} {slip.year}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Gross Salary:</span>
                          <span>${slip.grossSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Net Salary:</span>
                          <span className="text-primary">
                            ${slip.netSalary.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <SalarySlipModal slip={slip} />
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary-history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Salary History</CardTitle>
                  <CardDescription>
                    Track salary changes and payment history over time
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Previous Salary</TableHead>
                    <TableHead>Current Salary</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Effective Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>Nov 2024 → Dec 2024</TableCell>
                    <TableCell>$72,000</TableCell>
                    <TableCell>$75,000</TableCell>
                    <TableCell className="text-green-600">
                      +$3,000 (4.2%)
                    </TableCell>
                    <TableCell>Dec 1, 2024</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>Oct 2024 → Nov 2024</TableCell>
                    <TableCell>$80,000</TableCell>
                    <TableCell>$85,000</TableCell>
                    <TableCell className="text-green-600">
                      +$5,000 (6.3%)
                    </TableCell>
                    <TableCell>Nov 1, 2024</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
