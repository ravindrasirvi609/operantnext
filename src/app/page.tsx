"use client";

import React from "react";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUniversity,
  FaBuilding,
} from "react-icons/fa";
import { motion } from "framer-motion";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="text-4xl mb-4 text-blue-600">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <main>
        <section className="py-20 text-center h-screen flex items-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-4">
              Connect, Showcase, Succeed
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The ultimate platform bridging students, educators, and industry
              professionals
            </p>
            <a
              href="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<FaGraduationCap />}
                title="Student Profiles"
                description="Showcase your achievements, skills, and projects to potential employers."
              />
              <FeatureCard
                icon={<FaChalkboardTeacher />}
                title="Teacher Recommendations"
                description="Get verified recommendations from your teachers to boost your profile."
              />
              <FeatureCard
                icon={<FaUniversity />}
                title="College Verification"
                description="Have your academic details verified by your institution for credibility."
              />
              <FeatureCard
                icon={<FaBuilding />}
                title="Company Access"
                description="Connect with top companies for internships and job opportunities."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              About EduConnect
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              EduConnect is a revolutionary platform designed to bridge the gap
              between academia and industry. We empower students to showcase
              their talents, enable educators to support their students &apos;
              growth, and provide companies with access to a pool of verified,
              talented individuals ready to make their mark in the professional
              world.
            </p>
          </div>
        </section>

        <section id="contact" className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-8">
              Join EduConnect today and take the next step in your academic or
              professional journey.
            </p>
            <div className="space-x-4">
              <a
                href="/signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Sign Up
              </a>
              <a
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
