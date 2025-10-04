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

  const [pendingDocuments, setPendingDocuments] = useState({
    driverLicense: null,
    socialSecurity: null,
    w2: null,
    f1099: null,
    form1040: null,
    misc: [],
  });

  const [dragActive, setDragActive] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const documentTypes = [
    { key: "driverLicense", label: "Driver License", icon: "🆔" },
    { key: "socialSecurity", label: "Social Security Card", icon: "🏛️" },
    { key: "w2", label: "W-2 Form", icon: "📋" },
    { key: "f1099", label: "1099 Form", icon: "📄" },
    { key: "form1040", label: "Form 1040", icon: "📊" },
  ];

  // Fetch user data and existing documents on component mount
  const handleGetLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
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

      // Fetch existing documents after getting user data
      if (response.data.id) {
        await fetchExistingDocuments(response.data.id);
      }
    } catch (err) {
      console.error("Error fetching login data:", err);
      alert("Failed to load user data. Please refresh the page.");
    }
  };

  // Fetch existing documents for the user
  const fetchExistingDocuments = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/document/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setDocuments(response.data);
      }
    } catch (err) {
      // If no documents exist, that's fine - we'll start with empty state
      console.log(
        "No existing documents found or error fetching:",
        err.message
      );
    }
  };

  useEffect(() => {
    handleGetLogin();
  }, []);

  const handleFileSelect = (type, file) => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Validate file type
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

    // Store file locally without uploading
    const fileData = {
      fileName: file.name,
      file: file,
      addedAt: new Date().toISOString(),
    };

    // Update pending documents state
    if (type === "misc") {
      setPendingDocuments((prev) => ({
        ...prev,
        misc: [...(prev.misc || []), fileData],
      }));
    } else {
      setPendingDocuments((prev) => ({
        ...prev,
        [type]: fileData,
      }));
    }

    alert(
      `${documentTypes.find((doc) => doc.key === type)?.label || "Document"} added! Click 'Submit Documents' to upload.`
    );
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

  const removePendingDocument = (type, index = null) => {
    if (type === "misc" && index !== null) {
      setPendingDocuments((prev) => ({
        ...prev,
        misc: prev.misc.filter((_, i) => i !== index),
      }));
    } else {
      setPendingDocuments((prev) => ({
        ...prev,
        [type]: null,
      }));
    }
  };

  const removeUploadedDocument = async (type, index = null) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [type]: true }));
      const token = localStorage.getItem("token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/document/${user.id}/${type}${
          index !== null ? `/${index}` : ""
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
      setLoadingStates((prev) => ({ ...prev, [type]: false }));
    }
  };

  const isDocumentTypeLoading = (type) => {
    return loadingStates[type] || loading;
  };

  const hasPendingDocuments = () => {
    const singleDocs = documentTypes.some((docType) => pendingDocuments[docType.key]);
    const miscDocs = pendingDocuments.misc && pendingDocuments.misc.length > 0;
    return singleDocs || miscDocs;
  };

  const hasDocuments = () => {
    const singleDocs = documentTypes.some((docType) => documents[docType.key]);
    const miscDocs = documents.misc && documents.misc.length > 0;
    return singleDocs || miscDocs;
  };

  const handleSubmitDocuments = async () => {
    if (!hasPendingDocuments()) {
      alert('Please add at least one document before submitting.');
      return;
    }

    if (!user.id) {
      alert('User not loaded yet. Please try again.');
      return;
    }

    setSubmitting(true);
    let successCount = 0;
    let totalCount = 0;

    try {
      // Upload all pending documents
      for (const docType of documentTypes) {
        const pendingDoc = pendingDocuments[docType.key];
        if (pendingDoc) {
          totalCount++;
          try {
            const formData = new FormData();
            formData.append('userId', user.id.toString());
            formData.append('docType', docType.key);
            formData.append('file', pendingDoc.file);

            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_SERVER}/document/`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );

            const fileData = {
              fileName: pendingDoc.fileName,
              fileUrl: res.data.document.fileUrl || res.data.fileUrl,
              uploadedAt: new Date().toISOString(),
            };

            setDocuments((prev) => ({
              ...prev,
              [docType.key]: fileData,
            }));

            successCount++;
          } catch (err) {
            console.error(`Error uploading ${docType.key}:`, err);
          }
        }
      }

      // Upload misc documents
      for (const miscDoc of pendingDocuments.misc || []) {
        totalCount++;
        try {
          const formData = new FormData();
          formData.append('userId', user.id.toString());
          formData.append('docType', 'misc');
          formData.append('file', miscDoc.file);

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER}/document/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );

          const fileData = {
            fileName: miscDoc.fileName,
            fileUrl: res.data.document.fileUrl || res.data.fileUrl,
            uploadedAt: new Date().toISOString(),
          };

          setDocuments((prev) => ({
            ...prev,
            misc: [...(prev.misc || []), fileData],
          }));

          successCount++;
        } catch (err) {
          console.error('Error uploading misc document:', err);
        }
      }

      // Clear pending documents after successful upload
      setPendingDocuments({
        driverLicense: null,
        socialSecurity: null,
        w2: null,
        f1099: null,
        form1040: null,
        misc: [],
      });

      alert(`${successCount}/${totalCount} documents uploaded successfully! Admin can now view your documents.`);
    } catch (error) {
      console.error('Submit error:', error);
      alert('Error submitting documents. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Document Upload
        </h3>
        <p className="text-slate-600">Upload your tax documents securely</p>
      </div>

      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700">Processing...</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((docType) => (
          <div key={docType.key} className="space-y-3">
            <h4 className="font-semibold text-slate-700 flex items-center">
              <span className="mr-2 text-lg">{docType.icon}</span>
              {docType.label}
            </h4>

            {documents[docType.key] ? (
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-emerald-800 truncate">
                      ✅ {documents[docType.key].fileName}
                    </p>
                    <p className="text-sm text-emerald-600">
                      Uploaded: {new Date(documents[docType.key].uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeUploadedDocument(docType.key)}
                    className="text-red-500 hover:text-red-700 p-1 ml-2 disabled:opacity-50"
                    disabled={isDocumentTypeLoading(docType.key)}
                  >
                    {isDocumentTypeLoading(docType.key) ? (
                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ) : pendingDocuments[docType.key] ? (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-blue-800 truncate">
                      📄 {pendingDocuments[docType.key].fileName}
                    </p>
                    <p className="text-sm text-blue-600">
                      Ready to upload
                    </p>
                  </div>
                  <button
                    onClick={() => removePendingDocument(docType.key)}
                    className="text-red-500 hover:text-red-700 p-1 ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  dragActive === docType.key
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                } ${
                  isDocumentTypeLoading(docType.key)
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onDrop={(e) => handleDrop(e, docType.key)}
                onDragOver={(e) => handleDragOver(e, docType.key)}
                onDragLeave={handleDragLeave}
              >
                {isDocumentTypeLoading(docType.key) ? (
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                ) : (
                  <svg
                    className="w-8 h-8 text-slate-400 mx-auto mb-2"
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
                )}
                <p className="text-sm text-slate-600 mb-2">
                  {isDocumentTypeLoading(docType.key)
                    ? "Uploading..."
                    : "Drop file here or"}
                </p>
                {!isDocumentTypeLoading(docType.key) && (
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
                      disabled={isDocumentTypeLoading(docType.key)}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Miscellaneous Documents */}
        <div className="md:col-span-2 lg:col-span-3">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <span className="mr-2 text-lg">📁</span>
            Miscellaneous Documents
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            {documents.misc &&
              documents.misc.map((doc, index) => (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate">
                        {doc.fileName}
                      </p>
                      <p className="text-sm text-slate-600">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeDocument("misc", index)}
                      className="text-red-500 hover:text-red-700 p-1 ml-2 disabled:opacity-50"
                      disabled={isDocumentTypeLoading("misc")}
                    >
                      {isDocumentTypeLoading("misc") ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg
                          className="w-5 h-5"
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

            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                dragActive === "misc"
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
              } ${
                isDocumentTypeLoading("misc")
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onDrop={(e) => handleDrop(e, "misc")}
              onDragOver={(e) => handleDragOver(e, "misc")}
              onDragLeave={handleDragLeave}
            >
              {isDocumentTypeLoading("misc") ? (
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              ) : (
                <svg
                  className="w-8 h-8 text-slate-400 mx-auto mb-2"
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
              )}
              <p className="text-sm text-slate-600 mb-2">
                {isDocumentTypeLoading("misc")
                  ? "Uploading..."
                  : "Add more documents"}
              </p>
              {!isDocumentTypeLoading("misc") && (
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Upload
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileSelect("misc", e.target.files[0]);
                      }
                    }}
                    disabled={isDocumentTypeLoading("misc")}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages and Submit Button */}
      <div className="mt-6 space-y-4">
        {hasDocuments() && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">
              ✅ Documents uploaded successfully and visible to admin.
            </p>
          </div>
        )}
        
        {hasPendingDocuments() && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                📄 Documents ready to upload. Click submit to upload to Cloudinary and make visible to admin.
              </p>
            </div>
            <div className="text-center">
              <button
                onClick={handleSubmitDocuments}
                disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center mx-auto"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    📤 Submit Documents to Admin
                  </>
                )}
              </button>
              <p className="text-sm text-slate-600 mt-2">
                Upload to Cloudinary and make visible to admin dashboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
