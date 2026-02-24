"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUser, UserLogOut } from "@/services/auth";
import { useRouter } from "next/navigation";

interface User {
  image?: string;
  name?: string;
  role?: string;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch current user data
  useEffect(() => {
    const getCurrentUser = async () => {
      const userdata = await getUser();
      setUser(userdata);
      console.log({ userdata });
    };
    getCurrentUser();
  }, []);

  // Handle user logout
  const handleLogOut = () => {
    UserLogOut();
    setUser(null);
    setIsMenuOpen(false);
    router.refresh();
  };

  const navItems = [
    { name: "Find Tutors", href: "/tutors" },
    { name: "Courses", href: "/courses" },
    { name: "Become a Tutor", href: "/join" },
  ];

  return (
    <nav
      className={`fixed w-full z-100 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              SkillBridge
            </span>
          </Link>

          {/* 2. Main Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* 3. Conditional User Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-5">
                {/* User Profile Image instead of Name */}

                <Image
                  src={
                    user?.image ||
                    "https://i.ibb.co.com/v4BcgDVD/468720475-1340083213824305-1886033907171679491-n.jpg"
                  }
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-12 h-12 rounded-full border-2 border-blue-100 group-hover:border-blue-500 transition-all"
                />

                <button
                  onClick={handleLogOut}
                  className="bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-700 font-semibold px-4 py-2 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* 4. Hamburger Menu (Mobile) */}
          <div className="lg:hidden flex items-center gap-4">
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

        {/* 5. Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl py-6 px-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-slate-700"
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-slate-100" />
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                  <Image
                    src={
                      user?.image ||
                      "https://ui-avatars.com/api/?name=" + user?.name
                    }
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border border-blue-200"
                    alt="User"
                  />
                  <div>
                    <p className="font-bold text-slate-900 leading-none">
                      {user?.name}
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold uppercase">
                      {user?.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 text-center text-slate-700 font-semibold border border-slate-200 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
