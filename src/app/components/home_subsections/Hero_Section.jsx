"use client";

import { useState, useEffect } from "react";

export default function Hero_Section() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen mt-4 md:mt-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-purple-500/5 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-300">
          <div className="w-5 h-5 sm:w-8 sm:h-8 bg-blue-400/20 rounded-lg rotate-12"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-700">
          <div className="w-4 h-4 sm:w-6 sm:h-6 bg-emerald-400/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-bounce delay-1000">
          <div className="w-6 h-6 sm:w-10 sm:h-10 bg-purple-400/20 rounded-lg -rotate-12"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-xs sm:text-sm font-medium animate-fade-in">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Professional Tax Services
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block animate-slide-up">Maximize Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-slide-up delay-200">
                  Tax Returns
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-lg animate-slide-up delay-400">
                Expert tax preparation and planning services to help you save
                money and stay compliant. Get your maximum refund with our
                certified professionals.
              </p>
            </div>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
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
              </button>

              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-slate-600 hover:border-slate-500 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm">
                Free Consultation
              </button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 transition-all duration-1000 delay-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-count-up">
                  15K+
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-count-up">
                  $50M+
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">
                  Refunds Secured
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 animate-count-up">
                  25+
                </div>
                <div className="text-slate-400 text-xs sm:text-sm">
                  Years Experience
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      Tax Calculator
                    </h3>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center animate-spin-slow">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-700/50 rounded-xl">
                      <span className="text-slate-300 text-sm sm:text-base">
                        Annual Income
                      </span>
                      <span className="text-white font-semibold text-sm sm:text-base">
                        $75,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-700/50 rounded-xl">
                      <span className="text-slate-300 text-sm sm:text-base">
                        Tax Owed
                      </span>
                      <span className="text-red-400 font-semibold text-sm sm:text-base">
                        $12,500
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-xl">
                      <span className="text-emerald-300 text-sm sm:text-base">
                        Potential Refund
                      </span>
                      <span className="text-emerald-400 font-bold text-lg sm:text-xl">
                        $3,250
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-float">
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>

              <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center animate-bounce">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
