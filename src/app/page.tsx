"use client";
import About from "@/components/about";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="bg-black text-pink-900">
      <Hero />
      <About />
      <Features />
      <Testimonials />
    </div>
  );
}
