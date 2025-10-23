"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppEnvironment } from "@/hooks/use-env";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/doctors",
    label: "Psikolog",
    icon: Search,
  },
  {
    href: "/appointments",
    label: "Jadwal",
    icon: Calendar,
  },
  {
    href: "/favorites",
    label: "Favorit",
    icon: Heart,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: User,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const env = useAppEnvironment();

  // Only show in TWA mode (visible in ALL pages when TWA)
  if (env !== "twa") {
    return null;
  }

  return (
    <nav className="border-border/40 bg-background/95 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-xl">
      <div className="mx-auto max-w-lg">
        <div className="relative flex h-16 items-center justify-around px-2">
          {/* Luxury accent line */}
          <div className="via-primary/30 absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-2 transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground active:scale-95",
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="from-primary/60 via-primary to-primary/60 shadow-primary/50 absolute -top-[17px] left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r shadow-lg" />
                )}

                {/* Icon with luxury glow effect */}
                <div className={cn("relative transition-all duration-300", isActive && "scale-110")}>
                  {isActive && <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-md" />}
                  <Icon
                    className={cn(
                      "relative h-5 w-5 transition-all",
                      isActive && "drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>

                {/* Label */}
                <span
                  className={cn("text-[10px] font-medium transition-all duration-300", isActive && "font-semibold")}
                >
                  {item.label}
                </span>

                {/* Luxury shine effect */}
                {isActive && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <div className="bg-primary/5 absolute -top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 animate-pulse rounded-full blur-2xl" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
