"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu, X, LogOut } from "lucide-react";
import { menuItems } from "@/constraints/dashboard";
import { getUser, UserLogOut } from "@/services/auth";
import { USER_DATA, USER_ROLE } from "@/types/user";
import Image from "next/image";

export default function DashboardLayout({
  admin,
  tutor,
  student,
}: {
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<USER_DATA | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogOut = () => {
    UserLogOut();
    setUser(null);
  };

  const userRole = user?.role;
  const currentMenu = userRole? menuItems[userRole] : [];
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* --- Sidebar for Desktop --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">SkillBridge</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-4">
              {userRole} Menu
            </p>
            {currentMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => handleLogOut()}
            className="flex items-center gap-3 px-4 py-4 mt-auto text-rose-400 font-bold hover:bg-rose-500/10 rounded-2xl transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-slate-600"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">
                  {user?.name || "Loading..."}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">
                  {userRole}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-200 border-2 border-white shadow-sm overflow-hidden relative">
                <Image
                  src={
                    user?.image ||
                    `https://ui-avatars.com/api/?name=${user?.name || "User"}`
                  }
                  alt={`${user?.name || "User"}'s avatar`}
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            {userRole === USER_ROLE.ADMIN && admin}
            {userRole === USER_ROLE.TUTOR && tutor}
            {userRole === USER_ROLE.STUDENT && student}
          </div>
        </main>
      </div>
    </div>
  );
}
