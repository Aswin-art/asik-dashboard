"use client";

import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Doctor } from "./_data/doctors-data";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function TWADoctorsPage() {
  const [searchQuery, setSearchQuery] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedSpecialty, setSelectedSpecialty] = useQueryState("specialty", parseAsString.withDefault("all"));
  const [selectedRating, setSelectedRating] = useQueryState("rating", parseAsString.withDefault("all"));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  interface PsychologistResponse {
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
  }

  interface PsychologistApiResponse {
    items: PsychologistResponse[];
  }

  const calculateExperience = (createdAt: Date | string): string => {
    const startYear = new Date(createdAt).getFullYear();
    const years = new Date().getFullYear() - (isNaN(startYear) ? new Date().getFullYear() : startYear);
    return `${years} tahun`;
  };

  async function fetchDoctors(): Promise<Doctor[]> {
    const response = await api.get<PsychologistApiResponse>("/psychologists");
    const { items } = response;

    return items.map((p): Doctor => {
      const priceStr = p.price_video ?? p.price_chat ?? "0";
      const price = parseInt(String(priceStr).replace(/[^0-9]/g, "")) || 0;
      const rating = p.rating_avg ? parseFloat(p.rating_avg) : 0;
      const specialty = p.specialties?.[0]?.specialty?.name || "Psikolog";
      const idNum = String(p.id);
      return {
        id: idNum,
        name: p.user.full_name,
        specialty,
        rating,
        reviews: p.rating_count || 0,
        experience: calculateExperience(p.created_at),
        price,
        image: p.user.image,
        available: true,
        description: p.bio || `Psikolog berpengalaman di bidang ${specialty}`,
        education: "",
        languages: ["Indonesia"],
        nextAvailable: undefined,
      };
    });
  }

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["psychologists", "list"],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5,
  });

  const specialties: string[] = Array.from(new Set(doctors.map((d: Doctor) => d.specialty)));

  const filteredDoctors = doctors.filter((doctor: Doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "4+" && doctor.rating >= 4) ||
      (selectedRating === "4.5+" && doctor.rating >= 4.5);

    return matchesSearch && matchesSpecialty && matchesRating;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => b.rating - a.rating);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = sortedDoctors.slice(startIndex, endIndex);

  const activeFiltersCount = (selectedSpecialty !== "all" ? 1 : 0) + (selectedRating !== "all" ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedSpecialty("all");
    setSelectedRating("all");
    setCurrentPage(1);
  };

  return (
    <div className="bg-background min-h-screen pt-6 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold">Temukan Psikolog</h1>
          <p className="text-muted-foreground text-sm">
            {isLoading ? "Memuat..." : `${doctors.length} psikolog profesional tersedia`}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Cari psikolog atau spesialisasi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          {/* Filter Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <div className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    {activeFiltersCount}
                  </div>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] overflow-y-auto rounded-t-3xl">
              <SheetHeader className="mb-6 px-2">
                <SheetTitle className="text-xl">Filter & Urutkan</SheetTitle>
                <SheetDescription className="text-sm">
                  Temukan psikolog yang sesuai dengan kebutuhan Anda
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-8 px-2 pb-6">
                {/* Specialty Filter */}
                <div>
                  <Label className="mb-4 block text-base font-bold">Spesialisasi</Label>
                  <RadioGroup value={selectedSpecialty} onValueChange={setSelectedSpecialty} className="space-y-3">
                    <label
                      htmlFor="specialty-all"
                      className={cn(
                        "flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all",
                        selectedSpecialty === "all"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                      )}
                    >
                      <RadioGroupItem value="all" id="specialty-all" className="h-5 w-5" />
                      <span className="flex-1 font-medium">Semua Spesialisasi</span>
                    </label>
                    {specialties.map((specialty) => (
                      <label
                        key={specialty}
                        htmlFor={`specialty-${specialty}`}
                        className={cn(
                          "flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all",
                          selectedSpecialty === specialty
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-accent/50",
                        )}
                      >
                        <RadioGroupItem value={specialty} id={`specialty-${specialty}`} className="h-5 w-5" />
                        <span className="flex-1 font-medium">{specialty}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="mb-4 block text-base font-bold">Rating Minimum</Label>
                  <RadioGroup value={selectedRating} onValueChange={setSelectedRating} className="space-y-3">
                    <label
                      htmlFor="rating-all"
                      className={cn(
                        "flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all",
                        selectedRating === "all"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                      )}
                    >
                      <RadioGroupItem value="all" id="rating-all" className="h-5 w-5" />
                      <span className="flex-1 font-medium">Semua Rating</span>
                    </label>
                    <label
                      htmlFor="rating-4"
                      className={cn(
                        "flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all",
                        selectedRating === "4+"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                      )}
                    >
                      <RadioGroupItem value="4+" id="rating-4" className="h-5 w-5" />
                      <span className="flex-1 font-medium">⭐ 4.0 ke atas</span>
                    </label>
                    <label
                      htmlFor="rating-4.5"
                      className={cn(
                        "flex cursor-pointer items-center space-x-4 rounded-xl border-2 p-4 transition-all",
                        selectedRating === "4.5+"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-accent/50",
                      )}
                    >
                      <RadioGroupItem value="4.5+" id="rating-4.5" className="h-5 w-5" />
                      <span className="flex-1 font-medium">⭐ 4.5 ke atas</span>
                    </label>
                  </RadioGroup>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  {activeFiltersCount > 0 && (
                    <Button variant="outline" size="lg" className="w-full" onClick={handleResetFilters}>
                      Reset Semua Filter
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results Count */}
        <div className="text-muted-foreground mb-4 text-xs">
          Menampilkan {sortedDoctors.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, sortedDoctors.length)} dari{" "}
          {sortedDoctors.length} psikolog
        </div>

        {/* Doctor Cards - Compact List */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-28 w-full bg-gray-300" />
            ))}
          </div>
        ) : paginatedDoctors.length > 0 ? (
          <div className="space-y-3">
            {paginatedDoctors.map((doctor) => (
              <Link key={doctor.id} href={`/doctors/${doctor.id}`}>
                <Card className="overflow-hidden transition-all active:scale-[0.98]">
                  <div className="flex gap-3 p-3">
                    {/* Avatar */}
                    <Avatar className="border-primary/20 h-20 w-20 shrink-0 border-2">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
                        {doctor.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 overflow-hidden">
                      <h3 className="mb-1 truncate leading-tight font-bold">{doctor.name}</h3>
                      <Badge variant="secondary" className="mb-2 text-[10px]">
                        {doctor.specialty}
                      </Badge>

                      <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{doctor.rating.toFixed(1)}</span>
                        </div>
                        <span>•</span>
                        <span>{doctor.reviews} reviews</span>
                        <span>•</span>
                        <span>{doctor.experience}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-muted-foreground text-xs">Mulai dari</div>
                          <div className="text-primary text-sm font-bold">
                            Rp {doctor.price.toLocaleString("id-ID")}
                          </div>
                        </div>
                        {doctor.available && <Badge className="bg-emerald-500 text-[10px] text-white">Available</Badge>}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="flex min-h-[300px] flex-col items-center justify-center p-8">
            <div className="mb-2 text-4xl">🔍</div>
            <p className="mb-1 font-medium">Tidak ada psikolog ditemukan</p>
            <p className="text-muted-foreground text-center text-sm">Coba ubah filter atau kata kunci pencarian</p>
          </Card>
        )}

        {/* Simple Pagination */}
        {!isLoading && paginatedDoctors.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Sebelumnya
            </Button>
            <div className="text-muted-foreground text-sm">
              Halaman {currentPage} dari {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Selanjutnya
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
