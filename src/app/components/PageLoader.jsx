"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 hidden md:block">
      <div className="h-1 bg-gradient-to-r from-blue-600 to-emerald-600 animate-pulse">
        <div className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 animate-[loading_0.8s_ease-in-out]"></div>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}