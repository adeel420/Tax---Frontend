"use client";

import { useState } from "react";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/newsletter/subscribe`,
        { email }
      );

      if (res.data.success) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 4000);
      }
    } catch (err) {
      console.error("❌ Newsletter subscribe error:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-emerald-600 relative overflow-hidden">
      {/* background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-56 sm:w-80 h-56 sm:h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Stay Tax-Smart
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Get the latest tax tips, deadline reminders, and money-saving
              strategies delivered to your inbox
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-white placeholder-white focus:ring-4 border focus:ring-white/30 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Subscribe
              </button>
            </div>
          </form>

          {/* Success message */}
          {isSubmitted && (
            <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <div className="flex items-center justify-center text-white text-sm sm:text-base">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
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
                <span className="font-semibold">
                  Thank you! You&apos;re subscribed to our newsletter.
                </span>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400">
              <p className="text-white text-sm sm:text-base">{error}</p>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-6 sm:gap-8 text-white/80">
            {[
              { text: "Weekly Tax Tips", icon: "clock" },
              { text: "Deadline Alerts", icon: "arrow" },
              { text: "Money-Saving Tips", icon: "money" },
            ].map((item, i) => (
              <div key={i} className="flex items-center text-sm sm:text-base">
                {/* icons logic here */}
                {item.text}
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs sm:text-sm text-white/70">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
