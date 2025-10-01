"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TaxTools() {
  const [activeTab, setActiveTab] = useState("refund");
  const [selectedState, setSelectedState] = useState("");
  const [federalForm, setFederalForm] = useState({ ssn: "", refundAmount: "", zipCode: "" });
  const [stateForm, setStateForm] = useState({ ssn: "", refundAmount: "", zipCode: "" });
  const [refundResult, setRefundResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const irsResources = [
    { title: "Tax Forms & Publications", url: "https://www.irs.gov/forms-instructions", icon: "📄" },
    { title: "Tax Withholding Calculator", url: "https://www.irs.gov/individuals/tax-withholding-estimator", icon: "🧮" },
    { title: "Payment Plans", url: "https://www.irs.gov/payments/online-payment-agreement-application", icon: "💳" },
    { title: "Tax Relief Programs", url: "https://www.irs.gov/newsroom/tax-relief-in-disaster-situations", icon: "🆘" },
    { title: "Taxpayer Advocate Service", url: "https://www.taxpayeradvocate.irs.gov/", icon: "🤝" },
    { title: "Free File Program", url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free", icon: "🆓" }
  ];

  const handleRefundCheck = async (type) => {
    setLoading(true);
    setTimeout(() => {
      setRefundResult({
        type,
        status: "processed",
        amount: "$2,450",
        date: "March 15, 2024",
        method: "Direct Deposit"
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20">
        <div className="w-[90%] mx-auto py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Tax Tools & Resources
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Access IRS resources and track your federal and state tax refunds
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {[
              { id: "refund", label: "Refund Tracking", icon: "💰" },
              { id: "resources", label: "IRS Resources", icon: "📚" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "refund" && (
            <div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    🇺🇸 Federal Tax Refund
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">SSN (Last 4 digits)</label>
                      <input
                        type="text"
                        maxLength="4"
                        value={federalForm.ssn}
                        onChange={(e) => setFederalForm({...federalForm, ssn: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="1234"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Refund Amount</label>
                      <input
                        type="text"
                        value={federalForm.refundAmount}
                        onChange={(e) => setFederalForm({...federalForm, refundAmount: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="$2,500"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        maxLength="5"
                        value={federalForm.zipCode}
                        onChange={(e) => setFederalForm({...federalForm, zipCode: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="12345"
                      />
                    </div>
                    <button
                      onClick={() => handleRefundCheck("federal")}
                      disabled={loading || !federalForm.ssn || !federalForm.refundAmount || !federalForm.zipCode}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? "Checking..." : "Check Federal Refund"}
                    </button>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    🏛️ State Tax Refund
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Select Your State</label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Choose a state...</option>
                        {states.map((state) => (
                          <option key={state} value={state} className="text-black">{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">SSN (Last 4 digits)</label>
                      <input
                        type="text"
                        maxLength="4"
                        value={stateForm.ssn}
                        onChange={(e) => setStateForm({...stateForm, ssn: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                        placeholder="1234"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Expected Refund Amount</label>
                      <input
                        type="text"
                        value={stateForm.refundAmount}
                        onChange={(e) => setStateForm({...stateForm, refundAmount: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                        placeholder="$1,200"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        maxLength="5"
                        value={stateForm.zipCode}
                        onChange={(e) => setStateForm({...stateForm, zipCode: e.target.value})}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-emerald-500"
                        placeholder="12345"
                      />
                    </div>
                    <button
                      onClick={() => handleRefundCheck("state")}
                      disabled={loading || !selectedState || !stateForm.ssn || !stateForm.refundAmount || !stateForm.zipCode}
                      className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? "Checking..." : "Check State Refund"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-yellow-500/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  ⚠️ Demo Mode - For Real Refund Status
                </h3>
                <p className="text-slate-300 mb-4">
                  This is a demonstration. For actual refund status, visit official government websites:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open("https://www.irs.gov/refunds", "_blank")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    IRS Official Site
                  </button>
                  <button
                    onClick={() => window.open(`https://www.google.com/search?q=${selectedState}+tax+refund+status`, "_blank")}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    State Tax Site
                  </button>
                </div>
              </div>

              {refundResult && (
                <div className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-8 border border-green-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    ✅ Demo Result (Not Real Data)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-slate-300 text-sm">Status</div>
                      <div className="text-white font-semibold text-lg capitalize">{refundResult.status}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-slate-300 text-sm">Amount</div>
                      <div className="text-green-400 font-bold text-lg">{refundResult.amount}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-slate-300 text-sm">Expected Date</div>
                      <div className="text-white font-semibold text-lg">{refundResult.date}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-slate-300 text-sm">Method</div>
                      <div className="text-white font-semibold text-lg">{refundResult.method}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {irsResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Access official IRS resources and tools
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Quick Access Links
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: "IRS.gov", url: "https://www.irs.gov", icon: "🏛️" },
                { title: "Tax Forms", url: "https://www.irs.gov/forms-instructions", icon: "📋" },
                { title: "E-File", url: "https://www.irs.gov/filing/e-file-options", icon: "💻" },
                { title: "Tax Help", url: "https://www.irs.gov/help/telephone-assistance", icon: "📞" }
              ].map((link, index) => (
                <button
                  key={index}
                  onClick={() => window.open(link.url, "_blank")}
                  className="p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{link.icon}</div>
                  <div className="font-semibold">{link.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}