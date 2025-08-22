"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Users,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

interface LeaveApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  employeeAvatar?: string;
  leaveType:
    | "vacation"
    | "sick"
    | "personal"
    | "maternity"
    | "paternity"
    | "emergency";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewComments?: string;
}

const mockLeaveApplications: LeaveApplication[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "John Doe",
    employeeEmail: "john.doe@company.com",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
    leaveType: "vacation",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    days: 6,
    reason: "Family vacation to Europe",
    status: "pending",
    appliedDate: "2024-02-20",
  },
  {
    id: "2",
    employeeId: "2",
    employeeName: "Jane Smith",
    employeeEmail: "jane.smith@company.com",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
    leaveType: "sick",
    startDate: "2024-02-28",
    endDate: "2024-03-01",
    days: 2,
    reason: "Medical appointment and recovery",
    status: "approved",
    appliedDate: "2024-02-25",
    reviewedBy: "Admin User",
    reviewedDate: "2024-02-26",
    reviewComments: "Approved for medical reasons",
  },
  {
    id: "3",
    employeeId: "3",
    employeeName: "Mike Johnson",
    employeeEmail: "mike.johnson@company.com",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
    leaveType: "personal",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    days: 3,
    reason: "Personal matters to attend",
    status: "rejected",
    appliedDate: "2024-02-15",
    reviewedBy: "Admin User",
    reviewedDate: "2024-02-18",
    reviewComments: "Insufficient notice period",
  },
  {
    id: "4",
    employeeId: "4",
    employeeName: "Sarah Wilson",
    employeeEmail: "sarah.wilson@company.com",
    employeeAvatar: "/placeholder.svg?height=32&width=32",
    leaveType: "maternity",
    startDate: "2024-05-01",
    endDate: "2024-08-01",
    days: 92,
    reason: "Maternity leave for newborn",
    status: "approved",
    appliedDate: "2024-01-15",
    reviewedBy: "Admin User",
    reviewedDate: "2024-01-16",
    reviewComments: "Approved as per company policy",
  },
];

interface LeaveManagementProps {
  onBack?: () => void;
}

export function LeaveManagement({ onBack }: LeaveManagementProps) {
  const [applications, setApplications] = useState<LeaveApplication[]>(
    mockLeaveApplications
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedApplication, setSelectedApplication] =
    useState<LeaveApplication | null>(null);
  const [reviewComments, setReviewComments] = useState("");

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.reason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      const matchesType = typeFilter === "all" || app.leaveType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, searchTerm, statusFilter, typeFilter]);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(
      (app) => app.status === "pending"
    ).length;
    const approved = applications.filter(
      (app) => app.status === "approved"
    ).length;
    const rejected = applications.filter(
      (app) => app.status === "rejected"
    ).length;

    return { total, pending, approved, rejected };
  }, [applications]);

  const handleStatusUpdate = (
    applicationId: string,
    newStatus: "approved" | "rejected"
  ) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? {
              ...app,
              status: newStatus,
              reviewedBy: "Admin User",
              reviewedDate: new Date().toISOString().split("T")[0],
              reviewComments: reviewComments || undefined,
            }
          : app
      )
    );

    const application = applications.find((app) => app.id === applicationId);
    if (application) {
      toast(
        `${application.employeeName}'s leave application has been ${newStatus}.`
      );
    }

    setSelectedApplication(null);
    setReviewComments("");
  };

  const getStatusBadge = (status: LeaveApplication["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
    }
  };

  const getLeaveTypeBadge = (type: LeaveApplication["leaveType"]) => {
    const colors = {
      vacation: "bg-blue-100 text-blue-800",
      sick: "bg-red-100 text-red-800",
      personal: "bg-purple-100 text-purple-800",
      maternity: "bg-pink-100 text-pink-800",
      paternity: "bg-indigo-100 text-indigo-800",
      emergency: "bg-orange-100 text-orange-800",
    };

    return (
      <Badge variant="outline" className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Leave Management
          </h1>
          <p className="text-muted-foreground">
            Review and manage employee leave applications
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Applications
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.approved}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
          <CardDescription>
            Review and manage all employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee name, email, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="vacation">Vacation</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="maternity">Maternity</SelectItem>
                <SelectItem value="paternity">Paternity</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Applications Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          No leave applications found
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                application.employeeAvatar || "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {application.employeeName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {application.employeeName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {application.employeeEmail}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getLeaveTypeBadge(application.leaveType)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {application.days} days
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(application.startDate)} -{" "}
                            {formatDate(application.endDate)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(application.appliedDate)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(application.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setSelectedApplication(application)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>
                                Leave Application Details
                              </DialogTitle>
                              <DialogDescription>
                                Review and manage this leave application
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-6">
                                {/* Employee Info */}
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage
                                      src={
                                        selectedApplication.employeeAvatar ||
                                        "/placeholder.svg"
                                      }
                                    />
                                    <AvatarFallback>
                                      {selectedApplication.employeeName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-semibold">
                                      {selectedApplication.employeeName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplication.employeeEmail}
                                    </p>
                                  </div>
                                </div>

                                {/* Leave Details */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">
                                      Leave Type
                                    </label>
                                    <div className="mt-1">
                                      {getLeaveTypeBadge(
                                        selectedApplication.leaveType
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Status
                                    </label>
                                    <div className="mt-1">
                                      {getStatusBadge(
                                        selectedApplication.status
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Start Date
                                    </label>
                                    <p className="mt-1">
                                      {formatDate(
                                        selectedApplication.startDate
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      End Date
                                    </label>
                                    <p className="mt-1">
                                      {formatDate(selectedApplication.endDate)}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Duration
                                    </label>
                                    <p className="mt-1">
                                      {selectedApplication.days} days
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">
                                      Applied Date
                                    </label>
                                    <p className="mt-1">
                                      {formatDate(
                                        selectedApplication.appliedDate
                                      )}
                                    </p>
                                  </div>
                                </div>

                                {/* Reason */}
                                <div>
                                  <label className="text-sm font-medium">
                                    Reason
                                  </label>
                                  <p className="mt-1 p-3 bg-muted rounded-md">
                                    {selectedApplication.reason}
                                  </p>
                                </div>

                                {/* Review Section */}
                                {selectedApplication.status === "pending" && (
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">
                                        Review Comments (Optional)
                                      </label>
                                      <Textarea
                                        placeholder="Add comments for your decision..."
                                        value={reviewComments}
                                        onChange={(e) =>
                                          setReviewComments(e.target.value)
                                        }
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedApplication.id,
                                            "approved"
                                          )
                                        }
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() =>
                                          handleStatusUpdate(
                                            selectedApplication.id,
                                            "rejected"
                                          )
                                        }
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Review History */}
                                {selectedApplication.status !== "pending" && (
                                  <div>
                                    <label className="text-sm font-medium">
                                      Review Details
                                    </label>
                                    <div className="mt-1 p-3 bg-muted rounded-md space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>Reviewed by:</span>
                                        <span className="font-medium">
                                          {selectedApplication.reviewedBy}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Review date:</span>
                                        <span>
                                          {selectedApplication.reviewedDate &&
                                            formatDate(
                                              selectedApplication.reviewedDate
                                            )}
                                        </span>
                                      </div>
                                      {selectedApplication.reviewComments && (
                                        <div>
                                          <span className="text-sm font-medium">
                                            Comments:
                                          </span>
                                          <p className="text-sm mt-1">
                                            {selectedApplication.reviewComments}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
