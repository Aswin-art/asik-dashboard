"use client";

import { useState, useEffect, useRef } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";
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
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut, Circle, Square, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface VideoClientProps {
  sessionId: string;
}

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "";

export default function VideoClient({ sessionId }: VideoClientProps) {
  const { user } = useUser();
  const router = useRouter();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<ReturnType<StreamVideoClient["call"]> | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!user) return;

    const initVideo = async () => {
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

        const videoClient = new StreamVideoClient({
          apiKey,
          user: {
            id: user.id,
            name: user.fullName || user.firstName || "User",
            image: user.imageUrl,
          },
          token,
        });

        const videoCall = videoClient.call("default", sessionId);
        await videoCall.join({ create: true });

        setClient(videoClient);
        setCall(videoCall);
      } catch (error) {
        console.error("Error initializing video:", error);
      }
    };

    initVideo();

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      // Call cleanup handled by initVideo
    };
  }, [user, sessionId]);

  const startRecording = async () => {
    try {
      // Get video stream
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp8,opus",
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    return new Promise<Blob>((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
          resolve(blob);

          // Stop all tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
          }

          // Clear timer
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
          }
        };

        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
      }
    });
  };

  const handleEndSession = async () => {
    setIsEnding(true);

    try {
      let videoBlob: Blob | null = null;

      // Stop recording if active
      if (isRecording) {
        videoBlob = await stopRecording();
      }

      // Upload video and get diagnosis
      if (videoBlob) {
        setIsProcessing(true);

        // Upload video
        const formData = new FormData();
        formData.append("video", videoBlob, `session-${sessionId}.webm`);
        formData.append("sessionId", sessionId);

        await fetch("/api/consultation/record", {
          method: "POST",
          body: formData,
        });

        // Request AI diagnosis (async)
        fetch("/api/consultation/diagnosis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        }).catch((error) => console.error("Error requesting diagnosis:", error));
      }

      // End session
      await fetch("/api/consultation/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: "video",
        }),
      });

      // Leave call and redirect
      if (call) {
        await call.leave();
      }

      router.push(`/dashboard/diagnosis/${sessionId}`);
    } catch (error) {
      console.error("Error ending session:", error);
      setIsEnding(false);
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-white" />
          <p className="mt-4 text-white">Memuat konsultasi video...</p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div className="flex h-screen flex-col bg-black">
          {/* Custom Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold text-white">Konsultasi Video</h1>
              <p className="text-sm text-white/60">Sesi: {sessionId}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Recording Controls */}
              {!isRecording ? (
                <Button variant="default" size="sm" onClick={startRecording}>
                  <Circle className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
                  Mulai Rekam
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="animate-pulse">
                    <Circle className="mr-2 h-3 w-3 fill-white" />
                    REC {formatTime(recordingTime)}
                  </Badge>
                  {isPaused ? (
                    <Button variant="secondary" size="sm" onClick={resumeRecording}>
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" onClick={pauseRecording}>
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={stopRecording}>
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* End Session */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isEnding || isProcessing}>
                    {isEnding || isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isProcessing ? "Memproses..." : "Mengakhiri..."}
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
                      {isRecording
                        ? "Rekaman akan disimpan dan dikirim untuk analisis AI. Hasil diagnosa akan tersedia dalam beberapa menit."
                        : "Apakah Anda yakin ingin mengakhiri sesi konsultasi ini?"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleEndSession}>Akhiri Sesi</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Video Interface */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <SpeakerLayout participantsBarPosition="bottom" />
            <CallControls />
          </div>

          {/* Participants */}
          <div className="absolute top-20 right-4 w-64">
            <CallParticipantsList onClose={() => {}} />
          </div>
        </div>
      </StreamCall>
    </StreamVideo>
  );
}
