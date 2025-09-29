"use client";

import { useState, useEffect } from "react";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/all`);
      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Appointment Management</h2>
        <button
          onClick={fetchAppointments}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="border-2 border-slate-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{appointment.name}</h3>
                <p className="text-base text-slate-700 mb-1">{appointment.email}</p>
                <p className="text-base text-slate-700">{appointment.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-lg text-slate-900 mb-2">{appointment.service}</p>
                <p className="text-base text-slate-600 font-medium">{new Date(appointment.date).toLocaleDateString()} at <b > {appointment.time}</b></p>
                {appointment.message && <p className="text-base text-slate-700 mt-2 bg-slate-50 p-2 rounded">{appointment.message}</p>}
              </div>

              <div className="flex gap-2">
                <select
                  value={appointment.status}
                  onChange={(e) => updateStatus(appointment._id, e.target.value)}
                  className={`px-3 py-2 h-10 border-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-200 ${getStatusColor(appointment.status)}`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}