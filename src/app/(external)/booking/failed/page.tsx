import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Pembayaran Gagal - ASIK",
  description: "Pembayaran booking konsultasi gagal diproses",
};

export default function BookingFailedPage() {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="bg-destructive/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <XCircle className="text-destructive h-10 w-10" />
        </div>

        <h1 className="mb-3 text-2xl font-bold">Pembayaran Gagal</h1>
        <p className="text-muted-foreground mb-6">
          Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi atau hubungi customer service kami.
        </p>

        <div className="bg-muted/50 mb-6 rounded-lg p-4 text-left text-sm">
          <p className="font-medium">Kemungkinan penyebab:</p>
          <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
            <li>Saldo tidak mencukupi</li>
            <li>Transaksi dibatalkan</li>
            <li>Waktu pembayaran habis</li>
            <li>Masalah teknis dari payment gateway</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg">
            <Link href="/doctors">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Coba Booking Lagi
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
