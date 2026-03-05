"use client";

import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateCategory } from "@/services/category";
import { ICategoryData } from "@/types/category.type";

interface Props {
  isEditModalOpen: boolean;
  onClose: () => void;
  onSuccess: (newCategory: ICategoryData) => void;
  categoryData: ICategoryData | null;
}

export default function UpdateCategoryModal({
  isEditModalOpen,
  onClose,
  onSuccess,
  categoryData,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("");

  if (!isEditModalOpen || !categoryData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim()) {
      return toast.error("Category name is required!");
    }
    setIsSubmitting(true);
    try {
      const res = await updateCategory(categoryData?.id, category);
      if (res?.success) {
        toast.success(res?.message);
        setCategory("");
        onSuccess(res?.data);
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error?.message : "Something is wrong";
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
          <h2 className="text-xl font-black text-slate-900">Update Category</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Category Name
            </label>
            <input
              defaultValue={categoryData?.name}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              autoFocus
            />
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
              className="px-6 py-2 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
