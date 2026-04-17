import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AVTOBOZOR | Premium",
  description: "Avtomobillar savdosi platformasi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={cn(inter.className, "antialiased bg-[#FAFAFA] text-zinc-900")}>

        {/* --- NAVBAR --- */}
        <nav className="border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 h-20 flex items-center">
          <div className="container mx-auto px-6 flex items-center justify-between gap-8 w-full">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-200 group-hover:rotate-6 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter">
                AVTO<span className="text-red-600">BOZOR</span>
              </span>
            </Link>

            {/* --- QIDIRUV (FAQAT SHU QISMNI ALMASHTIRING) --- */}
            <div className="flex-1 max-w-md mx-6 relative">
              <div className="relative flex items-center">
                {/* Ikonkani matndan mutlaqo ajratib, chapga qotiramiz */}
                <span className="absolute left-4 text-zinc-400 z-10 select-none pointer-events-none">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Qidiruv..."
                  className="w-full h-11 bg-zinc-100 border border-transparent rounded-full pl-12 pr-4 
                 outline-none transition-all text-sm
                 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            {/* NAV LINKS */}
            <div className="flex items-center gap-8 flex-shrink-0">
              <Link href="/" className="text-[11px] font-black uppercase tracking-widest hover:text-red-600 transition-colors">Bosh sahifa</Link>
              <Link href="/cars" className="text-[11px] font-black uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1">Mashinalar</Link>
              <Link href="/admin">
                <button className="bg-zinc-900 hover:bg-red-600 text-white font-bold uppercase rounded-xl px-6 h-11 transition-all active:scale-95 shadow-xl shadow-zinc-200 text-[11px] tracking-wider">
                  E'lon berish +
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}