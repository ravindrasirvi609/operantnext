"use client";
import React, { useState } from "react";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  Search,
  Plus,
  TrendingUp,
  UserCheck,
  Calendar,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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

// Mock data for the company dashboard
const mockCompanyData = {
  name: "TechInnovate Solutions",
  industry: "Information Technology",
  location: "San Francisco, CA",
  employeeCount: 500,
  activeJobListings: 15,
  applicationsReceived: 230,
  interviewsScheduled: 45,
  offersExtended: 12,
  upcomingEvents: [
    {
      id: 1,
      name: "Tech Talk: AI in Business",
      date: "2024-09-15",
      time: "2:00 PM",
    },
    {
      id: 2,
      name: "Career Fair: University of Technology",
      date: "2024-09-20",
      time: "10:00 AM",
    },
  ],
  recentApplications: [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Software Engineer",
      status: "Under Review",
    },
    {
      id: 2,
      name: "Bob Williams",
      position: "Data Scientist",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      name: "Carol Davis",
      position: "UX Designer",
      status: "Offer Extended",
    },
    {
      id: 4,
      name: "David Brown",
      position: "Product Manager",
      status: "Application Received",
    },
  ],
  topSkillsInDemand: [
    "JavaScript",
    "Python",
    "Machine Learning",
    "React",
    "AWS",
  ],
  notifications: [
    {
      id: 1,
      message: "New applicant for Software Engineer position",
      isNew: true,
    },
    {
      id: 2,
      message: "Interview scheduled with Bob Williams for Data Scientist role",
      isNew: true,
    },
    {
      id: 3,
      message: "Career fair registration deadline approaching",
      isNew: false,
    },
  ],
};

const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="bg-gray-100 w-64 min-h-screen p-4 border-r">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src="/placeholder-company-logo.jpg"
            alt={mockCompanyData.name}
          />
          <AvatarFallback>{mockCompanyData.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-center">
          {mockCompanyData.name}
        </h2>
        <p className="text-sm text-gray-600">{mockCompanyData.industry}</p>
        <p className="text-sm text-gray-600">{mockCompanyData.location}</p>
      </div>
      <nav>
        <ul>
          {[
            { name: "Overview", icon: Building2 },
            { name: "Job Listings", icon: Briefcase },
            { name: "Applicants", icon: Users },
            { name: "Interviews", icon: Calendar },
            { name: "Reports", icon: FileText },
            { name: "Messages", icon: MessageSquare },
            { name: "Notifications", icon: Bell },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setActiveTab(item.name.toLowerCase())}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === item.name.toLowerCase()
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-200"
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

  const RecruitmentMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        {
          title: "Active Job Listings",
          value: mockCompanyData.activeJobListings,
          icon: Briefcase,
          color: "text-blue-600",
        },
        {
          title: "Applications Received",
          value: mockCompanyData.applicationsReceived,
          icon: FileText,
          color: "text-green-600",
        },
        {
          title: "Interviews Scheduled",
          value: mockCompanyData.interviewsScheduled,
          icon: Calendar,
          color: "text-yellow-600",
        },
        {
          title: "Offers Extended",
          value: mockCompanyData.offersExtended,
          icon: UserCheck,
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
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const RecentApplications = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>A list of recent job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCompanyData.recentApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.name}
                </TableCell>
                <TableCell>{application.position}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      application.status === "Under Review"
                        ? "secondary"
                        : application.status === "Interview Scheduled"
                        ? "outline"
                        : application.status === "Offer Extended"
                        ? "default"
                        : "default"
                    }
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const UpcomingEvents = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockCompanyData.upcomingEvents.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{event.name}</h4>
                <p className="text-sm text-gray-600">
                  {event.date} at {event.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const TopSkillsInDemand = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Top Skills in Demand</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {mockCompanyData.topSkillsInDemand.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const NotificationsSection = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockCompanyData.notifications.map((notification) => (
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
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome, {mockCompanyData.name}!
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input className="pl-10" placeholder="Search candidates..." />
            </div>
            <Button>
              <Plus className="mr-2" size={20} />
              Post New Job
            </Button>
          </div>
        </div>
        {activeTab === "overview" && (
          <>
            <RecruitmentMetrics />
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <RecentApplications />
                <TopSkillsInDemand />
              </div>
              <div className="col-span-1">
                <UpcomingEvents />
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

export default CompanyDashboard;
