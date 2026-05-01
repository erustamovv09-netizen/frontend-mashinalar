import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer"; 
import Navbar from "@/components/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AVTOBOZOR | Premium",
  description: "Avtomobillar savdosi platformasi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={cn(inter.className, "antialiased bg-[#FAFAFA] text-zinc-900")}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}