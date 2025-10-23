import { Metadata } from "next";
import { AppointmentsClient } from "./_components/appointments-client";

export const metadata: Metadata = {
  title: "Jadwal Konsultasi - ASIK",
  description: "Kelola jadwal dan riwayat konsultasi Anda di ASIK - Platform Konsultasi Psikologi Online",
};

export default function AppointmentsPage() {
  return <AppointmentsClient />;
}
