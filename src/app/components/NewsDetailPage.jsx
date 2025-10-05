'use client';

import { useState } from 'react';

export default function NewsDetailPage() {
  const [article] = useState({
    id: 1,
    title: "Tax Updates and News for 2025",
    subtitle: "Important changes and deadlines for the upcoming tax season",
    image: "https://www.irs.gov/pub/image/homepage-news-special-filing-250-208_0.png",
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
    `
  });

  const relatedArticles = [
    {
      id: 2,
      title: "Disaster Relief Information",
      image: "https://www.irs.gov/pub/image/flood-disaster-homepage.jpg",
      excerpt: "Tax relief options for disaster-affected taxpayers"
    },
    {
      id: 3,
      title: "Scam Prevention Tips",
      image: "https://www.irs.gov/pub/image/scamhomepage.jpg",
      excerpt: "How to protect yourself from tax-related scams"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
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
            
            <h1 className="text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
            <p className="text-xl text-slate-300 mb-8">{article.subtitle}</p>
            
            <div className="flex items-center justify-center gap-6 text-slate-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {article.author}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(article.publishDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
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
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div 
                className="prose prose-lg max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  fontSize: '18px',
                  lineHeight: '1.8'
                }}
              />
            </div>

            {/* Share Section */}
            <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-6 mb-12 border border-blue-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Share this article</h3>
                <div className="flex gap-3">
                  <button className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">Related Articles</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <div key={related.id} className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
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
      </section>

      {/* Back to News */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
            ← Back to All News
          </button>
        </div>
      </section>
    </div>
  );
}