"use client";

import { useEffect, useState } from "react";

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Fetch subscribers from backend
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/newsletter/subscribers`
        ); // Next.js API proxy (or full URL if needed)
        const data = await res.json();
        if (data.success) {
          // Map DB fields to UI structure
          const formatted = data.subscribers.map((sub, index) => ({
            id: sub._id || index,
            email: sub.email,
            subscribedAt: sub.createdAt,
            status: sub.status || "Active",
          }));
          setSubscribers(formatted);
        }
      } catch (err) {
        console.error("❌ Error fetching subscribers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/newsletter/subscriber/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) =>
          prev.map((sub) =>
            sub.id === id ? { ...sub, status: newStatus } : sub
          )
        );
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error("❌ Error updating subscriber:", err);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch = subscriber.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = subscribers.filter((s) => s.status === "Active").length;
  const unsubscribedCount = subscribers.filter(
    (s) => s.status === "Unsubscribed"
  ).length;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Newsletter Subscribers
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Manage your newsletter subscription list
          </p>
        </div>
        <div className="flex gap-6 justify-between sm:justify-end">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-600">
              {activeCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-slate-400">
              {unsubscribedCount}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              Unsubscribed
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Unsubscribed">Unsubscribed</option>
        </select>
      </div>

      {/* Subscribers List */}
      {loading ? (
        <div className="text-center py-8 text-slate-500">
          Loading subscribers...
        </div>
      ) : filteredSubscribers.length > 0 ? (
        <>
          {/* Table for md+ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                          {subscriber.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          subscriber.status === "Active"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        {subscriber.status === "Active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(subscriber.id, "Unsubscribed")
                            }
                            className="px-3 py-1 bg-red-100 text-red-600 text-xs sm:text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(subscriber.id, "Active")
                            }
                            className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs sm:text-sm font-medium rounded-lg hover:bg-emerald-200 transition-colors"
                          >
                            Reactivate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for mobile */}
          <div className="grid gap-4 md:hidden">
            {filteredSubscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="p-4 border border-slate-200 rounded-lg shadow-sm bg-slate-50"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {subscriber.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">
                      {subscriber.email}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        subscriber.status === "Active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  {subscriber.status === "Active" ? (
                    <button
                      onClick={() =>
                        handleStatusChange(subscriber.id, "Unsubscribed")
                      }
                      className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleStatusChange(subscriber.id, "Active")
                      }
                      className="px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-medium rounded-lg hover:bg-emerald-200 transition-colors"
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-slate-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H8"
            />
          </svg>
          <p className="text-slate-600 text-sm sm:text-base">
            No subscribers found
          </p>
        </div>
      )}

      {/* Export Button */}
      <div className="mt-6 flex justify-center sm:justify-end">
        <button className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:shadow-lg transition-all">
          Export List
        </button>
      </div>
    </div>
  );
}
