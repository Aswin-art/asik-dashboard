import { Metadata } from "next";
import { FavoritesClient } from "./_components/favorites-client";

export const metadata: Metadata = {
  title: "Favorit Saya - ASIK",
  description: "Daftar psikolog favorit Anda di ASIK - Platform Konsultasi Psikologi Online",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
