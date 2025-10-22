import { Metadata } from "next";
import ChatClient from "./_components/chat-client";

export const metadata: Metadata = {
  title: "Konsultasi Chat | ASIK",
  description: "Konsultasi chat dengan psikolog profesional secara real-time",
};

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function ChatConsultationPage({ params }: PageProps) {
  const { sessionId } = await params;

  return (
    <div className="flex h-screen flex-col">
      <ChatClient sessionId={sessionId} />
    </div>
  );
}
