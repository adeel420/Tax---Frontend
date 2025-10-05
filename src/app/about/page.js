"use client";

import { useState, useEffect } from "react";
import About_Section from "../components/home_subsections/About_Section";
import Link from "next/link";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "5+", label: "Years Experience" },

    { number: "7K+", label: "Happy Clients" },
    { number: "$10M+", label: "Refunds Secured" },

    { number: "98%", label: "Success Rate" },
  ];

  const team = [
    {
      name: "Hermano M.",
      role: "Founder & CEO",
      credentials: "CPA, EA",
      description:
        "5+ years of tax expertise with specialization in business and individual tax planning.",
      avatar: "HM",
    },
    {
      name: "Ance Michael",
      role: "Senior Tax Advisor",
      credentials: "CPA",
      description:
        "Expert in complex tax situations and IRS representation with 5 years experience.",
      avatar: "AM",
    },
    {
      name: "Joseph Ebinda",
      role: "Business Tax Specialist",
      credentials: "EA, MBA",
      description:
        "Specializes in corporate tax planning and small business financial strategies.",
      avatar: "JE",
    },
  ];

  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our professional dealings.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Excellence",
      description:
        "We strive for perfection in every tax return and client interaction.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Client-Focused",
      description:
        "Your financial success and peace of mind are our top priorities.",
    },
  ];

  return (
    <div className="min-h-screen pt-[70px] md:pt-[10px] bg-white">
      {/* Hero Section */}
      <section className=" py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center transition-all duration-1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              About Eliaselitaxservices
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in tax preparation and financial planning for
              over 5 years
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-6 sm:p-8 group-hover:shadow-lg transition-all duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" bg-white">
        <About_Section />
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 sm:mb-8">
              Our Story
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
              <p>
                Founded in 2015 by Hermano M., Eliaselitaxservices began as a
                small tax preparation service with a simple mission: to provide
                honest, expert tax advice that helps individuals and businesses
                keep more of their hard-earned money.
              </p>
              <p>
                Over the past 5 years, we&apos;ve grown from a one-person
                operation to a team of certified professionals, but our
                commitment to personalized service and maximum refunds has never
                wavered.
              </p>
              <p>
                Today, we&apos;re proud to serve over 8,000 clients annually,
                having secured more than $10 million in refunds and savings
                through our expertise in tax law and dedication to finding every
                possible deduction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
              Our certified professionals bring decades of combined experience
              to your tax needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center group hover:shadow-xl transition-all duration-500"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
                  {member.name}
                </h3>
                <div className="text-blue-600 font-semibold mb-1">
                  {member.role}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                  {member.credentials}
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Our Values
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl sm:max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-white/20 group hover:bg-white/20 transition-all duration-500"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Work with Us?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl sm:max-w-3xl mx-auto">
              Experience the Eliaselitaxservices difference with a free
              consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/booking">
                <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                  Schedule Consultation
                </button>{" "}
              </Link>
              <Link href="/contact">
                {" "}
                <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                  Contact Us Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
