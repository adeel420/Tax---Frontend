export default function ServicesSection() {
  const specializations = [
    "Individual Income Tax Returns",
    "Partnership Tax Preparation",
    "S-Corp Tax Return Preparation",
    "Corporation Tax Return Preparation",
    "Financial Statements",
    "Bookkeeping Services",
    "Payroll & Payroll Tax Preparation",
    "Business Tax Returns",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 sm:left-20 w-56 h-56 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Explore What We Offer
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
            Specialized in Individual and Business Tax Returns with
            comprehensive financial services
          </p>

          {/* Specializations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-12">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-700 font-medium text-xs sm:text-sm text-center">
                    {spec}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
