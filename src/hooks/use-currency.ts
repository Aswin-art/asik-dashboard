"use client";

import { useCallback } from "react";

/**
 * ✅ useCurrency — Format angka menjadi Rupiah (IDR)
 * @example const { formatCurrency } = useCurrency(); formatCurrency(10000) // "Rp10.000"
 */
export function useCurrency() {
  const formatCurrency = useCallback((value: number | string): string => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(number)) return "Rp0";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }, []);

  return { formatCurrency };
}
