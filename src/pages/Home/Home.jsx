import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HowItWorks from "./components/HowItWorks";
import FeaturedServices from "./components/FeaturedServices";
import TopDecorators from "./components/TopDecorators";
import Testimonials from "./components/Testimonials";
import Subscription from "./components/Subscription";
import ServiceMap from "./components/ServiceMap";
import WhyChooseUs from "./components/WhyChooseUs";
import FaqSection from "./components/FaqSection";
import CtaSection from "./components/CtaSection";

const Home = () => {
  useEffect(() => {
    document.title = "Decoriva | Home";
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <FeaturedServices />
      <Stats />
      <HowItWorks />
      <TopDecorators />
      <WhyChooseUs />
      <Testimonials />
      <Subscription />
      <ServiceMap />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default Home;
