"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Individual Tax Preparation",
      description:
        "Complete personal tax preparation with maximum deduction identification",
      price: "$150",
      features: [
        "Form 1040 & Schedules",
        "Itemized Deductions",
        "E-filing Included",
        "Audit Support",
        "State Returns",
        "Tax Planning Advice",
      ],
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      popular: false,
    },
    {
      title: "Business Tax Services",
      description: "Comprehensive business tax solutions for all entity types",
      price: "$399",
      features: [
        "All Business Forms",
        "Quarterly Filings",
        "Payroll Tax Returns",
        "Sales Tax Returns",
        "Tax Planning",
        "Bookkeeping Support",
      ],
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      popular: true,
    },
    {
      title: "Tax Planning & Strategy",
      description:
        "Year-round strategic tax planning to minimize your tax burden",
      price: "$250",
      features: [
        "Tax Strategy Development",
        "Quarterly Reviews",
        "Retirement Planning",
        "Investment Advice",
        "Estate Planning",
        "Multi-Year Projections",
      ],
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      popular: false,
    },
  ];

  const additionalServices = [
    {
      title: "IRS Problem Resolution",
      description: "Expert help with audits, liens, levies, and back taxes",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Bookkeeping Services",
      description: "Monthly bookkeeping and financial statement preparation",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Payroll Processing",
      description: "Complete payroll management and tax compliance",
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      title: "Financial Consulting",
      description: "Business financial analysis and growth strategies",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
  ];

  const process = [
    {
      step: "1",
      title: "Initial Consultation",
      description:
        "We discuss your tax situation and goals during a free consultation",
    },
    {
      step: "2",
      title: "Document Collection",
      description:
        "Secure upload of your tax documents through our encrypted portal",
    },
    {
      step: "3",
      title: "Preparation & Review",
      description:
        "Our experts prepare your return and review for maximum savings",
    },
    {
      step: "4",
      title: "Filing & Follow-up",
      description:
        "E-file your return and provide ongoing support throughout the year",
    },
  ];

  const specializations = [
    "Individual Income Tax Returns",
    "Partnership Tax Preparation",
    "S-Corp Tax Return Preparation",
    "Corporation Tax Return Preparation",
    "Financial Statements",
    "Bookkeeping Services",
    "Payroll & Payroll Tax Preparation",
    "Business Tax Returns",
  ];

  return (
    <div className="min-h-screen pt-[70px] md:pt-[10px] bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center transition-all duration-1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tax and financial services tailored to your needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
        {/* Background Blurs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 sm:left-20 w-56 h-56 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Explore What We Offer
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
              Specialized in Individual and Business Tax Returns with
              comprehensive financial services
            </p>

            {/* Specializations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-12">
              {specializations.map((spec, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2"
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
                    <span className="text-slate-700 font-medium text-xs sm:text-sm text-center">
                      {spec}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Core Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Professional tax services with transparent pricing and guaranteed
              results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative group ${service.popular ? "transform scale-105" : ""
                  }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}

                <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 sm:mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <div className="mb-4 sm:mb-6">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                        {service.price}
                      </span>
                      <span className="text-slate-600 ml-2 text-sm sm:text-base">
                        starting
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm sm:text-base"
                      >
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">    <button
                    className={`cursor-pointer w-full py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform group-hover:scale-105 text-sm sm:text-base ${service.popular
                      ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                      }`}
                  >
                    Get Started
                  </button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Additional Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600">
              Comprehensive financial solutions for all your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
              Our Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600">
              Simple, secure, and efficient tax preparation process
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-emerald-200 transform -translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl sm:max-w-3xl mx-auto">
              Schedule your free consultation today and discover how much you
              could save
            </p>
            <div className="  flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/booking">   <button className=" cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg sm:rounded-xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Free Consultation
              </button>
              </Link>
              <Link href="tell:(630) 394-4147">  <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                Call (630) 394-4147
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
