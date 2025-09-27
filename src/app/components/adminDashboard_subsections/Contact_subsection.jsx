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
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Contact Inquiries</h3>
        <span className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg px-3 py-1 rounded-full text-sm font-medium">
          {contacts.length} Total
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
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
                <td className="py-4 px-4 ">
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

      {/* Popup Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-96 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg text-white px-6 py-3 flex justify-between items-center">
              <h4 className="text-lg font-semibold">Message</h4>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-white cursor-pointer hover:text-gray-200 text-xl"
              >
                ✖
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed">
                {selectedMessage}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 text-right">
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg cursor-pointer transition"
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
