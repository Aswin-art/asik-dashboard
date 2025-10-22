"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&dpr=2&q=80",
    title: "Your Mental Health Matters",
    subtitle: "Konsultasi profesional kapan saja",
  },
  {
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1600&dpr=2&q=80",
    title: "Professional Support",
    subtitle: "Psikolog bersertifikat siap membantu",
  },
  {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&dpr=2&q=80",
    title: "Secure & Private",
    subtitle: "Data Anda terlindungi dengan aman",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <SectionWrapper size="full" className="p-2 md:!px-3">
      <div className="relative h-[92vh] w-full overflow-hidden rounded-xl md:h-[98vh] md:rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12">
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16 max-w-xl md:mb-20"
          >
            <h1 className="mb-2 text-3xl leading-tight font-bold text-white md:text-6xl">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base text-white/90 md:text-xl">{slides[currentSlide].subtitle}</p>
          </motion.div>

          <div className="absolute right-6 bottom-6 flex items-center gap-2 md:right-12 md:bottom-12 md:gap-3">
            <Button
              onClick={prevSlide}
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 md:h-12 md:w-12"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 md:h-12 md:w-12"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
            </Button>
          </div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 md:bottom-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 cursor-pointer rounded-full transition-all md:h-2 ${
                  index === currentSlide ? "w-6 bg-white md:w-8" : "w-1.5 bg-white/50 md:w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
