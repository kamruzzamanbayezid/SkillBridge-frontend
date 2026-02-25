// app/tutors/page.tsx
"use client";
import { getAllUser } from "@/services/user/user.service";
import React, { useState, useEffect } from "react";

const subjects = ["Mathematics", "Physics", "Programming", "English", "Design"];

const TutorBrowsePage = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [priceRange, setPriceRange] = useState(100); // Max price limit

  // Load tutors based on filters
  useEffect(() => {
    const load = async () => {
      const data = await getAllUser("TUTOR");
      setTutors(data);
    };
    load();
  }, [selectedSubject, priceRange]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-10">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-10">
        {/* SIDEBAR FILTER */}
        <aside className="lg:w-1/4 space-y-8 bg-white p-8 rounded-3xl h-fit border border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 mb-4">
              Category / Subject
            </h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${selectedSubject === sub ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">
              Max Price: ${priceRange}
            </h3>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </aside>

        {/* TUTOR GRID */}
        {/* <main className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </main> */}
      </div>
    </div>
  );
};

export default TutorBrowsePage;
