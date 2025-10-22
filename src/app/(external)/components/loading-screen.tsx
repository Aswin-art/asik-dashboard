"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200); // ⏱️ 3.2s loading illusion
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="from-background via-background/95 to-background fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br">
      {/* 🌟 Animated Glow Circle */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-primary/5 absolute h-[400px] w-[400px] rounded-full blur-3xl"
      />

      {/* 🧠 Logo container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="from-primary to-primary/80 relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br shadow-[0_0_50px_-10px_rgba(120,32,255,0.4)]"
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" className="text-primary-foreground drop-shadow-xl">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* 🪩 Brand Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-foreground mt-8 text-3xl font-bold tracking-tight"
      >
        ASIK
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-muted-foreground mt-1 text-sm"
      >
        Empowering Your Mental Wellbeing
      </motion.p>

      {/* ✨ Elegant Shimmer Line */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "80%" }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
        className="bg-muted/50 relative mt-12 h-[2px] overflow-hidden rounded-full"
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "linear",
            repeatDelay: 0.2,
          }}
          className="via-primary/70 absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent to-transparent blur-sm"
        />
      </motion.div>

      {/* 📜 Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="text-muted-foreground mt-4 text-xs tracking-wide"
      >
        Preparing a calming experience...
      </motion.p>
    </div>
  );
}
