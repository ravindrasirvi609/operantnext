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

// Updated mock data for a pharmaceutical company dashboard
const mockCompanyData = {
  name: "BioPharma Research Institute",
  industry: "Pharmaceuticals & Biotech",
  location: "Bangalore, Karnataka",
  employeeCount: 1200,
  activeJobListings: 8,
  applicationsReceived: 300,
  interviewsScheduled: 25,
  offersExtended: 10,
  upcomingEvents: [
    {
      id: 1,
      name: "Webinar: AI in Drug Discovery",
      date: "2024-10-10",
      time: "11:00 AM",
    },
    {
      id: 2,
      name: "Pharma Innovation Expo",
      date: "2024-11-15",
      time: "9:00 AM",
    },
  ],
  recentApplications: [
    {
      id: 1,
      name: "Dr. Asha Singh",
      position: "Clinical Research Scientist",
      status: "Under Review",
    },
    {
      id: 2,
      name: "Dr. Ravi Kumar",
      position: "Pharmacovigilance Officer",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      name: "Dr. Sarah Ali",
      position: "Regulatory Affairs Manager",
      status: "Offer Extended",
    },
    {
      id: 4,
      name: "Dr. David Lee",
      position: "Pharmaceutical Chemist",
      status: "Application Received",
    },
  ],
  topSkillsInDemand: [
    "Pharmaceutical Sciences",
    "Clinical Research",
    "Regulatory Affairs",
    "Drug Safety",
    "Biostatistics",
  ],
  notifications: [
    {
      id: 1,
      message: "New applicant for Clinical Research Scientist position",
      isNew: true,
    },
    {
      id: 2,
      message:
        "Interview scheduled with Dr. Ravi Kumar for Pharmacovigilance Officer role",
      isNew: true,
    },
    {
      id: 3,
      message: "Pharma Innovation Expo registration deadline approaching",
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
              +10% from last month
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
        <CardDescription>
          A list of recent job applications in pharmaceutical research roles
        </CardDescription>
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

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Pharmaceutical Dashboard</h1>
        <RecruitmentMetrics />
        <RecentApplications />
        <UpcomingEvents />
        <TopSkillsInDemand />
      </main>
    </div>
  );
};

export default CompanyDashboard;
