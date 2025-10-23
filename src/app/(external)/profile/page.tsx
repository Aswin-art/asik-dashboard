import { Metadata } from "next";
import { ProfileClient } from "./_components/profile-client";

export const metadata: Metadata = {
  title: "Profil Saya - ASIK",
  description: "Kelola profil dan informasi akun Anda di ASIK - Platform Konsultasi Psikologi Online",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
