"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Kesehatan Mental Anda, Prioritas Kami",
    description:
      "Konsultasi dengan psikolog profesional kapan saja, di mana saja. Kami siap membantu perjalanan kesehatan mental Anda.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&dpr=2&q=80",
    color: "from-emerald-400/20 to-teal-500/20",
  },
  {
    title: "Fleksibel & Nyaman",
    description: "Chat, video call, atau jadwal sesi sesuai kebutuhan. Platform yang dirancang untuk kenyamanan Anda.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&dpr=2&q=80",
    color: "from-blue-400/20 to-indigo-500/20",
  },
  {
    title: "Privasi Terjamin 100%",
    description: "Data Anda dilindungi dengan enkripsi end-to-end dan standar keamanan internasional tertinggi.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&dpr=2&q=80",
    color: "from-purple-400/20 to-pink-500/20",
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col">
      {/* Skip Button - Top Right */}
      {currentSlide < slides.length - 1 && (
        <div className="absolute top-6 right-6 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>
        </div>
      )}

      {/* Main Content - Full Screen Carousel */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Image Section - 60% */}
            <div className="relative h-[60%] w-full overflow-hidden">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].color}`} />

              {/* Subtle Bottom Fade */}
              <div className="from-background absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
            </div>

            {/* Content Section - 40% */}
            <div className="bg-background flex h-[40%] flex-col justify-between px-6 pt-6 pb-8">
              <div className="flex-1">
                {/* Dots Indicator */}
                <div className="mb-8 flex justify-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground/30 w-2"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Title & Description */}
                <div className="space-y-4 text-center">
                  <h1 className="text-foreground text-3xl leading-tight font-bold tracking-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed">
                    {slides[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 pt-6">
                {/* Back Button - Only show if not first slide */}
                {currentSlide > 0 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    className="h-12 w-12 shrink-0 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}

                {/* Next/Get Started Button */}
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="flex-1 rounded-full shadow-lg transition-all hover:shadow-xl"
                >
                  {currentSlide < slides.length - 1 ? (
                    <>
                      Lanjut
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    "Mulai Sekarang"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
