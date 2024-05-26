"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  description: string;
  teacher: string;
  rating: number;
  price: number;
  imageUrl: string;
  learnings: string[];
  courseContent: Chapter[];
  additionalInfo: string[];
  progress: number;
  users: string[];
}

interface Lecture {
  title: string;
  type: string;
  _id?: string; // Optional property for potential future use
}

interface Chapter {
  chapter: string;
  lectures: Lecture[];
  _id?: string; // Optional property for potential future use
}

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/course/course-list");
        const data = response.data;
        setCourses(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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
              key={course._id}
              className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md"
            >
              <Link href={`/courses/${course._id}`}>
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
                {/* <div className="flex items-center">
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
                </div> */}
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
