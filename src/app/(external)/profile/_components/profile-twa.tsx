"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Award,
  LogOut,
  Edit,
  Bell,
  Shield,
  Heart,
  Clock,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  address?: string;
  joinedDate: string;
  totalSessions: number;
  totalReviews: number;
  points: number;
  membershipTier: string;
}

async function fetchUserProfile(userId: string): Promise<UserProfile> {
  // TODO: Replace with actual API endpoint
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    id: userId,
    email: "user@example.com",
    phone: "+62 812-3456-7890",
    address: "Jakarta Selatan, DKI Jakarta",
    joinedDate: "2024-01-15",
    totalSessions: 12,
    totalReviews: 8,
    points: 1250,
    membershipTier: "Gold",
  };
}

export function ProfileTWA() {
  const { user } = useUser();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => fetchUserProfile(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const menuItems = [
    {
      icon: Edit,
      label: "Edit Profil",
      href: "/profile/edit",
      badge: null,
    },
    {
      icon: Bell,
      label: "Notifikasi",
      href: "/profile/notifications",
      badge: "3",
    },
    {
      icon: Shield,
      label: "Keamanan & Privasi",
      href: "/profile/security",
      badge: null,
    },
    {
      icon: Heart,
      label: "Favorit Saya",
      href: "/favorites",
      badge: null,
    },
    {
      icon: Clock,
      label: "Riwayat Konsultasi",
      href: "/profile/history",
      badge: null,
    },
    {
      icon: Settings,
      label: "Pengaturan",
      href: "/profile/settings",
      badge: null,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Header with gradient */}
      <div className="from-primary/20 via-primary/10 to-background relative bg-gradient-to-b px-4 pt-6 pb-20">
        {/* Profile Card */}
        <Card className="relative overflow-hidden p-6">
          {/* Background glow */}
          <div className="bg-primary/5 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl" />

          <div className="relative flex items-center gap-4">
            <Avatar className="border-primary/20 h-20 w-20 border-4">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(user?.fullName || "User")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="mb-1 text-xl leading-tight font-bold">{user?.fullName || "User"}</h1>
              <p className="text-muted-foreground mb-2 text-sm">
                {profile?.email || user?.primaryEmailAddress?.emailAddress}
              </p>
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                <Award className="mr-1 h-3 w-3" />
                {profile?.membershipTier || "Member"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="-mt-16 px-4">
        <div className="grid grid-cols-3 gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </>
          ) : (
            <>
              <Card className="p-3 text-center">
                <div className="text-primary mb-1 text-2xl font-bold">{profile?.points || 0}</div>
                <p className="text-muted-foreground text-[10px] font-medium">Poin</p>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-primary mb-1 text-2xl font-bold">{profile?.totalSessions || 0}</div>
                <p className="text-muted-foreground text-[10px] font-medium">Sesi</p>
              </Card>
              <Card className="p-3 text-center">
                <div className="text-primary mb-1 text-2xl font-bold">{profile?.totalReviews || 0}</div>
                <p className="text-muted-foreground text-[10px] font-medium">Ulasan</p>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-4 px-4">
        <Card className="p-4">
          <h3 className="mb-3 text-sm font-bold">Informasi Akun</h3>
          <div className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="text-sm font-medium">{profile?.email}</p>
                  </div>
                </div>

                {profile?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs">Telepon</p>
                      <p className="text-sm font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile?.address && (
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs">Alamat</p>
                      <p className="text-sm font-medium">{profile.address}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">Bergabung Sejak</p>
                    <p className="text-sm font-medium">
                      {profile?.joinedDate ? format(new Date(profile.joinedDate), "dd MMMM yyyy", { locale: id }) : "-"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="mt-4 px-4">
        <Card className="divide-y overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="hover:bg-muted/50 active:bg-muted flex w-full items-center gap-3 p-4 transition-colors"
              >
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="h-5 min-w-[20px] rounded-full px-1.5 text-[10px]">
                    {item.badge}
                  </Badge>
                )}
                <ChevronRight className="text-muted-foreground h-5 w-5" />
              </button>
            );
          })}
        </Card>
      </div>

      {/* Logout Button */}
      <div className="mt-4 px-4">
        <Button variant="outline" className="text-destructive hover:bg-destructive/10 w-full" size="lg">
          <LogOut className="mr-2 h-5 w-5" />
          Keluar Akun
        </Button>
      </div>
    </div>
  );
}
