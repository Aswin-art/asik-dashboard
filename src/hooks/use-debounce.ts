"use client";

import { useState, useEffect } from "react";

/**
 * ✅ useDebounce — Memberi jeda waktu sebelum nilai berubah (misalnya saat search)
 * @example const debounced = useDebounce(searchTerm, 500);
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
