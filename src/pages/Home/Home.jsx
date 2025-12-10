import React, { useEffect } from "react";
import Hero from "./components/Hero";

const Home = () => {
  useEffect(() => {
    document.title = "Decoriva | Home";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Hero />
    </div>
  );
};

export default Home;
