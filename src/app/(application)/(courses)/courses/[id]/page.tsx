"use client";
import axios from "axios";
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

const CourseDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const courseId = params.id;
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/api/course/course-details", {
        courseId,
      });
      const data = await response.data;
      console.log("data: ", data);

      setCourseData(data);
    };

    fetchData();
  }, [courseId]);

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

            <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4">
              {courseData.additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetails;
