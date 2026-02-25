"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter, Star } from "lucide-react";
import { getCategories, getTutors } from "@/services/tutor/tutor.service";
import TutorCard from "@/components/modules/tutor/tutorCard";

const TutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtering States
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    price: "1000",
    rating: "0",
  });

  useEffect(() => {
    const loadInitialData = async () => {
      const catData = await getCategories();
      setCategories(catData);
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadTutors = async () => {
      setLoading(true);
      const data = await getTutors(filters);
      console.log("Load tutors", data);
      setTutors(data);
      setLoading(false);
    };
    loadTutors();
  }, [filters]); // যখনই ফিল্টার চেঞ্জ হবে, ডাটা অটো রিলোড হবে

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Sidebar Filter --- */}
          {/* --- Sidebar Filter --- */}
          <aside className="w-full lg:w-1/4">
            {/* মোবাইল এবং ট্যাবলেটের জন্য হরাইজন্টাল স্ক্রল অথবা কলাপসিবল অপশন */}
            <div className="lg:sticky lg:top-24 space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between lg:mb-4">
                <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
                  <Filter size={20} /> Filters
                </div>
                {/* মোবাইলে ফিল্টার রিসেট বা কলাপস বাটন রাখতে পারেন */}
              </div>

              {/* সার্চ এবং অন্যান্য ইনপুটগুলোর জন্য একটি গ্রিড সিস্টেম (মোবাইলে ২ কলাম, ডেসকটপে ১ কলাম) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Search Input */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Search
                  </label>
                  <div className="relative mt-1">
                    <Search
                      className="absolute left-3 top-3 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Name or Subject..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-blue-500/20 text-sm"
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Category
                  </label>
                  <select
                    className="w-full mt-1 p-2 bg-slate-50 border rounded-xl outline-none text-sm"
                    onChange={(e) =>
                      setFilters({ ...filters, categoryId: e.target.value })
                    }
                  >
                    <option value="">All Categories</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between text-sm font-semibold text-slate-600">
                    <span>Max Price</span>
                    <span className="text-blue-600">${filters.price}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    step="50"
                    className="w-full mt-2 accent-blue-600 cursor-pointer"
                    onChange={(e) =>
                      setFilters({ ...filters, price: e.target.value })
                    }
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Min Rating
                  </label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          setFilters({ ...filters, rating: star.toString() })
                        }
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          Number(filters.rating) === star
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* --- Tutor Grid --- */}
          <main className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-slate-200 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : tutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutors.map((tutor: any) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <p className="text-slate-400">
                  No tutors found matching your criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TutorPage;
