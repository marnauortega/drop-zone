"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Drop zone",
  description: "Drop zone for Fundación Esplai Hackathon",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
