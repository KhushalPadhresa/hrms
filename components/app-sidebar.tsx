"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  UserPlus,
  User,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  onLogout: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function AppSidebar({ onLogout, user }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "employees",
      label: "Employees",
      icon: Users,
      href: "/employees",
    },
    {
      id: "leave-management",
      label: "Leave Management",
      icon: Calendar,
      href: "/leave-management",
    },
    {
      id: "payroll",
      label: "Payroll Management",
      icon: DollarSign,
      href: "/payroll",
    },
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      href: "/profile",
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    onLogout();
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Employee Hub</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === "/employees" && pathname.startsWith("/employees"));
          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start", isCollapsed && "px-2")}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {user && (
        <div className="p-4 border-t">
          <div
            className={cn(
              "flex items-center space-x-3 mb-3",
              isCollapsed && "justify-center"
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
              isCollapsed && "px-2"
            )}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      )}
    </div>
  );
}
