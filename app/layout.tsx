import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


<nav className="fixed top-0 w-full z-50 border-b bg-white/95 backdrop-blur-md shadow-sm">
  <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
    
    {/* Logotip qismi */}
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-red-600 text-white p-1.5 rounded-lg group-hover:bg-zinc-900 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
      </div>
      <span className="text-2xl font-black tracking-tighter uppercase italic">
        AVTO<span className="text-red-600">BOZOR</span>
      </span>
    </Link>

    {/* O'rta menyu - Kompyuter uchun */}
    <div className="hidden md:flex items-center gap-8">
      <Link href="/" className="text-[15px] font-bold text-zinc-600 hover:text-red-600 transition-colors">Bosh sahifa</Link>
      <Link href="/cars" className="text-[15px] font-bold text-zinc-600 hover:text-red-600 transition-colors">Mashinalar</Link>
      <Link href="#" className="text-[15px] font-bold text-zinc-600 hover:text-red-600 transition-colors">Biz haqimizda</Link>
    </div>

    {/* O'ng tomon tugmalari */}
    <div className="flex items-center gap-3">
      <Button variant="ghost" className="hidden sm:flex font-bold text-zinc-700">
        Kirish
      </Button>
      <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 shadow-lg shadow-red-200 transition-all active:scale-95">
        E'lon berish +
      </Button>
    </div>

  </div>
</nav>