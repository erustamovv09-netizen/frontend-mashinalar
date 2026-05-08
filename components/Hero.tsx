'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "PREMIUM AVTOMOBILLAR",
    subtitle: "YANGI MODELLAR 2025",
    description: "Shahrisabzdagi eng katta avtomobil savdosi platformasi.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070",
    link: "/cars",
    btnText: "Katalogni ko'rish"
  },
  {
    id: 2,
    title: "TEZKOR VA ISHONCHLI",
    subtitle: "E'LONLAR BO'LIMI",
    description: "O'z avtomobilingizni soting yoki yangisini qidiring.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083",
    link: "/admin",
    btnText: "E'lon berish +"
  },
  {
    id: 3,
    title: "BIZ BILAN BOG'LANISH",
    subtitle: "24/7 QO'LLAB-QUVVATLASH",
    description: "Savollaringiz bormi? Mutaxassislarimiz yordamga tayyor.",
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=2036&auto=format&fit=crop",
    link: "#footer", // Agar sahifada footer bo'lsa id="footer" ga tushadi
    btnText: "Bog'lanish"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Telefon uchun balandlik biroz qisqartirildi (h-[450px]), kompyuter uchun (md:h-[600px] lg:h-[700px])
    <section className="relative w-full h-[450px] md:h-[600px] lg:h-[700px] bg-zinc-100 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >

          <div className="absolute inset-0">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            {/* Telefon uchun gradient biroz kuchaytirildi, shunda matn o'qilishi oson bo'ladi */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:from-white md:via-white/80 md:to-transparent" />
          </div>

          <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center items-start">
            <div className="max-w-2xl space-y-4 md:space-y-5">
              <span className="inline-block px-2 md:px-3 py-1 bg-red-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                {slide.subtitle}
              </span>

              {/* Sarlavha hajmi barcha qurilmalar uchun moslashtirildi */}
              <h1 className="text-[32px] leading-[1.1] sm:text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter text-zinc-900">
                {slide.title}
              </h1>
              
              <p className="text-zinc-600 text-xs sm:text-sm md:text-lg font-medium max-w-[280px] md:max-w-md">
                {slide.description}
              </p>

              <div className="pt-2 md:pt-4">
                {/* <a> o'rniga <Link> ishlatildi, shunda sayt qotmay, silliq o'tadi */}
                <Link
                  href={slide.link}
                  className="inline-block bg-zinc-900 hover:bg-red-600 text-white font-black uppercase px-6 py-3.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 active:scale-95 text-[10px] md:text-xs tracking-widest shadow-xl"
                >
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slayd indikatorlari */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? "w-6 md:w-8 bg-red-600" : "w-1.5 md:w-2 bg-zinc-300 hover:bg-zinc-400"}`}
          />
        ))}
      </div>
    </section>
  );
}