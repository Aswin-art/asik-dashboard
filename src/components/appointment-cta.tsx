"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function AppointmentCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-600 via-purple-500 to-blue-400 p-12 md:p-16 lg:p-20">
          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <h2 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                Schedule Your Appointment With us
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
                Schedule your appointment with us easily and at your convenience. Choose your preferred time, and
                we&apos;ll ensure a smooth and hassle-free experience tailored to your needs.
              </p>
              <button className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-xl">
                Make a Schedule
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>
            </div>

            {/* Right Image - Stethoscope */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                {/* Placeholder for stethoscope image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-full">
                    {/* You can replace this with actual stethoscope image */}
                    <Image src="/images/stethoscope.png" alt="Stethoscope" fill className="object-contain" priority />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative gradient blobs */}
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
