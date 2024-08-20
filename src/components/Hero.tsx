import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1718641731724-0b583a50df1f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
        <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to OperantNext
        </h1>
        <p className="hero-text text-lg md:text-2xl text-white mb-8">
          Bridging the gap between academia and industry in pharma
        </p>
        <a
          href="#features"
          className="hero-text bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-300"
        >
          Discover How
        </a>
      </div>
    </section>
  );
};

export default Hero;
