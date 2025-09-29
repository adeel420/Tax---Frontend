"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function DocumentViewSection() {
  const [allUserDocuments, setAllUserDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, complete, incomplete
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const documentTypes = [
    { key: "driverLicense", label: "Driver License", icon: "🆔" },
    { key: "socialSecurity", label: "Social Security", icon: "🏛️" },
    { key: "w2", label: "W-2", icon: "📋" },
    { key: "f1099", label: "1099", icon: "📄" },
    { key: "form1040", label: "1040", icon: "📊" },
  ];

  // Fetch all users' documents
  const fetchAllDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/document/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.data.data) {
        setAllUserDocuments(response.data.data);
      } else {
        setAllUserDocuments([]);
      }
    } catch (err) {
      console.error("Error fetching all documents:", err);
      setError("Failed to load documents data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  // Calculate completion percentage for a user
  const getCompletionPercentage = (userDoc) => {
    const uploadedCount = documentTypes.filter(
      (docType) => userDoc[docType.key]
    ).length;
    return Math.round((uploadedCount / documentTypes.length) * 100);
  };

  // Get total documents for a user
  const getTotalDocuments = (userDoc) => {
    const requiredDocsCount = documentTypes.filter(
      (docType) => userDoc[docType.key]
    ).length;
    const miscDocsCount = userDoc.misc ? userDoc.misc.length : 0;
    return requiredDocsCount + miscDocsCount;
  };

  // Filter users based on search and status
  const filteredUsers = allUserDocuments.filter((userDoc) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      userDoc.userId.toLowerCase().includes(searchLower) ||
      (userDoc.userName &&
        userDoc.userName.toLowerCase().includes(searchLower)) ||
      (userDoc.userEmail &&
        userDoc.userEmail.toLowerCase().includes(searchLower));

    if (filterStatus === "complete") {
      return matchesSearch && getCompletionPercentage(userDoc) === 100;
    } else if (filterStatus === "incomplete") {
      return matchesSearch && getCompletionPercentage(userDoc) < 100;
    }
    return matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleView = (fileUrl, fileName) => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = (fileUrl, fileName) => {
    // If Cloudinary URL, force download using fl_attachment
    let downloadUrl = fileUrl;
    if (downloadUrl.includes("res.cloudinary.com")) {
      downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName || "document");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Error Loading Documents
          </h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchAllDocuments}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Users Documents
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Admin view of all user documents
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={fetchAllDocuments}
            className="px-3 py-2 sm:px-4 sm:py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by User ID, Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="all">All Users</option>
          <option value="complete">Complete (100%)</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <div className="text-xl sm:text-2xl font-bold text-blue-800">
            {allUserDocuments.length}
          </div>
          <div className="text-sm text-blue-600">Total Users</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <div className="text-xl sm:text-2xl font-bold text-green-800">
            {
              allUserDocuments.filter(
                (user) => getCompletionPercentage(user) === 100
              ).length
            }
          </div>
          <div className="text-sm text-green-600">Complete</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div className="text-xl sm:text-2xl font-bold text-amber-800">
            {
              allUserDocuments.filter(
                (user) =>
                  getCompletionPercentage(user) > 0 &&
                  getCompletionPercentage(user) < 100
              ).length
            }
          </div>
          <div className="text-sm text-amber-600">In Progress</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-200">
          <div className="text-xl sm:text-2xl font-bold text-red-800">
            {
              allUserDocuments.filter(
                (user) => getCompletionPercentage(user) === 0
              ).length
            }
          </div>
          <div className="text-sm text-red-600">Not Started</div>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {currentUsers.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl sm:text-6xl mb-4">📋</div>
            <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
              {searchTerm || filterStatus !== "all"
                ? "No matching users found"
                : "No users have uploaded documents yet"}
            </h4>
            <p className="text-slate-600 text-sm sm:text-base">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters."
                : "Documents will appear here once users start uploading."}
            </p>
          </div>
        ) : (
          currentUsers.map((userDoc) => (
            <div
              key={userDoc.userId}
              className="border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* User Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-medium text-sm sm:text-base">
                      {userDoc.userName && userDoc.userName !== "N/A"
                        ? userDoc.userName.slice(0, 2).toUpperCase()
                        : userDoc.userId.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                      {userDoc.userName && userDoc.userName !== "N/A"
                        ? userDoc.userName
                        : `User ${userDoc.userId}`}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {userDoc.userEmail}
                    </p>
                    <p className="text-xs text-slate-500">
                      ID: {userDoc.userId} • {getTotalDocuments(userDoc)} docs •
                      Updated {formatDate(userDoc.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg sm:text-xl font-bold text-slate-800">
                    {getCompletionPercentage(userDoc)}%
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600">
                    Complete
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      getCompletionPercentage(userDoc) === 100
                        ? "bg-green-500"
                        : getCompletionPercentage(userDoc) > 0
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${getCompletionPercentage(userDoc)}%` }}
                  ></div>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                {documentTypes.map((docType) => (
                  <div key={docType.key} className="text-center">
                    <div
                      className={`p-3 rounded-lg border-2 ${
                        userDoc[docType.key]
                          ? "bg-green-50 border-green-200"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="text-lg sm:text-2xl mb-1">
                        {docType.icon}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-slate-700">
                        {docType.label}
                      </div>
                      {userDoc[docType.key] ? (
                        <div className="mt-2 space-y-1">
                          <div
                            className="text-xs text-green-700 truncate"
                            title={userDoc[docType.key].fileName}
                          >
                            {userDoc[docType.key].fileName}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                handleView(
                                  userDoc[docType.key].fileUrl,
                                  userDoc[docType.key].fileName
                                )
                              }
                              className="flex-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              onClick={() =>
                                handleDownload(
                                  userDoc[docType.key].fileUrl,
                                  userDoc[docType.key].fileName
                                )
                              }
                              className="flex-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 mt-2">
                          Not uploaded
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Miscellaneous Documents */}
              {userDoc.misc && userDoc.misc.length > 0 && (
                <div className="border-t border-slate-200 pt-4">
                  <h5 className="text-sm font-medium text-slate-700 mb-2">
                    📁 Miscellaneous Documents ({userDoc.misc.length})
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {userDoc.misc.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs sm:text-sm font-medium text-slate-800 truncate"
                            title={doc.fileName}
                          >
                            {doc.fileName}
                          </p>
                          <p className="text-xs text-slate-600">
                            {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() =>
                              handleView(doc.fileUrl, doc.fileName)
                            }
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              handleDownload(doc.fileUrl, doc.fileName)
                            }
                            className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
          >
            Previous
          </button>

          <div className="flex flex-wrap gap-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
