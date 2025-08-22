"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  DollarSign,
  User,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  salary: number;
  joinDate: string;
  avatar?: string;
  phone: string;
  address: string;
  bio: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface EmployeeProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onUpdateUser?: (user: {
    name: string;
    email: string;
    avatar?: string;
  }) => void;
}

export function EmployeeProfile({ user, onUpdateUser }: EmployeeProfileProps) {
  const [profile, setProfile] = useState<UserProfile>({
    id: "current-user",
    name: user?.name || "John Admin",
    email: user?.email || "john.admin@company.com",
    position: "Senior Software Engineer",
    department: "Engineering",
    status: "active",
    salary: 95000,
    joinDate: "2022-03-15",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    bio: "Passionate software engineer with 5+ years of experience in full-stack development. Love working with modern technologies and building scalable applications.",
    emergencyContact: {
      name: "Jane Admin",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<
    "personal" | "employment" | "emergency"
  >("personal");

  const getStatusBadge = (status: UserProfile["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      inactive: "bg-red-100 text-red-800 hover:bg-red-100",
      "on-leave": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    };

    return (
      <Badge className={colors[status]}>
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleUpdateProfile = (formData: FormData) => {
    const updatedProfile = { ...profile };

    if (editingSection === "personal") {
      updatedProfile.name = formData.get("name") as string;
      updatedProfile.email = formData.get("email") as string;
      updatedProfile.phone = formData.get("phone") as string;
      updatedProfile.address = formData.get("address") as string;
      updatedProfile.bio = formData.get("bio") as string;

      if (onUpdateUser) {
        onUpdateUser({
          name: updatedProfile.name,
          email: updatedProfile.email,
          avatar: updatedProfile.avatar,
        });
      }
    } else if (editingSection === "employment") {
      updatedProfile.position = formData.get("position") as string;
      updatedProfile.department = formData.get("department") as string;
    } else if (editingSection === "emergency") {
      updatedProfile.emergencyContact = {
        name: formData.get("emergencyName") as string,
        phone: formData.get("emergencyPhone") as string,
        relationship: formData.get("emergencyRelationship") as string,
      };
    }

    setProfile(updatedProfile);
    setIsEditDialogOpen(false);

    toast("Your profile information has been updated successfully.");
  };

  const openEditDialog = (section: "personal" | "employment" | "emergency") => {
    setEditingSection(section);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal and employment information
          </p>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profile.avatar || "/placeholder.svg?height=96&width=96"}
                />
                <AvatarFallback className="text-2xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                {getStatusBadge(profile.status)}
              </div>
              <p className="text-lg text-muted-foreground mb-1">
                {profile.position}
              </p>
              <p className="text-sm text-muted-foreground">
                {profile.department} Department
              </p>
              <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="employment">Employment Details</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your personal details and contact information
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog("personal")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </Label>
                    <p className="text-sm font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{profile.email}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{profile.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Address
                    </Label>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm">{profile.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Bio
                </Label>
                <p className="text-sm mt-1">{profile.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Employment Details</CardTitle>
                <CardDescription>
                  Your role and employment information
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog("employment")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Position
                    </Label>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">{profile.position}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Department
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{profile.department}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Join Date
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">
                        {new Date(profile.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Annual Salary
                    </Label>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        ${profile.salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Emergency Contact</CardTitle>
                <CardDescription>
                  Contact information for emergencies
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog("emergency")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Contact Name
                  </Label>
                  <p className="text-sm font-medium">
                    {profile.emergencyContact.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </Label>
                  <p className="text-sm">{profile.emergencyContact.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Relationship
                  </Label>
                  <p className="text-sm">
                    {profile.emergencyContact.relationship}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Edit{" "}
              {editingSection === "personal"
                ? "Personal Information"
                : editingSection === "employment"
                ? "Employment Details"
                : "Emergency Contact"}
            </DialogTitle>
            <DialogDescription>
              Update your{" "}
              {editingSection === "personal"
                ? "personal details"
                : editingSection === "employment"
                ? "employment information"
                : "emergency contact information"}
            </DialogDescription>
          </DialogHeader>
          <form action={handleUpdateProfile}>
            <div className="grid gap-4 py-4">
              {editingSection === "personal" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={profile.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={profile.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={profile.phone}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      defaultValue={profile.address}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      defaultValue={profile.bio}
                      rows={3}
                    />
                  </div>
                </>
              )}
              {editingSection === "employment" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      defaultValue={profile.position}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      name="department"
                      defaultValue={profile.department}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Human Resources">
                          Human Resources
                        </SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {editingSection === "emergency" && (
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">Contact Name</Label>
                      <Input
                        id="emergencyName"
                        name="emergencyName"
                        defaultValue={profile.emergencyContact.name}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        defaultValue={profile.emergencyContact.phone}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyRelationship">Relationship</Label>
                    <Select
                      name="emergencyRelationship"
                      defaultValue={profile.emergencyContact.relationship}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Spouse">Spouse</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
