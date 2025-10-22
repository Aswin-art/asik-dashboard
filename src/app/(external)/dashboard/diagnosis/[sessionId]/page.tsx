import { Metadata } from "next";
import DiagnosisClient from "./_components/diagnosis-client";

export const metadata: Metadata = {
  title: "Hasil Diagnosa AI | ASIK",
  description: "Hasil analisis dan diagnosa AI dari sesi konsultasi video",
};

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function DiagnosisPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <DiagnosisClient sessionId={sessionId} />
    </div>
  );
}
