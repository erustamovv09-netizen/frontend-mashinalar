"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* LINKLAR VA TUGMA */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold uppercase text-sm hover:text-red-600 transition-colors">
            Bosh sahifa
          </Link>
          <Link href="/cars" className="font-bold uppercase text-sm hover:text-red-600 transition-colors">
            Mashinalar
          </Link>
          
          {/* E'LON BERISH TUGMASI - Linkka o'ralgan */}
          <Link href="/admin">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-full px-6 shadow-lg shadow-red-200">
              E'lon berish +
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}