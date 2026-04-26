"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [latestCars, setLatestCars] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/mahsulot/")
      .then(res => res.json())
      .then(data => setLatestCars(data.slice(0, 3))) // Faqat oxirgi 3 tasini olamiz
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      
      {/* 1. HERO SECTION - Katta va jozibali qism */}
      <section className="relative h-[80vh] flex items-center px-6 lg:px-20 overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10">
          <div className="space-y-6">
            <span className="bg-red-600/10 text-red-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
              O'zbekistondagi №1 Avtobozor
            </span>
            <h1 className="text-6xl lg:text-8xl font-[1000] italic uppercase tracking-tighter leading-[0.9] text-zinc-900">
              ORZUYINGIZDAGI <br />
              <span className="text-red-600 italic">AVTO</span>NI TOPING
            </h1>
            <p className="text-zinc-500 max-w-md font-medium text-lg">
              Eng so'nggi modeldagi mashinalar, hamyonbop narxlar va ishonchli sotuvchilar bir joyda.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/cars">
                <button className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-red-600 transition-all shadow-xl active:scale-95">
                  Katalogga o'tish
                </button>
              </Link>
              <Link href="/admin">
                <button className="bg-white border-2 border-zinc-200 text-zinc-900 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:border-zinc-900 transition-all active:scale-95">
                  E'lon berish
                </button>
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Bu yerga chiroyli mashina rasmi qo'yiladi */}
            <img 
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" 
              alt="Hero Car" 
              className="w-full h-auto object-cover rounded-[40px] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700"
            />
          </div>
        </div>
        {/* Orqa fondagi katta tekst effekti */}
        <div className="absolute -bottom-20 -left-20 text-[20vw] font-black text-zinc-200/50 pointer-events-none uppercase italic leading-none select-none">
          DRIVE
        </div>
      </section>

      {/* 2. OXIRGI E'LONLAR SECTION */}
      <section className="py-24 px-6 lg:px-20 bg-white rounded-t-[60px] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] border-t-2 border-zinc-100">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-[950] italic uppercase tracking-tighter">
                Yangi <span className="text-red-600">E'lonlar</span>
              </h2>
              <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest mt-2">Siz uchun saralanganlari</p>
            </div>
            <Link href="/cars" className="text-[11px] font-black uppercase text-red-600 border-b-2 border-red-600 pb-1 hover:text-zinc-900 hover:border-zinc-900 transition-all">
              Barchasini ko'rish →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestCars.map((car: any) => (
              <div key={car.id} className="group bg-[#F8F9FA] rounded-[40px] border-[3px] border-zinc-200 overflow-hidden hover:border-red-600 transition-all duration-500 hover:shadow-2xl">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    {car.year}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{car.name}</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">{car.brand}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
                    <span className="text-2xl font-black text-red-600">{Number(car.price).toLocaleString()}$</span>
                    <Link href={`/cars/${car.id}`}>
                      <button className="bg-zinc-900 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all active:scale-90">
                        →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}