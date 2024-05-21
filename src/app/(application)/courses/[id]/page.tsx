import Image from "next/image";
import React from "react";

const CourseDetails = () => {
  return (
    <div className="flex min-h-screen bg-blue-200 dark:bg-zinc-900">
      <div className="w-1/4 bg-white dark:bg-zinc-800 p-4">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-zinc-300 rounded-full"></div>
          <div className="ml-4">
            <h1 className="text-xl font-bold dark:text-white">
              Design Academy
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Learning with practice
            </p>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">menu_book</span>
                <span className="ml-4">All courses</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">book</span>
                <span className="ml-4">My courses</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">trending_up</span>
                <span className="ml-4">Most popular</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">favorite</span>
                <span className="ml-4">Favourites</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">done_all</span>
                <span className="ml-4">Completed</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-6">
          <h2 className="text-zinc-700 dark:text-zinc-300 mb-2">Reminders</h2>
          <ul>
            <li className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-300 rounded-full"></div>
              <span className="ml-4 text-zinc-700 dark:text-zinc-300">
                Homework
              </span>
            </li>
            <li className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
              <span className="ml-4 text-zinc-700 dark:text-zinc-300">
                Homework
              </span>
            </li>
            <li className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-300 rounded-full"></div>
              <span className="ml-4 text-zinc-700 dark:text-zinc-300">
                Live session
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-3/4 p-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <p className="text-zinc-700 dark:text-zinc-300">
              Hello, <span className="font-bold">Kary Williams</span>
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              All courses &gt; User experience design fundamentals
            </p>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-zinc-700 dark:text-zinc-300">
              For business
            </a>
            <a href="#" className="text-zinc-700 dark:text-zinc-300">
              Teach on Design Academy
            </a>
            <a href="#" className="text-zinc-700 dark:text-zinc-300">
              Subscription
            </a>
            <a href="#" className="text-zinc-700 dark:text-zinc-300">
              <span className="material-icons">shopping_cart</span>
            </a>
          </nav>
        </header>
        <main className="flex">
          <div className="w-2/3 pr-6">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              User experience design fundamentals
            </h1>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Become an advanced UX Designer with the help of the greatest
              designers of the Universe and get a portfolio of your dreams.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Author:{" "}
              <a href="#" className="text-blue-500">
                Brendon Bolton-Korgins
              </a>
            </p>
            <div className="flex items-center mb-4">
              <span className="text-zinc-700 dark:text-zinc-300">4.6</span>
              <span className="material-icons text-yellow-500 ml-2">star</span>
              <span className="material-icons text-yellow-500">star</span>
              <span className="material-icons text-yellow-500">star</span>
              <span className="material-icons text-yellow-500">star</span>
              <span className="material-icons text-zinc-400">star_half</span>
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

          <div className="w-1/3 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
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
