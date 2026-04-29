"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Sahifa refresh bo'lishini to'xtatadi
    
    const term = searchQuery.trim();
    if (term) {
      // Qidiruv so'zi bo'lsa, URL-ni o'zgartiramiz
      router.push(`/cars?search=${encodeURIComponent(term)}`);
    } else {
      // Bo'sh bo'lsa barcha mashinalarga
      router.push("/cars");
    }
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-red-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-black italic uppercase tracking-tighter">
            AVTO<span className="text-red-600">BOZOR</span>
          </span>
        </Link>

        {/* QIDIRUV FORM - Enter ishlashi uchun Button qo'shildi */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative px-4 flex items-center group">
          <span className="absolute left-8 text-zinc-400 z-10 group-focus-within:text-red-600 transition-colors">🔍</span>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mashina qidirish..."
            className="w-full h-11 bg-zinc-50 border border-zinc-200 rounded-full pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm transition-all font-medium"
          />
          {/* BU TUGMA ENTER ISHLASHI UCHUN SHART (Lekin ko'rinmaydi) */}
          <button type="submit" className="hidden">Qidirish</button>
        </form>

        {/* LINKLAR */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link href="/" className="font-bold uppercase text-[12px] hover:text-red-600 transition-colors hidden sm:block">
            Bosh sahifa
          </Link>
          <Link href="/cars" className="font-bold uppercase text-[12px] hover:text-red-600 transition-colors hidden sm:block">
            Mashinalar
          </Link>
          <Link href="/admin">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-full px-6 h-11 shadow-lg active:scale-95 transition-all">
              E'lon berish +
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}