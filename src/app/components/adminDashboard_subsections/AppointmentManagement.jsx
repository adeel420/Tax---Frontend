"use client";

import { useState, useEffect } from "react";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [meetingLinkModal, setMeetingLinkModal] = useState({ show: false, appointment: null });
  const [meetingLink, setMeetingLink] = useState('');

  const formatTimeToAMPM = (timeSlot) => {
    const [hour, minute] = timeSlot.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/all`);
      const data = await response.json();
      if (data.success) {
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(appointment =>
        appointment.name.toLowerCase().includes(term.toLowerCase()) ||
        appointment.email.toLowerCase().includes(term.toLowerCase()) ||
        appointment.service.toLowerCase().includes(term.toLowerCase()) ||
        appointment.status.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAppointments(filtered);
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

  const sendMeetingLink = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/send-meeting-link/${meetingLinkModal.appointment._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingLink })
      });

      if (response.ok) {
        alert('Meeting link sent successfully!');
        setMeetingLinkModal({ show: false, appointment: null });
        setMeetingLink('');
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error sending meeting link:", error);
      alert('Failed to send meeting link');
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Appointment Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-500"
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
          <button
            onClick={fetchAppointments}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            {searchTerm ? `No appointments found for "${searchTerm}"` : 'No appointments found'}
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
          <div key={appointment._id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{appointment.name}</h3>
                <p className="text-slate-700">{appointment.email}</p>
                <p className="text-slate-700">{appointment.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">{appointment.service}</p>
                <p className="text-blue-600 font-medium">
                  {new Date(appointment.date).toLocaleDateString()} at {formatTimeToAMPM(appointment.timeSlot)}
                </p>

                {appointment.message && <p className="text-slate-600 text-sm mt-2">{appointment.message}</p>}
              </div>

              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                {appointment.status === 'confirmed' && (
                  <button
                    onClick={() => setMeetingLinkModal({ show: true, appointment })}
                    className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                  >
                    📧 Send Meet Link
                  </button>
                )}
              </div>

              <div>
                <select
                  value={appointment.status}
                  onChange={(e) => updateStatus(appointment._id, e.target.value)}
                  className={`px-4 py-2 border-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-200 ${getStatusColor(appointment.status)} cursor-pointer`}
                >
                  <option value="pending" className="bg-yellow-100 text-yellow-800"> Pending</option>
                  <option value="confirmed" className="bg-blue-100 text-blue-800"> Confirmed</option>
                  <option value="completed" className="bg-green-100 text-green-800"> Completed</option>
                  <option value="cancelled" className="bg-red-100 text-red-800"> Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Meeting Link Modal */}
      {meetingLinkModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Send Google Meet Link</h3>
            <p className="text-sm text-slate-600 mb-4">
              Client: <strong>{meetingLinkModal.appointment?.name}</strong><br />
              Date: <strong>{new Date(meetingLinkModal.appointment?.date).toLocaleDateString()}</strong> at <strong>{formatTimeToAMPM(meetingLinkModal.appointment?.timeSlot)}</strong>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Google Meet Link:
              </label>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full px-3 py-2 border placeholder:text-gray-300 text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-xs text-blue-700">
                💡 <strong>How to get the link:</strong><br />
                1. Go to meet.google.com<br />
                2. Click "New meeting" → "Start an instant meeting"<br />
                3. Copy the meeting link and paste it above
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setMeetingLinkModal({ show: false, appointment: null });
                  setMeetingLink('');
                }}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={sendMeetingLink}
                disabled={!meetingLink}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg transition-colors"
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}