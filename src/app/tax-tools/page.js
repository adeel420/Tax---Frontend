"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TaxTools() {
  const irsTools = [
    { title: "Where's My Refund?", url: "https://www.irs.gov/refunds", icon: "💰", desc: "Check your federal tax refund status" },
    { title: "Tax Withholding Estimator", url: "https://www.irs.gov/individuals/tax-withholding-estimator", icon: "🧮", desc: "Calculate your tax withholding" },
    { title: "Free File", url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free", icon: "🆓", desc: "File your taxes for free" },
    { title: "Payment Plans", url: "https://www.irs.gov/payments/online-payment-agreement-application", icon: "💳", desc: "Set up IRS payment plans" },
    { title: "Tax Forms", url: "https://www.irs.gov/forms-instructions", icon: "📄", desc: "Download tax forms and instructions" },
    { title: "Taxpayer Advocate", url: "https://www.taxpayeradvocate.irs.gov/", icon: "🤝", desc: "Get help with tax problems" }
  ];

  const stateRefunds = [
    { state: "California", url: "https://www.ftb.ca.gov/refund/" },
    { state: "New York", url: "https://www.tax.ny.gov/pit/file/refund.htm" },
    { state: "Texas", url: "https://comptroller.texas.gov/taxes/file-pay/refund-status/" },
    { state: "Florida", url: "https://floridarevenue.com/taxes/taxesfees/Pages/refund_status.aspx" },
    { state: "Illinois", url: "https://www2.illinois.gov/rev/research/taxstats/Pages/refundstatus.aspx" },
    { state: "Pennsylvania", url: "https://www.revenue.pa.gov/OnlineServices/PersonalIncomeTaxe-Services/Pages/Refund-Status.aspx" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20">
        <div className="w-[90%] mx-auto py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              IRS Tools & Refund Tracking
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Access official IRS tools and check your tax refund status
            </p>
          </div>

          {/* Federal Refund Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Federal Tax Refund</h2>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-6xl mb-4">🇺🇸</div>
                <h3 className="text-2xl font-bold text-white mb-4">IRS Where&apos;s My Refund?</h3>
                <p className="text-slate-300 mb-6">
                  Check your federal tax refund status directly from the IRS official website
                </p>
                <button
                  onClick={() => window.open("https://www.irs.gov/refunds", "_blank")}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  Check Federal Refund Status
                </button>
              </div>
            </div>
          </div>

          {/* IRS Tools Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Official IRS Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {irsTools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => window.open(tool.url, "_blank")}
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-slate-300 text-sm">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* State Refunds */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">State Tax Refunds</h2>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Popular State Refund Sites</h3>
                <p className="text-slate-300 mb-6">
                  Quick access to major state tax refund portals
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stateRefunds.map((state, index) => (
                  <button
                    key={index}
                    onClick={() => window.open(state.url, "_blank")}
                    className="p-4 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300 font-semibold"
                  >
                    {state.state}
                  </button>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={() => window.open("https://www.google.com/search?q=state+tax+refund+status", "_blank")}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Find Other States
                </button>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">📞</div>
                <h4 className="text-white font-semibold mb-2">IRS Phone</h4>
                <p className="text-slate-300 text-sm">1-800-829-1040</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="text-white font-semibold mb-2">Live Chat</h4>
                <button
                  onClick={() => window.open("https://www.irs.gov/help/telephone-assistance", "_blank")}
                  className="text-blue-300 hover:text-blue-200 text-sm"
                >
                  IRS Help Center
                </button>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📧</div>
                <h4 className="text-white font-semibold mb-2">Contact Us</h4>
                <button
                  onClick={() => window.location.href = "/contact"}
                  className="text-emerald-300 hover:text-emerald-200 text-sm"
                >
                  Get Professional Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}