"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function DocumentsSection() {
  const [documents, setDocuments] = useState({
    driverLicense: null,
    socialSecurity: null,
    w2: null,
    f1099: null,
    form1040: null,
    misc: [],
  });

  const [selectedFiles, setSelectedFiles] = useState({});
  const [dragActive, setDragActive] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadingAll, setUploadingAll] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const documentTypes = [
    { key: "driverLicense", label: "Driver License", icon: "🆔" },
    { key: "socialSecurity", label: "Social Security Card", icon: "🏛️" },
    { key: "w2", label: "W-2 Form", icon: "📋" },
    { key: "f1099", label: "1099 Form", icon: "📄" },
    { key: "form1040", label: "Form 1040", icon: "📊" },
  ];

  const handleGetLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setInitialLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/user/login-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);

      if (response.data.id) {
        await fetchExistingDocuments(response.data.id);
      } else {
        setInitialLoading(false);
      }
    } catch (err) {
      console.error("Error fetching login data:", err);
      alert("Failed to load user data. Please refresh the page.");
      setInitialLoading(false);
    }
  };

  console.log("user", user.id);

  const fetchExistingDocuments = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/document/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("user", response.data);
      if (response.data && response.data.data) {
        setDocuments(response.data.data);
      }
    } catch (err) {
      console.log(
        "No existing documents found or error fetching:",
        err.message
      );
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    handleGetLogin();
  }, []);

  const handleFileSelect = (type, file) => {
    if (!user.id) {
      alert("User not loaded yet. Please try again.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, JPEG, and PNG files are allowed");
      return;
    }

    if (type === "misc") {
      setSelectedFiles((prev) => ({
        ...prev,
        misc: [...(prev.misc || []), file],
      }));
    } else {
      setSelectedFiles((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const uploadSingleFile = async (type, file) => {
    const formData = new FormData();
    formData.append("userId", user.id.toString());
    formData.append("docType", type);
    formData.append("file", file);
    formData.append("userEmail", user.email);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/document/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return res.data;
  };

  const handleUploadAll = async () => {
    if (Object.keys(selectedFiles).length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    setUploadingAll(true);

    try {
      const uploadPromises = [];
      const uploadResults = [];

      for (const [type, file] of Object.entries(selectedFiles)) {
        if (type === "misc" && Array.isArray(file)) {
          for (const miscFile of file) {
            uploadPromises.push(
              uploadSingleFile(type, miscFile)
                .then((data) => {
                  uploadResults.push({
                    type,
                    success: true,
                    data,
                    file: miscFile,
                  });
                })
                .catch((err) => {
                  uploadResults.push({
                    type,
                    success: false,
                    error: err,
                    file: miscFile,
                  });
                })
            );
          }
        } else if (file) {
          uploadPromises.push(
            uploadSingleFile(type, file)
              .then((data) => {
                uploadResults.push({ type, success: true, data, file });
              })
              .catch((err) => {
                uploadResults.push({ type, success: false, error: err, file });
              })
          );
        }
      }

      await Promise.all(uploadPromises);

      const newDocuments = { ...documents };
      let successCount = 0;
      let failCount = 0;

      uploadResults.forEach((result) => {
        if (result.success) {
          successCount++;
          const fileData = {
            fileName: result.file.name,
            fileUrl: result.data.document?.fileUrl || result.data.fileUrl,
            uploadedAt: new Date().toISOString(),
          };

          if (result.type === "misc") {
            newDocuments.misc = [...(newDocuments.misc || []), fileData];
          } else {
            newDocuments[result.type] = fileData;
          }
        } else {
          failCount++;
          console.error(`Failed to upload ${result.file.name}:`, result.error);
        }
      });

      setDocuments(newDocuments);
      setSelectedFiles({});
      setEditMode(false);

      if (failCount === 0) {
        alert(`All ${successCount} document(s) uploaded successfully!`);
      } else {
        alert(
          `Upload completed: ${successCount} successful, ${failCount} failed. Please check console for details.`
        );
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("An error occurred during upload. Please try again.");
    } finally {
      setUploadingAll(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragActive("");
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) handleFileSelect(type, files[0]);
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setDragActive(type);
  };

  const handleDragLeave = () => {
    setDragActive("");
  };

  const removeDocument = async (type, index = null) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/document/${user.id}/${type}${index !== null ? `/${index}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (type === "misc" && index !== null) {
        setDocuments((prev) => ({
          ...prev,
          misc: prev.misc.filter((_, i) => i !== index),
        }));
      } else {
        setDocuments((prev) => ({
          ...prev,
          [type]: null,
        }));
      }

      alert("Document removed successfully!");
    } catch (err) {
      console.error("Error removing document:", err);
      alert("Failed to remove document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelFileSelection = (type, miscIndex = null) => {
    setSelectedFiles((prev) => {
      const updated = { ...prev };

      if (type === "misc" && miscIndex !== null) {
        const miscFiles = [...(updated.misc || [])];
        miscFiles.splice(miscIndex, 1);
        if (miscFiles.length === 0) {
          delete updated.misc;
        } else {
          updated.misc = miscFiles;
        }
      } else {
        delete updated[type];
      }

      return updated;
    });
  };

  const hasSelectedFiles = () => {
    return Object.keys(selectedFiles).length > 0;
  };

  const hasAnyDocuments = () => {
    const singleDocs = documentTypes.some((docType) => documents[docType.key]);
    const miscDocs = documents.misc && documents.misc.length > 0;
    return singleDocs || miscDocs;
  };

  const getSelectedFilesCount = () => {
    let count = 0;
    for (const [key, value] of Object.entries(selectedFiles)) {
      if (key === "misc" && Array.isArray(value)) {
        count += value.length;
      } else if (value) {
        count += 1;
      }
    }
    return count;
  };

  const getTotalDocumentsCount = () => {
    let count = 0;
    documentTypes.forEach((docType) => {
      if (documents[docType.key]) count++;
    });
    if (documents.misc) count += documents.misc.length;
    return count;
  };

  const handleEditMode = () => {
    setEditMode(true);
    setSelectedFiles({});
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedFiles({});
  };

  const showSummaryCard = hasAnyDocuments() && !editMode;

  if (initialLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-slate-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm sm:text-base">Processing...</p>
        </div>
      )}

      {showSummaryCard ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                  Documents Uploaded Successfully
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  {getTotalDocumentsCount()} document(s) securely saved
                </p>
              </div>
            </div>
            <button
              onClick={handleEditMode}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 cursor-pointer text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors flex items-center shadow-md hover:shadow-lg"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Documents
            </button>
          </div>

          {/* Uploaded documents grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documentTypes.map((docType) => {
              if (!documents[docType.key]) return null;
              return (
                <div
                  key={docType.key}
                  className="bg-white rounded-lg p-4 shadow-sm border border-slate-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{docType.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800">
                        {docType.label}
                      </p>
                      <p className="text-sm text-slate-600 truncate">
                        {documents[docType.key].fileName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(
                          documents[docType.key].uploadedAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0"
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
                </div>
              );
            })}

            {documents.misc && documents.misc.length > 0 && (
              <div className="sm:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">📁</span>
                  <p className="font-semibold text-slate-800 text-sm sm:text-base">
                    Miscellaneous Documents ({documents.misc.length})
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {documents.misc.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 rounded p-3 flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 truncate">
                          {doc.fileName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 ml-2"
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Upload Section Header */}
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {hasAnyDocuments() ? "Edit Documents" : "Document Upload"}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Upload your tax documents securely
            </p>
          </div>

          {/* Upload Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {documentTypes.map((docType) => (
              <div key={docType.key} className="space-y-3">
                <h4 className="font-semibold text-slate-700 flex items-center text-sm sm:text-base">
                  <span className="mr-2 text-lg">{docType.icon}</span>
                  {docType.label}
                </h4>

                {/* Document upload state (uploaded, selected, empty dropzone) */}
                {documents[docType.key] ? (
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-emerald-800 truncate text-sm sm:text-base">
                          {documents[docType.key].fileName}
                        </p>
                        <p className="text-xs sm:text-sm text-emerald-600">
                          {new Date(
                            documents[docType.key].uploadedAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeDocument(docType.key)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2 disabled:opacity-50"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                ) : selectedFiles[docType.key] ? (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-blue-800 truncate text-sm sm:text-base">
                          {selectedFiles[docType.key].name}
                        </p>
                        <p className="text-xs sm:text-sm text-blue-600">
                          {(selectedFiles[docType.key].size / 1024).toFixed(2)}{" "}
                          KB • Selected
                        </p>
                      </div>
                      <button
                        onClick={() => cancelFileSelection(docType.key)}
                        className="text-slate-500 hover:text-slate-700 p-1 ml-2"
                        disabled={uploadingAll}
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive === docType.key
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                      } ${uploadingAll ? "opacity-50 pointer-events-none" : ""}`}
                    onDrop={(e) => handleDrop(e, docType.key)}
                    onDragOver={(e) => handleDragOver(e, docType.key)}
                    onDragLeave={handleDragLeave}
                  >
                    <svg
                      className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm text-slate-600 mb-2">
                      Drop file here or
                    </p>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        browse
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          e.target.files[0] &&
                          handleFileSelect(docType.key, e.target.files[0])
                        }
                        disabled={uploadingAll}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}

            {/* Misc Section */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="font-semibold text-slate-700 mb-3 flex items-center text-sm sm:text-base">
                <span className="mr-2 text-lg">📁</span>
                Miscellaneous Documents
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {documents.misc &&
                  documents.misc.map((doc, index) => (
                    <div
                      key={index}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 truncate text-sm sm:text-base">
                            {doc.fileName}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => removeDocument("misc", index)}
                          className="text-red-500 hover:text-red-700 p-1 ml-2 disabled:opacity-50"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                {selectedFiles.misc &&
                  selectedFiles.misc.map((file, index) => (
                    <div
                      key={`selected-${index}`}
                      className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 sm:p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-blue-800 truncate text-sm sm:text-base">
                            {file.name}
                          </p>
                          <p className="text-xs sm:text-sm text-blue-600">
                            {(file.size / 1024).toFixed(2)} KB • Selected
                          </p>
                        </div>
                        <button
                          onClick={() => cancelFileSelection("misc", index)}
                          className="text-slate-500 hover:text-slate-700 p-1 ml-2"
                          disabled={uploadingAll}
                        >
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                {/* Dropzone */}
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${dragActive === "misc"
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                    } ${uploadingAll ? "opacity-50 pointer-events-none" : ""}`}
                  onDrop={(e) => handleDrop(e, "misc")}
                  onDragOver={(e) => handleDragOver(e, "misc")}
                  onDragLeave={handleDragLeave}
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2">
                    Add more documents
                  </p>
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">
                      Upload
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        e.target.files[0] &&
                        handleFileSelect("misc", e.target.files[0])
                      }
                      disabled={uploadingAll}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {hasSelectedFiles() && (
              <div className="flex-1 p-3 sm:p-4 bg-blue-50 border-2 border-blue-300 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-blue-900 text-sm sm:text-base">
                    Ready to Upload
                  </p>
                  <p className="text-xs sm:text-sm text-blue-700">
                    {getSelectedFilesCount()} document(s) selected
                  </p>
                </div>
                <button
                  onClick={handleUploadAll}
                  disabled={uploadingAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 sm:py-3 sm:px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md hover:shadow-lg"
                >
                  {uploadingAll ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload All Documents
                    </>
                  )}
                </button>
              </div>
            )}

            {hasAnyDocuments() && (
              <button
                onClick={handleCancelEdit}
                className="bg-slate-500 hover:bg-slate-600 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
