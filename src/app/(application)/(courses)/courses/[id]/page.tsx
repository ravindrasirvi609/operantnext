"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Rating from "react-rating-stars-component";
interface CourseData {
  title: string;
  description: string;
  teacher: string;
  rating: number;
  price: number;
  imageUrl: string;
  learnings: string[];
  courseContent: {
    chapter: string;
    lectures: { title: string; type: string }[];
  }[];
  additionalInfo: string[];
}

const CourseDetails: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data: CourseData = {
        title: "User experience design fundamentals",
        description:
          "Become an advanced UX Designer with the help of the greatest designers of the Universe and get a portfolio of your dreams.",
        teacher: "Brendon Bolton-Korgins",
        rating: 4.6,
        price: 29.99,
        imageUrl:
          "https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        learnings: [
          "How to use Figma for Essential UX Design & UI Design.",
          "Build a UX project from beginning to end.",
          "The dos & donts around choosing fonts for web & mobile apps.",
          "How to work with UX personas.",
          "How to make fully interactive prototypes.",
          "Free UI kits & plugins for Figma which will speed up our workflow dramatically!",
          "You will be able to add UX designer to your CV.",
          "How to begin working as a UX Designer using Figma.",
        ],
        courseContent: [
          {
            chapter: "1. Getting started",
            lectures: [
              {
                title: "1.1 Welcome to our exciting User experience journey!",
                type: "Free",
              },
              {
                title: "1.2 Getting started with Figma easy.",
                type: "Preview",
              },
              { title: "1.3 Essential tools", type: "02:18" },
              {
                title: "1.4 What is the difference between UI and UX in Figma?",
                type: "04:11",
              },
            ],
          },
          {
            chapter: "2. Figma Basics",
            lectures: [
              { title: "2.1 Figma Interface Overview", type: "03:45" },
              { title: "2.2 Working with Shapes", type: "05:20" },
              { title: "2.3 Understanding Layers", type: "04:10" },
              { title: "2.4 Utilizing Text Tools", type: "06:00" },
            ],
          },
          {
            chapter: "3. Advanced Figma",
            lectures: [
              { title: "3.1 Prototyping in Figma", type: "07:30" },
              { title: "3.2 Using Plugins", type: "04:50" },
              { title: "3.3 Creating Responsive Designs", type: "08:15" },
              { title: "3.4 Collaborative Design", type: "09:00" },
            ],
          },
        ],
        additionalInfo: [
          "English",
          "Spanish and English subtitles",
          "30.5 total video lectures",
          "Certificate after completion",
          "Access on TV and mobile",
          "Full lifetime access",
          "Homework check",
          "Offline access",
          "30-day money-back guarantee",
        ],
      };

      setCourseData(data);
    };

    fetchData();
  }, []);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-200 dark:bg-zinc-900">
      <div className="w-full p-6">
        <main className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 lg:pr-6">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              {courseData.title}
            </h1>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              {courseData.description}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Teacher name:{" "}
              <a href="#" className="text-blue-500">
                {courseData.teacher}
              </a>
            </p>
            <div className="flex items-center mb-4">
              <span className="text-zinc-700 dark:text-zinc-300">
                {courseData.rating}
              </span>
              <Rating
                count={5}
                value={courseData.rating}
                size={24}
                activeColor="#ffd700"
                edit={false}
                isHalf={true}
                className="ml-2"
              />
              <a href="#" className="text-blue-500 ml-2">
                See reviews
              </a>
            </div>
            <h2 className="text-xl font-bold mb-2 dark:text-white">
              What will you learn?
            </h2>
            <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4">
              {courseData.learnings.map((learning, index) => (
                <li key={index}>{learning}</li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-2 dark:text-white">
              Course content
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              10 sections • 45 lectures • 30.5 total length
            </p>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
              {courseData.courseContent
                .slice(0, showFullContent ? undefined : 1)
                .map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="mb-4">
                    <h3 className="text-lg font-bold mb-2 dark:text-white">
                      {chapter.chapter}
                    </h3>
                    <ul className="text-zinc-700 dark:text-zinc-300">
                      {chapter.lectures.map((lecture, lectureIndex) => (
                        <li
                          key={lectureIndex}
                          className="flex justify-between mb-2"
                        >
                          <span>{lecture.title}</span>
                          <span>{lecture.type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              {!showFullContent && (
                <button
                  onClick={() => setShowFullContent(true)}
                  className="text-blue-500"
                >
                  See more
                </button>
              )}
              {showFullContent && (
                <button
                  onClick={() => setShowFullContent(false)}
                  className="text-blue-500"
                >
                  See less
                </button>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow mt-6 lg:mt-0">
            <Image
              src={courseData.imageUrl}
              alt="Course Image"
              className="mb-4 rounded-lg"
              width={300}
              height={200}
              layout="responsive"
            />
            <div className="text-3xl font-bold mb-4 dark:text-white">
              ${courseData.price}
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4">
              Buy this course
            </button>
            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 p-2 rounded-lg w-full mb-4">
              Add to cart
            </button>
            <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4">
              {courseData.additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
            <div className="text-zinc-700 dark:text-zinc-300 mb-4">
              <p>Educating 5+ people?</p>
              <p>Get access to 1000+ design courses anytime, anywhere</p>
            </div>
            <a href="#" className="text-blue-500">
              Try business account
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;
