"use client";
import { useEffect, useState } from "react";

export function useAppEnvironment() {
  const [env, setEnv] = useState<"twa" | "browser" | "unknown">("unknown");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();

    // ✅ Jika mengandung 'wv', kemungkinan besar berjalan dalam TWA/WebView
    const isTWA = ua.includes("wv") || ua.includes("version/4.0");

    if (isTWA) {
      setEnv("twa");
    } else {
      setEnv("browser");
    }
  }, []);

  return env;
}
