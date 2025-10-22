import { OnboardingWrapper } from "./components/onboarding-wrapper";
import { HeroSection } from "./components/hero-section";
import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import { DoctorSection } from "./components/doctor-section";

export const metadata: Metadata = {
  title: "ASIK - Platform Telemedicine Psikologi Terpercaya",
  description:
    "Konsultasi dengan psikolog profesional kapan saja, di mana saja. Platform telemedicine psikologi dengan dukungan AI untuk kesehatan mental Anda. Konsultasi pertama gratis!",
  keywords: [
    "telemedicine psikologi",
    "konsultasi psikolog online",
    "kesehatan mental",
    "terapi online",
    "psikolog profesional",
    "konseling online",
  ],
  openGraph: {
    title: "ASIK - Platform Telemedicine Psikologi Terpercaya",
    description:
      "Konsultasi dengan psikolog profesional kapan saja, di mana saja. Platform telemedicine psikologi dengan dukungan AI untuk kesehatan mental Anda.",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ASIK Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASIK - Platform Telemedicine Psikologi Terpercaya",
    description:
      "Konsultasi dengan psikolog profesional kapan saja, di mana saja. Platform telemedicine psikologi dengan dukungan AI untuk kesehatan mental Anda.",
  },
};

export default function Home() {
  return (
    <OnboardingWrapper>
      <ReactLenis root options={{ smoothWheel: true, duration: 1.5 }} />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <DoctorSection />
      </main>
    </OnboardingWrapper>
  );
}
