import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Features: React.FC = () => {
  useGSAP(() => {
    gsap.from(".feature-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: "#features",
        start: "top center+=100",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section id="features" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          How We Bridge the Gap
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-item bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
              Industry-Aligned Curriculum
            </h3>
            <p>
              Access courses and materials designed in collaboration with
              industry experts to ensure relevance and applicability.
            </p>
          </div>
          <div className="feature-item bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Real-world Projects</h3>
            <p>
              Work on industry-sponsored projects to gain practical experience
              and build a professional portfolio.
            </p>
          </div>
          <div className="feature-item bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Networking Opportunities</h3>
            <p>
              Connect with industry professionals, attend virtual job fairs, and
              participate in mentorship programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
