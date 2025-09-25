export default function ServicesSection() {
  const services = [
    {
      title: "Individual Tax Prep",
      description:
        "Complete personal tax preparation with maximum deduction identification",
      price: "$99",
      features: [
        "Form 1040",
        "Itemized Deductions",
        "E-filing Included",
        "Audit Support",
      ],
      popular: false,
    },
    {
      title: "Business Tax Services",
      description: "Comprehensive business tax solutions for all entity types",
      price: "$299",
      features: [
        "All Business Forms",
        "Quarterly Filings",
        "Tax Planning",
        "Bookkeeping Support",
      ],
      popular: true,
    },
    {
      title: "Tax Planning",
      description:
        "Year-round strategic tax planning to minimize your tax burden",
      price: "$199",
      features: [
        "Tax Strategy",
        "Quarterly Reviews",
        "Retirement Planning",
        "Investment Advice",
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 sm:left-20 w-56 h-56 sm:w-80 sm:h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
            Our Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
            Professional tax services tailored to your specific needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group ${
                service.popular ? "transform lg:scale-105" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold z-10">
                  Most Popular
                </div>
              )}

              <div
                className={`bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                  service.popular
                    ? "border-gradient-to-r from-blue-500 to-emerald-500"
                    : "border-slate-100"
                }`}
              >
                {/* Card Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                    {service.description}
                  </p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                      {service.price}
                    </span>
                    <span className="text-slate-600 ml-1 sm:ml-2 text-sm sm:text-base">
                      starting
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                      </div>
                      <span className="text-slate-700 text-sm sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 sm:py-4 font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 transform group-hover:scale-105 ${
                    service.popular
                      ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-lg"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
