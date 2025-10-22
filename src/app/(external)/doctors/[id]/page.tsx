import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { doctors, type Doctor } from "../_data/doctors-data";
import { DoctorDetailClient } from "./_components/doctor-detail-client";

interface DoctorDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DoctorDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = doctors.find((d: Doctor) => d.id === parseInt(id));

  if (!doctor) {
    return {
      title: "Doctor Not Found - ASIK",
    };
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
  const doctor = doctors.find((d: Doctor) => d.id === parseInt(id));

  if (!doctor) {
    notFound();
  }

  return <DoctorDetailClient doctor={doctor} />;
}
