import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  useGSAP(() => {
    gsap.from(".about-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: "#about",
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section id="about" className="py-16 bg-[#252A34] text-[#EAEAEA]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          About OperantNext
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="about-item">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To bridge the gap between academic knowledge and industry
              requirements in the pharmaceutical sector, empowering students and
              researchers to make a seamless transition into the professional
              world.
            </p>
          </div>
          <div className="about-item">
            <h3 className="text-2xl font-bold mb-4">Our Approach</h3>
            <p>
              We provide a unique platform that combines cutting-edge academic
              resources with real-world industry insights, fostering innovation
              and preparing the next generation of pharmaceutical professionals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
