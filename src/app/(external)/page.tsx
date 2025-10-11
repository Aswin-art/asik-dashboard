import { TelehealthHero } from "@/components/telehealth-hero";
import { PsychologyServices } from "@/components/psychology-services";
import { ServicesGrid } from "@/components/services-grid";
import { HealthPackages } from "@/components/health-packages";
import { PatientTestimonials } from "@/components/patient-testimonials";
import { AppointmentCTA } from "@/components/appointment-cta";
import { FloatingDock } from "@/components/floating-dock";

export default function Home() {
  return (
    <>
      <TelehealthHero />
      <PsychologyServices />
      <ServicesGrid />
      <HealthPackages />
      <PatientTestimonials />
      <AppointmentCTA />
      <FloatingDock />
    </>
  );
}
