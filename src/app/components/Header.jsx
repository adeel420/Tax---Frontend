"use client";

import { useEffect, useState } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Popover } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    router.push("/login");
  };

  const handleGetLogin = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/user/login-data`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetLogin();
  }, []);

  const content = (
    <div className="w-[150px] ">
      <button
        onClick={() => router.push("/admin-dashboard")}
        className="hover:bg-[#ccc] text-[black] w-full text-left p-2 flex gap-2 items-center text-[18px] font-semibold rounded cursor-pointer"
      >
        <MdDashboard /> Dashboard
      </button>
      <button
        onClick={handleLogout}
        className="hover:bg-[#ccc] w-full text-left p-2 flex gap-2 items-center text-[18px] font-semibold rounded cursor-pointer"
      >
        <MdLogout /> Logout
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              Eliaselitaxservices
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* CTA / Profile */}
          <div className="hidden md:block">
            {token ? (
              <Popover content={content} trigger="click">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : ""}
                </div>
              </Popover>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="btn-primary">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-4 pt-4 border-t border-slate-800">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            {token ? (
              <div className="mt-4 flex justify-start">
                <Popover content={content} trigger="click">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : ""}
                  </div>
                </Popover>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 mt-4">
                <Link href="/login" className="btn-primary w-full text-center">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary w-full text-center">
                  Signup
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Extra Tailwind Styling */}
      <style jsx>{`
        .nav-link {
          @apply text-slate-300 hover:text-white transition-colors duration-300;
        }
        .btn-primary {
          @apply px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105;
        }
      `}</style>
    </header>
  );
}
