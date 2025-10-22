"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/doctors", label: "Doctors" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-8"
      >
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-2 items-center gap-4 rounded-2xl bg-black/80 px-4 backdrop-blur-md md:h-18 md:grid-cols-3 md:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white md:text-xl">ASIK</span>
            </Link>
          </div>

          <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group active:text-primary relative text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white focus:text-white"
              >
                {item.label}
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full group-active:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 md:gap-4">
            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "link",
                  className: "hidden text-white/80 transition-colors hover:text-white focus:text-white md:inline-flex",
                })}
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="hidden md:inline-flex">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
              </div>
            </SignedIn>

            <Link
              href={"/doctors"}
              className={buttonVariants({
                className:
                  "bg-primary border-primary hover:border-primary hidden border text-white shadow-lg transition-all duration-300 hover:bg-transparent md:inline-flex",
              })}
            >
              Get Started
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-4 left-4 z-40 rounded-2xl bg-black/95 p-6 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-white/80 transition-colors hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-border my-2 border-t"></div>

            <SignedOut>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "outline",
                  className: "border-white/20 text-white hover:bg-white/10",
                })}
              >
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-3 px-2 py-1">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                />
                <span className="text-sm text-white/80">Profile</span>
              </div>
            </SignedIn>

            <Link
              href={"/doctors"}
              className={buttonVariants({
                className: "bg-primary border-primary w-full border text-white shadow-lg",
              })}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
