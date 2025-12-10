import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";

const Home = () => {
  useEffect(() => {
    document.title = "Decoriva | Home";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Stats />
      <HowItWorks />
    </div>
  );
};

export default Home;
