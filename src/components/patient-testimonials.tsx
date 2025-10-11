"use client";

import { TestimonialsColumn } from "./testimonials-column";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Briana Patton",
    location: "New York, USA",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    text: "The doctors here are incredibly knowledgeable and caring. They took the time to listen to my concerns and provided a comprehensive treatment plan. I felt genuinely cared for throughout my entire visit.",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    text: "Excellent service from start to finish. The online booking system was easy to use, and the video consultation was smooth and professional. Highly recommend this telehealth platform!",
  },
  {
    id: 3,
    name: "Saman Malik",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    text: "Very convenient and efficient. I was able to get a consultation from the comfort of my home. The doctor was thorough and prescribed the right medication. Great experience overall!",
  },
  {
    id: 4,
    name: "Omar Raza",
    location: "Dubai, UAE",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    text: "Professional and compassionate care. The psychologist I spoke with was incredibly understanding and provided valuable insights. I feel much better after just a few sessions.",
  },
  {
    id: 5,
    name: "Zainab Hussain",
    location: "Singapore",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    text: "Outstanding telemedicine service! The platform is user-friendly, and I could access my health records easily. The follow-up care has been excellent. Truly impressed!",
  },
  {
    id: 6,
    name: "Aliza Khan",
    location: "Sydney, Australia",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4,
    text: "Great doctors and very responsive support team. I had some technical issues initially, but they were resolved quickly. The medical advice I received was top-notch.",
  },
  {
    id: 7,
    name: "Farhan Siddiqui",
    location: "Mumbai, India",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 5,
    text: "This service has been a game-changer for me. Being able to consult with specialists without traveling is amazing. The doctors are highly qualified and very approachable.",
  },
  {
    id: 8,
    name: "Sana Sheikh",
    location: "Karachi, Pakistan",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 4,
    text: "Very satisfied with the consultation. The doctor explained everything clearly and answered all my questions patiently. The prescription was sent directly to my pharmacy.",
  },
  {
    id: 9,
    name: "Hassan Ali",
    location: "Cairo, Egypt",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 5,
    text: "Exceptional healthcare experience! The convenience of online consultations combined with the expertise of the medical team makes this the best telehealth service I've used.",
  },
];

const topRow = testimonials.slice(0, 5);
const bottomRow = testimonials.slice(5, 9);

export function PatientTestimonials() {
  return (
    <section className="bg-muted/30 relative w-full overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="bg-primary h-2 w-2 rounded-full" />
          <p className="text-primary text-sm font-semibold">Meet expert doctors for better care</p>
        </div>

        <h2 className="mb-16 text-4xl font-bold">What Our Patients Say</h2>

        <div className="mt-10 flex w-full flex-col gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Baris atas - geser ke kiri */}
          <TestimonialsColumn testimonials={topRow} duration={40} direction="left" />

          {/* Baris bawah - geser ke kanan */}
          <TestimonialsColumn testimonials={bottomRow} duration={40} direction="right" />
        </div>
      </div>
    </section>
  );
}
