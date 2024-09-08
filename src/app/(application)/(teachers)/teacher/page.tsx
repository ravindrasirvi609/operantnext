"use client";
import React, { useState } from "react";
import {
  User,
  Users,
  FileText,
  Award,
  BookOpen,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  Search,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock data for the teacher dashboard
const mockTeacherData = {
  name: "Dr. Jane Smith",
  department: "Computer Science",
  college: "University of Technology",
  specializations: [
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
  ],
  researchInterests: ["Natural Language Processing", "Computer Vision"],
  publications: [
    {
      id: 1,
      title: "Advancements in NLP for Low-Resource Languages",
      year: 2023,
      journal: "Journal of Computational Linguistics",
    },
    {
      id: 2,
      title: "Deep Learning Approaches for Medical Image Analysis",
      year: 2022,
      journal: "IEEE Transactions on Medical Imaging",
    },
  ],
  upcomingClasses: [
    {
      id: 1,
      name: "Introduction to Machine Learning",
      time: "10:00 AM - 11:30 AM",
      room: "CS-101",
    },
    {
      id: 2,
      name: "Advanced Data Structures",
      time: "2:00 PM - 3:30 PM",
      room: "CS-205",
    },
  ],
  pendingRecommendations: [
    { id: 1, studentName: "Alice Johnson", course: "Machine Learning" },
    { id: 2, studentName: "Bob Williams", course: "Data Structures" },
  ],
  notifications: [
    { id: 1, message: "New research grant opportunity available", isNew: true },
    {
      id: 2,
      message: "Reminder: Department meeting tomorrow at 3 PM",
      isNew: true,
    },
    {
      id: 3,
      message: "Student project submissions due next week",
      isNew: false,
    },
  ],
};

const TeacherDashboard: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  if (session.data?.user?.role !== "TEACHER") {
    router.push("/login");
    return <div className="flex text-center mx-auto">Redirecting...</div>;
  }
  const Sidebar = () => (
    <div className="bg-gray-100 w-64 min-h-screen p-4 border-r">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src="/placeholder-avatar.jpg"
            alt={mockTeacherData.name}
          />
          <AvatarFallback>
            {mockTeacherData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{mockTeacherData.name}</h2>
        <p className="text-sm text-gray-600">{mockTeacherData.department}</p>
        <p className="text-sm text-gray-600">{mockTeacherData.college}</p>
      </div>
      <nav>
        <ul>
          {[
            { name: "Overview", icon: User },
            { name: "Students", icon: Users },
            { name: "Recommendations", icon: FileText },
            { name: "Research", icon: BookOpen },
            { name: "Publications", icon: Award },
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

  const SpecializationsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Specializations & Research Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {mockTeacherData.specializations.map((spec, index) => (
              <Badge key={index} variant="secondary">
                {spec}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Research Interests</h4>
          <div className="flex flex-wrap gap-2">
            {mockTeacherData.researchInterests.map((interest, index) => (
              <Badge key={index} variant="outline">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PublicationsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recent Publications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockTeacherData.publications.map((pub) => (
            <li key={pub.id} className="border-b pb-4 last:border-b-0">
              <h4 className="font-semibold">{pub.title}</h4>
              <p className="text-sm text-gray-600">
                {pub.journal}, {pub.year}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const UpcomingClassesSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upcoming Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockTeacherData.upcomingClasses.map((cls) => (
            <li key={cls.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{cls.name}</h4>
                <p className="text-sm text-gray-600">{cls.time}</p>
                <p className="text-sm text-gray-600">Room: {cls.room}</p>
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

  const PendingRecommendationsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Pending Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockTeacherData.pendingRecommendations.map((rec) => (
            <li key={rec.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{rec.studentName}</h4>
                <p className="text-sm text-gray-600">{rec.course}</p>
              </div>
              <Button size="sm">Write Recommendation</Button>
            </li>
          ))}
        </ul>
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
          {mockTeacherData.notifications.map((notification) => (
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
            Welcome, {mockTeacherData.name}!
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input className="pl-10" placeholder="Search..." />
            </div>
            <Button>
              <Plus className="mr-2" size={20} />
              New Research Project
            </Button>
          </div>
        </div>
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <SpecializationsSection />
              <PublicationsSection />
              <UpcomingClassesSection />
            </div>
            <div className="col-span-1">
              <PendingRecommendationsSection />
              <NotificationsSection />
            </div>
          </div>
        )}
        {activeTab !== "overview" && (
          <p className="text-xl">Content for {activeTab} tab goes here.</p>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
