import { Metadata } from "next";
import VideoClient from "./_components/video-client";

export const metadata: Metadata = {
  title: "Konsultasi Video | ASIK",
  description: "Konsultasi video dengan psikolog profesional secara real-time",
};

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function VideoConsultationPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <div className="flex h-screen flex-col bg-black">
      <VideoClient sessionId={sessionId} />
    </div>
  );
}
