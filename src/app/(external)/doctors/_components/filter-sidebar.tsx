import { X, SlidersHorizontal } from "lucide-react";
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
  selectedAvailability: string;
  setSelectedAvailability: (value: string) => void;
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
  selectedAvailability,
  setSelectedAvailability,
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
        <Input
          placeholder="Nama atau spesialisasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Specialty Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Spesialisasi</label>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger>
            <SelectValue />
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
        <label className="text-sm font-medium">Rating Minimum</label>
        <Select value={selectedRating} onValueChange={setSelectedRating}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Rating</SelectItem>
            <SelectItem value="4+">4.0+</SelectItem>
            <SelectItem value="4.5+">4.5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ketersediaan</label>
        <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="available">Tersedia</SelectItem>
            <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
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
