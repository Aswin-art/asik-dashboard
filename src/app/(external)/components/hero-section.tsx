"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useAppEnvironment } from "@/hooks/use-env";

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
  const { user, isSignedIn } = useUser();
  const env = useAppEnvironment();

  useEffect(() => {
    const timer = setInterval(
      () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      },
      env === "twa" ? 5000 : 7000,
    );

    return () => clearInterval(timer);
  }, [env]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // TWA Design - Compact & Mobile-First
  if (env === "twa") {
    return (
      <SectionWrapper size="full" className="px-4 pt-6 md:px-6">
        <div className="mx-auto w-full max-w-7xl">
          {/* Compact Carousel */}
          <div className="relative h-[240px] w-full overflow-hidden rounded-t-2xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
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

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

            <div className="relative z-10 flex h-full flex-col justify-end p-4">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="mb-1 text-xl leading-tight font-bold text-white">{slides[currentSlide].title}</h2>
                <p className="text-sm text-white/90">{slides[currentSlide].subtitle}</p>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="absolute top-1/2 right-3 left-3 flex -translate-y-1/2 items-center justify-between">
              <Button
                onClick={prevSlide}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              <Button
                onClick={nextSlide}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </Button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* User Info Card - Elevated Design */}
          {isSignedIn && user ? (
            <Card className="border-t-primary/20 bg-background relative -mt-6 border-t-4 shadow-2xl backdrop-blur-sm">
              <div className="from-primary/10 via-background to-secondary/10 bg-gradient-to-br p-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="border-primary/30 ring-primary/10 h-16 w-16 border-2 shadow-lg ring-2">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
                      <AvatarFallback className="from-primary to-primary/70 bg-gradient-to-br text-lg font-bold text-white">
                        {user.firstName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status indicator */}
                    <div className="border-background absolute -right-0.5 -bottom-0.5 h-4 w-4 rounded-full border-2 bg-emerald-500 shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg leading-tight font-bold">Halo, {user.firstName || "Pengguna"} 👋</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">Bagaimana perasaan Anda hari ini?</p>
                  </div>
                  {/* Points Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      ⭐ 1,250
                    </Badge>
                    <span className="text-muted-foreground text-[10px] font-medium">Points</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-primary text-lg font-bold">3</div>
                    <div className="text-muted-foreground text-[10px]">Konsultasi</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-lg font-bold text-blue-500">2</div>
                    <div className="text-muted-foreground text-[10px]">Upcoming</div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-lg font-bold text-purple-500">5</div>
                    <div className="text-muted-foreground text-[10px]">Reviews</div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border-t-primary/20 from-primary/10 via-background to-secondary/10 relative -mt-6 border-t-4 bg-gradient-to-br shadow-2xl backdrop-blur-sm">
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg leading-tight font-bold">Mulai Konsultasi</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Daftar untuk akses penuh ke semua fitur
                    </p>
                  </div>
                  <Link href="/sign-in">
                    <Button size="default" className="shadow-lg">
                      Masuk
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
      </SectionWrapper>
    );
  }

  // Browser Design - Full-Screen Original
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

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
            >
              <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
            </Button>
            <Button
              onClick={nextSlide}
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30 md:h-12 md:w-12"
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
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
