import {
  Star,
  GraduationCap,
  Calendar,
  CheckCircle,
  MessageSquare,
  Quote,
  ArrowLeft,
  Clock,
  ChevronRight,
  User,
} from "lucide-react";
import { getSingleTutor } from "@/services/tutor";
import Image from "next/image";
import Link from "next/link";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const tutorData = await getSingleTutor(id);
  console.log("🚀 ~ TutorDetailsPage ~ tutorData:", tutorData);

  if (!tutorData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h2 className="text-xl font-bold text-slate-500">
          Tutor Profile Not Found!
        </h2>
      </div>
    );
  }

  const {
    user,
    category,
    subjects,
    bio,
    hourlyRate,
    averageRating,
    reviewCount,
    experienceYears,
    availability,
    bookings,
    reviews,
  } = tutorData;

  // --- Helpers for Schedule Logic ---
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isSlotBooked = (startTime: Date, endTime: Date) => {
    return bookings?.some((booking: any) => {
      const bStart = new Date(booking.startTime).getTime();
      const bEnd = new Date(booking.endTime).getTime();
      const sStart = new Date(startTime).getTime();
      const sEnd = new Date(endTime).getTime();
      // যদি স্ট্যাটাস CONFIRMED হয় এবং সময় মিলে যায় তবে সেটি বুকড
      return (
        booking.status === "CONFIRMED" && sStart === bStart && sEnd === bEnd
      );
    });
  };

  const daysOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-24">
      {/* 1. Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
        <div className="container mx-auto px-6 py-4 max-w-7xl flex justify-between items-center">
          <Link
            href="/tutors"
            className="group flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-all font-bold"
          >
            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            Back to Search
          </Link>
          <p className="text-indigo-600 font-bold text-sm bg-indigo-50 px-5 py-2.5 rounded-2xl hover:bg-indigo-100 transition-colors">
            Instructor Details
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT CONTENT (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Profile Hero Card */}
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10 text-center md:text-left">
                <div className="relative">
                  <Image
                    src={
                      user?.image || "https://i.ibb.co/0YCw3SF/instructor-1.png"
                    }
                    alt={user?.name || "Tutor"}
                    width={180}
                    height={180}
                    className="rounded-[35px] object-cover ring-4 ring-slate-50 shadow-xl"
                  />
                </div>

                <div className="flex-1 pt-2">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest tracking-tighter">
                      Verified
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                      {category?.name}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
                    {user?.name}
                  </h1>
                  <p className="text-slate-500 text-lg font-medium flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="text-indigo-600" size={22} />{" "}
                    Expert in {subjects}
                  </p>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle className="text-indigo-600" size={24} /> Biography
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-line border-l-4 border-slate-50 pl-6">
                {bio}
              </p>
            </div>

            {/* --- Updated Weekly Schedule --- */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Calendar className="text-indigo-600" size={26} /> Weekly
                  Schedule
                </h2>
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-1.5 text-indigo-600">
                    <div className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded"></div>{" "}
                    Available
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded"></div>{" "}
                    Booked
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {daysOrder.map((dayName) => {
                  const daySlots = availability?.filter(
                    (s: any) => s.day === dayName,
                  );
                  if (!daySlots || daySlots.length === 0) return null;

                  return (
                    <div
                      key={dayName}
                      className="flex flex-col md:flex-row gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="md:w-32 pt-2">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-widest">
                          {dayName}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {daySlots.map((slot: any) => {
                          const booked = isSlotBooked(
                            slot.startTime,
                            slot.endTime,
                          );
                          return (
                            <div
                              key={slot.id}
                              className={`relative px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all border ${
                                booked
                                  ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed line-through"
                                  : "bg-indigo-50/50 text-indigo-700 border-indigo-100 hover:bg-indigo-600 hover:text-white cursor-pointer"
                              }`}
                            >
                              {formatTime(slot.startTime)} -{" "}
                              {formatTime(slot.endTime)}
                              {booked && (
                                <span className="absolute -top-2 -right-1 bg-slate-300 text-white text-[8px] px-1 rounded uppercase tracking-tighter">
                                  Full
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 px-4">
                <MessageSquare className="text-indigo-600" size={24} /> Student
                Feedback
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews?.length > 0 ? (
                  reviews.map((rev: any) => (
                    <div
                      key={rev.id}
                      className="bg-white p-8 rounded-[35px] border border-slate-100 shadow-sm relative group"
                    >
                      <Quote
                        className="absolute top-6 right-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        size={32}
                      />
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < rev.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 font-medium italic mb-6">
                        &quot;{rev.comment}&quot;
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                          {rev.student?.name?.charAt(0) || <User size={14} />}
                        </div>
                        <p className="text-slate-900 font-bold text-sm">
                          {rev.student?.name || "Anonymous"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-slate-400 font-bold bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                    No reviews yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[45px] p-10 shadow-2xl shadow-slate-200/60 sticky top-32 border border-slate-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>

              <div className="mb-8">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">
                  Hourly Rate
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">
                    ${hourlyRate}
                  </span>
                  <span className="text-slate-400 font-bold text-lg">/hr</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl">
                  <span className="text-slate-500 font-bold text-sm flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" /> Avg. Rating
                  </span>
                  <span className="text-slate-900 font-black">
                    {averageRating}
                  </span>
                </div>
                <div className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl">
                  <span className="text-slate-500 font-bold text-sm flex items-center gap-2">
                    <Clock size={16} className="text-indigo-500" /> Experience
                  </span>
                  <span className="text-slate-900 font-black">
                    {experienceYears}Y+
                  </span>
                </div>

                <button className="group w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-6 rounded-3xl transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 text-lg mt-4 active:scale-95">
                  Book A Session{" "}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;
