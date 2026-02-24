"use client"; // "use client" দিতে ভুলবেন না যেহেতু useEffect আছে

import { getStudentCount } from "@/services/user/user.service";
import { useEffect, useState } from "react";

const SuccessStats = () => {
  const [studentCount, setStudentCount] = useState<number | string>("...");

  useEffect(() => {
    const loadData = async () => {
      try {
        const totalCount = await getStudentCount();
        setStudentCount(totalCount > 0 ? `${totalCount}+` : "0");
      } catch (error) {
        setStudentCount("0");
      }
    };

    loadData();
  }, []);

  
  const stats = [
    { label: "Active Students", value: studentCount, color: "text-blue-500" },
    { label: "Expert Tutors", value: "120+", color: "text-indigo-500" },
    { label: "Courses & Skills", value: "45+", color: "text-emerald-500" },
    { label: "Success Rate", value: "99.9%", color: "text-orange-500" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Our Impact in Numbers
              </h2>
              <p className="text-slate-400 leading-relaxed">
                We take pride in the community we&apos;ve built. From first-time
                learners to industry experts, everyone finds a home at
                SkillBridge.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <h3
                    className={`text-4xl lg:text-5xl font-black ${stat.color} transition-all duration-500`}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-slate-400 font-medium tracking-wide uppercase text-[10px] lg:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStats;
