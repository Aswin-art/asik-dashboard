"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Anderson",
    specialty: "Psikolog Klinis",
    rating: 4.9,
    reviews: 156,
    experience: "12 tahun",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&dpr=2&q=80",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psikolog Anak",
    rating: 4.8,
    reviews: 142,
    experience: "10 tahun",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&dpr=2&q=80",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Amanda Foster",
    specialty: "Terapi Keluarga",
    rating: 4.9,
    reviews: 203,
    experience: "15 tahun",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&dpr=2&q=80",
    available: false,
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Psikolog Dewasa",
    rating: 4.7,
    reviews: 128,
    experience: "8 tahun",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&dpr=2&q=80",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Martinez",
    specialty: "Terapi Trauma",
    rating: 4.9,
    reviews: 187,
    experience: "14 tahun",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&dpr=2&q=80",
    available: true,
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Psikolog Remaja",
    rating: 4.8,
    reviews: 165,
    experience: "11 tahun",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&dpr=2&q=80",
    available: true,
  },
];

export function DoctorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          carouselRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Duplicate doctors for infinite loop
  const duplicatedDoctors = [...doctors, ...doctors, ...doctors];

  return (
    <SectionWrapper ref={sectionRef} size="full" className="overflow-hidden py-12 md:py-24">
      <div className="mb-8 md:mb-12">
        <div className="text-center">
          <h2 ref={titleRef} className="text-foreground mb-4 text-3xl font-bold md:text-5xl">
            Psikolog Profesional
          </h2>
          <p ref={descRef} className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg">
            Konsultasi dengan psikolog bersertifikat dan berpengalaman yang siap membantu kesehatan mental Anda
          </p>
        </div>
      </div>

      <div ref={carouselRef} className="relative">
        {/* Fade effect on left */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-[hsl(var(--background))] to-transparent md:w-48" />

        {/* Fade effect on right */}
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-[hsl(var(--background))] to-transparent md:w-48" />

        <div className="overflow-hidden px-4">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1 * (duplicatedDoctors.length / 3) * 326],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {duplicatedDoctors.map((doctor, index) => (
              <div key={`doctor-${doctor.id}-${index}`} className="w-[280px] flex-shrink-0 md:w-[320px]">
                <Link href={`/doctors/${doctor.id}`}>
                  <Card className="group relative overflow-hidden p-0 transition-all hover:shadow-2xl">
                    <div className="relative h-[420px] overflow-hidden md:h-[480px]">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarImage
                          src={doctor.image}
                          alt={doctor.name}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <AvatarFallback className="rounded-none text-2xl">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Gradient overlay - always visible */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      {/* Status badge */}
                      {doctor.available && (
                        <Badge className="bg-primary absolute top-4 right-4 animate-pulse text-xs shadow-lg">
                          <span className="relative flex h-2 w-2">
                            <span className="bg-primary-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                            <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full"></span>
                          </span>
                          <span className="ml-2">Online</span>
                        </Badge>
                      )}

                      {/* Content - always visible at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <div className="bg-primary/10 flex items-center gap-1 rounded-full px-3 py-1 backdrop-blur-sm">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span className="text-sm font-bold text-white">{doctor.rating}</span>
                          </div>
                          <span className="text-xs text-white/60">({doctor.reviews} reviews)</span>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">{doctor.name}</h3>
                        <p className="mb-3 text-sm text-white/90">{doctor.specialty}</p>

                        <div className="border-primary/20 flex items-center justify-between border-t pt-3">
                          <span className="text-xs text-white/60">Pengalaman</span>
                          <span className="text-sm font-semibold text-white">{doctor.experience}</span>
                        </div>

                        {/* Hover button */}
                        <div className="mt-4 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <Button className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg">
                            Konsultasi Sekarang
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
