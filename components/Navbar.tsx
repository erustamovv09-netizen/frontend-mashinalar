"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input"; // AGAR Navbar components ichida bo'lsa, shunday yozing

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-red-600 p-2 rounded-lg">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-black italic uppercase tracking-tighter">
            AVTO<span className="text-red-600">BOZOR</span>
          </span>
        </Link>

        {/* QIDIRUV - NAVBAR MARKAZI (Siz ko'rsatgan qizil chiziq ichi) */}
        <div className="flex-1 max-w-md relative px-4 flex items-center">
          <span className="absolute left-8 text-zinc-400 z-10">🔍</span>
          <input 
            type="text"
            placeholder="Mashina qidirish..."
            className="w-full h-11 bg-zinc-50 border border-zinc-200 rounded-full pl-12 pr-4 outline-none focus:ring-1 focus:ring-red-500 text-sm transition-all"
          />
        </div>

        {/* LINKLAR VA TUGMA */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link href="/" className="font-bold uppercase text-[12px] hover:text-red-600 transition-colors hidden sm:block">
            Bosh sahifa
          </Link>
          <Link href="/admin">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-full px-6 h-11 shadow-lg shadow-red-100">
              E'lon berish +
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}