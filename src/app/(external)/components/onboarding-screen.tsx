"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Heart, Shield, Users } from "lucide-react";

const slides = [
  {
    icon: Heart,
    title: "Kesehatan Mental Anda",
    description: "Platform telemedicine psikologi terpercaya untuk kesehatan mental Anda",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&dpr=2&q=80",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: Users,
    title: "Psikolog Profesional",
    description: "Konsultasi dengan psikolog bersertifikat kapan saja, di mana saja",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&dpr=2&q=80",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Privasi Terjamin",
    description: "Data Anda terlindungi dengan enkripsi end-to-end",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&dpr=2&q=80",
    color: "from-pink-500 to-rose-600",
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

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col">
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            <div className="relative h-[50vh] w-full overflow-hidden">
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].color} opacity-60`}></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${slides[currentSlide].color} shadow-2xl`}
                >
                  {(() => {
                    const Icon = slides[currentSlide].icon;
                    return <Icon className="h-12 w-12 text-white" />;
                  })()}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-8">
              <div className="flex-1 pt-8 text-center">
                <h1 className="text-foreground mb-4 text-3xl font-bold">{slides[currentSlide].title}</h1>
                <p className="text-muted-foreground mx-auto max-w-md text-lg">{slides[currentSlide].description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-primary w-8" : "bg-muted w-2"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {currentSlide < slides.length - 1 && (
                    <Button variant="ghost" onClick={handleSkip} className="flex-1">
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext} className="flex-1 gap-2">
                    {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
