"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });

  const services = [
    "Individual Income Tax Return Preparation",
    "Partnership Tax Return Preparation",
    "S-Corp Tax Return Preparation",
    " Corporation Tax Return Preparation",
    "Financial Statements",
    "Bookkeeping",
    "Payroll & Payroll Tax Preparation",
    "Specialized in individual and Business Tax Returns"
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/appointment/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Appointment booked successfully!');
        // Store user email for dashboard
        localStorage.setItem('userEmail', formData.email);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: ""
        });
      } else {
        toast.error(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Error booking appointment. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-16 relative overflow-hidden ">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[90%] mx-auto relative z-10 mt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Professional Consultation
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Schedule Your Appointment
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Book a consultation with our certified tax professionals
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              >
                <option value="" className="text-slate-400">Select Service</option>
                {services.map((service, i) => (
                  <option key={i} value={service} className="bg-slate-700 text-white">{service}</option>
                ))}
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              >
                <option value="" className="text-slate-400">Select Time</option>
                {timeSlots.map((time, i) => (
                  <option key={i} value={time} className="bg-slate-700 text-white">{time}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <textarea
                name="message"
                placeholder="Additional notes or questions..."
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Need Help? Contact Us
          </h3>
          <div className="flex justify-center gap-8 text-slate-300">
            <div>📞 (555) 123-4567</div>
            <div>📧 info@eliaselitaxservices.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}