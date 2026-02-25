"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { USER_ROLE } from "@/types/user";
import { getAllUser } from "@/services/user/user.service";

interface Tutor {
  id: string;
  name: string;
  image?: string;
  tutorProfile?: {
    bio?: string;
    averageRating?: number;
  };
}

const FeaturedTutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      const data = await getAllUser(USER_ROLE.TUTOR);
      setTutors(data?.slice(0, 4));
      setLoading(false);
    };
    fetchTutors();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-slate-500">
        Loading top mentors...
      </div>
    );

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Learn from the Best Mentors
            </h2>
            <p className="text-slate-500">
              Connect with industry experts who have years of experience in
              real-world projects. Get 1-on-1 guidance to accelerate your
              career.
            </p>
          </div>
          <Link
            href="/tutors"
            className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
          >
            View all tutors <span>→</span>
          </Link>
        </div>

        {/* Tutor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tutors?.map((tutor: Tutor) => (
            <div
              key={tutor.id}
              className="group bg-white rounded-3xl border border-slate-100 p-4 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-4/5 mb-4">
                <Image
                  src={
                    tutor.image ||
                    `https://ui-avatars.com/api/?name=${tutor.name}&background=random`
                  }
                  alt={tutor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase">
                  Verified
                </div>
              </div>

              <div className="px-2">
                <h3 className="font-bold text-slate-900 text-lg mb-1">
                  {tutor.name}
                </h3>
                <p className="text-slate-500 text-xs mb-4">
                  {tutor?.tutorProfile?.bio}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-slate-900 text-xs font-bold">
                      {tutor?.tutorProfile?.averageRating}
                    </span>
                  </div>
                  <Link
                    href={`/tutors/${tutor.id}`}
                    className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
