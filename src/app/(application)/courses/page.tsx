"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Pharmacology 101",
    description:
      "This course introduces the basic principles of pharmacology, including drug classification, mechanisms of action, and pharmacokinetics.",
    imageUrl:
      "https://images.unsplash.com/photo-1715939767231-f02344fd39ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D",
    progress: 76,
    users: [
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 2,
    title: "Physiology for Pharmacists",
    description:
      "This course explores the human body's functions and how medications interact with different systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1716036289705-98506c94d382?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 32,
    users: [
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: 3,
    title: "Pharmacy Law and Ethics",
    description:
      "This course covers legal and ethical considerations for pharmacists, including dispensing regulations and patient confidentiality.",
    imageUrl:
      "https://images.unsplash.com/photo-1715843360781-063b43a5cbc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D",
    progress: 46,
    users: [
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-64 bg-white dark:bg-zinc-800 shadow-md flex-shrink-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
            Courses
          </h1>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">My Courses</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">Browse Courses</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">My Categories</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">My Messages</span>
            </li>
          </ul>
        </nav>
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 px-4">
            GROUPS
          </h2>
          <ul className="mt-2">
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">Foundational Pharmacy</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">Clinical Pharmacy</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">Pharmacy Practice</span>
            </li>
            <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
              <span className="ml-2">Pharmacy Management</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 p-6 bg-blue-200 dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4 md:mb-0">
            My Courses
          </h1>
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white p-2 rounded-lg shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-auto">
            <button className="w-full md:w-auto bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white p-2 rounded-lg shadow-md">
              All courses
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md"
            >
              <Link href={`/courses/${course.id}`}>
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  className="rounded-lg mb-4"
                  width={600}
                  height={400}
                />
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center">
                  {course.users.map((user, index) => (
                    <Image
                      key={index}
                      src={user}
                      alt="User"
                      className="w-8 h-8 rounded-full mr-2"
                      width={32}
                      height={32}
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    {course.progress}%
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
