"use client";

import Link from "next/link";
import { USER_ROLE } from "@/types/user"; // Using your Enum

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Brand Section */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                SkillBridge
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed mt-2">
              Empowering learners by connecting them with world-class tutors for
              1-on-1 personalized mentorship.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/tutors"
                  className="hover:text-blue-400 transition-colors"
                >
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="hover:text-blue-400 transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Join Us (Role-based links) */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Join Us</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href={`/register?role=${USER_ROLE.STUDENT}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  Join as a Student
                </Link>
              </li>
              <li>
                <Link
                  href={`/register?role=${USER_ROLE.TUTOR}`}
                  className="hover:text-blue-400 transition-colors"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-blue-400 transition-colors"
                >
                  Safety & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter / Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-slate-400">
                Subscribe to get the latest updates and course news.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all font-medium">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="border-slate-800 mb-8" />

        <div className="flex justify-center items-center gap-6">
          <p className="text-sm text-slate-500">
            © {currentYear} SkillBridge. All rights reserved. Built with ❤️ for
            education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
