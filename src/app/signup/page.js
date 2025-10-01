"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // ✅ Frontend validation
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }
    if (name.length < 3) {
      return toast.error("Name must be at least 3 characters");
    }
    if (password.length < 5) {
      return toast.error("Password must be at least 5 characters");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Enter a valid email address");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/user/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Success
      toast.success(response?.data?.message);
      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => {
        router.push("/verify-email");
      }, 2000);
    } catch (error) {
      // ✅ Show backend validation errors
      if (error.response && error.response.data) {
        const { error: errMsg, errors } = error.response.data;

        if (Array.isArray(errors)) {
          // Backend sent an array of validation errors
          errors.forEach((err) => toast.error(err.msg || err));
        } else if (errMsg) {
          // Backend sent a single error
          toast.error(errMsg);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Card */}
        <div className="mt-20 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20 relative z-10">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center">
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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
              Join Eliaselitaxservices today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-300 hover:text-blue-200 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
