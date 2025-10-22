"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileText, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface DiagnosisClientProps {
  sessionId: string;
}

interface DiagnosisData {
  status: "processing" | "completed" | "failed";
  diagnosis?: {
    summary: string;
    recommendations: string[];
    severity: "low" | "medium" | "high";
    nextSteps: string;
  };
  videoUrl?: string;
  createdAt?: string;
}

export default function DiagnosisClient({ sessionId }: DiagnosisClientProps) {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const response = await fetch(`/api/consultation/diagnosis/${sessionId}`);
        const data = await response.json();

        setDiagnosis(data);

        // Stop loading if completed or failed
        if (data.status === "completed" || data.status === "failed") {
          setIsLoading(false);
        }
      } catch {
        setError("Gagal memuat hasil diagnosa");
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchDiagnosis();

    // Poll every 5 seconds if still processing
    const interval = setInterval(() => {
      fetchDiagnosis();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [sessionId]);

  if (error) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <CardTitle className="text-red-900 dark:text-red-100">Terjadi Kesalahan</CardTitle>
              <CardDescription>{error}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/dashboard")} variant="outline" className="w-full">
            Kembali ke Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || diagnosis?.status === "processing") {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-950">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Memproses Diagnosa AI</CardTitle>
              <CardDescription>Sedang menganalisis rekaman sesi konsultasi Anda...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Proses Berlangsung</p>
                <p className="text-muted-foreground mt-1 text-sm">Ini mungkin memakan waktu beberapa menit</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm">Rekaman berhasil diunggah</span>
              </div>
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm">Menganalisis konten video...</span>
              </div>
              <div className="flex items-center gap-2 opacity-50">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Menghasilkan rekomendasi...</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (diagnosis?.status === "completed" && diagnosis.diagnosis) {
    const { summary, recommendations, severity, nextSteps } = diagnosis.diagnosis;

    const severityConfig = {
      low: { label: "Ringan", color: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200" },
      medium: { label: "Sedang", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200" },
      high: { label: "Perlu Perhatian", color: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200" },
    };

    return (
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-950">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Diagnosa AI Selesai</CardTitle>
                  <CardDescription>Hasil analisis dari sesi konsultasi video Anda</CardDescription>
                </div>
              </div>
              <Badge className={severityConfig[severity].color}>{severityConfig[severity].label}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ringkasan Diagnosa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1">
                    <CheckCircle2 className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-muted-foreground flex-1 text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Langkah Selanjutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{nextSteps}</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          {diagnosis.videoUrl && (
            <Button variant="outline" asChild>
              <a href={diagnosis.videoUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Unduh Rekaman
              </a>
            </Button>
          )}
          <Button onClick={() => router.push("/dashboard")} className="ml-auto">
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
