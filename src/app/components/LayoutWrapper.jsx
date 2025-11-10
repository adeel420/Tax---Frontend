"use client";

import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

export default function LayoutWrapper({ children }) {


 
  
  return (
    <>
     <Header />
      {children}
     <Footer />

      <BackToTop />
    </>
  );
}
