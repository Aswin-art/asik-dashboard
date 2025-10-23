import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { type Doctor } from "../_data/doctors-data";
import { DoctorDetailClient } from "./_components/doctor-detail-client";
import { api } from "@/lib/api";

interface DoctorDetailPageProps {
  params: Promise<{ id: string }>;
}

// Types aligned with list page
interface PsychologistResponse {
  psychologist: {
    id: bigint | number | string;
    license_no?: string | null;
    bio?: string | null;
    price_chat?: string | null;
    price_video?: string | null;
    rating_avg?: string | null;
    rating_count: number;
    created_at: Date | string;
    updated_at?: Date | string | null;
    user: {
      id: bigint | number | string;
      full_name: string;
      image: string;
      email: string;
      gender?: string | null;
    };
    specialties: {
      specialty: {
        id: bigint | number | string;
        name: string;
      };
    }[];
  };
}

const calculateExperience = (createdAt: Date | string): string => {
  const startYear = new Date(createdAt).getFullYear();
  const years = new Date().getFullYear() - (isNaN(startYear) ? new Date().getFullYear() : startYear);
  return `${years} tahun`;
};

async function fetchDoctorByIdParam(idParam: string): Promise<Doctor | null> {
  // Use backend resource directly
  const p = await api.get<PsychologistResponse>(`/psychologists/${idParam}`);
  if (!p) return null;

  const priceStr = p.psychologist.price_video ?? p.psychologist.price_chat ?? "0";
  const price = parseInt(String(priceStr).replace(/[^0-9]/g, "")) || 0;
  const rating = p.psychologist.rating_avg ? parseFloat(p.psychologist.rating_avg) : 0;
  const specialty = p.psychologist.specialties?.[0]?.specialty?.name || "Psikolog";
  const doctor: Doctor = {
    id: String(p.psychologist.id),
    name: p.psychologist.user.full_name,
    specialty,
    rating,
    reviews: p.psychologist.rating_count || 0,
    experience: calculateExperience(p.psychologist.created_at),
    price,
    image: p.psychologist.user.image,
    available: true,
    description: p.psychologist.bio || `Psikolog berpengalaman di bidang ${specialty}`,
    education: "",
    languages: ["Indonesia"],
    nextAvailable: undefined,
  };
  return doctor;
}

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = await fetchDoctorByIdParam(id);

  if (!doctor) {
    return { title: "Doctor Not Found - ASIK" };
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} | ASIK`,
    description: doctor.description,
    openGraph: {
      title: `${doctor.name} - ${doctor.specialty}`,
      description: doctor.description,
      images: [
        {
          url: doctor.image,
          width: 800,
          height: 600,
          alt: doctor.name,
        },
      ],
    },
  };
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = await fetchDoctorByIdParam(id);
  if (!doctor) notFound();
  return <DoctorDetailClient doctor={doctor} />;
}
