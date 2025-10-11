"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { SectionWrapper } from "@/components/section-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "./navbar";

export function TelehealthHero() {
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);

  return (
    <div className="from-primary/10 via-secondary/10 to-accent/10 flex min-h-screen items-stretch bg-gradient-to-br">
      {/* Hero Section */}
      <SectionWrapper size="xl" className="min-h-screen py-3">
        <div className="grid h-full grid-cols-1 items-stretch gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left Content */}
          <div className="flex h-full flex-col justify-between gap-8 lg:gap-12">
            {/* Top: Navigation Links */}
            <Navbar />

            {/* Middle: Hero Text + CTA Buttons */}
            <div className="flex flex-1 flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-[55px]">
                  Enabling exceptional{" "}
                  <span className="text-primary relative inline-block">
                    telehealth
                    <svg
                      className="text-primary/30 absolute -bottom-2 left-0 h-3 w-full"
                      viewBox="0 0 200 10"
                      preserveAspectRatio="none"
                    >
                      <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </span>{" "}
                  at every touchpoint
                </h2>
                <p className="max-w-md text-lg leading-relaxed text-gray-500 lg:text-xl">
                  Innovative telehealth solutions proven to deliver seamless virtual care
                </p>
              </div>

              <div className="flex flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center">
                <Button size="lg" className="group rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
                  Get Started
                  <ArrowRight className={`ml-2 h-5 w-5`} />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="hover:bg-secondary/80 rounded-full transition-all duration-300"
                >
                  Book Discovery Call
                </Button>
              </div>
            </div>

            {/* Bottom: Testimonials/Social Proof */}
            <div className="border-border/50 flex flex-col items-start gap-6 border-t pt-6 pb-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-background ring-primary/20 h-12 w-12 border-2 ring-2">
                      <AvatarImage src={`/avatars/avatar-${i}.jpg`} alt={`Patient ${i}`} className="object-cover" />
                      <AvatarFallback className="from-primary/20 to-secondary/20 bg-gradient-to-br">
                        P{i}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="space-y-0.5">
                  <p className="text-foreground text-xl font-bold">1000+</p>
                  <p className="text-muted-foreground text-sm font-medium">happy patients</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="group text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all duration-200"
              >
                <span className="text-sm">Interested in partnering with us?</span>
                <div className="bg-primary/10 group-hover:bg-primary/20 ml-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200">
                  <ArrowRight className="text-primary h-4 w-4" />
                </div>
              </Button>
            </div>
          </div>

          {/* Right Content - Image with Floating Cards */}
          <div className="relative h-full">
            <div className="from-primary/5 via-secondary/5 to-accent/5 relative h-full overflow-hidden rounded-3xl bg-gradient-to-br shadow-2xl">
              {/* Doctor Image */}
              <div className="relative h-full w-full">
                <Image
                  src="/images/doctor-telehealth-1.png"
                  alt="Healthcare professional providing telehealth services"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* ✅ Join Us Button */}
                <Link
                  href="/join"
                  onMouseEnter={() => setIsHoveringCTA(true)}
                  onMouseLeave={() => setIsHoveringCTA(false)}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 absolute top-6 right-6 flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold shadow-lg"
                >
                  Join us
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 ${isHoveringCTA ? "translate-x-1" : ""}`}
                  />
                </Link>
              </div>

              <Card className="border-border/50 bg-card/95 hover:shadow-3xl absolute right-6 bottom-28 w-72 rounded-3xl border shadow-2xl backdrop-blur-sm">
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-1/2">
                      <div className="ring-primary/20 relative h-18 w-18 overflow-hidden rounded-xl ring-2">
                        <Image
                          src="/images/doctor-telehealth-3.jpg"
                          alt="Doctor"
                          fill
                          className="object-cover"
                          sizes="100%"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-foreground text-md leading-tight font-semibold">
                        24/7 Support For Virtual Clinics
                      </p>
                      <Badge variant="secondary" className="justify-start text-xs font-medium">
                        Service #1
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Card 2 - Flexibility */}
              <Card className="border-border/50 bg-card/95 hover:shadow-3xl absolute right-6 bottom-2 w-80 shadow-2xl backdrop-blur-sm">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="from-primary/10 to-primary/20 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br">
                      <svg className="text-primary h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <p className="text-foreground text-md leading-tight font-semibold">Flexibility & Convenience</p>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative Elements */}
              <div className="bg-primary/10 absolute top-8 left-8 h-20 w-20 animate-pulse rounded-full blur-2xl" />
              <div className="bg-secondary/10 absolute bottom-24 left-12 h-16 w-16 animate-pulse rounded-full blur-xl delay-300" />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
