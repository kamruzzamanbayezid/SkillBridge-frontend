"use client";

import React, { useEffect, useState } from "react";
import { Layers, Trash2, Edit, Plus, Users } from "lucide-react";

import { allCategory, deleteCategory } from "@/services/category";
import { ICategoryData } from "@/types/category.type";
import AddCategoryModal from "./AddCategoryModal";
import Swal from "sweetalert2";
import UpdateCategoryModal from "./UpdateCategoryModal";

export default function ManageCategories() {
  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedCat, setSelectedCat] = useState<ICategoryData | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await allCategory();
      setCategories(res.data);
    };
    fetchData();
  }, []);

  const handleAddSuccess = (newCat: ICategoryData) => {
    const formattedCat = { ...newCat, _count: { tutors: 0 } };
    setCategories((prev) => [...prev, formattedCat]);
  };

  const handleEditSuccess = (newUpdatedCat: ICategoryData) => {
    const newCategories = categories?.map((category) =>
      category?.id === newUpdatedCat?.id
        ? { ...category, name: newUpdatedCat?.name }
        : category,
    );
    setCategories(newCategories);
  };

  const handleDeleteCategory = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        Swal.fire("Deleted!", "Category has been removed.", "success");
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Manage Categories
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Total Categories: {categories?.length}
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-600 transition-all"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                Category Info
              </th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                Tutors
              </th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {categories?.map((category) => (
              <tr
                key={category?.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <Layers size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {category?.name}
                      </p>
                      <p
                        title={category?.id}
                        className="text-[10px] text-slate-400 font-bold uppercase tracking-tight"
                      >
                        ID: {category?.id.slice(0, 8)}...
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg w-fit">
                    <Users size={14} className="text-slate-500" />
                    <span className="text-xs font-black text-slate-700">
                      {category?._count?.tutors}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setSelectedCat(category);
                        setIsEditModalOpen(true);
                      }}
                      title="Edit Category"
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      title="Delete Category"
                      onClick={() => handleDeleteCategory(category?.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Add category Modal */}
                    <AddCategoryModal
                      isAddModalOpen={isAddModalOpen}
                      onClose={() => setIsAddModalOpen(false)}
                      onSuccess={handleAddSuccess}
                    />

                    {/* Update category modal */}
                    <UpdateCategoryModal
                      isEditModalOpen={isEditModalOpen}
                      onClose={() => setIsEditModalOpen(false)}
                      onSuccess={handleEditSuccess}
                      categoryData={selectedCat}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
