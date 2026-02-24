"use client";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // স্ক্রল করলে নেভবার স্টাইল পরিবর্তন হবে
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* ১. লোগো */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
              SkillBridge
            </span>
          </div>

          {/* ২. ডেস্কটপ মেনু */}
          <div className="hidden lg:flex items-center gap-8">
            {["Find Tutors", "Courses", "Become a Tutor", "About Us"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* ৩. একশন বাটন (Login/Register) */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="text-slate-700 font-semibold px-4 py-2 hover:text-blue-600 transition-colors">
              Sign In
            </button>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md active:scale-95">
              Get Started
            </button>
          </div>

          {/* ৪. মোবাইল মেনু বাটন (Hamburger) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ৫. মোবাইল ড্রপডাউন মেনু */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
            <a href="#" className="text-lg font-medium text-slate-700">
              Find Tutors
            </a>
            <a href="#" className="text-lg font-medium text-slate-700">
              Courses
            </a>
            <a href="#" className="text-lg font-medium text-slate-700">
              Become a Tutor
            </a>
            <hr className="border-slate-100" />
            <div className="flex flex-col gap-3">
              <button className="w-full py-3 text-slate-700 font-semibold border border-slate-200 rounded-xl">
                Sign In
              </button>
              <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
