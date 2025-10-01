import { useRouter } from "next/navigation";
import React from "react";

const IRS_News_Section = () => {
  const router = useRouter();
  const cards = [
    {
      id: 0,
      img: "https://www.irs.gov/pub/image/homepage-news-special-filing-250-208_0.png",
      title: "Tax Updates and News",
      desc: "Special updates and news for 2025 tax season",
      link: "/tax-detail",
    },
    {
      id: 1,
      img: "https://www.irs.gov/pub/image/flood-disaster-homepage.jpg",
      title: "Disaster Relief",
      desc: "Information on recent tax relief for taxpayers affected by disasters",
      link: "/disaster-detail",
    },
    {
      id: 2,
      img: "https://www.irs.gov/pub/image/scamhomepage.jpg",
      title: "Scams and Schemes Alert",
      desc: "Find the latest information on trending scams and schemes",
      link: "/scam-detail",
    },
  ];

  return (
    <section
      className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden"
      id="irs-news"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 md:top-20 md:right-20 w-48 h-48 md:w-72 md:h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 w-56 h-56 md:w-80 md:h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
            Latest News & Announcements
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl md:max-w-3xl mx-auto">
            Stay updated with the latest IRS news and important tax information
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              <div className="relative mb-5 md:mb-6 overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3]">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>

                <button
                  className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-all duration-300 text-sm md:text-base cursor-pointer"
                  onClick={() => router.push(card.link)}
                >
                  Read More
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IRS_News_Section;
