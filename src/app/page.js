"use client";

import { useState, useEffect } from "react";
import Hero_Section from "./components/home_subsections/Hero_Section";
import AboutSection from "./components/home_subsections/About_Section";
import WhyChooseUs from "./components/home_subsections/WhyChooseUs";
import ServicesSection from "./components/home_subsections/Services_Section";
import Testimonial_Section from "./components/home_subsections/Testimonal_Section";
import FAQSection from "./components/home_subsections/FAQ_Section";
import Newsletter from "./components/home_subsections/Newsletter";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div>
      <Hero_Section />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <Testimonial_Section />
      <FAQSection />
      <Newsletter />
    </div>
  );
}
