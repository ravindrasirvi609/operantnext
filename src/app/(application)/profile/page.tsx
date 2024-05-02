"use client";

import React, { use, useEffect, useState } from "react";
import StudentProfile from "@/components/studentProfile";
import TeacherProfile from "@/components/teacherProfile";
import CollegeProfile from "@/components/collegeProfile";
import CompanyProfile from "@/components/companyProfile";

export default function ProfilePage() {
  const [role, setRole] = useState<string | null>();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setRole(role);
  }, []);

  return (
    <>
      <div className="bg-lime-100">
        {role === "STUDENT" && <StudentProfile />}
        {role === "TEACHER" && <TeacherProfile />}
        {role === "COLLEGE" && <CollegeProfile />}
        {role === "COMPANY" && <CompanyProfile />}
      </div>
    </>
  );
}
