import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERN Ticaret | Uygulama Pazarı",
  description: "Türkiye'nin en büyük uygulama pazarı. Profesyonel yazılımları keşfedin veya kendi uygulamalarınızı satışa sunun.",
  icons: {
    icon: "/ikon.png",
    apple: "/ikon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-[100svh] bg-[var(--background)]">
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
