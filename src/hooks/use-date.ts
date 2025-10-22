"use client";

import { useCallback } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

/**
 * ✅ useDate — Format tanggal ke format Indonesia: 17 Oktober 2025
 * @example const { formatDate } = useDate(); formatDate("2025-10-17")
 */
export function useDate() {
  const formatDate = useCallback((date: Date | string): string => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";

    return format(d, "dd MMMM yyyy", { locale: id });
  }, []);

  return { formatDate };
}
