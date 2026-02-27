"use client";

import React, { useEffect, useState } from "react";
import { UserX, UserCheck, Mail, Shield } from "lucide-react";
import Image from "next/image";
import { USER_DATA } from "@/types/user";
import { getAllUsers } from "@/services/user";

export default function ManageUsers() {
  const [users, setUsers] = useState<USER_DATA[]>([]);
  console.log("🚀 ~ ManageUsers ~ users:", users)

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getAllUsers();
      console.log("🚀 ~ fetchUsers ~ userData:", userData)
      setUsers(userData);
    };
    fetchUsers();
  }, []);



  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Manage Users
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          View and manage all registered members
        </p>
      </div>

      {/* Users Table Container */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-240px)] scrollbar-thin scrollbar-thumb-slate-200">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/80 backdrop-blur-sm">
                <th className="sticky top-0 z-10 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  User
                </th>
                <th className="sticky top-0 z-10 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  Role
                </th>
                <th className="sticky top-0 z-10 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  Status
                </th>
                <th className="sticky top-0 z-10 px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users?.map((user) => (
                <tr
                  key={user?.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-100 shrink-0">
                        <Image
                          src={
                            user?.image ||
                            `https://ui-avatars.com/api/?name=${user?.name}`
                          }
                          alt={user?.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 truncate">
                          <Mail size={12} /> {user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-tighter ${
                        user?.role === "ADMIN"
                          ? "bg-indigo-50 text-indigo-600"
                          : user?.role === "TUTOR"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Shield size={10} /> {user?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        user?.isBanned
                          ? "bg-rose-50 text-rose-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {user?.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        
                        className={`p-2 rounded-lg transition-colors ${
                          user?.isBanned
                            ? "text-emerald-600 hover:bg-emerald-50"
                            : "text-rose-600 hover:bg-rose-50"
                        }`}
                        title={user?.isBanned ? "Unban User" : "Ban User"}
                      >
                        {user?.isBanned ? (
                          <UserCheck size={18} />
                        ) : (
                          <UserX size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
