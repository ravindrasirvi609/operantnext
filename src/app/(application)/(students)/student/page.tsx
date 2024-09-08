"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Book,
  Award,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  Eye,
  EyeOff,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { withRoleAuth } from "@/components/withRoleAuth";
import StudentProfile from "@/components/studentProfile";
import { mockStudentData, data } from "../../../../../data";

const StudentDashboard: React.FC = () => {
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [activeSection, setActiveSection] = useState<string | undefined>();

  const Sidebar = () => (
    <div className="bg-gray-100 w-64 min-h-screen p-4 border-r">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
        <h2 className="text-xl font-bold">{mockStudentData.name}</h2>
        <p className="text-sm text-gray-600">{mockStudentData.college}</p>
        <p className="text-sm text-gray-600">
          {mockStudentData.course}, {mockStudentData.year}
        </p>
      </div>
      <nav>
        <ul>
          {[
            { name: "Profile", icon: User },
            { name: "Education", icon: Book },
            { name: "Achievements", icon: Award },
            { name: "Internships", icon: Briefcase },
            { name: "Messages", icon: MessageSquare },
            { name: "Notifications", icon: Bell },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <li key={item.name} className="mb-2">
              <button
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 ${
                  activeSection === item.name ? "bg-gray-200" : ""
                }`}
                onClick={() => setActiveSection(item.name)}
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

  const ProfileOverview = () => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Profile Overview</CardTitle>
          <div className="flex items-center">
            <span className="mr-2 text-sm">
              {isProfilePublic ? "Public" : "Private"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsProfilePublic(!isProfilePublic)}
            >
              {isProfilePublic ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-600">Profile Completeness</p>
            <p className="text-lg font-semibold">
              {mockStudentData.profileCompleteness}%
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
        </div>
        <Progress
          value={mockStudentData.profileCompleteness}
          className="w-full"
        />
      </CardContent>
    </Card>
  );

  const SkillsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {mockStudentData.skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const ProjectsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockStudentData.projects.map((project) => (
            <li key={project.id} className="border-b pb-4 last:border-b-0">
              <h4 className="font-semibold">{project.name}</h4>
              <p className="text-sm text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const AchievementsSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {mockStudentData.achievements.map((achievement) => (
            <li key={achievement.id} className="border-b pb-4 last:border-b-0">
              <h4 className="font-semibold">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </li>
          ))}
        </ul>
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
          {mockStudentData.upcomingEvents.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm">
                RSVP
              </Button>
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
          {mockStudentData.notifications.map((notification) => (
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

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Profile":
        return <StudentProfile student={data} />;
      case "Education":
        return <h2>Education Section (To be implemented)</h2>;
      case "Achievements":
        return <AchievementsSection />;
      case "Internships":
        return <h2>Internships Section (To be implemented)</h2>;
      case "Messages":
        return <h2>Messages Section (To be implemented)</h2>;
      case "Notifications":
        return <NotificationsSection />;
      case "Settings":
        return <h2>Settings Section (To be implemented)</h2>;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {!renderActiveSection() ? (
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">
            Welcome back, {mockStudentData.name}!
          </h1>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <ProfileOverview />
              <SkillsSection />
              <ProjectsSection />
              <AchievementsSection />
            </div>
            <div className="col-span-1">
              <UpcomingEvents />
              <NotificationsSection />
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">
            Welcome back, {mockStudentData.name}!
          </h1>
          {renderActiveSection()}
        </main>
      )}
    </div>
  );
};

export default withRoleAuth(StudentDashboard, ["STUDENT"]);
