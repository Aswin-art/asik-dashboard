import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";

interface MobileFilterProps {
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

export function MobileFilter({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedRating,
  setSelectedRating,
  specialties,
  onReset,
  activeFiltersCount,
}: MobileFilterProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter & Pencarian
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter & Pencarian</SheetTitle>
          <SheetDescription>Pilih filter untuk menyaring hasil pencarian</SheetDescription>
        </SheetHeader>
        <div className="mt-6 ml-2">
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            specialties={specialties}
            onReset={onReset}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
