/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Image from "next/image";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: any[];
  duration?: number;
  direction?: "left" | "right";
}) => {
  const isLeft = props.direction === "left" || props.direction === undefined;

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateX: isLeft ? "-50%" : "0%",
        }}
        initial={{
          translateX: isLeft ? "0%" : "-50%",
        }}
        transition={{
          duration: props.duration || 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex gap-6"
      >
        {/* Duplicate array for seamless loop */}
        {[...props.testimonials, ...props.testimonials].map(({ id, text, avatar, name, location, rating }, index) => (
          <div
            className="bg-background shadow-primary/10 flex w-[600px] flex-shrink-0 flex-col rounded-3xl border p-8 shadow-lg"
            key={`${id}-${index}`}
          >
            {/* Name and Location */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg leading-tight font-semibold">{name}</h3>
              <p className="text-muted-foreground text-sm leading-tight">{location}</p>
            </div>

            {/* Text */}
            <p className="text-muted-foreground mb-6 leading-relaxed">&quot;{text}&quot;</p>

            {/* Rating and Avatar - 2 columns */}
            <div className="flex items-center justify-between gap-4">
              {/* Left column - Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>

              {/* Right column - Avatar */}
              <Image
                width={64}
                height={64}
                src={avatar}
                alt={name}
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
