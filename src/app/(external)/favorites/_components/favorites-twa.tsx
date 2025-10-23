"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, Video, MessageSquare, Calendar, Trash2 } from "lucide-react";
import Link from "next/link";

interface FavoriteDoctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  price: number;
  image: string;
  available: boolean;
  addedDate: string;
}

async function fetchFavorites(userId: string): Promise<FavoriteDoctor[]> {
  // TODO: Replace with actual API endpoint
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return [
    {
      id: 1,
      name: "Dr. Sarah Anderson",
      specialty: "Psikolog Klinis",
      rating: 4.9,
      reviews: 156,
      experience: "12 tahun",
      price: 150000,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&dpr=2&q=80",
      available: true,
      addedDate: "2024-10-15",
    },
    {
      id: 5,
      name: "Dr. Lisa Martinez",
      specialty: "Terapi Trauma",
      rating: 4.9,
      reviews: 187,
      experience: "14 tahun",
      price: 190000,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&dpr=2&q=80",
      available: true,
      addedDate: "2024-10-12",
    },
    {
      id: 9,
      name: "Dr. Sophie Laurent",
      specialty: "Terapi Keluarga",
      rating: 4.8,
      reviews: 176,
      experience: "13 tahun",
      price: 195000,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&dpr=2&q=80",
      available: true,
      addedDate: "2024-10-10",
    },
    {
      id: 11,
      name: "Dr. Maria Santos",
      specialty: "Terapi Trauma",
      rating: 4.9,
      reviews: 192,
      experience: "16 tahun",
      price: 210000,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&dpr=2&q=80",
      available: true,
      addedDate: "2024-10-08",
    },
  ];
}

export function FavoritesTWA() {
  const { user } = useUser();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => fetchFavorites(user!.id),
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000,
  });

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

  return (
    <div className="bg-background min-h-screen pt-6 pb-20">
      {/* Header */}
      <div className="mb-6 px-4">
        <h1 className="mb-2 text-2xl leading-tight font-bold">Favorit Saya</h1>
        <p className="text-muted-foreground text-sm">
          {isLoading ? "Memuat..." : `${favorites?.length || 0} psikolog favorit`}
        </p>
      </div>

      {/* Content */}
      <div className="px-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="space-y-3">
            {favorites.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden p-4">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <Link href={`/doctors/${doctor.id}`} className="shrink-0">
                    <Avatar className="border-primary/20 h-24 w-24 border-2">
                      <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
                      <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
                    </Avatar>
                  </Link>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <Link href={`/doctors/${doctor.id}`}>
                          <h3 className="mb-1 truncate text-base font-bold">{doctor.name}</h3>
                        </Link>
                        <p className="text-muted-foreground mb-2 text-xs">{doctor.specialty}</p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 shrink-0"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>

                    {/* Stats */}
                    <div className="mb-3 flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-muted-foreground">({doctor.reviews})</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{doctor.experience}</span>
                    </div>

                    {/* Price & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-primary text-sm font-bold">{formatPrice(doctor.price)}</p>
                      {doctor.available ? (
                        <Badge variant="secondary" className="bg-emerald-500/10 text-[10px] text-emerald-600">
                          Tersedia
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-muted-foreground text-[10px]">
                          Sibuk
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link href={`/doctors/${doctor.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Video className="mr-1.5 h-4 w-4" />
                      Video
                    </Button>
                  </Link>
                  <Link href={`/doctors/${doctor.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="mr-1.5 h-4 w-4" />
                      Chat
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-bold">Belum Ada Favorit</h3>
            <p className="text-muted-foreground mb-4 text-sm">Mulai tambahkan psikolog ke favorit untuk akses cepat</p>
            <Link href="/doctors">
              <Button>Cari Psikolog</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
