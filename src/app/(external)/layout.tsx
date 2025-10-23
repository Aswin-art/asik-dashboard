import { Navbar } from "@/components/navbar";
import { BottomNav } from "@/components/bottom-nav";
import { ReactNode } from "react";

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
