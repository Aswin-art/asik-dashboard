"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Award, Globe } from "lucide-react";
import Link from "next/link";
import { Doctor } from "../_data/doctors-data";
import { BookingModal } from "./booking-modal";

interface DoctorCardProps {
  doctor: Doctor;
  viewMode: "grid" | "list";
}

export function DoctorCard({ doctor, viewMode }: DoctorCardProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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

  if (viewMode === "list") {
    return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:p-6">
          {/* Avatar */}
          <div className="flex items-start gap-4 md:flex-1">
            <Avatar className="h-20 w-20 shrink-0 md:h-24 md:w-24">
              <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
              <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold md:text-xl">{doctor.name}</h3>
                  <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                </div>
                {doctor.available ? (
                  <Badge className="shrink-0 animate-pulse">
                    <span className="relative mr-1 flex h-2 w-2">
                      <span className="bg-primary-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                      <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full" />
                    </span>
                    Online
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="shrink-0">
                    Offline
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground line-clamp-2 text-sm">{doctor.description}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">{doctor.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground">{doctor.languages.join(", ")}</span>
                </div>
              </div>

              {doctor.available && doctor.nextAvailable && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="text-primary h-4 w-4" />
                  <span className="text-muted-foreground">Tersedia: {doctor.nextAvailable}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center">
            <div className="text-right">
              <p className="text-muted-foreground text-xs">Mulai dari</p>
              <p className="text-lg font-bold md:text-xl">{formatPrice(doctor.price)}</p>
              <p className="text-muted-foreground text-xs">per sesi</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/doctors/${doctor.id}`}>Detail</Link>
              </Button>
              <Button size="sm" disabled={!doctor.available} onClick={() => setBookingModalOpen(true)}>
                Konsultasi
              </Button>
            </div>
          </div>
        </div>

        <BookingModal open={bookingModalOpen} onOpenChange={setBookingModalOpen} doctor={doctor} />
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="group relative overflow-hidden p-0 transition-all hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage
            src={doctor.image}
            alt={doctor.name}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <AvatarFallback className="rounded-none text-3xl">{getInitials(doctor.name)}</AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Status Badge */}
        {doctor.available ? (
          <Badge className="absolute top-3 right-3 animate-pulse">
            <span className="relative mr-1 flex h-2 w-2">
              <span className="bg-primary-foreground absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
              <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Online
          </Badge>
        ) : (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Offline
          </Badge>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span className="text-sm font-bold text-white">{doctor.rating}</span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-lg font-bold">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm">{doctor.description}</p>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Award className="text-muted-foreground h-3.5 w-3.5" />
            <span className="text-muted-foreground">{doctor.experience}</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{doctor.reviews} reviews</span>
        </div>

        {doctor.available && doctor.nextAvailable && (
          <div className="border-primary/20 flex items-center gap-1 border-t pt-3 text-xs">
            <Clock className="text-primary h-3.5 w-3.5" />
            <span className="text-muted-foreground">Tersedia: {doctor.nextAvailable}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-2">
          <div>
            <p className="text-muted-foreground text-xs">Mulai dari</p>
            <p className="text-base font-bold">{formatPrice(doctor.price)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/doctors/${doctor.id}`}>Detail</Link>
            </Button>
            <Button size="sm" disabled={!doctor.available} onClick={() => setBookingModalOpen(true)}>
              Konsultasi
            </Button>
          </div>
        </div>
      </div>

      <BookingModal open={bookingModalOpen} onOpenChange={setBookingModalOpen} doctor={doctor} />
    </Card>
  );
}
