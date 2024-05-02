"use client";
import { useRouter } from "next/navigation";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

interface Teacher {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo?: string;
  dob?: Date;
  subjectSpecialization?: string;
  highestQualification?: string;
  university?: string;
  workExperience?: number;
  college: string;
  registrationDate: Date;
  profileImage?: string;
}

export default function TeacherProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<Teacher | null>(null);
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getTeacherDetails = async () => {
    try {
      const res = await axios.get("/api/users/teacherDetails");
      setData(res.data.data.firstName);
      setUserData(res.data.data);
    } catch (error) {
      toast.error("Failed to get user details");
    }
  };

  const editProfileRoutinting = () => {
    router.push("/teacherProfile");
  };

  useEffect(() => {
    getTeacherDetails();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-32">
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight text-sky-800">
            Teacher Profile
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-2/12 py-6 mx-3">
          <div className="bg-white shadow-2xl p-3 overflow-hidden sm:rounded-lg">
            <div className="w-1/2 mx-auto mb-4">
              <div className="bg-sky-200 rounded-full w-36 h-36 items-center ">
                {userData?.profileImage ? (
                  <Image
                    className="rounded-full"
                    src={userData?.profileImage}
                    alt=""
                    width={144}
                    height={144}
                  />
                ) : (
                  <Image
                    className="rounded-full"
                    src="/user.png"
                    alt=""
                    width={144}
                    height={144}
                  />
                )}
              </div>
            </div>
            <div className="text-center font-bold text-sky-900 mt-16">
              {" "}
              {userData?.firstName} {userData?.lastName}
            </div>
            <div className="text-center text-sm text-gray-500 ">
              dynamic Headline here ... Lorem ipsum dolor sit amet consectetur
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                className="bg-sky-200 text-black px-4 py-2 rounded-full"
                onClick={editProfileRoutinting}
              >
                Edit Profile
              </button>
            </div>
            <div className="flex items-center justify-center mt-3">
              <button
                className="bg-sky-200 text-black px-4 py-2 rounded-full"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="w-9/12 mx-12 py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Teacher Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="border-t border-sky-200">
              <dl>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData?.firstName} {userData?.lastName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData?.email}
                  </dd>
                </div>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mobile Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData?.mobileNo}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg mt-5">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Education
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Education details and application.
              </p>
            </div>
            <div className="border-t border-sky-200">
              <dl>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Highest Qualification
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData?.highestQualification}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-5">
                  <dt className="text-sm font-medium text-gray-500">
                    University/Institution
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData?.university}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg mt-5">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Work Experience
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Work Experience details and application.
              </p>
            </div>
            <div className="border-t border-sky-200">
              <dl>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Company Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Google
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow-2xl overflow-hidden sm:rounded-lg mt-5">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Attended Events
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Attended Events details and application.
              </p>
            </div>
            <div className="border-t border-sky-200">
              <dl>
                <div className="bg-sky-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 mb-5">
                  <dt className="text-sm font-medium text-gray-500">
                    Event Name 1
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Google
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
