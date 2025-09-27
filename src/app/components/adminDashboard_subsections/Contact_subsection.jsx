"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Contact_subsection() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [contacts, setContacts] = useState([]);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/contact/`
      );
      setContacts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Contact Inquiries
        </h3>
        <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length} Total
        </span>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Email
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Phone
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Service Needed
              </th>
              <th className="text-left py-3 px-4 font-semibold text-slate-700">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact._id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
              >
                <td className="py-4 px-4 text-black">{contact.name}</td>
                <td className="py-4 px-4 text-black">{contact.email}</td>
                <td className="py-4 px-4 text-black">{contact.phone}</td>
                <td className="py-4 px-4">
                  <span className="bg-gradient-to-r from-blue-100 to-emerald-100 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {contact.service}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => setSelectedMessage(contact.message)}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    View Message
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="grid gap-4 md:hidden">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm font-semibold text-slate-700">
              Name: <span className="font-normal">{contact.name}</span>
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Email:{" "}
              <span className="font-normal break-words">{contact.email}</span>
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Phone: <span className="font-normal">{contact.phone}</span>
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Service:{" "}
              <span className="bg-gradient-to-r from-blue-100 to-emerald-100 px-2 py-0.5 rounded-full text-xs">
                {contact.service}
              </span>
            </p>
            <button
              onClick={() => setSelectedMessage(contact.message)}
              className="mt-2 text-blue-600 hover:text-blue-800 underline text-sm"
            >
              View Message
            </button>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-4 sm:px-6 py-3 flex justify-between items-center">
              <h4 className="text-base sm:text-lg font-semibold">Message</h4>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-white hover:text-gray-200 text-lg sm:text-xl"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {selectedMessage}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50 text-right">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg shadow-md hover:opacity-90 transition text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
