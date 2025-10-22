import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Pembayaran Berhasil - ASIK",
  description: "Pembayaran booking konsultasi berhasil diproses",
};

export default function BookingSuccessPage() {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle2 className="text-primary h-10 w-10" />
        </div>

        <h1 className="mb-3 text-2xl font-bold">Pembayaran Berhasil!</h1>
        <p className="text-muted-foreground mb-6">
          Booking konsultasi Anda telah dikonfirmasi dan akan segera diproses
        </p>

        <div className="bg-muted/50 mb-6 space-y-3 rounded-lg p-4 text-left">
          <div className="flex items-start gap-3">
            <Calendar className="text-primary mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Link konsultasi akan dikirim via email</p>
              <p className="text-muted-foreground">15 menit sebelum jadwal dimulai</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard">
              <Calendar className="mr-2 h-5 w-5" />
              Lihat Jadwal Saya
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
