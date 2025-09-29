"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How much do your tax services cost?",
      answer:
        "Our pricing starts at $99 for individual tax preparation. Business tax services start at $299. We provide transparent pricing with no hidden fees.",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      question: "How long does tax preparation take?",
      answer:
        "Most individual tax returns are completed within 24-48 hours. Business returns typically take 3-5 business days depending on complexity.",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      question: "Do you offer year-round support?",
      answer:
        "Yes! We provide year-round tax planning, quarterly reviews, and support for any tax-related questions throughout the year.",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
          />
        </svg>
      ),
    },
    {
      question: "What if I get audited?",
      answer:
        "We provide full audit support and representation. If we prepared your return, we'll stand behind our work and help you through the audit process.",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      question: "Can you help with back taxes?",
      answer:
        "Absolutely. We specialize in resolving back tax issues, setting up payment plans, and negotiating with the IRS on your behalf.",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-20 w-40 h-40 sm:w-64 sm:h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-48 h-48 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Get answers to common tax questions
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 sm:mb-6 group">
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className={`w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 text-left hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 flex items-center justify-between border-2 ${
                  openIndex === index
                    ? "border-blue-200 shadow-lg"
                    : "border-transparent hover:border-slate-100"
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    {faq.icon}
                  </div>
                  <span className="font-semibold text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-slate-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-white rounded-b-xl sm:rounded-b-2xl px-4 sm:px-6 pb-4 sm:pb-6 border-l-4 border-blue-500 ml-4 sm:ml-6 mr-4 sm:mr-6 -mt-2">
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base pt-3 sm:pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
