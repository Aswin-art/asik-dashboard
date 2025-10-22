"use client";

import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelHeader, MessageList, MessageInput, Thread, Window } from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import "stream-chat-react/dist/css/v2/index.css";

interface ChatClientProps {
  sessionId: string;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

export default function ChatClient({ sessionId }: ChatClientProps) {
  const { user } = useUser();
  const router = useRouter();
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<ReturnType<StreamChat["channel"]> | null>(null);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      const chatClient = StreamChat.getInstance(apiKey);

      try {
        // Get user token from backend
        const response = await fetch("/api/consultation/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            userName: user.fullName || user.firstName || "User",
          }),
        });

        const { token } = await response.json();

        // Connect user
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.firstName || "User",
            image: user.imageUrl,
          },
          token,
        );

        // Get or create channel
        const chatChannel = chatClient.channel("messaging", sessionId, {
          name: `Konsultasi ${sessionId}`,
          members: [user.id],
        });

        await chatChannel.watch();

        setClient(chatClient);
        setChannel(chatChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [user, sessionId]);

  const handleEndSession = async () => {
    setIsEnding(true);

    try {
      // Send end session request to backend
      await fetch("/api/consultation/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: "chat",
        }),
      });

      // Disconnect and redirect
      if (client) {
        await client.disconnectUser();
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error ending session:", error);
      setIsEnding(false);
    }
  };

  if (!client || !channel) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-primary mx-auto h-12 w-12 animate-spin" />
          <p className="text-muted-foreground mt-4">Memuat konsultasi chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Custom Header */}
      <div className="border-border bg-background flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">Konsultasi Chat</h1>
          <p className="text-muted-foreground text-sm">Sesi: {sessionId}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isEnding}>
              {isEnding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengakhiri...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Akhiri Sesi
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Akhiri Sesi Konsultasi?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin mengakhiri sesi konsultasi ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleEndSession}>Akhiri Sesi</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <Chat client={client} theme="str-chat__theme-light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}
