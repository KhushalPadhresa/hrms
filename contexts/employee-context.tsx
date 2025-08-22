"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "sonner";

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
  phone: string;
  address: string;
  bio?: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface EmployeeContextType {
  employees: Employee[];
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  handleSaveEmployee: (employee: Employee) => void;
  handleDeleteEmployee: (id: string) => void;
  handleLogin: (email: string, password: string) => void;
  handleSignup: (name: string, email: string, password: string) => void;
  handleLogout: () => void;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    position: "Software Engineer",
    department: "Engineering",
    status: "active",
    salary: 75000,
    joinDate: "2023-01-15",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    bio: "Experienced software engineer with expertise in full-stack development.",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+1 (555) 987-6543",
      relationship: "Spouse",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    position: "Product Manager",
    department: "Product",
    status: "active",
    salary: 85000,
    joinDate: "2022-08-20",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, City, State 12345",
    bio: "Strategic product manager with a focus on user experience and growth.",
    emergencyContact: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      relationship: "Spouse",
    },
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    position: "Designer",
    department: "Design",
    status: "on-leave",
    salary: 65000,
    joinDate: "2023-03-10",
    phone: "+1 (555) 456-7890",
    address: "789 Pine Rd, City, State 12345",
    bio: "Creative designer specializing in user interface and brand design.",
    emergencyContact: {
      name: "Sarah Johnson",
      phone: "+1 (555) 321-0987",
      relationship: "Sibling",
    },
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    position: "HR Manager",
    department: "Human Resources",
    status: "active",
    salary: 70000,
    joinDate: "2021-11-05",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, City, State 12345",
    bio: "HR professional focused on employee development and company culture.",
    emergencyContact: {
      name: "Mike Wilson",
      phone: "+1 (555) 456-7890",
      relationship: "Parent",
    },
  },
];

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function EmployeeProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");
    const savedEmployees = localStorage.getItem("employees");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }

    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleLogin = (email: string, password: string) => {
    const userData = {
      name: email === "admin@company.com" ? "Admin User" : "John Admin",
      email: email,
      avatar: "/placeholder.svg?height=32&width=32",
    };
    setUser(userData);
    setIsAuthenticated(true);

    toast(`Successfully logged in as ${userData.name}`);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    const userData = {
      name: name,
      email: email,
      avatar: "/placeholder.svg?height=32&width=32",
    };
    setUser(userData);
    setIsAuthenticated(true);

    toast(`Welcome to Employee Management, ${name}!`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    toast("You have been successfully logged out.");
  };

  const handleSaveEmployee = (employee: Employee) => {
    if (employee.id && employees.find((emp) => emp.id === employee.id)) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
      toast(`${employee.name}'s information has been updated successfully.`);
    } else {
      const newEmployee = {
        ...employee,
        id: employee.id || Date.now().toString(),
      };
      setEmployees((prev) => [...prev, newEmployee]);
      toast(`${employee.name} has been added to the team successfully.`);
    }
  };

  const handleDeleteEmployee = (id: string) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      toast(`${employee.name} has been removed from the team.`);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        handleSaveEmployee,
        handleDeleteEmployee,
        handleLogin,
        handleSignup,
        handleLogout,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
}
