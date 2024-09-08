import React from "react";
import {
  User,
  Book,
  Award,
  Briefcase,
  FileText,
  Star,
  Activity,
  Lock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IStudent {
  profileImage: string;
  firstName: string;
  lastName: string;
  userTagLine: string;
  personalEmail: string;
  mobileNo: string;
  aadharNo: string;
  dob: Date;
  streetAddress: string;
  town: string;
  district: string;
  state: string;
  country: string;
  education: {
    secondary: { schoolName: string; marks: number };
    seniorSecondary: { schoolName: string; marks: number };
    undergraduate: { collegeName: string; courseName: string; marks: number };
    postgraduate?: { collegeName: string; courseName: string; marks: number };
  };
  highestQualification: string;
  university: string;
  workExperience: number;
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  certifications: { name: string; issuer: string; date: Date }[];
  achievements: string[];
  extracurricularActivities: string[];
  eventsAttended: string[]; // Assuming ObjectId is represented as string
  privacySettings: { isProfilePublic: boolean; visibleSections: string[] };
}

const StudentProfile: React.FC<{ student: IStudent }> = ({ student }) => {
  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Lock className="mr-2 h-4 w-4" /> Privacy Settings
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.profileImage} alt={fullName} />
              <AvatarFallback>
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{fullName}</CardTitle>
              <CardDescription>{student.userTagLine}</CardDescription>
              <div className="mt-2 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">{`${student.town}, ${student.state}, ${student.country}`}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills & Projects</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex">
                        <dt className="font-semibold w-1/3">Full Name:</dt>
                        <dd>{fullName}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-1/3">Date of Birth:</dt>
                        <dd>{new Date(student.dob).toLocaleDateString()}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-1/3">
                          Highest Qualification:
                        </dt>
                        <dd>{student.highestQualification}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-1/3">University:</dt>
                        <dd>{student.university}</dd>
                      </div>
                      <div className="flex">
                        <dt className="font-semibold w-1/3">
                          Work Experience:
                        </dt>
                        <dd>{student.workExperience} years</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Educational Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.education.postgraduate && (
                      <div>
                        <h4 className="font-semibold">Postgraduate</h4>
                        <p>{student.education.postgraduate.collegeName}</p>
                        <p>{student.education.postgraduate.courseName}</p>
                        <p>Marks: {student.education.postgraduate.marks}%</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">Undergraduate</h4>
                      <p>{student.education.undergraduate.collegeName}</p>
                      <p>{student.education.undergraduate.courseName}</p>
                      <p>Marks: {student.education.undergraduate.marks}%</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Senior Secondary</h4>
                      <p>{student.education.seniorSecondary.schoolName}</p>
                      <p>Marks: {student.education.seniorSecondary.marks}%</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Secondary</h4>
                      <p>{student.education.secondary.schoolName}</p>
                      <p>Marks: {student.education.secondary.marks}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      {student.projects.map((project, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-gray-600">
                            {project.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-sm mt-1 block"
                            >
                              View Project
                            </a>
                          )}
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {student.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      {student.certifications.map((cert, index) => (
                        <div key={index} className="mb-3">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-gray-600">
                            Issuer: {cert.issuer}
                          </p>
                          <p className="text-sm text-gray-600">
                            Date: {new Date(cert.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Extracurricular Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {student.extracurricularActivities.map(
                      (activity, index) => (
                        <li key={index}>{activity}</li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex items-center">
                      <dt className="font-semibold w-1/4 flex items-center">
                        <Mail className="mr-2 h-4 w-4" /> Email:
                      </dt>
                      <dd>{student.personalEmail}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="font-semibold w-1/4 flex items-center">
                        <Phone className="mr-2 h-4 w-4" /> Mobile:
                      </dt>
                      <dd>{student.mobileNo}</dd>
                    </div>
                    <div className="flex items-center">
                      <dt className="font-semibold w-1/4 flex items-center">
                        <MapPin className="mr-2 h-4 w-4" /> Address:
                      </dt>
                      <dd>{`${student.streetAddress}, ${student.town}, ${student.district}, ${student.state}, ${student.country}`}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Download CV</Button>
          <Button>Connect</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentProfile;
