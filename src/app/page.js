"use client";

import { useState, useEffect } from "react";
import Hero_Section from "./components/home_subsections/Hero_Section";
import AboutSection from "./components/home_subsections/About_Section";
import WhyChooseUs from "./components/home_subsections/WhyChooseUs";
import ServicesSection from "./components/home_subsections/Services_Section";
import Testimonial_Section from "./components/home_subsections/Testimonal_Section";
import FAQSection from "./components/home_subsections/FAQ_Section";
import Newsletter from "./components/home_subsections/Newsletter";
import IRS_News_Section from "./components/home_subsections/IRS_News_Section";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full">

      {/*
        <Hero_Section />
        <AboutSection />
        <WhyChooseUs />
        <ServicesSection />
        <Testimonial_Section />
        <FAQSection />
        <IRS_News_Section />
        <Newsletter />
      */}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:p-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center">
            Payment Required to Activate Websites
          </h1>

          <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
            I am the web developer who built these websites for you{" "}
            <a
              href="https://www.eliaselitaxservices.com"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              (https://www.eliaselitaxservices.com)
            </a>{" "}
            and{" "}
            <a
              href="https://www.hprfarm.site/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              (https://www.hprfarm.site/)
            </a>
            . I have not yet received the payment for building these sites.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
            The first website still has an unpaid balance of{" "}
            <span className="font-semibold text-emerald-600">$160</span>, and the second one has{" "}
            <span className="font-semibold text-emerald-600">$61</span>{" "}
            remaining. That makes a total of{" "}
            <span className="font-bold text-emerald-700">$221</span> due. Both websites will go live once the full payment is received.
          </p>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
              Payment Details
            </h2>

            <p className="text-gray-700 text-sm sm:text-base break-all">
              <span className="font-semibold">Crypto Wallet Address:</span>{" "}
              <span className="text-gray-800">
                0xc9f2377fb5c2442ff4c26b74128c138220685d2d
              </span>
            </p>

            <p className="mt-3 text-gray-700 text-sm sm:text-base">
              Please send the total payment of{" "}
              <span className="font-semibold text-emerald-600">$221</span> to
              the wallet address above. Once the payment is sent, your websites
              will be activated.
            </p>

            {/* Critical Warning Section */}
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 sm:p-5">
              <h3 className="text-red-700 font-semibold mb-2 flex items-center text-base sm:text-lg">
                ⚠️ CRITICAL: Network Warning
              </h3>
              <p className="text-sm sm:text-base text-red-700 leading-relaxed">
                ONLY send <span className="font-semibold">USDC</span> on the{" "}
                <span className="font-semibold">Polygon network</span>!
                <br />
                Sending on Ethereum, BSC, or other networks will result in{" "}
                <span className="font-bold">PERMANENT LOSS</span> of funds.
              </p>

              <p className="mt-3 text-sm sm:text-base text-gray-700">
                Send <span className="font-semibold">USDC</span> from your
                wallet (e.g., Trust Wallet, OKX, etc.) to the address above.
                <br />
                <span className="font-semibold">Network:</span>{" "}
                <span className="text-emerald-600 font-medium">
                  Polygon (for lower fees)
                </span>
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm sm:text-base text-gray-500 text-center">
            Once we receive the payment, we will automatically unblock and
            activate your sites.
          </p>
        </div>
      </div>
    </div>
  );
}
