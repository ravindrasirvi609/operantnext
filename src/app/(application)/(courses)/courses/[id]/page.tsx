"use client";
import Image from "next/image";
import React from "react";
import Rating from "react-rating-stars-component";

const CourseDetails = () => {
  const rating = 4.6;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-200 dark:bg-zinc-900">
      <div className="w-full p-6">
        <main className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 lg:pr-6">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              User experience design fundamentals
            </h1>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Become an advanced UX Designer with the help of the greatest
              designers of the Universe and get a portfolio of your dreams.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Teacher name:{" "}
              <a href="#" className="text-blue-500">
                Brendon Bolton-Korgins
              </a>
            </p>
            <div className="flex items-center mb-4">
              <span className="text-zinc-700 dark:text-zinc-300">{rating}</span>
              <Rating
                count={5}
                value={rating}
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
              <li>How to use Figma for Essential UX Design & UI Design.</li>
              <li>Build a UX project from beginning to end.</li>
              <li>
                The dos & donts around choosing fonts for web & mobile apps.
              </li>
              <li>How to work with UX personas.</li>
              <li>How to make fully interactive prototypes.</li>
              <li>
                Free UI kits & plugins for Figma which will speed up our
                workflow dramatically!
              </li>
              <li>You will be able to add UX designer to your CV.</li>
              <li>How to begin working as a UX Designer using Figma.</li>
            </ul>
            <a href="#" className="text-blue-500">
              Show more
            </a>

            <h2 className="text-xl font-bold mt-6 mb-2 dark:text-white">
              Course content
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              10 sections • 45 lectures • 30.5 total length
            </p>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2 dark:text-white">
                1. Getting started
              </h3>
              <ul className="text-zinc-700 dark:text-zinc-300">
                <li className="flex justify-between mb-2">
                  <span>
                    1.1 Welcome to our exciting User experience journey!
                  </span>
                  <span>Free</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>1.2 Getting started with Figma easy.</span>
                  <span>Preview</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>1.3 Essential tools</span>
                  <span>02:18</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span>
                    1.4 What is the difference between UI and UX in Figma?
                  </span>
                  <span>04:11</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:w-1/3 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow mt-6 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Course Image"
              className="mb-4 rounded-lg"
              width={300}
              height={200}
            />
            <div className="text-3xl font-bold mb-4 dark:text-white">
              $29.99
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4">
              Buy this course
            </button>
            <button className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 p-2 rounded-lg w-full mb-4">
              Add to cart
            </button>
            <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 mb-4">
              <li>English</li>
              <li>Spanish and English subtitles</li>
              <li>30.5 total video lectures</li>
              <li>Certificate after completion</li>
              <li>Access on TV and mobile</li>
              <li>Full lifetime access</li>
              <li>Homework check</li>
              <li>Offline access</li>
              <li>30-day money-back guarantee</li>
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
