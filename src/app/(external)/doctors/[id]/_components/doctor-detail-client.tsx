"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Award,
  Clock,
  Globe,
  GraduationCap,
  Calendar,
  MessageSquare,
  Video,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Doctor } from "../../_data/doctors-data";
import { BookingModal } from "../../_components/booking-modal";
import { useAppEnvironment } from "@/hooks/use-env";
import { DoctorDetailTWA } from "./doctor-detail-twa";

interface DoctorDetailClientProps {
  doctor: Doctor;
}

export function DoctorDetailClient({ doctor }: DoctorDetailClientProps) {
  const env = useAppEnvironment();
  const [selectedSessionType, setSelectedSessionType] = useState<"chat" | "video">("video");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // TWA Mode - Show mobile-optimized version
  if (env === "twa") {
    return <DoctorDetailTWA doctor={doctor} />;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sessionTypes = [
    {
      type: "video" as const,
      icon: Video,
      label: "Video Call",
      description: "Konsultasi langsung via video call",
      price: doctor.price,
    },
    {
      type: "chat" as const,
      icon: MessageSquare,
      label: "Chat",
      description: "Konsultasi via chat messaging",
      price: doctor.price * 0.7,
    },
  ];

  return (
    <div className="container mx-auto mt-32 min-h-screen p-4 md:p-6">
      {/* Back Button */}
      <Link href="/doctors" className={buttonVariants({ variant: "ghost", className: "mb-6" })}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Kembali
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Doctor Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <Card className="overflow-hidden">
            <div className="flex flex-col gap-6 p-6 md:flex-row">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 md:h-40 md:w-40">
                  <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                  <AvatarFallback className="text-3xl">{getInitials(doctor.name)}</AvatarFallback>
                </Avatar>
                {doctor.available && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-pulse">
                    <span className="relative mr-1 flex h-2 w-2">
                      <span className="bg-primary-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                      <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full" />
                    </span>
                    Online
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">{doctor.name}</h1>
                  <p className="text-muted-foreground text-lg">{doctor.specialty}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="text-lg font-bold">{doctor.rating}</span>
                    <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
                  </div>

                  <Separator orientation="vertical" className="h-6" />

                  <div className="flex items-center gap-2">
                    <Award className="text-muted-foreground h-5 w-5" />
                    <span className="text-muted-foreground">{doctor.experience} pengalaman</span>
                  </div>
                </div>

                {doctor.available && doctor.nextAvailable && (
                  <div className="bg-primary/10 flex items-center gap-2 rounded-lg p-3">
                    <Clock className="text-primary h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Waktu Tersedia Berikutnya</p>
                      <p className="text-primary text-sm font-semibold">{doctor.nextAvailable}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Tentang Psikolog</h2>
            <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>
          </Card>

          {/* Education & Languages */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="text-primary h-5 w-5" />
                <h2 className="text-lg font-bold">Pendidikan</h2>
              </div>
              <p className="text-muted-foreground">{doctor.education}</p>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <Globe className="text-primary h-5 w-5" />
                <h2 className="text-lg font-bold">Bahasa</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Specializations */}
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-bold">Keahlian & Spesialisasi</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Cognitive Behavioral Therapy (CBT)",
                "Terapi Kecemasan & Depresi",
                "Konseling Individu",
                "Manajemen Stress",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                  <span className="text-muted-foreground text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Booking */}
        <div className="lg:col-span-1">
          <Card className="bg-card sticky top-6 p-6">
            <h2 className="mb-4 text-xl font-bold">Pilih Jenis Konsultasi</h2>

            <div className="mb-6 space-y-3">
              {sessionTypes.map((session) => {
                const Icon = session.icon;
                const isSelected = selectedSessionType === session.type;

                return (
                  <button
                    key={session.type}
                    onClick={() => setSelectedSessionType(session.type)}
                    className={`w-full cursor-pointer rounded-lg border-2 p-4 text-left transition-all ${isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1">
                        <p className="font-semibold">{session.label}</p>
                        <p className="text-muted-foreground text-sm">{session.description}</p>
                        <p className="mt-2 text-lg font-bold">{formatPrice(session.price)}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Separator className="my-6" />

            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Durasi Sesi</span>
                <span className="font-medium">60 menit</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Biaya Konsultasi</span>
                <span className="text-lg font-bold">
                  {formatPrice(sessionTypes.find((s) => s.type === selectedSessionType)?.price || doctor.price)}
                </span>
              </div>
            </div>

            <Button className="w-full" size="lg" disabled={!doctor.available} onClick={() => setBookingModalOpen(true)}>
              <Calendar className="mr-2 h-5 w-5" />
              Booking Sekarang
            </Button>

            {!doctor.available && (
              <p className="text-muted-foreground mt-3 text-center text-sm">Psikolog sedang tidak tersedia</p>
            )}

            <div className="bg-muted/50 mt-6 space-y-2 rounded-lg p-4">
              <p className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="text-primary h-4 w-4" />
                Privasi & keamanan terjamin
              </p>
              <p className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="text-primary h-4 w-4" />
                Sertifikat & lisensi terverifikasi
              </p>
              <p className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="text-primary h-4 w-4" />
                Bisa reschedule 24 jam sebelumnya
              </p>
            </div>
          </Card>
        </div>
      </div>

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        doctor={doctor}
        defaultSessionType={selectedSessionType}
      />
    </div>
  );
}
