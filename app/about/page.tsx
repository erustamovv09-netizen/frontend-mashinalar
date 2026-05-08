import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER QISMI */}
      <section className="relative py-16 md:py-24 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 md:opacity-20">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="inline-block px-2 md:px-3 py-1 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded shadow-md mb-3 md:mb-4">
            Biz haqimizda
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight">
            AVTO<span className="text-red-600">BOZOR</span> SHAHRISABZ
          </h1>
          {/* RANG TO'G'IRLANDI: text-zinc-100 o'rniga text-white qo'yildi */}
          <p className="mt-6 md:mt-8 text-white bg-black/40 backdrop-blur-md inline-block px-6 py-3.5 rounded-2xl max-w-[90%] md:max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed shadow-2xl">
  Bizning maqsadimiz — Shahrisabz ahliga eng sifatli va ishonchli avtomobillarni topishda ko'maklashish.
</p>
        </div>
      </section>

      {/* MA'LUMOT QISMI */}
      <section className="py-12 md:py-24 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Matnlar qismi */}
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-[28px] md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              LOYIHA <span className="text-red-600">MAQSADI</span>
            </h2>
            <p className="text-zinc-600 leading-relaxed text-sm md:text-lg font-medium">
              "AvtoBozor" — bu shunchaki e'lonlar sayti emas. Bu avtomobil ixlosmandlari uchun maxsus yaratilgan zamonaviy platforma.
              Bizda siz har qanday turdagi avtomobillarni: Matizdan tortib premium Malibugacha topishingiz mumkin.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-6 border-t border-zinc-100">
              <div>
                <h4 className="text-2xl md:text-3xl font-black text-red-600">100+</h4>
                <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-widest mt-1">Sotilgan avtolar</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-3xl font-black text-red-600">24/7</h4>
                <p className="text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-widest mt-1">Qo'llab-quvvatlash</p>
              </div>
            </div>
          </div>

          {/* Rasm qismi */}
          <div className="relative mt-4 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070"
              className="rounded-2xl md:rounded-3xl shadow-xl shadow-zinc-200 object-cover w-full h-[250px] sm:h-[300px] md:h-[400px]"
              alt="Car Detail"
            />
            {/* Qizil blok endi telefonda ham ko'rinadi, faqat ixchamroq */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-red-600 text-white p-4 md:p-8 rounded-xl md:rounded-3xl shadow-lg">
              <p className="font-black italic text-sm md:text-2xl uppercase tracking-tighter">Premium Sifat</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}