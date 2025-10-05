"use client";

import { assets } from "@/app/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero_Section() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen md:mt-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-56 h-56 sm:w-80 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-purple-500/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-300">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-400/20 rounded-lg rotate-12"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-700">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-400/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-1000">
          <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-400/20 rounded-lg -rotate-12"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-[92%] sm:w-[88%] lg:w-[80%] py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            {/* Tagline */}
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs sm:text-sm font-medium animate-fade-in">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Professional Tax Services
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              <span className="block animate-slide-up">Maximize Your</span>
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-slide-up delay-200">
                Tax Returns
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl animate-slide-up delay-400">
              Expert tax preparation and planning services to help you save
              money and stay compliant. Get your maximum refund with our
              certified professionals.
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <Link
                href="/contact"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center"
              >
                <span className="flex items-center justify-center">
                  Get Started Today
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>

              <Link href="/booking">
                <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-600 hover:border-slate-500 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm">
                  Free Consultation
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 transition-all duration-1000 delay-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              {[
                { value: "8K+", label: "Happy Clients" },
                { value: "$10M+", label: "Refunds Secured" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-count-up">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          {/* Right Visual */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <Image
              src={assets.tax1}
              alt="Tax Refund Illustration"
              // width={1200}
              // height={1200}
              priority
              className="max-w-[120%] sm:max-w-[130%] lg:max-w-[140%] xl:max-w-[160%] h-auto drop-shadow-2xl animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
