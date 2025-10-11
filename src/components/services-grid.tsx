"use client";
import { Activity, MessageSquare, Calendar, Pill, Globe, Sparkles } from "lucide-react";
import Image from "next/image";

export function ServicesGrid() {
  return (
    <section className="bg-background w-full overflow-hidden py-20">
      <div className="container mx-auto px-4">
        {/* --- BENTO GRID --- */}
        <div className="bento-grid grid gap-6">
          {/* 1 */}
          <div className="bento-card bg-muted/50 flex flex-col gap-6 rounded-3xl p-8">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Activity className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">
                Mobile Health Apps: Tools for patients to track symptoms, medications
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tools for patients to track symptoms, medications, and appointments, promoting self-management and
                engagement.
              </p>
            </div>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/mobile-health-app.png"
                alt="Mobile health app interface"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* 2 */}
          <div className="bento-card bg-muted/50 flex flex-col gap-6 rounded-3xl p-8">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <MessageSquare className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Secure Messaging Systems: HIPAA-compliant platforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                HIPAA-compliant platforms that allow patients and providers to communicate securely.
              </p>
            </div>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/secure-messaging.png"
                alt="Secure messaging system"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* 3 — span 2x2 (besar) */}
          <div className="bento-card bg-muted/50 flex flex-col gap-6 rounded-3xl p-8 lg:aspect-auto">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Calendar className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Personal Health Dashboard & Appointment Booking System</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track vital signs, medications, and health metrics in one place. Easily schedule, reschedule, or cancel
                appointments.
              </p>
            </div>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl lg:h-[320px]">
              <Image
                src="/images/health-dashboard.png"
                alt="Health dashboard interface"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
              />
            </div>
          </div>

          {/* 4 — melebar 2 kolom */}
          <div className="bento-card bg-muted/50 flex flex-col justify-between gap-6 rounded-3xl p-8">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Pill className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Online Prescription Services: Facilitate easy ordering</h3>
            </div>
            <div className="relative mt-4 aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src="/images/prescription-service.png"
                alt="Online prescription service"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>

          {/* 5 */}
          <div className="bento-card bg-muted/50 flex flex-col justify-between gap-6 rounded-3xl p-8">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Globe className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">Online global service we provide form any country</h3>
            </div>
            <div className="relative mt-4 space-y-3">
              <div className="border-border bg-background hover:border-primary flex items-center justify-between rounded-xl border p-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                    <span className="text-2xl">🇺🇸</span>
                  </div>
                  <span className="font-semibold">USA</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="border-border bg-background hover:border-primary flex items-center justify-between rounded-xl border p-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                    <span className="text-2xl">🇻🇳</span>
                  </div>
                  <span className="font-semibold">Vestribum</span>
                </div>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 6 — di kolom 4 baris 3 */}
          <div className="bento-card from-primary/20 to-primary/5 flex flex-col items-start justify-center gap-6 rounded-3xl bg-gradient-to-br p-8">
            <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Sparkles className="text-primary h-6 w-6" />
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Explore our more amazing services</h3>
              <button className="group bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all hover:gap-3">
                Explore more
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk layout bento ala MagicBento */}
      <style jsx>{`
        .bento-grid {
          grid-template-columns: 1fr; /* mobile */
        }
        @media (min-width: 600px) {
          .bento-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          /* Item #3 span 2x2 */
          .bento-grid .bento-card:nth-child(3) {
            grid-column: span 2;
            grid-row: span 2;
          }
          /* Item #4 melebar 2 kolom (baris 2–3 kolom 1–2) */
          .bento-grid .bento-card:nth-child(4) {
            grid-column: 1 / span 2;
            grid-row: 2 / span 2;
          }
          /* Item #6 di kolom 4 baris 3 */
          .bento-grid .bento-card:nth-child(6) {
            grid-column: 4;
            grid-row: 3;
          }
        }
      `}</style>
    </section>
  );
}
