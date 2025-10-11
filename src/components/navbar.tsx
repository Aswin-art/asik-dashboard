"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/platform", label: "Platform" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact us" },
  ];

  return (
    <div className="flex items-center justify-between py-4">
      {/* Logo */}
      <Link href="/" className="text-primary text-2xl font-bold tracking-tight transition-colors duration-300">
        PsyCare
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-10 pt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2 font-medium transition-colors duration-300 ${
                isActive ? "text-primary font-semibold" : "hover:text-foreground text-gray-500"
              }`}
            >
              {/* 🔵 Circle di kiri */}
              {isActive && <span className="bg-primary h-2 w-2 rounded-full transition-all duration-300" />}
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
