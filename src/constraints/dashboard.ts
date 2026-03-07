import { ChartBarStackedIcon, CheckCircle } from "lucide-react";

// constants/dashboard.ts
import {
  LayoutDashboard,
  UserCircle,
  BookOpen,
  Calendar,
  Users,
  Settings,
  Star,
  CreditCard,
} from "lucide-react";

export const menuItems = {
  ADMIN: [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    {
      name: "Tutor Approvals",
      href: "/dashboard/admin/approvals",
      icon: CheckCircle,
    },
    {
      name: "Manage Categories",
      href: "/admin/categories",
      icon: ChartBarStackedIcon,
    },
  ],
  TUTOR: [
    { name: "My Profile", href: "/dashboard/tutor", icon: UserCircle },
    { name: "My Slots", href: "/tutor/slots", icon: Calendar },
    {
      name: "Active Bookings",
      href: "/dashboard/tutor/bookings",
      icon: BookOpen,
    },
    { name: "Earnings", href: "/dashboard/tutor/earnings", icon: CreditCard },
  ],
  STUDENT: [
    { name: "My Learning", href: "/dashboard/student", icon: LayoutDashboard },
    { name: "Bookings", href: "/dashboard/student/bookings", icon: Calendar },
    { name: "Reviews", href: "/dashboard/student/reviews", icon: Star },
    { name: "Settings", href: "/dashboard/student/settings", icon: Settings },
  ],
};
