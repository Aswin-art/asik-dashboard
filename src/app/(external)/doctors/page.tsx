"use client";

import { useQueryState, parseAsString, parseAsInteger, parseAsStringEnum } from "nuqs";
import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Doctor, doctors } from "./_data/doctors-data";
import { DoctorCard } from "./_components/doctor-card";
import { DoctorPagination } from "./_components/doctor-pagination";
import { FilterSidebar } from "./_components/filter-sidebar";
import { MobileFilter } from "./_components/mobile-filter";

type ViewMode = "grid" | "list";
type SortOption = "name-asc" | "name-desc" | "rating-desc" | "experience-desc" | "price-asc";

export default function DoctorsPage() {
  // Search params dengan nuqs
  const [searchQuery, setSearchQuery] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedSpecialty, setSelectedSpecialty] = useQueryState("specialty", parseAsString.withDefault("all"));
  const [selectedRating, setSelectedRating] = useQueryState("rating", parseAsString.withDefault("all"));
  const [selectedAvailability, setSelectedAvailability] = useQueryState(
    "availability",
    parseAsString.withDefault("all"),
  );
  const [viewMode, setViewMode] = useQueryState(
    "view",
    parseAsStringEnum<ViewMode>(["grid", "list"]).withDefault("grid"),
  );
  const [itemsPerPage, setItemsPerPage] = useQueryState("perPage", parseAsInteger.withDefault(12));
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringEnum<SortOption>(["name-asc", "name-desc", "rating-desc", "experience-desc", "price-asc"]).withDefault(
      "rating-desc",
    ),
  );

  // Get unique specialties
  const specialties: string[] = Array.from(new Set(doctors.map((d: Doctor) => d.specialty)));

  // Filter doctors
  const filteredDoctors = doctors.filter((doctor: Doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;

    const matchesRating =
      selectedRating === "all" ||
      (selectedRating === "4+" && doctor.rating >= 4) ||
      (selectedRating === "4.5+" && doctor.rating >= 4.5);

    const matchesAvailability =
      selectedAvailability === "all" ||
      (selectedAvailability === "available" && doctor.available) ||
      (selectedAvailability === "unavailable" && !doctor.available);

    return matchesSearch && matchesSpecialty && matchesRating && matchesAvailability;
  });

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "rating-desc":
        return b.rating - a.rating;
      case "experience-desc":
        return parseInt(b.experience) - parseInt(a.experience);
      case "price-asc":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = sortedDoctors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("all");
    setSelectedRating("all");
    setSelectedAvailability("all");
    setCurrentPage(1);
  };

  const activeFiltersCount =
    (selectedSpecialty !== "all" ? 1 : 0) +
    (selectedRating !== "all" ? 1 : 0) +
    (selectedAvailability !== "all" ? 1 : 0);

  return (
    <div className="container mx-auto mt-32 p-4 md:p-6">
      <div className="flex gap-6">
        {/* Left Sidebar - Filter & Search (Sticky) */}
        <aside className="hidden w-80 shrink-0 lg:block">
          <div className="bg-card sticky top-32 rounded-lg border p-6 shadow-sm">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={(value) => {
                setSearchQuery(value);
                handleFilterChange();
              }}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={(value) => {
                setSelectedSpecialty(value);
                handleFilterChange();
              }}
              selectedRating={selectedRating}
              setSelectedRating={(value) => {
                setSelectedRating(value);
                handleFilterChange();
              }}
              selectedAvailability={selectedAvailability}
              setSelectedAvailability={(value) => {
                setSelectedAvailability(value);
                handleFilterChange();
              }}
              specialties={specialties}
              onReset={handleResetFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Temukan Psikolog Profesional</h1>
            <p className="text-muted-foreground">
              Pilih psikolog terbaik sesuai kebutuhan Anda dari {doctors.length} profesional tersedia
            </p>
          </div>

          {/* Mobile Filter Button */}
          <MobileFilter
            searchQuery={searchQuery}
            setSearchQuery={(value) => {
              setSearchQuery(value);
              handleFilterChange();
            }}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={(value) => {
              setSelectedSpecialty(value);
              handleFilterChange();
            }}
            selectedRating={selectedRating}
            setSelectedRating={(value) => {
              setSelectedRating(value);
              handleFilterChange();
            }}
            selectedAvailability={selectedAvailability}
            setSelectedAvailability={(value) => {
              setSelectedAvailability(value);
              handleFilterChange();
            }}
            specialties={specialties}
            onReset={handleResetFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Controls Bar */}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-muted-foreground text-sm">
              Menampilkan {startIndex + 1}-{Math.min(endIndex, sortedDoctors.length)} dari {sortedDoctors.length}{" "}
              psikolog
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Items per page */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Tampilkan:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">Urutkan:</span>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating-desc">Rating Tertinggi</SelectItem>
                    <SelectItem value="experience-desc">Pengalaman Terbanyak</SelectItem>
                    <SelectItem value="name-asc">Nama A-Z</SelectItem>
                    <SelectItem value="name-desc">Nama Z-A</SelectItem>
                    <SelectItem value="price-asc">Harga Terendah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-1 rounded-md border p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Doctor Cards */}
          {paginatedDoctors.length > 0 ? (
            <div className={viewMode === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
              {paginatedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground mb-2 text-lg font-medium">Tidak ada psikolog ditemukan</p>
              <p className="text-muted-foreground text-sm">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          )}

          {/* Pagination */}
          {paginatedDoctors.length > 0 && (
            <DoctorPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
}
