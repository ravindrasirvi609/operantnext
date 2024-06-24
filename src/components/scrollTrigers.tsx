"use client";

import React, { use, useEffect } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollTrigers = () => {
  useEffect(() => {
    gsap.to("#trigger1", {
      x: 1000,
      duration: 10,
      ease: "elastic.inOut",
      scrollTrigger: {
        trigger: "#trigger1",
        start: "bottom bottom",
        end: "top 20%",

        scrub: true,
        markers: true,
      },
    });
  }, []);

  return (
    <div>
      <h1>Scroll Triggers</h1>
      <div id="trigger1" className=" h-48 w-48 bg-pink-500 rounded-lg">
        <h2>Trigger 1</h2>
      </div>
    </div>
  );
};

export default ScrollTrigers;
