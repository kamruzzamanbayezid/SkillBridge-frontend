"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  Layers,
  UserCog,
  Search,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuData = {
  ADMIN: [
    { title: "Statistics", url: "/admin", icon: LayoutDashboard },
    { title: "Manage Users", url: "/admin/users", icon: Users },
    { title: "All Bookings", url: "/admin/bookings", icon: BookOpen },
    { title: "Categories", url: "/admin/categories", icon: Layers },
  ],
  TUTOR: [
    { title: "Dashboard", url: "/tutor/dashboard", icon: LayoutDashboard },
    { title: "Availability", url: "/tutor/availability", icon: Calendar },
    { title: "Profile", url: "/tutor/profile", icon: UserCog },
  ],
  STUDENT: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Bookings", url: "/dashboard/bookings", icon: Calendar },
    { title: "My Profile", url: "/dashboard/profile", icon: UserCog },
    { title: "Browse Tutors", url: "/tutors", icon: Search },
  ],
};

export function AppSidebar({
  role,
  ...props
}: { role: "ADMIN" | "TUTOR" | "STUDENT" } & React.ComponentProps<
  typeof Sidebar
>) {
  const navMain = menuData[role];
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="border-none bg-[#F9FAFB]">
      <SidebarHeader className="h-24 flex items-center justify-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-slate-900">SkillBridge</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navMain.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`relative h-12 px-4 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      {/* Active Indicator Bar */}
                      {isActive && (
                        <div className="absolute left-0 w-1.5 h-6 bg-indigo-600 rounded-r-full" />
                      )}

                      <item.icon
                        size={20}
                        className={`transition-colors ${isActive ? "text-indigo-600" : "group-hover:text-slate-900"}`}
                      />
                      <span
                        className={`text-[15px] font-semibold ${isActive ? "ml-1" : ""}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
