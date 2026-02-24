"use client";

import { getStudentCount } from "@/services/user/user.service";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch total count
      const totalCount = await getStudentCount();
      setCount(totalCount);
    };

    loadData();
  }, []);

  return (
    <div className="relative bg-[#F8FAFC] overflow-hidden min-h-[90vh] flex items-center pt-20">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Next-Gen Learning Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Master New Skills with{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Expert Tutors.
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Experience personalized 1-on-1 mentorship designed to help you
              excel. Whether it&apos;s coding, design, or academics, we&apos;ve
              got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/tutors"
                className="px-8 py-4 bg-blue-600 text-white text-center font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 block"
              >
                Explore All Tutors
              </Link>

              <Link
                href="/become-tutor"
                className="px-8 py-4 bg-white text-slate-700 text-center font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all duration-300 block"
              >
                Join as a Teacher
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Image
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    alt="user"
                    width={40}
                    height={40}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 font-medium">
                Joined by{" "}
                <span className="text-slate-900 font-bold">{count}+</span>{" "}
                active students this week
              </p>
            </div>
          </div>

          {/* Right Column: Balanced Image Section */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 rounded-full blur-3xl"></div>

            <div className="relative w-full max-w-125 aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-12 border-white bg-white">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Student learning"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />

              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                    🔥
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      98% Success Rate
                    </h4>
                    <p className="text-sm text-slate-500">
                      From our global alumni
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
