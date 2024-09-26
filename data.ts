export const data = {
  profileImage: "https://example.com/profile.jpg",
  firstName: "Ravindra",
  lastName: "Sirvi",
  userTagLine: "Aspiring Full Stack Developer",
  personalEmail: "ravindra@example.com",
  mobileNo: "9876543210",
  aadharNo: "1234-5678-9012",
  dob: new Date("2000-01-15"),
  streetAddress: "123 Main Street",
  town: "Udaipur",
  district: "Udaipur",
  state: "Rajasthan",
  country: "India",
  education: {
    secondary: { schoolName: "Modern Public School", marks: 85 },
    seniorSecondary: { schoolName: "St. Xavier's School", marks: 88 },
    undergraduate: {
      collegeName: "BITS Pilani",
      courseName: "B.Tech Computer Science",
      marks: 75,
    },
    postgraduate: {
      collegeName: "IIT Delhi",
      courseName: "M.Tech AI",
      marks: 82,
    }, // Optional field
  },
  highestQualification: "M.Tech AI",
  university: "IIT Delhi",
  workExperience: 3, // In years
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
    "MongoDB",
    "GraphQL",
  ],
  projects: [
    {
      title: "Ride-Sharing App",
      description: "A full-stack application for carpooling and ride-sharing.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      link: "https://github.com/ravindra/ride-sharing-app",
    },
    {
      title: "E-commerce Platform",
      description:
        "An e-commerce platform with secure payments and order tracking.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      link: "https://github.com/ravindra/ecommerce-platform",
    },
  ],
  certifications: [
    {
      name: "Full Stack Development",
      issuer: "Coursera",
      date: new Date("2022-05-10"),
    },
    {
      name: "GraphQL Mastery",
      issuer: "Udemy",
      date: new Date("2023-02-15"),
    },
  ],
  achievements: [
    "Won the Hackathon 2023 at BITS Pilani",
    "Developed a mobile app with 10K+ downloads",
  ],
  extracurricularActivities: ["Member of Coding Club", "Volunteer at TechFest"],
  eventsAttended: ["641fb65d2f6c5b1f5a5d1c4e", "641fb65d2f6c5b1f5a5d1c4f"],
  privacySettings: {
    isProfilePublic: true,
    visibleSections: ["education", "projects", "certifications"],
  },
};

export const mockStudentData = {
  name: "Ravindra Sirvi",
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
