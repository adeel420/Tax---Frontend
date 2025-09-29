"use client";

import { useState, useEffect } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My Appointments
          </h1>
          <p className="text-lg text-slate-300">
            Track your scheduled tax consultations
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 text-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Complete Tax Consultation Process</h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-blue-900/50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-300 mb-3">📋 What to Bring</h4>
                <ul className="text-slate-300 space-y-2 text-sm">
                  <li>• Valid ID (Driver's License/Passport)</li>
                  <li>• Social Security Card</li>
                  <li>• W-2 forms from all employers</li>
                  <li>• 1099 forms (if applicable)</li>
                  <li>• Bank statements</li>
                  <li>• Previous year tax return</li>
                  <li>• Receipts for deductions</li>
                </ul>
              </div>

              <div className="bg-emerald-900/50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-emerald-300 mb-3">📍 Meeting Options</h4>
                <div className="text-slate-300 space-y-2 text-sm">
                  <p><strong>In-Person:</strong><br/>123 Tax Street, Suite 100<br/>City, State 12345</p>
                  <p><strong>Virtual:</strong><br/>Zoom link sent via email</p>
                  <p><strong>Phone:</strong><br/>(555) 123-4567</p>
                </div>
              </div>

              <div className="bg-purple-900/50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">⏰ Process Timeline</h4>
                <div className="text-slate-300 space-y-2 text-sm">
                  <p><strong>Booking:</strong> Instant confirmation</p>
                  <p><strong>Admin Review:</strong> Within 24 hours</p>
                  <p><strong>Confirmation:</strong> Email notification</p>
                  <p><strong>Preparation:</strong> Document checklist sent</p>
                  <p><strong>Meeting:</strong> 60-90 minutes</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-3">📧 Email Notifications</h4>
              <p className="text-slate-300 text-sm">
                You'll receive email confirmations when your appointment is confirmed by our team. 
                The email includes meeting details, document checklist, and contact information.
              </p>
            </div>

            <a href="/appointment" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
              Book New Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}