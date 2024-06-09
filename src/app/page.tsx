"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import HeaderNav from "./header";
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
        const newFormattedDate = todayDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setFormattedDate(newFormattedDate);
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
      <div className="mb-24 top-0 left-0 right-0 flex justify-center items-center sticky">
        <HeaderNav />
        <div className="bg-white mt-16 dark:bg-zinc-900 text-zinc-900 dark:text-white">
          <section className="container mx-auto text-center py-16 px-6">
            <h1 className="text-4xl font-bold mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
              OperantNext Platform for{" "}
              <span className="text-blue-500 hover:font-black hover:bg-black hover:p-2 hover:rounded-lg hover:text-white transition-all duration-300 ease-in-out">
                Students, Teachers, Industry, and Colleges
              </span>
            </h1>

            <p className="text-zinc-700 dark:text-zinc-300 mb-8">
              OperantNext is more than just an educational platform; it&apos;s a
              revolutionary ecosystem designed to transform the landscape of
              pharmaceutical education. In today’s fast-paced and ever-evolving
              world, the need for a dynamic, interactive, and comprehensive
              learning environment is more critical than ever. OperantNext
              caters to the unique needs of students, teachers, industry
              professionals, and academic institutions, providing an
              unparalleled educational experience that bridges the gap between
              theoretical knowledge and real-world application. Our platform is
              meticulously crafted to support lifelong learning, foster
              professional growth, and create meaningful connections within the
              pharma industry.
            </p>
            <div className="space-x-4">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-lg">
                Start Free Trial
              </button>
              <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-6 py-3 rounded-lg">
                Watch Video
              </button>
            </div>
          </section>

          <section className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Experience the Best with Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1682310231531-148748e7684f?q=80&w=3312&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Interactive Chat & Videos"
                  className="w-full rounded-lg mb-4"
                  height={200}
                  width={200}
                />
                <h3 className="text-2xl font-bold mb-2">
                  Interactive Chat & Videos
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Engaging classes with high-quality video, chat, and screen
                  sharing.
                </p>
                <a href="#" className="text-teal-500">
                  View Details
                </a>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <Image
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=3444&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Assignments & Quizzes"
                  className="w-full rounded-lg mb-4"
                  height={200}
                  width={200}
                />
                <h3 className="text-2xl font-bold mb-2">
                  Assignments & Quizzes
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Enhance learning with interactive assignments and quizzes.
                </p>
                <a href="#" className="text-teal-500">
                  View Details
                </a>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1664298626749-93845642877e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Playing Games Together"
                  className="w-full rounded-lg mb-4"
                  height={200}
                  width={200}
                />
                <h3 className="text-2xl font-bold mb-2">
                  Playing Games Together
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Boost learning through collaborative gaming experiences.
                </p>
                <a href="#" className="text-teal-500">
                  View Details
                </a>
              </div>
            </div>
          </section>

          <section className="bg-zinc-100 dark:bg-zinc-800 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                Elevate Your Learning with Powerful Integrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-2">Zoom Meetings</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Seamless integration with Zoom for live classes.
                  </p>
                </div>
                <div className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-2">Google Meet</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Integration with Google Meet for online sessions.
                  </p>
                </div>
                <div className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow">
                  <h3 className="text-2xl font-bold mb-2">Google Drive</h3>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    Access and share files directly from Google Drive.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Hear It from Our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  OperantNext has revolutionized the way I learn and teach.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1661745745478-bb3542627ebc?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User 1"
                    className="w-12 h-12 rounded-full mr-4"
                    height={50}
                    width={50}
                  />
                  <div>
                    <h4 className="text-xl font-bold">Emily Nguyen</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">Student</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  The integration features make it easy to manage classes.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1675223450224-659ed8c62fbb?q=80&w=3312&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User 2"
                    className="w-12 h-12 rounded-full mr-4"
                    height={50}
                    width={50}
                  />
                  <div>
                    <h4 className="text-xl font-bold">James Wilson</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">Teacher</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  A great platform for Pharma education and industry connection.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1673098277906-cbdca0d6ac36?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User 3"
                    className="w-12 h-12 rounded-full mr-4"
                    height={50}
                    width={50}
                  />
                  <div>
                    <h4 className="text-xl font-bold">Rahul Mehta</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Industry Professional
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Our college&apos;s go-to platform for all Pharma-related
                  courses.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://plus.unsplash.com/premium_photo-1674698988138-7f9f889be5b3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User 4"
                    className="w-12 h-12 rounded-full mr-4"
                    height={50}
                    width={50}
                  />
                  <div>
                    <h4 className="text-xl font-bold">Sophia Lee</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      College Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Choose OperantNext?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-2">
                  Comprehensive Curriculum
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Extensive courses designed by experts to cover all aspects of
                  Pharma education.
                </p>
                <a href="#" className="text-teal-500">
                  Learn More
                </a>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-2">
                  Industry Connections
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Connect with industry professionals for insights and
                  opportunities.
                </p>
                <a href="#" className="text-teal-500">
                  Learn More
                </a>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold mb-2">
                  Personalized Learning
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Tailored learning paths to meet individual student needs and
                  goals.
                </p>
                <a href="#" className="text-teal-500">
                  Learn More
                </a>
              </div>
            </div>
          </section>

          <footer className="bg-zinc-100 dark:bg-zinc-900 py-16">
            <div className="container mx-auto text-center">
              <p className="text-zinc-700 dark:text-zinc-300">
                © 2023 OperantNext. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
