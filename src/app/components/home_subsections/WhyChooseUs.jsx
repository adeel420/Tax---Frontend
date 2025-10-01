export default function WhyChooseUs() {
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Certified Experts",
      description: "IRS-certified tax professionals with 5+ years experience",
      stat: "5+ Years",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      title: "Maximum Refunds",
      description: "We find every deduction to maximize your tax refund",
      stat: "$50M+ Saved",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Secure & Trusted",
      description: "Bank-level security with 100% confidentiality guarantee",
      stat: "15K+ Clients",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Why Choose Eliaselitaxservices?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
            We combine expertise, technology, and personalized service to
            deliver exceptional results
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
                <div className="relative">
                  {/* Icon */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Stat Badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {feature.stat}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div className="mt-4 sm:mt-6 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
