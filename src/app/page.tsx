"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeaderNav from "./header";
import About from "@/components/about";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Hero text animation
    gsap.to(".hero-text", {
      opacity: 1,
      y: 200,
      scrollTrigger: {
        trigger: ".hero-text",
        start: "top center",
        end: "bottom top",
        scrub: true,
        markers: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="bg-gray-100 text-pink-900">
      <HeaderNav />
      <ScrollProgressBar />
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center your-section"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1718641731724-0b583a50df1f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="hero-text bg-opacity-50 p-8 rounded-lg text-center">
          <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to OperantNext
          </h1>
          <p className="hero-text text-lg md:text-2xl text-white mb-8">
            Your one-stop destination for pharma industry updates
          </p>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Conferences Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Upcoming Conferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Conference Card */}
            <motion.div className="conference-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Conference Title</h3>
              <p className="mb-4">Brief description of the conference.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Register Now
              </a>
            </motion.div>
            {/* Repeat Conference Cards as needed */}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Job Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Job Listing Card */}
            <motion.div className="job-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Job Title</h3>
              <p className="mb-4">Brief description of the job.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Apply Now
              </a>
            </motion.div>
            {/* Repeat Job Cards as needed */}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Online Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Course Progress Bar */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Course Title</h3>
              <p className="mb-4">Brief description of the course.</p>
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="course-progress-bar h-full bg-green-500"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            {/* Repeat Course Cards as needed */}
          </div>
        </div>
      </section>

      {/* Forum Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Forum Discussions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Forum Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">Forum Topic</h3>
              <p className="mb-4">Brief description of the discussion.</p>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Join Discussion
              </a>
            </div>
            {/* Repeat Forum Cards as needed */}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Pharma. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
