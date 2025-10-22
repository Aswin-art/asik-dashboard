import { X, SlidersHorizontal, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (value: string) => void;
  selectedRating: string;
  setSelectedRating: (value: string) => void;
  specialties: string[];
  onReset: () => void;
  activeFiltersCount: number;
}

export function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedRating,
  setSelectedRating,
  specialties,
  onReset,
  activeFiltersCount,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Filter & Pencarian</h2>
        </div>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="h-6">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Cari Psikolog</label>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            className="pl-9"
            placeholder="Nama atau spesialisasi…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Spesialisasi</label>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="border-muted-foreground/20">
            <SelectValue placeholder="Pilih spesialisasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Spesialisasi</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <label className="text-sm font-medium">Rating Minimum</label>
        </div>
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger className="border-muted-foreground/20">
            <SelectValue placeholder="Pilih rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Rating</SelectItem>
            <SelectItem value="4+">4.0+</SelectItem>
            <SelectItem value="4.5+">4.5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      {(searchQuery || activeFiltersCount > 0) && (
        <Button variant="outline" onClick={onReset} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Reset Semua Filter
        </Button>
      )}
    </div>
  );
}
