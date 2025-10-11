"use client";

import { useState, useEffect } from "react";
import { Home, Calendar, MessageSquare, User, Settings } from "lucide-react";
import Link from "next/link";

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export function FloatingDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dockItems: DockItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      href: "/dashboard",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      href: "/dashboard",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/dashboard",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/dashboard",
    },
  ];

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <div className="border-border bg-background/80 flex items-center gap-2 rounded-full border px-4 py-3 shadow-2xl backdrop-blur-xl">
        {dockItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="hover:bg-primary/10 group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
            title={item.label}
          >
            <div className="text-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            <div className="bg-foreground text-background pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
