import { PsychologistSlideshow } from "@/components/psychologist-slideshow";
import { SectionWrapper } from "./section-wrapper";

export function PsychologyServices() {
  const slides = [
    {
      src: "/images/doctor-telehealth-1.png",
      title: "100% Fast Response",
      title2: "Instant Support",
      alt: "Psychologist providing immediate consultation response",
    },
    {
      src: "/images/doctor-telehealth-2.jpg",
      title: "90% Satisfying Treatment",
      title2: "High Success Rate",
      alt: "Happy patient after successful psychological treatment",
    },
    {
      src: "/images/doctor-telehealth-3.jpg",
      title: "Professional Care",
      title2: "Licensed Experts",
      alt: "Licensed psychologist providing professional care",
    },
    {
      src: "/images/psychology-consultation-4.jpg",
      title: "Confidential Sessions",
      title2: "Privacy Guaranteed",
      alt: "Private and confidential therapy session",
    },
    {
      src: "/images/psychology-consultation-5.jpg",
      title: "Expert Guidance",
      title2: "Personalized Approach",
      alt: "Expert psychologist providing guidance",
    },
  ];

  return (
    <section className="w-full overflow-hidden">
      <SectionWrapper size="full">
        <PsychologistSlideshow images={slides} autoplayDelay={4000} />
      </SectionWrapper>
    </section>
  );
}
