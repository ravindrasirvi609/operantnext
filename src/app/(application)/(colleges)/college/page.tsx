"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  Users,
  Briefcase,
  FileText,
  Award,
  Building,
  Bell,
  Settings,
  ChevronRight,
  Search,
  Plus,
  TrendingUp,
  UserCheck,
  Calendar,
  Filter,
  BookOpen,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Mock data for the pharmacy college dashboard
const mockPharmacyData = {
  name: "Dr. D. Y. Patil Institute of Pharmaceutical Sciences & Research",
  type: "Pharmacy Education and Research Institute",
  location: "Pune, Maharashtra, India",
  studentCount: 1200,
  facultyCount: 80,
  departments: 8,
  verificationRequests: 30,
  placementRate: 88,
  averageSalary: 600000,
  upcomingEvents: [
    {
      id: 1,
      name: "Pharmacy Career Expo",
      date: "2024-11-05",
      time: "9:00 AM - 3:00 PM",
    },
    {
      id: 2,
      name: "Pharma Research Symposium",
      date: "2024-11-18",
      time: "2:00 PM - 5:00 PM",
    },
  ],
  recentVerifications: [
    {
      id: 1,
      name: "Rajesh Sharma",
      department: "Pharmaceutical Chemistry",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Patil",
      department: "Pharmacology",
      status: "Verified",
    },
    {
      id: 3,
      name: "Anil Desai",
      department: "Pharmaceutics",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sunita Rao",
      department: "Pharmacognosy",
      status: "Verified",
    },
  ],
  topCompanies: [
    "Cipla Ltd.",
    "Sun Pharmaceutical Industries",
    "Dr. Reddy's Laboratories",
    "Lupin Pharmaceuticals",
  ],
  notifications: [
    {
      id: 1,
      message:
        "New student verification request from Pharmaceutical Chemistry department",
      isNew: true,
    },
    {
      id: 2,
      message: "Reminder: Research Symposium registration ends soon",
      isNew: true,
    },
    {
      id: 3,
      message: "Placement update: New partnerships with 3 pharma companies",
      isNew: false,
    },
  ],
};

const PharmacyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="bg-indigo-900 text-white w-64 min-h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src="/dpu.jpg" alt={mockPharmacyData.name} />
          <AvatarFallback>{mockPharmacyData.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-center">
          {mockPharmacyData.name}
        </h2>
        <p className="text-sm opacity-75">{mockPharmacyData.type}</p>
        <p className="text-sm opacity-75">{mockPharmacyData.location}</p>
      </div>
      <nav>
        <ul>
          {[
            { name: "Overview", icon: GraduationCap },
            { name: "Students", icon: Users },
            { name: "Faculty", icon: BookOpen },
            { name: "Departments", icon: Building },
            { name: "Verifications", icon: FileText },
            { name: "Placements", icon: Briefcase },
            { name: "Events", icon: Calendar },
            { name: "Reports", icon: TrendingUp },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setActiveTab(item.name.toLowerCase())}
                className={`flex items-center w-full p-2 rounded transition-colors ${
                  activeTab === item.name.toLowerCase()
                    ? "bg-indigo-700 text-white"
                    : "text-indigo-100 hover:bg-indigo-800"
                }`}
              >
                <item.icon className="mr-2" size={20} />
                {item.name}
                <ChevronRight className="ml-auto" size={16} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  const CollegeMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        {
          title: "Total Students",
          value: mockPharmacyData.studentCount,
          icon: Users,
          color: "text-blue-600",
        },
        {
          title: "Faculty Members",
          value: mockPharmacyData.facultyCount,
          icon: BookOpen,
          color: "text-green-600",
        },
        {
          title: "Departments",
          value: mockPharmacyData.departments,
          icon: Building,
          color: "text-yellow-600",
        },
        {
          title: "Verification Requests",
          value: mockPharmacyData.verificationRequests,
          icon: FileText,
          color: "text-purple-600",
        },
      ].map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% from last semester
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const PlacementStats = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Placement Statistics</CardTitle>
        <CardDescription>
          Overview of student placements and salaries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Placement Rate</span>
              <span className="text-sm font-medium">
                {mockPharmacyData.placementRate}%
              </span>
            </div>
            <Progress value={mockPharmacyData.placementRate} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Average Salary</span>
              <span className="text-sm font-medium">
                ₹{mockPharmacyData.averageSalary.toLocaleString()}
              </span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Detailed Report
        </Button>
      </CardFooter>
    </Card>
  );

  const RecentVerifications = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Verifications</CardTitle>
        <CardDescription>Latest student verification requests</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPharmacyData.recentVerifications.map((verification) => (
              <TableRow key={verification.id}>
                <TableCell className="font-medium">
                  {verification.name}
                </TableCell>
                <TableCell>{verification.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      verification.status === "Verified"
                        ? "default" // Changed from "success" to "default"
                        : "secondary"
                    }
                  >
                    {verification.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <CollegeMetrics />
        <PlacementStats />
        <RecentVerifications />
      </main>
    </div>
  );
};

export default PharmacyDashboard;
