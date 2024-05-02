"use client";

import React from "react";
import HeaderNav from "../../header";
import StudentProfile from "@/components/studentProfile";

export default function ProfilePage() {
  return (
    <>
      <div className="bg-lime-100">
        <HeaderNav />
        <StudentProfile />
      </div>
    </>
  );
}
