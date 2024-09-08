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
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { withRoleAuth } from "@/components/withRoleAuth";

// Mock data for the student dashboard
const mockStudentData = {
  name: "John Doe",
  college: "University of Technology",
  course: "Computer Science",
  year: "3rd Year",
  profileCompleteness: 75,
  skills: ["JavaScript", "React", "Node.js", "Python", "Machine Learning"],
  projects: [
    {
      id: 1,
      name: "E-commerce Website",
      description: "Built using MERN stack",
    },
    {
      id: 2,
      name: "Machine Learning Model",
      description: "Predictive analysis for stock market",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "Hackathon Winner",
      description: "First place in college annual hackathon",
    },
    {
      id: 2,
      title: "Dean's List",
      description: "Maintained a GPA above 3.5 for 2 consecutive semesters",
    },
  ],
  upcomingEvents: [
    { id: 1, title: "Tech Talk: AI in Healthcare", date: "2024-09-15" },
    { id: 2, title: "Career Fair", date: "2024-09-20" },
  ],
  notifications: [
    {
      id: 1,
      message: "Your profile has been viewed by 3 companies this week",
      isNew: true,
    },
    {
      id: 2,
      message: "New internship opportunity matching your skills",
      isNew: true,
    },
    { id: 3, message: "Reminder: Update your project portfolio", isNew: false },
  ],
};

const StudentDashboard: React.FC = () => {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  const [isProfilePublic, setIsProfilePublic] = useState(true);
  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (status === "unauthenticated" || session?.user?.role !== "STUDENT") {
  //     router.push("/login");
  //   }
  // }, [status, session, router]);
  // if (status === "loading") {
  //   return <div className="flex text-center mx-auto">Loading...</div>;
  // }
  // if (status === "unauthenticated" || session?.user?.role !== "STUDENT") {
  //   router.push("/login");
  //   return <div className="flex text-center mx-auto">Redirecting...</div>;
  // }

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
              <button className="flex items-center w-full p-2 rounded hover:bg-gray-200">
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
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
    </div>
  );
};

export default withRoleAuth(StudentDashboard, ["STUDENT"]);
