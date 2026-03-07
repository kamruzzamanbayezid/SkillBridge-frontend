"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { ISlot } from "@/types/slot.type";
import { getCurrentUser } from "@/services/auth";
import { createTutorSlot } from "@/services/slots";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSlot: ISlot) => void;
}

export default function AddSlotModal({ isOpen, onClose, onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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

    const { date, startTime, endTime } = formData;

    if (!date || !startTime || !endTime) {
      return toast.error("Please fill in all fields!");
    }

    setIsSubmitting(true);

    try {
      const startLocal = new Date(`${date}T${startTime}`);
      const endLocal = new Date(`${date}T${endTime}`);

      /** * ২. স্মার্ট মিডনাইট লজিক:
       * যদি এন্ড টাইম স্টার্ট টাইমের চেয়ে ছোট হয়, তবে আমরা চেক করব এটি কি
       * আসলেই মাঝরাত পার হয়েছে (যেমন রাত ৯টার পর শুরু হয়ে ভোর ৫টার আগে শেষ)।
       */
      if (endLocal <= startLocal) {
        const startHour = startLocal.getHours(); // শুরু হওয়ার ঘণ্টা (০-২৩)

        // যদি ক্লাসটি সন্ধ্যা ৬টা (১৮) বা তার পরে শুরু হয়, তবেই আমরা এন্ড টাইমকে পরের দিন ধরব
        if (startHour >= 18) {
          endLocal.setDate(endLocal.getDate() + 1);
        }
        // অন্যথায় এটি ভুল ইনপুট (যেমন ৪টা AM থেকে ৩টা AM), যা আমরা পরের দিন নেব না।
        // ফলে নিচের কন্ডিশনে এটি ধরা পড়বে।
      }

      // ৩. ফাইনাল ভ্যালিডেশন (ISO String এ কনভার্ট করার আগে)
      if (startLocal.getTime() >= endLocal.getTime()) {
        throw new Error("Start time must be before end time!");
      }

      // ৪. ডিউরেশন চেক (মিনিটে)
      const durationInMinutes =
        (endLocal.getTime() - startLocal.getTime()) / (1000 * 60);

      if (durationInMinutes < 30) {
        throw new Error("Slot must be at least 30 minutes long");
      }

      if (durationInMinutes > 180) {
        throw new Error("Slot cannot exceed 3 hours (180 minutes)");
      }

      // ৫. অতীত সময় চেক
      if (startLocal < new Date()) {
        throw new Error("You cannot create a slot for a past time!");
      }

      // ৬. দিন (Day) বের করা
      const day = startLocal.toLocaleDateString("en-US", { weekday: "long" });

      // ৭. পেলোড তৈরি
      const payload = {
        tutorProfileId,
        day,
        startTime: startLocal.toISOString(),
        endTime: endLocal.toISOString(),
      };

      console.log("Sending Payload:", payload);

      const res = await createTutorSlot(payload);

      if (res.success) {
        toast.success("New slot added successfully!");
        onSuccess(res.data);
        onClose();
        setFormData({ date: "", startTime: "", endTime: "" });
      } else {
        throw new Error(res.message || "Failed to create slot");
      }
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(errorMessage);
      console.error("Slot Creation Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Create New Slot</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Date */}
          <div>
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <Calendar size={16} />
              Select Date
            </label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Clock size={16} />
                Start Time
              </label>

              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Clock size={16} />
                End Time
              </label>

              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full px-4 py-2.5 border rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
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
