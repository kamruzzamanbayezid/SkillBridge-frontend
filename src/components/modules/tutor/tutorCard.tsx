import Image from "next/image";
import { Star, GraduationCap, DollarSign } from "lucide-react";
import Link from "next/link";
import { ITutorResponse } from "@/types/tutor.type";

const TutorCard = ({ tutor }: { tutor: ITutorResponse }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl transition-all group">
      <div className="flex gap-5">
        <Image
          src={
            tutor?.image || `https://ui-avatars.com/api/?name=${tutor?.name}`
          }
          alt={tutor?.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-50"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-slate-900">{tutor?.name}</h3>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="text-yellow-500 fill-yellow-500" size={14} />
              <span className="text-xs font-bold text-yellow-700">
                {tutor?.tutorProfile?.averageRating || "0.0"}
              </span>
            </div>
          </div>
          <p className="text-blue-600 text-sm font-medium flex items-center gap-1 mt-1">
            <GraduationCap size={14} /> {tutor?.tutorProfile?.subject}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="text-slate-900 font-bold flex items-center">
              <DollarSign size={16} /> {tutor?.tutorProfile?.hourlyRate}
              <span className="text-slate-400 font-normal text-xs">/hr</span>
            </div>
            <Link
              href={`/tutors/${tutor?.tutorProfile?.id}`}
              className="ml-auto text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
