"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageSquare, CheckCircle2, XCircle, Filter, Download } from "lucide-react";
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

export function AppointmentsBrowser() {
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
            <Clock className="mr-1.5 h-4 w-4" />
            Akan Datang
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            Selesai
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            <XCircle className="mr-1.5 h-4 w-4" />
            Dibatalkan
          </Badge>
        );
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const Icon = appointment.type === "video" ? Video : MessageSquare;

    return (
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <Avatar className="border-primary/20 h-16 w-16 border-2">
                <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
                <AvatarFallback>{getInitials(appointment.doctorName)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="mb-1 text-lg font-bold">{appointment.doctorName}</h3>
                <p className="text-muted-foreground mb-2 text-sm">{appointment.doctorSpecialty}</p>
                {getStatusBadge(appointment.status)}
              </div>
            </div>
            <p className="text-primary text-xl font-bold">{formatPrice(appointment.price)}</p>
          </div>

          <div className="bg-muted/50 mb-4 grid gap-3 rounded-lg p-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Tanggal</p>
                <p className="text-sm font-medium">
                  {format(new Date(appointment.date), "dd MMM yyyy", { locale: id })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Waktu</p>
                <p className="text-sm font-medium">{appointment.time} WIB</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Metode</p>
                <p className="text-sm font-medium capitalize">{appointment.type === "video" ? "Video Call" : "Chat"}</p>
              </div>
            </div>
          </div>

          {appointment.notes && <p className="text-muted-foreground mb-4 text-sm italic">{appointment.notes}</p>}

          <div className="flex gap-2">
            {appointment.status === "upcoming" && (
              <>
                <Button className="flex-1" size="lg">
                  Mulai Sesi
                </Button>
                <Button variant="outline" size="lg">
                  Reschedule
                </Button>
                <Button variant="ghost" size="lg">
                  Batalkan
                </Button>
              </>
            )}
            {appointment.status === "completed" && (
              <>
                <Button variant="outline" className="flex-1">
                  Lihat Detail
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Laporan
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Jadwal Konsultasi</h1>
            <p className="text-muted-foreground">
              {isLoading ? "Memuat..." : `${appointments?.length || 0} total konsultasi`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
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

          <TabsContent value="upcoming" className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
              </>
            ) : upcoming.length > 0 ? (
              upcoming.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-12 text-center">
                <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                  <Calendar className="h-10 w-10" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">Belum Ada Jadwal</h3>
                <p className="text-muted-foreground mx-auto mb-6 max-w-md">
                  Mulai perjalanan kesehatan mental Anda dengan membuat janji konsultasi bersama psikolog profesional
                </p>
                <Link href="/doctors">
                  <Button size="lg">Cari Psikolog Sekarang</Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
              </>
            ) : completed.length > 0 ? (
              completed.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Belum ada konsultasi yang selesai</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {isLoading ? (
              <Skeleton className="h-64 rounded-xl" />
            ) : cancelled.length > 0 ? (
              cancelled.map((apt) => <AppointmentCard key={apt.id} appointment={apt} />)
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">Tidak ada konsultasi yang dibatalkan</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
