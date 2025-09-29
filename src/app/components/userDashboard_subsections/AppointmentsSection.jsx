"use client";

import { useState, useEffect } from "react";

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
    if (email) {
      fetchUserAppointments(email);
    }
  }, []);

  const fetchUserAppointments = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/user/${email}`);
      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

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
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">My Appointments</h2>
        <a href="/appointment" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Book New
        </a>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-slate-600 mb-4">No appointments scheduled</p>
          <a href="/appointment" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Schedule Your First Appointment
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900">{appointment.service}</h3>
                  <p className="text-blue-600 font-medium">
                    📅 {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                </div>
                
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  {appointment.message && (
                    <p className="text-sm text-slate-600 mt-2">{appointment.message}</p>
                  )}
                </div>
                
                <div className="text-right">
                  {appointment.status === 'confirmed' && (
                    <div className="text-sm text-slate-600">
                      <p className="font-medium text-green-600">✅ Confirmed</p>
                      <p>Check email for details</p>
                    </div>
                  )}
                  {appointment.status === 'pending' && (
                    <p className="text-sm text-yellow-600">⏳ Awaiting confirmation</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}