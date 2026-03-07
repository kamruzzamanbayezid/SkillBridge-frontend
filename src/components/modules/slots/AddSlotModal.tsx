"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ISlot } from "@/types/slot.type";
import { getCurrentUser } from "@/services/auth";
import { createTutorSlot } from "@/services/slots";
// import { createSlot } from "@/services/slots";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSlot: ISlot) => void;
}

export default function AddSlotModal({ isOpen, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    day: "Saturday",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [tutorProfileId, setTutorProfileId] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setTutorProfileId(currentUser?.data?.tutorProfile?.id);
    };
    fetchCurrentUser();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.startTime || !formData.endTime) {
      return toast.error("Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      const startDateTime = new Date(
        `${formData.date}T${formData.startTime}:00Z`,
      ).toISOString();
      const endDateTime = new Date(
        `${formData.date}T${formData.endTime}:00Z`,
      ).toISOString();

      const payload = {
        day: formData.day,
        startTime: startDateTime,
        endTime: endDateTime,
        tutorProfileId,
      };

      const res = await createTutorSlot(payload);
      console.log({ res });
      if (res.success) {
        toast.success("New slot added!");
        onSuccess(res.data);
        onClose();
        setFormData({ day: "Saturday", date: "", startTime: "", endTime: "" });
      } else {
        throw new Error(res.message || "Failed to create slot");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error?.message
          : "Overlap detected or internal error";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900">Add New Slot</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Day & Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Select Day
              </label>
              <select
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              >
                {[
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Select Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-100 px-6 py-2 text-sm font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Save Slot"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
