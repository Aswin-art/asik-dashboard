"use client";

import { motion, Variants } from "framer-motion";
import { useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // ✨ Letter animation
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.3 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // 🌊 Glow animation (primary blue)
  const glowVariants: Variants = {
    initial: { opacity: 0.4, scale: 1 },
    animate: {
      opacity: [0.4, 1, 0.4],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-white">
      <div className="bg-background fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden">
        {/* 🌟 Blue Animated Glow Circles */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute h-[500px] w-[500px] rounded-full bg-[#27b3fd]/20 blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
          className="absolute h-[350px] w-[350px] rounded-full bg-[#27b3fd]/10 blur-3xl"
        />

        {/* 💠 Brand Name */}
        <div className="relative flex items-center justify-center">
          {/* Soft blue background glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-32 w-64 rounded-full bg-gradient-to-r from-[#27b3fd]/30 via-[#27b3fd]/10 to-[#27b3fd]/30 blur-2xl" />
          </motion.div>

          {/* Animated ASIK letters */}
          <motion.h1 className="relative flex text-6xl font-black tracking-wider md:text-7xl">
            {["A", "S", "I", "K"].map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.15 }}
                className="text-foreground relative inline-block"
                style={{
                  textShadow: "0 0 25px rgba(39, 179, 253, 0.7), 0 0 50px rgba(39, 179, 253, 0.4)",
                }}
              >
                {letter}
                {/* Gradient shimmer for each letter */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-b from-[#27b3fd]/60 via-[#27b3fd]/30 to-transparent bg-clip-text text-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  {letter}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-muted-foreground mt-8 text-center text-base font-medium tracking-wide md:text-lg"
        >
          Empowering Your Mental Wellbeing
        </motion.p>

        {/* ✨ Shimmer Line */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "60%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
          className="bg-muted/50 relative mt-10 h-[2px] w-[60%] overflow-hidden rounded-full"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              repeatDelay: 0.3,
            }}
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#27b3fd]/70 to-transparent"
          />
        </motion.div>

        {/* 📜 Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.7] }}
          transition={{ duration: 1.5, delay: 2 }}
          className="text-muted-foreground mt-6 text-xs font-light tracking-widest"
        >
          LOADING...
        </motion.p>
      </div>
    </div>
  );
}
