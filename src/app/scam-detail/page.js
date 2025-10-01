"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [article] = useState({
    id: 1,
    image: "https://www.irs.gov/pub/image/vita-recruit-hpsize.jpg",
    title: "Volunteers needed",
    subtitle: "Learn to prepare taxes and help your comunity",
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
      title: "Tax Updates and News for 2025",
      image:
        "https://www.irs.gov/pub/image/homepage-news-special-filing-250-208_0.png",
      excerpt: "Important changes and deadlines for the upcoming tax season",
      p: "/tax-detail",
    },
    {
      id: 3,
      image: "https://www.irs.gov/pub/image/flood-disaster-homepage.jpg",
      title: "Disaster Relief",
      excerpt:
        "Information on recent tax relief for taxpayers affected by disasters",
      p: "/disaster-detail",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero div */}
      <div className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium">
                {article.category}
              </span>
              <span className="text-slate-300 text-sm">{article.readTime}</span>
            </div>

            <h1 className="text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8">{article.subtitle}</p>

            <div className="flex items-center justify-center gap-6 text-slate-300">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                  className="w-5 h-5 mr-2"
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
      </div>

      {/* Article Content */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Body */}
            <main className="mx-auto max-w-4xl px-4 py-8 text-black">
              <article className="prose prose-neutral max-w-none">
                <p className="text-pretty leading-6">
                  Learn to prepare taxes and make a difference in your community
                  at the same time. How can you make a difference? Simple.
                  Volunteer to help your community by preparing taxes free of
                  charge with the Volunteer Income Tax Assistance (VITA) or Tax
                  Counseling for the Elderly (TCE) Programs.
                </p>
                <p className="text-pretty leading-6">
                  You will receive training to provide free tax help for low to
                  moderate income families who need assistance preparing their
                  tax returns. As a volunteer, you will join the thousands of
                  others who each year prepare millions of tax returns at
                  thousands of tax sites nationwide.
                </p>
                <p className="text-pretty leading-6">
                  If you have an interest in partnering with us to sponsor or
                  host a free tax preparation site in your area you can also
                  complete and submit the{" "}
                  <a className="text-blue-600 hover:underline" href="#">
                    VITA/TCE volunteer and partner sign up form
                  </a>{" "}
                  and we will be sure to follow up on your inquiry.
                </p>
                <p className="text-pretty leading-6">
                  As a committed tax volunteer, you’ll be assigned to work with
                  a sponsoring organization, get free tax law training and then
                  begin volunteering at a location in your community. Training
                  is offered both online and in the classroom. Tax sites are
                  generally open nights and weekends, and the hours are
                  flexible. You will surely find a volunteer site close to you.
                </p>

                <div title="Interested?">
                  <p className="text-pretty leading-6">
                    For additional information and next steps, submit your
                    inquiry now using the{" "}
                    <a className="text-blue-600 hover:underline" href="#">
                      VITA/TCE volunteer and partner sign up form
                    </a>{" "}
                    and you will be one step closer to becoming a VITA or TCE
                    tax volunteer and giving back to your community. We will
                    share your volunteer interest with sponsoring organizations
                    in your area for follow up contact.
                  </p>
                </div>

                <div title="Obtaining printed products">
                  <p className="text-pretty leading-6">
                    Limited printed products are available only to volunteers in
                    the VITA and TCE programs. The assigned partner organization
                    or site coordinator will provide all printed products needed
                    for volunteer training. The public can download electronic
                    versions of these products. The IRS provides access to the
                    electronic version of the products on the{" "}
                    <a className="text-blue-600 hover:underline" href="#">
                      Forms, Instructions &amp; Publications
                    </a>{" "}
                    webpage.
                  </p>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <div
                  key={related.id}
                  onClick={() => router.push(related.p)}
                  className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex gap-6">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-24 h-24 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-slate-600">{related.excerpt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to News */}
      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <Link
            href={"/#irs-news"}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            ← Back to All News
          </Link>
        </div>
      </div>
    </div>
  );
}
