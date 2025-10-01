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
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return toast.error("All fields are required");
    } else if (password.length < 5) {
      return toast.error("Password must be at least 5 characters");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token);
      setFormData({ email: "", password: "" });

      // Get user data to determine redirect
      try {
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/user/login-data`,
          {
            headers: {
              Authorization: `Bearer ${response?.data?.token}`,
            },
          }
        );

        const userData = userResponse.data;
        setTimeout(() => {
          if (userData.role === 1) {
            router.push("/admin-dashboard");
          } else {
            router.push("/user-dashboard");
          }
        }, 2000);
      } catch (err) {
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      // ✅ Safely show backend error messages
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
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
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Card */}
        <div className="mt-20 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20 relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
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
              Welcome Back
            </h2>
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
              Sign in to your Eliaselitaxservices account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-white font-medium mb-2 text-sm sm:text-base">
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

            <div>
              <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Sign In
            </button>
          </form>

          {/* Links */}
          <div className="mt-5 sm:mt-6 text-center">
            <Link
              href="/forget-password"
              className="text-blue-300 hover:text-blue-200 text-xs sm:text-sm"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-slate-300 text-xs sm:text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-300 hover:text-blue-200 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
