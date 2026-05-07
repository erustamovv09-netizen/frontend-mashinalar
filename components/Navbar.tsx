"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchQuery.trim();
    if (term) {
      router.push(`/cars?search=${encodeURIComponent(term)}`);
      setIsMobileMenuOpen(false);
    } else {
      router.push("/cars");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-200 shadow-sm transition-all">
      {/* 1-QATOR: LOGO VA BURGER (Hamma ekranda ko'rinadi) */}
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="bg-red-600 p-1.5 md:p-2 rounded-xl shadow-lg shadow-red-200 group-hover:rotate-6 transition-transform duration-300">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 md:w-7 md:h-7 text-white" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" />
            </svg>
          </div>
          <span className="text-xl md:text-2xl font-black italic uppercase tracking-tighter">
            AVTO<span className="text-red-600">BOZOR</span>
          </span>
        </Link>

        {/* DESKTOP QIDIRUV (Faqat kompyuterda ko'rinadi) */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <div className="relative flex items-center w-full">
            <span className="absolute left-4 text-zinc-400 z-10">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Qidiruv..."
              className="w-full h-11 bg-zinc-100 border border-transparent rounded-full pl-12 pr-4 outline-none transition-all text-sm font-bold italic focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
          </div>
        </form>

        {/* DESKTOP MENYU (Faqat kompyuterda ko'rinadi) */}
        <div className="hidden md:flex items-center gap-8 shrink-0">
          <Link href="/" className="text-[11px] font-black uppercase tracking-widest hover:text-red-600 transition-colors">Bosh sahifa</Link>
          <Link href="/cars" className="text-[11px] font-black uppercase tracking-widest hover:text-red-600 transition-colors">Mashinalar</Link>
          <Link href="/admin">
            <button className="bg-zinc-900 hover:bg-red-600 text-white font-bold uppercase rounded-xl px-6 h-11 transition-all active:scale-95 shadow-xl shadow-zinc-200 text-[11px] tracking-wider">
              E'lon berish +
            </button>
          </Link>
        </div>

        {/* BURGER TUGMA (Faqat telefonda ko'rinadi) */}
        <button
          className="md:hidden p-2 text-zinc-900 focus:outline-none bg-zinc-50 rounded-lg active:bg-zinc-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* 2-QATOR: MOBIL QIDIRUV (Telefonda doim ko'rinib turadi) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
          <span className="absolute left-4 text-zinc-400 z-10 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Mashina qidiring..."
            className="w-full h-10 bg-zinc-100 border border-transparent rounded-xl pl-10 pr-4 outline-none transition-all text-xs font-bold italic focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          />
        </form>
      </div>

      {/* MOBIL MENYU (Faqat tugma bosilganda ochiladi, juda ixcham va nafis) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-xl px-4 py-4 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest p-3 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
            Bosh sahifa
          </Link>
          <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-black uppercase tracking-widest p-3 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
            Mashinalar
          </Link>
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
            <button className="w-full bg-zinc-900 hover:bg-red-600 text-white font-bold uppercase rounded-xl px-6 h-11 transition-all active:scale-95 shadow-lg shadow-zinc-200 text-[11px] tracking-wider">
              E'lon berish +
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}