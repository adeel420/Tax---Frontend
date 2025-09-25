"use client";

import { assets } from "@/app/assets/assets";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function About_Section() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const element = document.getElementById("about-us");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-us"
      className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-5 sm:top-20 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-5 sm:bottom-20 sm:left-20 w-56 h-56 sm:w-80 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Owner Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative max-w-xs sm:max-w-md mx-auto">
              {/* Main Frame */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse"></div>

                {/* Circle Frame */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 rounded-full p-1 animate-spin-slow">
                  <div className="w-full h-full bg-slate-800 rounded-full p-3 sm:p-4">
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center overflow-hidden group hover:scale-105 transition-transform duration-500">
                      <Image
                        src={assets.owner}
                        alt="Founder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="relative w-full h-full animate-spin"
                  style={{ animationDuration: "20s" }}
                >
                  <div className="absolute top-0 left-1/2 w-9 h-9 sm:w-12 sm:h-12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-8 h-8 sm:w-10 sm:h-10 -translate-x-1/2 translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="absolute right-0 top-1/2 w-6 h-6 sm:w-8 sm:h-8 translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold">
                      25
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Meet Our Founder
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="block">John Smith</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  CPA, Tax Expert
                </span>
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                With over 25 years of experience in tax preparation and
                financial planning, John founded TaxPro to provide personalized,
                expert tax services that maximize refunds and minimize stress
                for individuals and businesses.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                    25+
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">
                    Years Experience
                  </div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-slate-700/50">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">
                    CPA
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">
                    Certified Professional
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                Credentials & Expertise
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {[
                  "Certified Public Accountant (CPA)",
                  "IRS Enrolled Agent",
                  "QuickBooks ProAdvisor",
                  "Master's in Taxation",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 sm:space-x-3"
                  >
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"></div>
                    <span className="text-slate-300 text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                Schedule Consultation
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-600 hover:border-slate-500 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-slate-800/50">
                View Credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
