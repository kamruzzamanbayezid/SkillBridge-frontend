import React from "react";
import {
  Star,
  Mail,
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { getSingleTutor } from "@/services/tutor";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const tutorData = await getSingleTutor(id);

  // আপনার ডাটা অনুযায়ী ম্যাপিং (tutorData সরাসরি প্রোফাইল অবজেক্ট)
  const user = tutorData?.user;
  const profile = tutorData;
  const category = tutorData?.category;

  if (!tutorData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold text-slate-500">
          Tutor Profile Not Found!
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top Profile Header Card */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-slate-100 mb-10">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user?.image || "https://i.ibb.co/0YCw3SF/instructor-1.png"}
                alt={user?.name}
                className="w-44 h-44 rounded-[24px] object-cover border-4 border-white shadow-md"
              />
              <div
                className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full shadow-sm"
                title="Available"
              ></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {category?.name} Expert
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 mb-2">
                    {user?.name}
                  </h1>
                  <p className="text-slate-500 flex items-center gap-2 justify-center md:justify-start">
                    <GraduationCap size={18} className="text-blue-500" />{" "}
                    {profile?.subject}
                  </p>
                </div>

                {/* Rating Card */}
                <div className="bg-yellow-50 px-6 py-3 rounded-2xl flex flex-col items-center border border-yellow-100">
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-yellow-500 fill-yellow-500"
                      size={24}
                    />
                    <span className="text-2xl font-black text-yellow-700">
                      {profile?.averageRating}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-yellow-600 uppercase mt-1">
                    {profile?.reviewCount} Student Reviews
                  </span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-50">
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Rate
                  </p>
                  <p className="text-slate-900 font-extrabold text-lg">
                    ${profile?.hourlyRate}/hr
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Exp
                  </p>
                  <p className="text-slate-900 font-extrabold text-lg">
                    {profile?.experienceYears} Years
                  </p>
                </div>
                <div className="space-y-1 lg:col-span-2">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Email
                  </p>
                  <p className="text-slate-900 font-extrabold text-lg truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Bio Section */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle className="text-blue-600" size={24} /> Biography
              </h2>
              <p className="text-slate-600 leading-loose text-lg whitespace-pre-line font-medium">
                {profile?.bio}
              </p>
            </div>

            {/* Availability Info */}
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Calendar className="text-blue-600" size={24} /> Availability
              </h2>
              {profile?.availabilitySlots?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Map through slots here */}
                </div>
              ) : (
                <p className="text-slate-400 font-medium">
                  No schedule slots currently active.
                </p>
              )}
            </div>
          </div>

          {/* Action Card (Right) */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[32px] p-8 shadow-2xl sticky top-32">
              <h3 className="text-white text-xl font-black mb-2">
                Book a Session
              </h3>
              <p className="text-slate-400 text-sm mb-8 font-medium">
                Choose a convenient time to start your learning journey.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl border border-white/10">
                  <span className="text-slate-300 font-bold">Total Cost</span>
                  <span className="text-white text-2xl font-black">
                    ${profile?.hourlyRate}
                  </span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                  Reserve a Spot
                </button>

                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-5 rounded-2xl transition-all border border-white/10">
                  Contact Instructor
                </button>
              </div>

              <p className="text-center text-slate-500 text-xs mt-6 font-medium">
                🔒 Safe & Secure Payments via TutorHub
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
