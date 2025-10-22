"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Video, MessageSquare, CreditCard, CheckCircle2, Clock, ChevronLeft, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Doctor } from "../_data/doctors-data";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor;
  defaultSessionType?: "chat" | "video";
}

type Step = "session" | "complaint" | "schedule" | "payment" | "success";

export function BookingModal({ open, onOpenChange, doctor, defaultSessionType }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>(defaultSessionType ? "complaint" : "session");
  const [selectedSessionType, setSelectedSessionType] = useState<"chat" | "video">(defaultSessionType || "video");
  const [complaint, setComplaint] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Lock scroll saat modal terbuka
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sessionTypes = [
    {
      type: "video" as const,
      icon: Video,
      label: "Video Call",
      description: "Konsultasi langsung via video call",
      price: doctor.price,
    },
    {
      type: "chat" as const,
      icon: MessageSquare,
      label: "Chat",
      description: "Konsultasi via chat messaging",
      price: doctor.price * 0.7,
    },
  ];

  const availableTimes = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const selectedSessionData = sessionTypes.find((s) => s.type === selectedSessionType);
  const totalPrice = selectedSessionData?.price || doctor.price;

  const handleSessionNext = () => {
    setCurrentStep("complaint");
  };

  const handleComplaintNext = () => {
    if (complaint.trim()) {
      setCurrentStep("schedule");
    }
  };

  const handleScheduleNext = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep("payment");
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/payment/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: doctor.id,
          sessionType: selectedSessionType,
          complaint: complaint,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          amount: totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok && data.invoice_url) {
        // Redirect ke halaman pembayaran Xendit
        window.location.href = data.invoice_url;
      } else {
        console.error("Failed to create invoice:", data.error);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(defaultSessionType ? "complaint" : "session");
    setComplaint("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setIsProcessing(false);
    onOpenChange(false);
  };

  const handleBack = () => {
    if (currentStep === "complaint") {
      if (!defaultSessionType) {
        setCurrentStep("session");
      }
    } else if (currentStep === "schedule") {
      setCurrentStep("complaint");
    } else if (currentStep === "payment") {
      setCurrentStep("schedule");
    }
  };

  const renderStepIndicator = () => {
    const steps = defaultSessionType
      ? [
          { key: "complaint", label: "Keluhan" },
          { key: "schedule", label: "Jadwal" },
          { key: "payment", label: "Pembayaran" },
        ]
      : [
          { key: "session", label: "Tipe Konsultasi" },
          { key: "complaint", label: "Keluhan" },
          { key: "schedule", label: "Jadwal" },
          { key: "payment", label: "Pembayaran" },
        ];

    const currentIndex = steps.findIndex((s) => s.key === currentStep);

    return (
      <div className="border-border mb-6 flex items-center justify-between gap-1 border-b pb-6">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex flex-1 items-center">
              <div className="flex w-full flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "ring-primary/20 bg-primary text-primary-foreground ring-4"
                      : isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                </div>
                <span
                  className={`text-center text-xs font-medium transition-colors ${
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`mx-2 h-0.5 w-full ${isCompleted ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSessionStep = () => (
    <div className="space-y-5">
      {/* Doctor Info Card */}
      <div className="bg-muted/30 flex items-center gap-4 rounded-xl border p-4">
        <Avatar className="border-background h-14 w-14 border-2">
          <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="leading-tight font-semibold">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          <div className="mt-1 flex items-center gap-1">
            <Badge variant="secondary" className="h-5 text-xs">
              {doctor.experience}
            </Badge>
          </div>
        </div>
      </div>

      {/* Session Type Selection */}
      <div>
        <h3 className="mb-3 text-base font-semibold">Pilih Tipe Konsultasi</h3>
        <div className="space-y-3">
          {sessionTypes.map((session) => {
            const Icon = session.icon;
            const isSelected = selectedSessionType === session.type;

            return (
              <button
                key={session.type}
                onClick={() => setSelectedSessionType(session.type)}
                className={`group w-full cursor-pointer rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-lg p-2 transition-colors ${
                      isSelected ? "bg-primary/10" : "bg-muted group-hover:bg-primary/10"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 transition-colors ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{session.label}</p>
                      {session.type === "chat" && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                          Hemat 30%
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">{session.description}</p>
                    <p className="mt-2 text-lg font-bold">{formatPrice(session.price)}</p>
                    <p className="text-muted-foreground text-xs">per sesi (60 menit)</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Button */}
      <Button className="mt-2 w-full" size="lg" onClick={handleSessionNext}>
        Lanjutkan ke Keluhan
      </Button>
    </div>
  );

  const renderComplaintStep = () => (
    <div className="space-y-5">
      {/* Back Button */}
      {!defaultSessionType && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="-mt-2">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Kembali
        </Button>
      )}

      {/* Doctor Info Card */}
      <div className="bg-muted/30 flex items-center gap-4 rounded-xl border p-4">
        <Avatar className="border-background h-14 w-14 border-2">
          <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="leading-tight font-semibold">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          <Badge variant="outline" className="border-primary/50 text-primary mt-1.5 h-5 text-xs">
            <FileText className="mr-1 h-3 w-3" />
            {selectedSessionData?.label}
          </Badge>
        </div>
      </div>

      {/* Complaint Input */}
      <div>
        <h3 className="mb-3 text-base font-semibold">Keluhan Anda</h3>
        <Textarea
          placeholder="Ceritakan keluhan atau masalah yang ingin Anda konsultasikan. Misalnya: 'Saya merasa cemas berlebihan sejak 3 bulan terakhir dan sulit tidur di malam hari...'"
          value={complaint}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComplaint(e.target.value)}
          className="min-h-[180px] resize-none"
          maxLength={500}
        />
        <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
          <span>{complaint.trim().length < 50 ? "Minimal 50 karakter" : "Keluhan diterima"}</span>
          <span>{complaint.length}/500</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Informasi Anda Aman</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Keluhan yang Anda sampaikan akan membantu psikolog memahami kondisi Anda dengan lebih baik dan akan dijaga
            kerahasiaannya
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button className="mt-2 w-full" size="lg" onClick={handleComplaintNext} disabled={complaint.trim().length < 50}>
        Lanjutkan ke Jadwal
      </Button>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-5">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={handleBack} className="-mt-2">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Kembali
      </Button>

      {/* Doctor Info Card */}
      <div className="bg-muted/30 flex items-center gap-4 rounded-xl border p-4">
        <Avatar className="border-background h-14 w-14 border-2">
          <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="leading-tight font-semibold">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
          <Badge variant="outline" className="border-primary/50 text-primary mt-1.5 h-5 text-xs">
            <Video className="mr-1 h-3 w-3" />
            {selectedSessionData?.label}
          </Badge>
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="mb-3 text-base font-semibold">Pilih Tanggal</h3>
        <div className="bg-muted/30 flex justify-center rounded-xl border p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            locale={idLocale}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="mb-3 text-base font-semibold">Pilih Waktu Konsultasi</h3>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`cursor-pointer rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                  selectedTime === time
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Button className="mt-2 w-full" size="lg" onClick={handleScheduleNext} disabled={!selectedDate || !selectedTime}>
        Lanjutkan ke Pembayaran
      </Button>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-5">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={handleBack} className="-mt-2">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Kembali
      </Button>

      {/* Doctor Info Card */}
      <div className="bg-muted/30 flex items-center gap-4 rounded-xl border p-4">
        <Avatar className="border-background h-14 w-14 border-2">
          <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
          <AvatarFallback>{getInitials(doctor.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="leading-tight font-semibold">{doctor.name}</h3>
          <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="from-primary/5 to-primary/10 border-primary/20 space-y-4 rounded-xl border bg-gradient-to-br p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Ringkasan Booking</h3>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Konfirmasi
          </Badge>
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tipe Konsultasi</span>
            <span className="font-semibold">{selectedSessionData?.label}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tanggal</span>
            <span className="font-semibold">
              {selectedDate && format(selectedDate, "dd MMMM yyyy", { locale: idLocale })}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Waktu</span>
            <span className="font-semibold">{selectedTime} WIB</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Durasi Sesi</span>
            <span className="font-semibold">60 menit</span>
          </div>

          <Separator className="bg-border/50" />

          <div className="flex items-center justify-between pt-1">
            <span className="text-base font-semibold">Total Pembayaran</span>
            <span className="text-primary text-2xl font-bold">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
          <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Pembayaran Aman via Xendit</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Anda akan diarahkan ke halaman pembayaran Xendit yang aman untuk menyelesaikan transaksi
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button className="mt-2 w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? (
          <>
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Memproses Pembayaran...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Bayar Sekarang - {formatPrice(totalPrice)}
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
      </p>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-6 py-4 text-center">
      {/* Success Icon */}
      <div className="ring-primary/10 bg-primary/10 mx-auto flex h-24 w-24 items-center justify-center rounded-full ring-8">
        <CheckCircle2 className="text-primary h-12 w-12" />
      </div>

      {/* Success Message */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Booking Berhasil!</h3>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm">
          Pembayaran Anda telah berhasil diproses dan booking telah dikonfirmasi
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-muted/30 space-y-3 rounded-xl border p-5 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Psikolog</span>
          <span className="font-semibold">{doctor.name}</span>
        </div>

        <Separator className="bg-border/50" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tipe Konsultasi</span>
          <span className="font-semibold">{selectedSessionData?.label}</span>
        </div>

        <Separator className="bg-border/50" />

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tanggal & Waktu</span>
          <span className="font-semibold">
            {selectedDate && format(selectedDate, "dd MMM yyyy", { locale: idLocale })} • {selectedTime} WIB
          </span>
        </div>
      </div>

      {/* Email Notification Info */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold text-blue-900 dark:text-blue-100">Link Konsultasi</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Link untuk memulai konsultasi akan dikirim via email 15 menit sebelum jadwal dimulai
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button className="mt-4 w-full" size="lg" onClick={handleClose}>
        Tutup
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose} modal>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[560px]">
        {/* Header */}
        <DialogHeader className="border-border space-y-0 border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold">
                {currentStep === "session" && "Pilih Tipe Konsultasi"}
                {currentStep === "complaint" && "Ceritakan Keluhan Anda"}
                {currentStep === "schedule" && "Pilih Jadwal Konsultasi"}
                {currentStep === "payment" && "Konfirmasi Pembayaran"}
                {currentStep === "success" && "Booking Dikonfirmasi"}
              </DialogTitle>
              <p className="text-muted-foreground text-sm">
                {currentStep === "session" && "Tentukan jenis konsultasi yang Anda butuhkan"}
                {currentStep === "complaint" && "Jelaskan masalah yang ingin Anda konsultasikan"}
                {currentStep === "schedule" && "Pilih tanggal dan waktu yang tersedia"}
                {currentStep === "payment" && "Review detail dan selesaikan pembayaran"}
                {currentStep === "success" && "Pembayaran berhasil diproses"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto px-6 py-6">
          {currentStep !== "success" && renderStepIndicator()}

          {currentStep === "session" && renderSessionStep()}
          {currentStep === "complaint" && renderComplaintStep()}
          {currentStep === "schedule" && renderScheduleStep()}
          {currentStep === "payment" && renderPaymentStep()}
          {currentStep === "success" && renderSuccessStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
