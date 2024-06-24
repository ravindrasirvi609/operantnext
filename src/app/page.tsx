"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import HeaderNav from "./header";
import About from "@/components/about";
import ScrollTrigers from "@/components/scrollTrigers";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    gsap.to(".hero-text", {
      opacity: 1,
      y: 120,
      scale: 1.2,
      ease: "elastic.inOut",
      scrollTrigger: {
        trigger: ".hero-text",
        start: "top center",
        end: "bottom top",
        markers: true,
        scrub: true,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="bg-black text-pink-900">
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
        <div className="hero-text bg-opacity-50 mt-16 rounded-lg text-center">
          <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to OperantNext
          </h1>
          <p className="hero-text text-lg md:text-2xl text-white mb-8">
            Your one-stop destination for pharma industry updates
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg mb-8">
            We are a team of passionate individuals who are dedicated to
            providing the latest updates from the pharmaceutical industry.
          </p>

          <About />
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
