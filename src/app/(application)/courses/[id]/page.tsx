"use client";
import Image from "next/image";
import React from "react";
import Rating from "react-rating-stars-component";

const CourseDetails = () => {
  const rating = 4.6;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-blue-200 dark:bg-zinc-900">
      <div className="w-full md:w-1/4 bg-white dark:bg-zinc-800 p-4">
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
                <span className="material-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </span>
                <span className="ml-4">All courses</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </span>
                <span className="ml-4">My courses</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                </span>
                <span className="ml-4">Most popular</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </span>
                <span className="ml-4">Favourites</span>
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                className="flex items-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded"
              >
                <span className="material-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                    <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                    <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                  </svg>
                </span>
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

      <div className="w-full md:w-3/4 p-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <p className="text-zinc-700 dark:text-zinc-300">
              Hello, <span className="font-bold">Kary Williams</span>
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              All courses &gt; User experience design fundamentals
            </p>
          </div>
          <nav className="flex flex-wrap sm:space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-zinc-700 dark:text-zinc-300">
              <span className="material-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </span>
            </a>
          </nav>
        </header>
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
