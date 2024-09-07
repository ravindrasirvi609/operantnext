"use client";
import React, { useState } from "react";
import {
  Users,
  Briefcase,
  GraduationCap,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaChalkboardTeacher } from "react-icons/fa";

const mockData = {
  totalUsers: 5000,
  activeCompanies: 150,
  verifiedColleges: 50,
  registeredTeachers: 500,
  recentActivity: [
    { id: 1, action: "New student registered", time: "5 minutes ago" },
    { id: 2, action: "Company updated job listing", time: "10 minutes ago" },
    {
      id: 3,
      action: "College verified student details",
      time: "15 minutes ago",
    },
    {
      id: 4,
      action: "Teacher submitted recommendation",
      time: "30 minutes ago",
    },
  ],
};

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const Sidebar = () => (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <nav>
        <ul>
          {[
            { name: "Overview", icon: BarChart2 },
            { name: "Students", icon: Users },
            { name: "Companies", icon: Briefcase },
            { name: "Colleges", icon: GraduationCap },
            { name: "Teachers", icon: FaChalkboardTeacher },
            { name: "Notifications", icon: Bell },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <li key={item.name} className="mb-2">
              <button
                onClick={() => setActiveTab(item.name.toLowerCase())}
                className={`flex items-center w-full p-2 rounded ${
                  activeTab === item.name.toLowerCase()
                    ? "bg-blue-600"
                    : "hover:bg-gray-700"
                }`}
              >
                <item.icon className="mr-2" size={20} />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <button className="flex items-center mt-auto p-2 hover:bg-gray-700 rounded">
        <LogOut className="mr-2" size={20} />
        Logout
      </button>
    </div>
  );

  const OverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { title: "Total Students", value: mockData.totalUsers, icon: Users },
        {
          title: "Active Companies",
          value: mockData.activeCompanies,
          icon: Briefcase,
        },
        {
          title: "Verified Colleges",
          value: mockData.verifiedColleges,
          icon: GraduationCap,
        },
        {
          title: "Registered Teachers",
          value: mockData.registeredTeachers,
          icon: FaChalkboardTeacher,
        },
      ].map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const RecentActivity = () => (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {mockData.recentActivity.map((activity) => (
            <li
              key={activity.id}
              className="mb-2 pb-2 border-b last:border-b-0"
            >
              <p className="font-semibold">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
        {activeTab === "overview" && (
          <>
            <OverviewTab />
            <RecentActivity />
          </>
        )}
        {activeTab !== "overview" && (
          <p className="text-xl">Content for {activeTab} tab goes here.</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
