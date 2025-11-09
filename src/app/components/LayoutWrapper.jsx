"use client";

// import { usePathname } from "next/navigation";
// import Header from "./Header";
// import Footer from "./Footer";
import BackToTop from "./BackToTop";

export default function LayoutWrapper({ children }) {
  // const pathname = usePathname();
  // const hideHeaderPaths = [
  //   "/admin-dashboard",
  //   "/login",
  //   "/signup",
  //   "/forget-password",
  //   "/verify-email",
  //   "/reset-password",
  //   "/user-dashboard",
  // ];
  // const hideHeaderFooter = hideHeaderPaths.includes(pathname);

  return (
    <>
       
      {children}
      
      <BackToTop />
    </>
  );
}
