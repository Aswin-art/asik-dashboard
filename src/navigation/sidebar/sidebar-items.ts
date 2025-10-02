import { ChartBar, Calendar, Users, UserCircle, HeartHandshake, ReceiptText, type LucideIcon } from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

// Doctor menu (default)
export const doctorSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Analytics & Insights",
    items: [
      {
        title: "Analytics & Insights",
        url: "/dashboard/doctor/analytics",
        icon: ChartBar,
      },
    ],
  },
  {
    id: 2,
    label: "Management",
    items: [
      {
        title: "Schedule Management",
        url: "/dashboard/doctor/schedule",
        icon: Calendar,
      },
      {
        title: "Patient Management",
        url: "/dashboard/doctor/patients",
        icon: Users,
      },
      {
        title: "Counseling Management",
        url: "/dashboard/doctor/counseling",
        icon: HeartHandshake,
      },
      {
        title: "Profile",
        url: "/dashboard/doctor/profile",
        icon: UserCircle,
      },
    ],
  },
];

// Admin menu
export const adminSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Analytics & Insights",
    items: [
      {
        title: "Analytics & Insights",
        url: "/admin/analytics",
        icon: ChartBar,
      },
    ],
  },
  {
    id: 2,
    label: "Management",
    items: [
      {
        title: "User Management",
        url: "/admin/users",
        icon: Users,
      },
      {
        title: "Order Management",
        url: "/admin/orders",
        icon: ReceiptText,
      },
    ],
  },
];

// Default export (doctor menu)
export const sidebarItems: NavGroup[] = doctorSidebarItems;
