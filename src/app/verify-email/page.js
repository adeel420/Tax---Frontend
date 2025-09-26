"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [code, setCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (!code || code.trim().length === 0) {
      return toast.error("Verification code is required");
    }
    if (code.length < 4) {
      return toast.error("Code must be at least 4 characters");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/user/verify-email`,
        { code },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Success case
      toast.success(response?.data?.message);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // ✅ Backend validation / API errors
      if (error.response && error.response.data) {
        const { error: errMsg, errors } = error.response.data;

        if (Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err.msg || err));
        } else if (errMsg) {
          toast.error(errMsg);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.5 12l-2.122 2.598.33 3.36-3.26.722-1.938 2.75-3.51-1.19-3.51 1.19-1.938-2.75-3.26-.722.33-3.36L1.5 12l2.122-2.598-.33-3.36 3.26-.722 1.938-2.75 3.51 1.19 3.51-1.19 1.938 2.75 3.26.722-.33 3.36L22.5 12z" />
                <path
                  fill="#fff"
                  d="M10.5 13.5l-2-2-1.5 1.5 3.5 3.5 6-6-1.5-1.5-4.5 4.5z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            Verify Email
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
            Enter your code to verify your email
          </p>
        </div>

        {/* Form / Success state */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Enter your code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="123456"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Verify
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400"
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
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Code Verified
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
              We&apos;ve sent a password reset link to {code}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-300 hover:text-blue-200 font-medium text-sm sm:text-base"
            >
              Try another code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
