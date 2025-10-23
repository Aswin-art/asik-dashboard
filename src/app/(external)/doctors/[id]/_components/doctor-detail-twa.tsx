"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Award,
  Globe,
  ChevronLeft,
  CheckCircle2,
  MessageSquare,
  Video,
  Calendar,
  Heart,
  Share2,
} from "lucide-react";
import { Doctor } from "../../_data/doctors-data";
import { BookingModal } from "../../_components/booking-modal";
import Image from "next/image";

interface DoctorDetailTWAProps {
  doctor: Doctor;
}

export function DoctorDetailTWA({ doctor }: DoctorDetailTWAProps) {
  const [selectedSessionType, setSelectedSessionType] = useState<"chat" | "video">("video");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
      description: "Konsultasi via video",
      price: doctor.price,
    },
    {
      type: "chat" as const,
      icon: MessageSquare,
      label: "Chat",
      description: "Konsultasi via chat",
      price: Math.floor(doctor.price * 0.7),
    },
  ];

  const selectedPrice = sessionTypes.find((s) => s.type === selectedSessionType)?.price || doctor.price;

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header Image with Overlay */}
      <div className="relative h-64 w-full">
        <Image src={doctor.image} alt={doctor.name} fill className="object-cover" priority />
        <div className="to-background absolute inset-0 bg-gradient-to-b from-black/40 via-black/20" />

        {/* Top Actions */}
        <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
          <Link href="/doctors">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md">
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/50 backdrop-blur-md">
              <Share2 className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Doctor Avatar - Overlapping */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <Avatar className="border-background h-32 w-32 border-4 shadow-xl">
              <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
              <AvatarFallback className="text-2xl">{getInitials(doctor.name)}</AvatarFallback>
            </Avatar>
            {doctor.available && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                <Badge className="bg-emerald-500 px-3 py-1 text-xs text-white shadow-lg">
                  <span className="relative mr-1.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  Online
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-20">
        {/* Name & Specialty */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl leading-tight font-bold">{doctor.name}</h1>
          <p className="text-muted-foreground mb-3 text-base">{doctor.specialty}</p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold">{doctor.rating}</span>
              <span className="text-muted-foreground text-sm">({doctor.reviews})</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Award className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-sm">{doctor.experience}</span>
            </div>
          </div>
        </div>

        {/* Session Type Selection - Compact */}
        <Card className="mb-4 p-4">
          <h3 className="mb-3 text-sm font-bold">Pilih Jenis Konsultasi</h3>
          <div className="grid grid-cols-2 gap-2">
            {sessionTypes.map((session) => {
              const Icon = session.icon;
              const isSelected = selectedSessionType === session.type;

              return (
                <button
                  key={session.type}
                  onClick={() => setSelectedSessionType(session.type)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                    isSelected ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-center">
                    <p className="text-xs font-semibold">{session.label}</p>
                    <p className="text-primary mt-1 text-sm font-bold">{formatPrice(session.price)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* About */}
        <Card className="mb-4 p-4">
          <h3 className="mb-2 text-sm font-bold">Tentang Psikolog</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{doctor.description}</p>
        </Card>

        {/* Languages */}
        <Card className="mb-4 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="text-primary h-4 w-4" />
            <h3 className="text-sm font-bold">Bahasa</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Specializations - Compact Grid */}
        <Card className="mb-4 p-4">
          <h3 className="mb-3 text-sm font-bold">Keahlian & Spesialisasi</h3>
          <div className="space-y-2">
            {[
              "Cognitive Behavioral Therapy",
              "Terapi Kecemasan & Depresi",
              "Konseling Individu",
              "Manajemen Stress",
            ].map((skill) => (
              <div key={skill} className="flex items-start gap-2">
                <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span className="text-muted-foreground text-xs leading-relaxed">{skill}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Guarantees */}
        <Card className="bg-primary/5 mb-4 p-4">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
              Privasi & keamanan terjamin
            </p>
            <p className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
              Sertifikat & lisensi terverifikasi
            </p>
            <p className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
              Bisa reschedule 24 jam sebelumnya
            </p>
          </div>
        </Card>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="border-border/40 bg-background/95 fixed right-0 bottom-0 left-0 z-40 border-t p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="flex-1">
            <p className="text-muted-foreground text-xs">Total Biaya</p>
            <p className="text-lg font-bold">{formatPrice(selectedPrice)}</p>
          </div>
          <Button
            size="lg"
            className="shadow-xl"
            disabled={!doctor.available}
            onClick={() => setBookingModalOpen(true)}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Booking Sekarang
          </Button>
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
