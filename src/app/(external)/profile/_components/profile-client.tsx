"use client";

import { useUser } from "@clerk/nextjs";
import { useAppEnvironment } from "@/hooks/use-env";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { ProfileTWA } from "./profile-twa";
import { ProfileBrowser } from "./profile-browser";

export function ProfileClient() {
  const { isLoaded, isSignedIn } = useUser();
  const env = useAppEnvironment();

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground text-sm">Memuat profil...</p>
        </div>
      </div>
    );
  }

  // Not signed in - Show auth prompt
  if (!isSignedIn) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <UserPlus className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Belum Masuk Akun</h2>
          <p className="text-muted-foreground mb-6">
            Silakan masuk atau daftar untuk mengakses profil dan fitur lengkap ASIK
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login">
              <Button className="w-full" size="lg">
                <LogIn className="mr-2 h-5 w-5" />
                Masuk Akun
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="w-full" size="lg">
                <UserPlus className="mr-2 h-5 w-5" />
                Daftar Baru
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Render adaptive design based on environment
  if (env === "twa") {
    return <ProfileTWA />;
  }

  return <ProfileBrowser />;
}
