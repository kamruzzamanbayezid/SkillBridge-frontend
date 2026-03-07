"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSlot } from "@/services/slots";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSlot: any) => void;
}

export default function AddSlotModal({ isOpen, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    day: "Saturday",
    date: "",
    startTime: "",
    endTime: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ভ্যালিডেশন
    if (!formData.date || !formData.startTime || !formData.endTime) {
      return toast.error("Please fill in all fields");
    }

    setIsSubmitting(true);

    try {
      // ব্যাকএন্ডের জন্য ISO স্ট্রিং তৈরি করা
      // তারিখ এবং সময়কে কম্বাইন করে Full ISO Date তৈরি করছি
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
      };

      const res = await createSlot(payload);

      if (res.success) {
        toast.success("New slot added!");
        onSuccess(res.data);
        onClose();
        setFormData({ day: "Saturday", date: "", startTime: "", endTime: "" });
      } else {
        throw new Error(res.message || "Failed to create slot");
      }
    } catch (error: any) {
      toast.error(error.message || "Overlap detected or internal error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-50">
          <h2 className="text-xl font-black text-slate-900">Create New Slot</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Day Selection */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase mb-2 tracking-widest">
              Select Day
            </label>
            <select
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none font-bold text-slate-700"
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

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase mb-2 tracking-widest">
              Select Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2 tracking-widest">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700"
              />
            </div>
            {/* End Time */}
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase mb-2 tracking-widest">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-700"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 py-3.5 rounded-2xl font-black text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
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
