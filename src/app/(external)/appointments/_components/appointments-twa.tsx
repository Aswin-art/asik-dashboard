"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageSquare, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorImage: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  type: "video" | "chat";
  status: "upcoming" | "completed" | "cancelled";
  price: number;
  location?: string;
  notes?: string;
}

async function fetchAppointments(userId: string): Promise<Appointment[]> {
  // TODO: Replace with actual API endpoint
  await new Promise((resolve) => setTimeout(resolve, 1300));

  return [
    {
      id: 1,
      doctorId: 1,
      doctorName: "Dr. Sarah Anderson",
      doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&dpr=2&q=80",
      doctorSpecialty: "Psikolog Klinis",
      date: "2024-10-26",
      time: "14:00",
      type: "video",
      status: "upcoming",
      price: 150000,
      notes: "Konsultasi lanjutan mengenai manajemen kecemasan",
    },
    {
      id: 2,
      doctorId: 5,
      doctorName: "Dr. Lisa Martinez",
      doctorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&dpr=2&q=80",
      doctorSpecialty: "Terapi Trauma",
      date: "2024-10-27",
      time: "10:00",
      type: "chat",
      status: "upcoming",
      price: 133000,
      notes: "Sesi terapi EMDR",
    },
    {
      id: 3,
      doctorId: 9,
      doctorName: "Dr. Sophie Laurent",
      doctorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&dpr=2&q=80",
      doctorSpecialty: "Terapi Keluarga",
      date: "2024-10-20",
      time: "15:00",
      type: "video",
      status: "completed",
      price: 195000,
      notes: "Konseling pasangan - Sesi 3",
    },
    {
      id: 4,
      doctorId: 11,
      doctorName: "Dr. Maria Santos",
      doctorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&dpr=2&q=80",
      doctorSpecialty: "Terapi Trauma",
      date: "2024-10-18",
      time: "11:00",
      type: "video",
      status: "completed",
      price: 210000,
    },
    {
      id: 5,
      doctorId: 1,
      doctorName: "Dr. Sarah Anderson",
      doctorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&dpr=2&q=80",
      doctorSpecialty: "Psikolog Klinis",
      date: "2024-10-15",
      time: "14:00",
      type: "chat",
      status: "cancelled",
      price: 105000,
      notes: "Dibatalkan oleh pasien",
    },
  ];
}

export function AppointmentsTWA() {
  const { user } = useUser();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: () => fetchAppointments(user!.id),
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

  const upcoming = appointments?.filter((apt) => apt.status === "upcoming") || [];
  const completed = appointments?.filter((apt) => apt.status === "completed") || [];
  const cancelled = appointments?.filter((apt) => apt.status === "cancelled") || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-primary/10 text-primary">
            <Clock className="mr-1 h-3 w-3" />
            Akan Datang
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Selesai
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            <XCircle className="mr-1 h-3 w-3" />
            Dibatalkan
          </Badge>
        );
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const Icon = appointment.type === "video" ? Video : MessageSquare;

    return (
      <Card className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex gap-3">
            <Avatar className="border-primary/20 h-14 w-14 border-2">
              <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
              <AvatarFallback>{getInitials(appointment.doctorName)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 truncate text-sm font-bold">{appointment.doctorName}</h3>
              <p className="text-muted-foreground mb-2 truncate text-xs">{appointment.doctorSpecialty}</p>
              {getStatusBadge(appointment.status)}
            </div>
          </div>
        </div>

        <div className="bg-muted/50 mb-3 space-y-2 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="text-primary h-4 w-4 shrink-0" />
            <span className="font-medium">
              {format(new Date(appointment.date), "EEEE, dd MMMM yyyy", { locale: id })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="text-primary h-4 w-4 shrink-0" />
            <span className="font-medium">{appointment.time} WIB</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Icon className="text-primary h-4 w-4 shrink-0" />
            <span className="font-medium capitalize">{appointment.type === "video" ? "Video Call" : "Chat"}</span>
          </div>
        </div>

        {appointment.notes && <p className="text-muted-foreground mb-3 text-xs italic">{appointment.notes}</p>}

        <div className="flex items-center justify-between gap-3">
          <p className="text-primary text-sm font-bold">{formatPrice(appointment.price)}</p>
          {appointment.status === "upcoming" && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              <Button size="sm">Mulai Sesi</Button>
            </div>
          )}
          {appointment.status === "completed" && (
            <Button variant="outline" size="sm">
              Lihat Detail
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="bg-background min-h-screen pt-6 pb-20">
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="mb-2 text-2xl leading-tight font-bold">Jadwal Konsultasi</h1>
        <p className="text-muted-foreground text-sm">
          {isLoading ? "Memuat..." : `${appointments?.length || 0} total konsultasi`}
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              Akan Datang {!isLoading && upcoming.length > 0 && `(${upcoming.length})`}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Selesai {!isLoading && completed.length > 0 && `(${completed.length})`}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Dibatalkan {!isLoading && cancelled.length > 0 && `(${cancelled.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
              </>
            ) : upcoming.length > 0 ? (
              upcoming.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-8 text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold">Belum Ada Jadwal</h3>
                <p className="text-muted-foreground mb-4 text-sm">Buat janji konsultasi dengan psikolog</p>
                <Link href="/doctors">
                  <Button size="sm">Cari Psikolog</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-48 rounded-xl" />
                <Skeleton className="h-48 rounded-xl" />
              </>
            ) : completed.length > 0 ? (
              completed.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground text-sm">Belum ada konsultasi yang selesai</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3">
            {isLoading ? (
              <Skeleton className="h-48 rounded-xl" />
            ) : cancelled.length > 0 ? (
              cancelled.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground text-sm">Tidak ada konsultasi yang dibatalkan</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
