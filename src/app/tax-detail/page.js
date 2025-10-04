"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const toc = [
    { href: "#filing", label: "Filing" },
    { href: "#inflation-adjustments", label: "Inflation adjustments" },
    { href: "#standard-mileage-rates", label: "Standard mileage rates" },
    { href: "#covid-era-tax-credits", label: "COVID-era tax credits" },
    { href: "#disaster-tax-relief", label: "Disaster tax relief" },
    {
      href: "#clean-vehicle-energy-credits",
      label: "Clean vehicle and energy credits",
    },
  ];

  const [article] = useState({
    id: 1,
    title: "Tax Updates and News for 2025",
    subtitle: "Important changes and deadlines for the upcoming tax season",
    image:
      "https://www.irs.gov/pub/image/homepage-news-special-filing-250-208_0.png",
    publishDate: "2024-01-20",
    author: "IRS Communications",
    category: "Tax Updates",
    readTime: "5 min read",
    content: `
      <p>The Internal Revenue Service has announced several important updates for the 2025 tax season that taxpayers should be aware of. These changes will affect how you file your taxes and may impact your refund timeline.</p>
      
      <h3>Key Changes for 2025</h3>
      <p>The standard deduction amounts have been adjusted for inflation. For single filers, the standard deduction increases to $14,600, while married couples filing jointly will see an increase to $29,200.</p>
      
      <h3>Important Deadlines</h3>
      <p>The tax filing deadline remains April 15, 2025. However, taxpayers in certain disaster-affected areas may be eligible for extended deadlines. Check the IRS website for specific information about your area.</p>
      
      <h3>New Electronic Filing Requirements</h3>
      <p>Starting this year, all tax preparers who file more than 10 returns must use electronic filing. This change is designed to improve accuracy and speed up processing times.</p>
      
      <h3>Refund Processing Updates</h3>
      <p>The IRS expects to process most refunds within 21 days for electronically filed returns with direct deposit. Paper returns may take 6-8 weeks to process.</p>
    `,
  });

  const relatedArticles = [
    {
      id: 2,
      title: "Disaster Relief Information",
      image: "https://www.irs.gov/pub/image/flood-disaster-homepage.jpg",
      excerpt: "Tax relief options for disaster-affected taxpayers",
      link: "/disaster-detail",
    },
    {
      id: 3,
      image: "https://www.irs.gov/pub/image/vita-recruit-hpsize.jpg",
      title: "Volunteers needed",
      excerpt: "Learn to prepare taxes and help your comunity",

      link: "/scam-detail",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-56 sm:w-72 h-56 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs sm:text-sm font-medium">
                {article.category}
              </span>
              <span className="text-slate-300 text-xs sm:text-sm">
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-snug sm:leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 text-sm sm:text-base">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {article.author}
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(article.publishDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-8 sm:mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Body */}
            <main className="mx-auto w-full text-black max-w-3xl px-4 py-6 md:py-10">
              <h1 className="text-4xl text-center font-bold mb-12 ">
                Tax updates and news from the IRS
              </h1>
              <p className="mb-4 text-sm">
                {
                  "Get critical updates that may affect your tax filing and recent IRS news."
                }
              </p>

              {/* <AnchorTOC items={toc} /> */}

              <div id="filing" title="Filing">
                <p>
                  <strong>Free tax filing options</strong> – The IRS offers{" "}
                  <a href="#">free online</a> and in-person tax preparation
                  options through <a href="#">IRS Free File</a>,{" "}
                  <a href="#">IRS Direct File</a> and volunteer programs like{" "}
                  <a href="#">
                    Tax Assistance and Tax Counseling for the Elderly
                  </a>
                  . For military members and some veterans,{" "}
                  <a href="#">MilTax</a> generally offers free return
                  preparation and electronic filing software for federal income
                  tax returns and up to the state income tax returns.
                </p>
                <p>
                  <strong>
                    Form 1099-K – Payment card and online marketplace
                    transactions
                  </strong>{" "}
                  – The IRS issued <a href="#">Notice 2024-85</a> providing
                  transition relief for third party settlement organizations
                  (TPSOs), also known as payment apps and online marketplaces,
                  regarding transactions during calendar years 2024 and 2025.
                </p>
                <p>
                  Taxpayers who received more than $5,000 in payments for goods
                  and services through an online marketplace or payment app in
                  2024 should expect to receive a <a href="#">Form 1099-K</a> in
                  January 2025. A copy of this form will also be sent to the
                  IRS.
                </p>
              </div>

              <div className="my-6 h-px bg-border" />

              <div id="inflation-adjustments" title="Inflation adjustments">
                <p>
                  <strong>For tax year 2025</strong> – The{" "}
                  <a href="#">annual inflation adjustments for tax year 2025</a>
                  , <a href="#">Revenue Procedure 2024-20</a> provides detailed
                  information on adjustments and changes to more than 60 tax
                  provisions that will impact what taxpayers will find on their
                  tax returns in 2026.
                </p>
                <p>
                  <strong>For tax year 2024</strong> – The{" "}
                  <a href="#">
                    annual inflation adjustments for more than 60 tax provisions
                    for tax year 2024
                  </a>
                  , including the tax rate schedules and other tax changes.{" "}
                  <a href="#">Revenue Procedure 2023-34</a> provides detailed
                  information about the annual adjustments.
                </p>
              </div>

              <div className="my-6 h-px bg-border" />

              <div id="standard-mileage-rates" title="Standard mileage rates">
                <p>
                  <strong>For 2025</strong> – Beginning on Jan. 1, 2025, the{" "}
                  <a href="#">optional standard mileage rate</a> for automobiles
                  driven for business increased by 3 cents to 69 cents per mile.
                  The rates for other purposes remained unchanged from 2024.
                </p>
                <p>
                  <strong>For 2024</strong> – Beginning on Jan. 1, 2024, the
                  standard mileage rates for the use of a car (also vans,
                  pickups or panel trucks) are 67 cents per mile driven for
                  business use. For details, see{" "}
                  <a href="#">
                    IRS issues standard mileage rates for 2024; mileage rate
                    increases to 67 cents a mile, up 1.5 cents from 2023
                  </a>
                  .
                </p>
              </div>

              <div className="my-6 h-px bg-border" />

              <div id="covid-era-tax-credits" title="COVID-era tax credits">
                <p>
                  <strong>
                    Employee Retention Credit: Resolving incorrect claims
                  </strong>{" "}
                  – Generally, businesses can’t claim the Employee Retention
                  Credit if they’ve already received certain credits or the same
                  wages were used for other purposes.{" "}
                  <a href="#">Resources to check ERC eligibility</a>.
                </p>
                <ul className="list-disc pl-6">
                  <li>
                    <a href="#">Warning signs of incorrect claims</a>
                  </li>
                  <li>
                    <a href="#">Claim withdrawal process</a> – If businesses
                    filed an incorrect claim, they should consider the{" "}
                    <a href="#">claim withdrawal</a> program that allows them to
                    withdraw ineligible claims with no interest or penalties.
                  </li>
                  <li>
                    <a href="#">Frequently asked questions on ERC</a>
                  </li>
                </ul>
              </div>

              <div className="my-6 h-px bg-border" />

              <div id="disaster-tax-relief" title="Disaster tax relief">
                <p>
                  {
                    "Tax relief is available to taxpayers in areas affected by federally declared disasters. "
                  }
                  To find out whether an area qualifies and key deadlines, see{" "}
                  <a href="#">Credits and deductions for individuals</a>.
                </p>
              </div>

              <div className="my-6 h-px bg-border" />

              <div
                id="clean-vehicle-energy-credits"
                title="Clean vehicle and energy credits"
              >
                <p>
                  {
                    "You may qualify for tax credits if you have purchased a clean vehicle or made home energy improvements. "
                  }
                  See <a href="#">Credits and deductions for individuals</a> and{" "}
                  <a href="#">Energy credits for businesses</a> for more
                  information.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-10 sm:mb-12">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {relatedArticles.map((related) => (
                <div
                  key={related.id}
                  onClick={() => router.push(related.link)}
                  className="bg-slate-50 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base">
                        {related.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to News */}
      <section className="py-10 sm:py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Link
            href={"/#irs-news"}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            ← Back to All News
          </Link>
        </div>
      </section>
    </div>
  );
}
