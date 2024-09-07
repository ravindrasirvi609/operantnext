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

// Mock data for the college dashboard
const mockCollegeData = {
  name: "University of Innovation",
  type: "Public Research University",
  location: "Silicon Valley, CA",
  studentCount: 25000,
  facultyCount: 1500,
  departments: 50,
  verificationRequests: 120,
  placementRate: 92,
  averageSalary: 85000,
  upcomingEvents: [
    {
      id: 1,
      name: "Annual Job Fair",
      date: "2024-10-15",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      name: "Alumni Networking Event",
      date: "2024-10-20",
      time: "6:00 PM - 8:00 PM",
    },
  ],
  recentVerifications: [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Computer Science",
      status: "Pending",
    },
    {
      id: 2,
      name: "Bob Williams",
      department: "Electrical Engineering",
      status: "Verified",
    },
    {
      id: 3,
      name: "Carol Davis",
      department: "Business Administration",
      status: "Pending",
    },
    {
      id: 4,
      name: "David Brown",
      department: "Mechanical Engineering",
      status: "Verified",
    },
  ],
  topCompanies: [
    "Tech Innovators Inc.",
    "Global Finance Group",
    "EcoSolutions Ltd.",
    "HealthTech Systems",
  ],
  notifications: [
    {
      id: 1,
      message:
        "New student verification request from Computer Science department",
      isNew: true,
    },
    {
      id: 2,
      message: "Upcoming deadline for submitting department reports",
      isNew: true,
    },
    {
      id: 3,
      message: "Career Services update: New partnerships with 5 companies",
      isNew: false,
    },
  ],
};

const CollegeDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="bg-indigo-900 text-white w-64 min-h-screen p-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src="/placeholder-college-logo.jpg"
            alt={mockCollegeData.name}
          />
          <AvatarFallback>{mockCollegeData.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-center">
          {mockCollegeData.name}
        </h2>
        <p className="text-sm opacity-75">{mockCollegeData.type}</p>
        <p className="text-sm opacity-75">{mockCollegeData.location}</p>
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
          value: mockCollegeData.studentCount,
          icon: Users,
          color: "text-blue-600",
        },
        {
          title: "Faculty Members",
          value: mockCollegeData.facultyCount,
          icon: BookOpen,
          color: "text-green-600",
        },
        {
          title: "Departments",
          value: mockCollegeData.departments,
          icon: Building,
          color: "text-yellow-600",
        },
        {
          title: "Verification Requests",
          value: mockCollegeData.verificationRequests,
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
                {mockCollegeData.placementRate}%
              </span>
            </div>
            <Progress value={mockCollegeData.placementRate} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Average Salary</span>
              <span className="text-sm font-medium">
                ${mockCollegeData.averageSalary.toLocaleString()}
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
            {mockCollegeData.recentVerifications.map((verification) => (
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
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Verifications
        </Button>
      </CardFooter>
    </Card>
  );

  const UpcomingEvents = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockCollegeData.upcomingEvents.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{event.name}</h4>
                <p className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Events
        </Button>
      </CardFooter>
    </Card>
  );

  const TopRecruiters = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Top Recruiting Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {mockCollegeData.topCompanies.map((company, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-sm py-1 px-2"
            >
              {company}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Partners
        </Button>
      </CardFooter>
    </Card>
  );

  const NotificationsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockCollegeData.notifications.map((notification) => (
            <li key={notification.id} className="flex items-start">
              <Bell className="mr-2 mt-1 flex-shrink-0" size={16} />
              <div>
                <p
                  className={`text-sm ${
                    notification.isNew ? "font-semibold" : ""
                  }`}
                >
                  {notification.message}
                </p>
                {notification.isNew && <Badge variant="secondary">New</Badge>}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Notifications
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome, {mockCollegeData.name} Admin
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                className="pl-10"
                placeholder="Search students, faculty..."
              />
            </div>
            <Button>
              <Plus className="mr-2" size={20} />
              Add New Record
            </Button>
          </div>
        </div>
        {activeTab === "overview" && (
          <>
            <CollegeMetrics />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <PlacementStats />
                <RecentVerifications />
              </div>
              <div className="col-span-1">
                <UpcomingEvents />
                <TopRecruiters />
                <NotificationsSection />
              </div>
            </div>
          </>
        )}
        {activeTab !== "overview" && (
          <p className="text-xl">Content for {activeTab} tab goes here.</p>
        )}
      </main>
    </div>
  );
};

export default CollegeDashboard;
