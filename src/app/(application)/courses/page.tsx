import Image from "next/image";
import Link from "next/link";
import React from "react";

const Courses = () => {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="w-64 bg-white dark:bg-zinc-800 shadow-md">
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
                <span className="ml-2">UI/UX</span>
              </li>
              <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
                <span className="ml-2">Industrial Design</span>
              </li>
              <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
                <span className="ml-2">Architecture</span>
              </li>
              <li className="flex items-center p-2 text-zinc-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg">
                <span className="ml-2">Add group</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 px-4">
            <button className="w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white p-2 rounded-lg">
              Dark Mode
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 bg-blue-200 dark:bg-zinc-900">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
              My Courses
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white p-2 rounded-lg shadow-md"
              />
            </div>
            <div className="relative">
              <button className="bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white p-2 rounded-lg shadow-md">
                All courses
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
              <Link href={"courses/123"}>
                <Image
                  src="https://images.unsplash.com/photo-1715939767231-f02344fd39ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D"
                  alt="Abstract Design"
                  className="rounded-lg mb-4"
                  width={600}
                  height={400}
                />
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">
                  Abstract Design
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  We are going to learn how to use Adobe Paint to create
                  abstract forms and modify them in Photoshop.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">76%</p>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
              <Link href={"courses/123"}>
                <Image
                  src="https://images.unsplash.com/photo-1716036289705-98506c94d382?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Industrial Design"
                  className="rounded-lg mb-4"
                  width={600}
                  height={400}
                />
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">
                  Industrial Design
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  This class is an encouraging, empowering experience that will
                  change the way you look at objects all around you.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: "32%" }}
                    ></div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">32%</p>
                </div>
              </Link>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md">
              <Link href={"courses/123"}>
                <Image
                  src="https://images.unsplash.com/photo-1715843360781-063b43a5cbc7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8eEh4WVRNSExnT2N8fGVufDB8fHx8fA%3D%3D"
                  alt="Photography"
                  className="rounded-lg mb-4"
                  width={600}
                  height={400}
                />
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-2">
                  Photography
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Included workshops on lighting at different times of day and
                  experimenting subjects in a landscape shot.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1715985884284-3885ea1731b8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="mt-4">
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: "46%" }}
                    ></div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">46%</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
