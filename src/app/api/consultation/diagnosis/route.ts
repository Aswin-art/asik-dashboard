import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    // Mark diagnosis as processing
    await db.diagnosis.upsert({
      where: { sessionId },
      create: {
        sessionId,
        status: "processing",
      },
      update: {
        status: "processing",
      },
    });

    // Simulate AI processing (replace with actual AI API call)
    setTimeout(async () => {
      try {
        // This would be your AI API call to analyze the video
        // For now, we'll generate a mock diagnosis
        const mockDiagnosis = {
          summary:
            "Berdasarkan analisis video konsultasi, teridentifikasi beberapa indikator stres dan kecemasan. Pasien menunjukkan pola komunikasi yang mencerminkan beban mental yang cukup tinggi dengan gejala yang konsisten dengan gangguan kecemasan ringan hingga sedang.",
          recommendations: [
            "Praktikkan teknik pernapasan dalam dan meditasi mindfulness 10-15 menit setiap hari",
            "Atur jadwal tidur yang teratur dengan minimal 7-8 jam per malam",
            "Lakukan aktivitas fisik ringan seperti jalan kaki 30 menit setiap hari",
            "Batasi konsumsi kafein terutama di sore dan malam hari",
            "Pertimbangkan untuk melanjutkan konseling rutin 2 minggu sekali",
          ],
          severity: "medium" as const,
          nextSteps:
            "Disarankan untuk melakukan follow-up konsultasi dalam 2 minggu untuk memonitor perkembangan. Jika gejala memburuk atau muncul gejala baru seperti serangan panik atau insomnia berkepanjangan, segera hubungi psikolog atau tenaga medis profesional.",
        };

        await db.diagnosis.update({
          where: { sessionId },
          data: {
            status: "completed",
            summary: mockDiagnosis.summary,
            recommendations: mockDiagnosis.recommendations,
            severity: mockDiagnosis.severity,
            nextSteps: mockDiagnosis.nextSteps,
            completedAt: new Date(),
          },
        });
      } catch (error) {
        console.error("Error processing diagnosis:", error);
        await db.diagnosis.update({
          where: { sessionId },
          data: {
            status: "failed",
          },
        });
      }
    }, 10000); // 10 second delay to simulate AI processing

    return NextResponse.json({ success: true, message: "Diagnosis processing started" });
  } catch (error) {
    console.error("Error starting diagnosis:", error);
    return NextResponse.json({ error: "Failed to start diagnosis" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const diagnosis = await db.diagnosis.findUnique({
      where: { sessionId },
    });

    if (!diagnosis) {
      return NextResponse.json({ status: "processing" });
    }

    return NextResponse.json({
      status: diagnosis.status,
      diagnosis:
        diagnosis.status === "completed"
          ? {
              summary: diagnosis.summary,
              recommendations: diagnosis.recommendations,
              severity: diagnosis.severity,
              nextSteps: diagnosis.nextSteps,
            }
          : undefined,
      videoUrl: `/recordings/${sessionId}.webm`,
      createdAt: diagnosis.createdAt,
    });
  } catch (error) {
    console.error("Error fetching diagnosis:", error);
    return NextResponse.json({ error: "Failed to fetch diagnosis" }, { status: 500 });
  }
}
