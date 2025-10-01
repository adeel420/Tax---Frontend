"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const services = [
    "Individual Income Tax Return Preparation",
    "Partnership Tax Return Preparation",
    "S-Corp Tax Return Preparation",
    "Corporation Tax Return Preparation",
    "Financial Statements",
    "Bookkeeping",
    "Payroll & Payroll Tax Preparation",
    "Specialized in individual and Business Tax Returns",
  ];

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/slots/${date}`);
      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.availableSlots);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    fetchAvailableSlots(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          timeSlot: selectedTime
        })
      });

      const data = await response.json();
      if (data.success) {
        // Store booking data for confirmation page
        localStorage.setItem('bookingName', formData.name);
        localStorage.setItem('bookingEmail', formData.email);
        localStorage.setItem('bookingService', formData.service);
        localStorage.setItem('bookingDate', selectedDate);
        localStorage.setItem('bookingTime', selectedTime);

        // Redirect to confirmation page
        router.push('/booking-confirmation');
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      toast.error("Error booking appointment");
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const isDateDisabled = (day) => {
    if (!day) return true;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable Sundays (0 = Sunday)
    if (date.getDay() === 0) {
      return true;
    }
    
    // If it's today and after business hours
    if (date.toDateString() === now.toDateString()) {
      const dayOfWeek = now.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5 && now.getHours() >= 17) {
        return true; // Mon-Fri after 5 PM
      }
      if (dayOfWeek === 6 && now.getHours() >= 15) {
        return true; // Saturday after 3 PM
      }
    }
    
    return date < today;
  };

  const getDateString = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const startDate = new Date();
    startDate.setHours(parseInt(hour), parseInt(minute));

    const endDate = new Date();
    endDate.setHours(parseInt(hour) + 1, parseInt(minute));

    const startTime = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const endTime = endDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${startTime}-${endTime}`;
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16">
      <div className="w-[90%] mx-auto">
        <div className="text-center mb-12">
          <h1 className="mt-20 text-4xl lg:text-5xl font-bold text-white mb-4">
            Schedule Your Appointment
          </h1>
          <p className="text-lg text-slate-300">
            Book a consultation with our tax experts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Calendar or Selected Date */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            {!selectedDate ? (
              // Calendar View
              <>
                <div className="flex items-center justify-between mb-6">
                  <button onClick={() => navigateMonth(-1)} className="p-3 hover:bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <button onClick={() => navigateMonth(1)} className="p-3 hover:bg-slate-100 rounded-lg border border-slate-200 shadow-sm">
                    <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth().map((day, index) => {
                    const dateStr = day ? getDateString(day) : '';
                    const disabled = isDateDisabled(day);

                    return (
                      <button
                        key={index}
                        onClick={() => day && !disabled && handleDateSelect(dateStr)}
                        disabled={disabled}
                        className={`p-3 text-sm rounded-lg transition-all ${!day ? 'invisible' : ''
                          } ${disabled ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-blue-50 text-slate-900'
                          }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              // Available Time Slots View
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Available Times</h3>
                  <button
                    onClick={() => {
                      setSelectedDate("");
                      setSelectedTime("");
                      setAvailableSlots([]);
                    }}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Change Date
                  </button>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {new Date(selectedDate).getDate()}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`p-4 rounded-lg text-sm font-medium transition-all ${selectedTime === slot
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                        }`}
                    >
                      {formatTime(slot)}
                    </button>
                  ))}
                </div>

                {availableSlots.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-slate-400 mb-2">😔</div>
                    <p className="text-slate-600">No available slots for this date</p>
                    <p className="text-slate-500 text-sm mt-1">Please select another date</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
                  required
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white"
                  required
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>



              {selectedTime && (
                <div className="bg-blue-900/50 p-4 rounded-xl">
                  <h3 className="text-white font-semibold mb-2">Selected Time</h3>
                  <p className="text-blue-300">
                    {new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long', month: 'long', day: 'numeric'
                    })} at {formatTime(selectedTime)}
                  </p>
                </div>
              )}

              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="3"
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
              />

              <button
                type="submit"
                disabled={!selectedDate || !selectedTime || isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}