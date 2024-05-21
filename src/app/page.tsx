"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import HeaderNav from "./header";
import FrameComponent from "@/components/frame-componet";
import Image from "next/image";

export interface UserData {
  username: string;
  email: string;
}

const initialUserData: UserData | null = null;

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [role, setRole] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const isOrganization = role === "organization";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData: UserData = response.data.data;
        const role = localStorage.getItem("role");
        const todayDate = new Date();
        const newformattedDate = todayDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setFormattedDate(newformattedDate);
        setUserData(userData);
        setRole(role);
      } catch (error: any) {
        Swal.fire(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-20">
        <HeaderNav />
      </div>
      <div className="container mx-auto px-4 py-6 ">
        <main className="flex flex-col lg:flex-row bg-lime-200 shadow-md rounded-lg overflow-hidden">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 bg-gradient-to-b from-purple-500 to-purple-200 text-white p-6 hidden lg:block">
            <FrameComponent />
            <div className="mt-8 flex items-center cursor-pointer">
              <Image
                className="mr-2"
                loading="lazy"
                alt="Logout"
                src="/logout.svg"
                width={16}
                height={16}
              />
              <span>Logout</span>
            </div>
          </aside>

          {/* Main Content */}
          <section className="w-full lg:w-3/4 p-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-300 text-white p-8 rounded-lg mb-6 shadow-md">
              <p>{formattedDate}</p>
              <h1 className="text-2xl font-bold mt-2">
                Welcome back, {userData?.username || "John"}!
              </h1>
              <p className="text-gray-200">
                Always stay updated in your student portal
              </p>
              <div className="relative w-full h-64 mt-6">
                <Image
                  className="absolute top-0 left-0"
                  loading="lazy"
                  alt="Backpack"
                  src="/backpack@2x.png"
                  width={144}
                  height={144}
                />
                <Image
                  className="absolute top-0 left-0"
                  loading="lazy"
                  alt="Scholar Cap"
                  src="/scholarcap-scroll@2x.png"
                  width={288}
                  height={288}
                />
                <Image
                  className="absolute top-0 left-0 rounded-md"
                  loading="lazy"
                  alt="Student"
                  src="/5-college-student@2x.png"
                  width={176}
                  height={176}
                />
              </div>
            </div>

            {/* Financial and Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finance Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Finance</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <Image
                      loading="lazy"
                      alt="File"
                      src="/file--pen.svg"
                      width={56}
                      height={40}
                    />
                    <div>
                      <p className="text-black font-semibold">$10,000</p>
                      <p className="text-gray-400">Total Payable</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <Image
                      loading="lazy"
                      alt="Group"
                      src="/group-14.svg"
                      width={64}
                      height={64}
                    />
                    <div>
                      <p className="text-black font-semibold">$5,000</p>
                      <p className="text-gray-400">Total Paid</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                    <Image
                      loading="lazy"
                      alt="Group"
                      src="/group-15.svg"
                      width={48}
                      height={64}
                    />
                    <div>
                      <p className="text-black font-semibold">$300</p>
                      <p className="text-gray-400">Others</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Enrolled Courses</h2>
                  <span className="text-mediumslateblue-100 cursor-pointer">
                    See all
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center bg-purple-500 p-4 rounded-lg shadow-md text-white">
                    <div className="flex-1">
                      <p>Object oriented programming</p>
                      <button className="bg-mediumslateblue-100 text-white py-1 px-4 rounded-md mt-2">
                        View
                      </button>
                    </div>
                    <Image
                      loading="lazy"
                      alt="Icon"
                      src="/icon-container@2x.png"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="flex items-center bg-purple-200 p-4 rounded-lg shadow-md">
                    <div className="flex-1">
                      <p className="text-black">Distributed Computing</p>
                      <button className="bg-white text-mediumslateblue-100 py-1 px-4 rounded-md mt-2">
                        View
                      </button>
                    </div>
                    <Image
                      loading="lazy"
                      alt="Icon"
                      src="/group-16.svg"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notice Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold mb-4">Notice</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="text-black font-semibold">
                      New notice from the management
                    </p>
                    <p className="text-gray-400">2 days ago</p>
                  </div>
                  <Image
                    loading="lazy"
                    alt="Icon"
                    src="/bellringing.svg"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="text-black font-semibold">
                      New notice from the management
                    </p>
                    <p className="text-gray-400">2 days ago</p>
                  </div>
                  <Image
                    loading="lazy"
                    alt="Icon"
                    src="/bellringing.svg"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold mb-4">Schedule</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="text-black font-semibold">Class Schedule</p>
                    <p className="text-gray-400">2 days ago</p>
                  </div>
                  <Image
                    loading="lazy"
                    alt="Icon"
                    src="/bellringing.svg"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="text-black font-semibold">Exam Schedule</p>
                    <p className="text-gray-400">2 days ago</p>
                  </div>
                  <Image
                    loading="lazy"
                    alt="Icon"
                    src="/bellringing.svg"
                    width={64}
                    height={64}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-gray-400 text-xs mt-8">
              <p>&copy; 2021 All rights reserved</p>
              <p>Developed by Ravindra Choudhary</p>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}
