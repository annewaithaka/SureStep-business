import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ValueSection from "../components/ValueSection";
import ProcessSection from "../components/ProcessSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ValueSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
