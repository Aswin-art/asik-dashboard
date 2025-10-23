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
  Settings,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

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

export function ProfileBrowser() {
  const { user } = useUser();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: () => fetchUserProfile(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const quickActions = [
    { icon: Edit, label: "Edit Profil", href: "/profile/edit" },
    { icon: Bell, label: "Notifikasi", href: "/profile/notifications", badge: "3" },
    { icon: Shield, label: "Keamanan", href: "/profile/security" },
    { icon: Settings, label: "Pengaturan", href: "/profile/settings" },
  ];

  const menuSections = [
    {
      title: "Aktivitas",
      items: [
        { icon: Heart, label: "Favorit Saya", href: "/favorites", description: "Psikolog yang Anda sukai" },
        { icon: Clock, label: "Riwayat Konsultasi", href: "/profile/history", description: "Semua sesi konsultasi" },
        { icon: Star, label: "Ulasan Saya", href: "/profile/reviews", description: "Ulasan yang Anda berikan" },
      ],
    },
    {
      title: "Akun",
      items: [
        { icon: User, label: "Informasi Pribadi", href: "/profile/personal", description: "Kelola data pribadi" },
        { icon: Shield, label: "Keamanan & Privasi", href: "/profile/security", description: "Password & autentikasi" },
        { icon: Bell, label: "Notifikasi", href: "/profile/notifications", description: "Pengaturan pemberitahuan" },
      ],
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
    <div className="bg-background mt-28 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Profil Saya</h1>
          <p className="text-muted-foreground">Kelola informasi dan preferensi akun Anda</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Header */}
              <div className="mb-6 text-center">
                <Avatar className="border-primary/20 mx-auto mb-4 h-32 w-32 border-4">
                  <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                    {getInitials(user?.fullName || "User")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mb-1 text-xl font-bold">{user?.fullName || "User"}</h2>
                <p className="text-muted-foreground mb-3 text-sm">
                  {profile?.email || user?.primaryEmailAddress?.emailAddress}
                </p>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                  <Award className="mr-1.5 h-4 w-4" />
                  {profile?.membershipTier || "Member"}
                </Badge>
              </div>

              <Separator className="my-6" />

              {/* Stats */}
              <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                {isLoading ? (
                  <>
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                  </>
                ) : (
                  <>
                    <div>
                      <div className="text-primary mb-1 text-2xl font-bold">{profile?.points || 0}</div>
                      <p className="text-muted-foreground text-xs">Poin</p>
                    </div>
                    <div>
                      <div className="text-primary mb-1 text-2xl font-bold">{profile?.totalSessions || 0}</div>
                      <p className="text-muted-foreground text-xs">Sesi</p>
                    </div>
                    <div>
                      <div className="text-primary mb-1 text-2xl font-bold">{profile?.totalReviews || 0}</div>
                      <p className="text-muted-foreground text-xs">Ulasan</p>
                    </div>
                  </>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.label} href={action.href}>
                      <Button variant="outline" className="relative h-auto w-full flex-col gap-2 py-3" size="sm">
                        {action.badge && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full px-1.5 text-[10px]"
                          >
                            {action.badge}
                          </Badge>
                        )}
                        <Icon className="h-5 w-5" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>

              <Separator className="my-6" />

              {/* Logout */}
              <Button variant="outline" className="text-destructive hover:bg-destructive/10 w-full">
                <LogOut className="mr-2 h-5 w-5" />
                Keluar Akun
              </Button>
            </Card>
          </div>

          {/* Right Column - Details & Menu */}
          <div className="space-y-6 lg:col-span-2">
            {/* Account Information */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">Informasi Akun</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-medium">Email</p>
                      <p className="text-sm font-medium">{profile?.email}</p>
                    </div>
                  </div>

                  {profile?.phone && (
                    <div className="flex gap-3">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1 text-xs font-medium">Telepon</p>
                        <p className="text-sm font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  )}

                  {profile?.address && (
                    <div className="flex gap-3">
                      <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1 text-xs font-medium">Alamat</p>
                        <p className="text-sm font-medium">{profile.address}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-medium">Bergabung Sejak</p>
                      <p className="text-sm font-medium">
                        {profile?.joinedDate
                          ? format(new Date(profile.joinedDate), "dd MMMM yyyy", { locale: id })
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Menu Sections */}
            {menuSections.map((section) => (
              <Card key={section.title} className="p-6">
                <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.label} href={item.href}>
                        <div className="hover:bg-muted/50 flex items-center gap-4 rounded-lg p-4 transition-colors">
                          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="mb-0.5 font-medium">{item.label}</p>
                            <p className="text-muted-foreground text-xs">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
