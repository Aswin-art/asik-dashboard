"use client";

import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Heart, MessageCircle, Shield, Video } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useAppEnvironment } from "@/hooks/use-env";
import Image from "next/image";

export function CTASection() {
  const { isSignedIn } = useUser();
  const env = useAppEnvironment();

  // TWA Design - Compact & Focused
  if (env === "twa") {
    return (
      <SectionWrapper size="full" className="px-4 py-6">
        <div className="mx-auto w-full max-w-7xl">
          <Card className="from-primary/10 via-background to-secondary/10 bg-gradient-to-br p-5 shadow-lg">
            <div className="mb-4 text-center">
              <h2 className="mb-1.5 text-xl leading-tight font-bold">Mulai Perjalanan Kesehatan Mental Anda</h2>
              <p className="text-muted-foreground text-sm">Konsultasi profesional dalam genggaman</p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <div className="border-primary/10 bg-card/50 flex flex-col items-center gap-1.5 rounded-lg border p-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Chat</span>
              </div>
              <div className="border-primary/10 bg-card/50 flex flex-col items-center gap-1.5 rounded-lg border p-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Video className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Video Call</span>
              </div>
              <div className="border-primary/10 bg-card/50 flex flex-col items-center gap-1.5 rounded-lg border p-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Jadwal Fleksibel</span>
              </div>
              <div className="border-primary/10 bg-card/50 flex flex-col items-center gap-1.5 rounded-lg border p-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">100% Aman</span>
              </div>
            </div>

            <div className="space-y-2">
              {isSignedIn ? (
                <Link href="/doctors" className="block">
                  <Button className="w-full shadow-md" size="lg">
                    Cari Psikolog Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register" className="block">
                    <Button className="w-full shadow-md" size="lg">
                      Daftar Gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      Sudah Punya Akun? Masuk
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Tersedia 24/7
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Psikolog Bersertifikat
              </Badge>
            </div>
          </Card>
        </div>
      </SectionWrapper>
    );
  }

  // Browser Design - Spacious & Visual
  return (
    <SectionWrapper size="full" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1600&dpr=2&q=80"
              alt="CTA Background"
              fill
              className="object-cover opacity-20"
            />
            <div className="from-primary/20 via-background/95 to-background/95 absolute inset-0 bg-gradient-to-br" />
          </div>

          <div className="relative grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12 lg:p-16">
            <div>
              <Badge className="mb-4 shadow-md">Platform Telemedicine #1</Badge>
              <h2 className="mb-4 text-3xl leading-tight font-bold md:text-5xl">
                Kesehatan Mental Anda, Prioritas Kami
              </h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Bergabung dengan ribuan orang yang telah menemukan dukungan profesional untuk kesehatan mental mereka.
                Konsultasi kapan saja, di mana saja.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="border-primary/10 bg-card/50 rounded-lg border p-4 backdrop-blur-sm">
                  <MessageCircle className="text-primary mb-2 h-8 w-8" />
                  <h3 className="mb-1 font-bold">Chat Langsung</h3>
                  <p className="text-muted-foreground text-sm">Konsultasi via chat dengan psikolog</p>
                </div>
                <div className="border-primary/10 bg-card/50 rounded-lg border p-4 backdrop-blur-sm">
                  <Video className="text-primary mb-2 h-8 w-8" />
                  <h3 className="mb-1 font-bold">Video Call</h3>
                  <p className="text-muted-foreground text-sm">Sesi tatap muka secara online</p>
                </div>
                <div className="border-primary/10 bg-card/50 rounded-lg border p-4 backdrop-blur-sm">
                  <Calendar className="text-primary mb-2 h-8 w-8" />
                  <h3 className="mb-1 font-bold">Jadwal Fleksibel</h3>
                  <p className="text-muted-foreground text-sm">Atur jadwal sesuai kebutuhan</p>
                </div>
                <div className="border-primary/10 bg-card/50 rounded-lg border p-4 backdrop-blur-sm">
                  <Shield className="text-primary mb-2 h-8 w-8" />
                  <h3 className="mb-1 font-bold">Privasi Terjamin</h3>
                  <p className="text-muted-foreground text-sm">Data Anda 100% aman</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {isSignedIn ? (
                  <Link href="/doctors">
                    <Button size="lg" className="shadow-lg">
                      Cari Psikolog Sekarang
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="shadow-lg">
                        Daftar Gratis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" size="lg">
                        Masuk
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full md:h-[400px]">
                <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-2xl bg-gradient-to-br shadow-2xl backdrop-blur-xl">
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                      <Heart className="text-primary h-10 w-10" />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold">1000+ Konsultasi</h3>
                    <p className="text-muted-foreground mb-4">Telah membantu ribuan klien menemukan ketenangan</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Rating 4.9/5</Badge>
                      <Badge variant="secondary">Tersedia 24/7</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
