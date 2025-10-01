"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { isAuthenticated, getUserData, logout } from "../utils/auth";
import Contact_subsection from "../components/adminDashboard_subsections/Contact_subsection";
import DocumentViewSection from "../components/adminDashboard_subsections/DocumentViewSection";
import NewsletterManagement from "../components/adminDashboard_subsections/NewsletterManagement";
import AppointmentManagement from "../components/adminDashboard_subsections/AppointmentManagement";


export default function Page() {
  const [activeTab, setActiveTab] = useState("overview");
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
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "clients", label: "Clients", icon: "👥" },
    { id: "document", label: "Documents", icon: "📄" },
    { id: "contact", label: "Contact", icon: "📧" },
    { id: "appointments", label: "Appointments", icon: "📅" },

    { id: "newsLetter", label: "News Letter", icon: "📩" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "logout", label: "Logout", icon: "⏻" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Admin Dashboard Logout");
    router.push("/");
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

    if (userData.role !== 1) {
      toast.error("Access denied. Admin privileges required");
      router.push("/user-dashboard");
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
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-blue-900 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ETS</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-white">
              Eliaselitaxservices
            </span>
          </div>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "logout") handleLogout();
                if (window.innerWidth < 1024) setSidebarOpen(false); // auto-close on mobile
              }}
              className={`w-full flex items-center px-4 cursor-pointer py-3 mb-2 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
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

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-32 md:w-48 lg:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* User Avatar */}
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : ""}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <div className="text-2xl md:text-3xl">{stat.icon}</div>
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          stat.change.startsWith("+")
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-slate-600 text-xs md:text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-xl md:text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts & Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">
                    Revenue Overview
                  </h3>
                  <div className="h-48 md:h-64 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl flex items-center justify-center">
                    <div className="text-center text-slate-600">
                      <svg
                        className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4"
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
                      <p className="font-semibold text-sm md:text-base">
                        Revenue Chart
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Clients */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">
                    Recent Clients
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    {recentClients.map((client, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-xl"
                      >
                        <div>
                          <p className="font-semibold text-slate-900 text-sm md:text-base">
                            {client.name}
                          </p>
                          <p className="text-xs md:text-sm text-slate-600">
                            {client.service}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-sm md:text-base">
                            {client.amount}
                          </p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              client.status === "Completed"
                                ? "bg-emerald-100 text-emerald-600"
                                : client.status === "In Progress"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {client.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "clients" && (
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
                <h3 className="text-lg md:text-xl font-bold text-slate-900">
                  Client Management
                </h3>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm md:text-base">
                  Add Client
                </button>
              </div>
              <div className="h-64 md:h-96 bg-slate-50 rounded-xl flex items-center justify-center">
                <p className="text-slate-600 text-sm md:text-base">
                  Client management interface
                </p>
              </div>
            </div>
          )}

          {activeTab === "document" && <DocumentViewSection />}

          {activeTab === "contact" && (
            <div className="overflow-x-auto">
              <Contact_subsection />
            </div>
          )}



          {activeTab === "appointments" && <AppointmentManagement />}

          {activeTab === "newsLetter" && <NewsletterManagement />}

          {activeTab === "settings" && (
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">
                Settings
              </h3>
              <div className="h-64 md:h-96 bg-slate-50 rounded-xl flex items-center justify-center">
                <p className="text-slate-600 text-sm md:text-base">
                  Settings interface
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
