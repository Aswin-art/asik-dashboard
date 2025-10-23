"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star, Video, MessageSquare, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

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

export function FavoritesBrowser() {
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
    <div className="bg-background mt-28 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Favorit Saya</h1>
            <p className="text-muted-foreground">
              {isLoading ? "Memuat..." : `${favorites?.length || 0} psikolog favorit`}
            </p>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80 rounded-xl" />
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((doctor) => (
              <Card key={doctor.id} className="group overflow-hidden transition-all hover:shadow-lg">
                {/* Image */}
                <Link href={`/doctors/${doctor.id}`}>
                  <div className="bg-muted relative aspect-[4/3] overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Favorite Badge */}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="bg-background/80 hover:bg-background h-10 w-10 backdrop-blur-sm"
                      >
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    {/* Status Badge */}
                    {doctor.available && (
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-emerald-500 shadow-lg">
                          <span className="relative mr-1.5 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                          </span>
                          Tersedia
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/doctors/${doctor.id}`}>
                    <h3 className="hover:text-primary mb-2 text-xl font-bold transition-colors">{doctor.name}</h3>
                  </Link>
                  <p className="text-muted-foreground mb-3 text-sm">{doctor.specialty}</p>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{doctor.experience}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-primary text-xl font-bold">{formatPrice(doctor.price)}</p>
                    <p className="text-muted-foreground text-xs">
                      Ditambahkan {format(new Date(doctor.addedDate), "dd MMM yyyy", { locale: id })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/doctors/${doctor.id}`}>
                      <Button variant="outline" className="w-full">
                        <Video className="mr-2 h-4 w-4" />
                        Video
                      </Button>
                    </Link>
                    <Link href={`/doctors/${doctor.id}`}>
                      <Button className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="bg-primary/10 text-primary mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
              <Heart className="h-10 w-10" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">Belum Ada Favorit</h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
              Mulai tambahkan psikolog ke favorit untuk akses cepat dan mendapatkan notifikasi ketersediaan mereka
            </p>
            <Link href="/doctors">
              <Button size="lg">Cari Psikolog Sekarang</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
