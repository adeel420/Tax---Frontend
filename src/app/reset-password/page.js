"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // handle input changes
  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, otp, newPassword } = signupInfo;

    // ✅ Frontend validations
    if (!email || !otp || !newPassword) {
      return toast.error("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    if (otp.trim().length < 6) {
      return toast.error("OTP must be at least 6 characters");
    }

    if (newPassword.length < 5) {
      return toast.error("Password must be at least 5 characters");
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER}/user/reset-password`,
        signupInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ✅ Success case
      toast.success(response?.data?.message || "Password reset successful");
      setIsSubmitted(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // ✅ Backend validation errors
      if (error.response && error.response.data) {
        const { error: errMsg, errors } = error.response.data;

        if (Array.isArray(errors)) {
          errors.forEach((err) => toast.error(err.msg || err));
        } else if (errMsg) {
          toast.error(errMsg);
        } else {
          toast.error("Something went wrong, please try again");
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
            Reset Password
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg">
            Enter your details to reset your password
          </p>
        </div>

        {/* Form / Success state */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={signupInfo.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* OTP Code */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Verification Code
              </label>
              <input
                type="text"
                name="otp"
                value={signupInfo.otp}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="123456"
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={signupInfo.newPassword}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/20 border border-white/30 rounded-lg sm:rounded-xl text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Reset Password
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
              Password Reset Successful
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">
              You can now log in with your new password.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="text-blue-300 hover:text-blue-200 font-medium text-sm sm:text-base"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
