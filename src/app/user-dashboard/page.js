"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { isAuthenticated, getUserData, logout } from "../utils/auth";
import Contact_subsection from "../components/adminDashboard_subsections/Contact_subsection";
import DocumentsSection from "../components/userDashboard_subsections/DocumentsSection";
import Link from "next/link";


export default function Page() {
  const [activeTab, setActiveTab] = useState("document");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();

  const stats = [
    { title: "Total Clients", value: "15,247", change: "+12%", icon: "👥" },
    { title: "Active Returns", value: "2,834", change: "+8%", icon: "📄" },
    { title: "Revenue", value: "$847K", change: "+15%", icon: "💰" },
    { title: "Completion Rate", value: "94%", change: "+3%", icon: "✅" },
  ];

  const recentClients = [
    {
      name: "John Smith",
      service: "Individual Tax",
      status: "Completed",
      amount: "$299",
    },
    {
      name: "Sarah Johnson",
      service: "Business Tax",
      status: "In Progress",
      amount: "$599",
    },
    {
      name: "Mike Chen",
      service: "Tax Planning",
      status: "Pending",
      amount: "$399",
    },
    {
      name: "Lisa Rodriguez",
      service: "Individual Tax",
      status: "Completed",
      amount: "$199",
    },
  ];

  const menuItems = [
    { id: "document", label: "Documents", icon: "📄" },
    { id: "logout", label: "Logout", icon: "🚪" },
  ];

  const handleLogout = () => {
    toast.success("Dashboard Logout");
  };router.push("/");
  };

  const checkAuthAndRole = async () => {
    if (!isAuthenticated()) {
      toast.error("Please login to access dashboard");
      router.push("/login");
      return;
    }

    const userData = await getUserData();
    if (!userData) {
      toast.error("Session expired. Please login again");
      router.push("/login");
      return;
    }

    if (userData.role === 1) {
      toast.error("Redirecting to admin dashboard");
      router.push("/admin-dashboard");
      return;
    }

    setUser(userData);
  };

  useEffect(() => {
    checkAuthAndRole();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-blue-900 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ETS</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-white">
              <Link href="/"> Eliaselitaxservices</Link>
            </span>
          </div>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(item.id);
                }
                if (window.innerWidth < 1024) setSidebarOpen(false); // auto-close on mobile
              }}
              className={`w-full flex items-center px-4 cursor-pointer py-3 mb-2 rounded-xl transition-all duration-300 ${activeTab === item.id
                ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              {item.id === "logout" ? (
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              ) : (
                <span className="mr-3 text-lg">{item.icon}</span>
              )}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              >
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="ml-4 lg:ml-0 text-lg md:text-2xl font-bold text-slate-900 capitalize">
                {activeTab}
              </h1>
            </div>


          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {activeTab === "document" && <DocumentsSection />}
        </main>
      </div>
    </div>
  );
}
