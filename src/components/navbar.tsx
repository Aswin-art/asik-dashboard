"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useAppEnvironment } from "@/hooks/use-env";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const env = useAppEnvironment();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/doctors", label: "Doctors" },
    { href: "/favorites", label: "Favorites" },
    { href: "/profile", label: "Profile" },
  ];

  // Hide navbar in TWA mode
  if (env === "twa") return null;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-8"
      >
        <nav className="mx-auto grid h-16 max-w-7xl grid-cols-2 items-center gap-4 rounded-2xl bg-black/80 px-4 backdrop-blur-md md:h-18 md:grid-cols-3 md:px-8">
          {/* Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white md:text-xl">ASIK</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group active:text-primary relative p-4 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white focus:text-white"
              >
                {item.label}
                <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full group-active:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
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
              href="/doctors"
              className={buttonVariants({
                className:
                  "border-primary bg-primary hover:text-primary hidden border text-white shadow-lg transition-all duration-300 hover:bg-transparent md:inline-flex",
              })}
            >
              Get Started
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* 🌙 Mobile Menu (Animated) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sliding Menu Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-black/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <span className="text-xl font-bold text-white">ASIK</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* User Section */}
                <div className="border-b border-white/10 p-6">
                  <SignedIn>
                    <div className="flex items-center gap-4">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-14 h-14 ring-2 ring-primary/30",
                          },
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white/60">Welcome back!</p>
                        <p className="font-semibold text-white">Your Account</p>
                      </div>
                    </div>
                  </SignedIn>

                  <SignedOut>
                    <div className="space-y-3">
                      <p className="text-sm text-white/60">Get started with ASIK</p>
                      <Link
                        href="/sign-in"
                        className={buttonVariants({
                          className: "bg-primary hover:bg-primary/90 w-full text-white shadow-lg",
                        })}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/sign-up"
                        className={buttonVariants({
                          variant: "outline",
                          className: "w-full border-white/20 text-white hover:bg-white/10",
                        })}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </div>
                  </SignedOut>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center gap-3 rounded-xl p-4 px-4 py-3 text-base font-medium text-white/80 transition-all hover:bg-white/10 hover:text-white active:scale-[0.98]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="bg-primary/20 group-hover:bg-primary/30 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                          {item.label[0]}
                        </span>
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Footer CTA + Copyright */}
                <div className="space-y-4 border-t border-white/10 p-6">
                  <Link
                    href="/doctors"
                    className={buttonVariants({
                      size: "lg",
                      className: "bg-primary hover:bg-primary/90 w-full text-white shadow-xl",
                    })}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Find a Psychologist
                  </Link>

                  {/* Divider */}
                  <div className="h-px w-full bg-white/10" />

                  {/* Legal Links */}
                  <div className="flex flex-col items-center gap-2 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} ASIK. All rights reserved.</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/terms"
                        className="transition-colors hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Terms & Conditions
                      </Link>
                      <span className="text-white/30">•</span>
                      <Link
                        href="/privacy"
                        className="transition-colors hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
