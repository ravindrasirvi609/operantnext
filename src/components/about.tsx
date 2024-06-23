"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const About: React.FC = () => {
  useEffect(() => {
    gsap.to(".about", {
      rotation: 150,
      x: 100,
      y: 100,
      ease: "power2.out",
      duration: 5,
      delay: 1,
      stagger: 0.2,
      repeat: 10,
      yoyo: true,
      color:
        "red, blue, green, yellow, purple, orange, pink, brown, black, white",
    });
  }, []);

  return (
    <div className="about">
      <div className="flex flex-col items-center justify-center bg-white h-16 w-16 rounded-full"></div>
    </div>
  );
};

export default About;
