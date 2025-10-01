"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Get appointment data from URL params or localStorage
    const data = {
      name: searchParams.get('name') || localStorage.getItem('bookingName'),
      email: searchParams.get('email') || localStorage.getItem('bookingEmail'),
      service: searchParams.get('service') || localStorage.getItem('bookingService'),
      date: searchParams.get('date') || localStorage.getItem('bookingDate'),
      time: searchParams.get('time') || localStorage.getItem('bookingTime')
    };

    if (data.name) {
      setAppointmentData(data);
      // Clear localStorage after use
      localStorage.removeItem('bookingName');
      localStorage.removeItem('bookingEmail');
      localStorage.removeItem('bookingService');
      localStorage.removeItem('bookingDate');
      localStorage.removeItem('bookingTime');
    }
  }, [searchParams]);

  const formatTime = (time) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const startDate = new Date();
    startDate.setHours(parseInt(hour), parseInt(minute));
    const endDate = new Date();
    endDate.setHours(parseInt(hour) + 1, parseInt(minute));

    const startTime = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });
    const endTime = endDate.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });

    return `${startTime} - ${endTime}`;
  };

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
      <div className="w-[90%] max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center mt-10">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Appointment Request Received!
          </h1>

          <p className="text-slate-600 mb-8">
            Thank you for booking with us. We have received your appointment request and will confirm within 24 hours.
          </p>

          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Name:</span>
                <span className="font-medium text-slate-900">{appointmentData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="font-medium text-slate-900">{appointmentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service:</span>
                <span className="font-medium text-slate-900">{appointmentData.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-medium text-slate-900">
                  {new Date(appointmentData.date).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium text-slate-900">{formatTime(appointmentData.time)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-yellow-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">What Happens Next?</h3>
            <div className="space-y-3 text-slate-700">
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">1.</span>
                <span>You will receive a confirmation email shortly</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">2.</span>
                <span>Our team will review and confirm your appointment within 24 hours</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-600 mr-3">3.</span>
                <span>You will receive another email with meeting details once confirmed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/booking"
              className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              Book Another Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}