import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{
    sessionId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { sessionId } = await params;

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
