"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      "#vision",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#vision",
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      "#mission",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#mission",
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      "#values",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#values",
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
    gsap.fromTo(
      "#team",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: "#team",
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/3 p-4">
          <div className="bg-gray-800 p-6 rounded-lg" id="misson">
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p>
              Our mission is to provide the latest updates from the
              pharmaceutical industry to our readers.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg mt-4" id="vision">
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p>
              Our vision is to become the most trusted source of pharmaceutical
              industry updates.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg mt-4" id="values">
            <h3 className="text-2xl font-bold mb-2">Our Values</h3>
            <p>
              Our values include integrity, transparency, and dedication to our
              readers.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg mt-4" id="team">
            <h3 className="text-2xl font-bold mb-2">Our Team</h3>
            <p>
              Our team consists of experienced professionals from the
              pharmaceutical industry.
            </p>
          </div>

          <div className=" rounded-lg mt-4">
            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
            <p>
              Email:dev@ravindrachoudhary.in
              <br />
              Phone: 123-456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
