import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER QISMI */}
      <section className="relative py-20 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083" 
            className="w-full h-full object-cover" 
            alt="Background" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded mb-4">
            Biz haqimizda
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
            AVTO<span className="text-red-600">BOZOR</span> SHAHRISABZ
          </h1>
          <p className="mt-6 text-zinc-600 max-w-2xl mx-auto text-lg font-medium">
            Bizning maqsadimiz — Shahrisabz ahliga eng sifatli va ishonchli avtomobillarni topishda ko'maklashish.
          </p>
        </div>
      </section>

      {/* MA'LUMOT QISMI */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900">
              LOYIHA <span className="text-red-600">MAQSADI</span>
            </h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              "AvtoBozor" — bu shunchaki e'lonlar sayti emas. Bu avtomobil ixlosmandlari uchun maxsus yaratilgan zamonaviy platforma. 
              Bizda siz har qanday turdagi avtomobillarni: Matizdan tortib premium Malibugacha topishingiz mumkin.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <h4 className="text-3xl font-black text-red-600">100+</h4>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Sotilgan avtolar</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-red-600">24/7</h4>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Qo'llab-quvvatlash</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070" 
              className="rounded-3xl shadow-2xl shadow-zinc-300 object-cover w-full h-[400px]" 
              alt="Car Detail" 
            />
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-8 rounded-3xl hidden md:block">
              <p className="font-black italic text-2xl uppercase tracking-tighter">Premium Sifat</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}