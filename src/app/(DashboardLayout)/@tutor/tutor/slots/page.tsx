"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Calendar, Clock, Tag } from "lucide-react";
import Swal from "sweetalert2";
import { getTutorSlots } from "@/services/slots";
import { ISlot } from "@/types/slot.type";

export default function MySlots() {
  const [slots, setSlots] = useState<ISlot[]>([]);
  
  useEffect(() => {
    const fetchSlots = async () => {
      const res = await getTutorSlots();
      setSlots(res.data);
    };
    fetchSlots();
  }, []);

  const handleDelete = async (id: string, status: string) => {
    if (status === "BOOKED") {
      return Swal.fire(
        "Action Denied",
        "You cannot delete a booked slot!",
        "error",
      );
    }

    const result = await Swal.fire({
      title: "Delete Slot?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      // const res = await deleteSlot(id);
      // if (res.success) {
      //   setSlots((prev) => prev.filter((slot) => slot.id !== id));
      //   toast.success("Slot deleted successfully");
      // }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            My Teaching Slots
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage your availability for students
          </p>
        </div>
        <button
          //     onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-indigo-100"
        >
          <Plus size={18} /> Create New Slot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots?.map((slot) => (
          <div
            key={slot?.id}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-50 px-3 py-1 rounded-lg text-[11px] font-black text-slate-500 uppercase tracking-wider">
                {slot?.day}
              </div>
              <span
                className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                  slot?.status === "AVAILABLE"
                    ? "bg-emerald-50 text-emerald-600"
                    : slot?.status === "BOOKED"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-blue-50 text-blue-600"
                }`}
              >
                {slot?.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <Clock size={16} className="text-indigo-500" />
                <span className="text-sm font-bold">
                  {new Date(slot?.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(slot?.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Calendar size={16} />
                <span className="text-xs font-medium">
                  {new Date(slot?.startTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-50 flex justify-end">
              <button
                onClick={() => handleDelete(slot?.id, slot?.status)}
                className="text-slate-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {slots?.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white border-2 border-dashed border-slate-100 rounded-3xl">
            <Calendar className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-500 font-bold">No slots created yet.</p>
            <p className="text-slate-400 text-sm">
              Click the button above to start adding slots.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
