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
    link: "footer",
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
    <section className="relative w-full h-[500px] md:h-[600px] bg-zinc-100 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >

          <div className="absolute inset-0">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
            <div className="max-w-2xl space-y-5">
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded">
                {slide.subtitle}
              </span>

              <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none text-zinc-900">
                {slide.title}
              </h1>
              <p className="text-zinc-600 text-sm md:text-lg font-medium max-w-md">{slide.description}</p>

              <div className="pt-4">
                <a 
                  href={slide.link}
                  className="inline-block bg-zinc-900 hover:bg-red-600 text-white font-black uppercase px-8 py-4 rounded-2xl transition-all duration-300 active:scale-95 text-xs tracking-widest shadow-xl"
                >
                  {slide.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)} 
            className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? "w-8 bg-red-600" : "w-2 bg-zinc-300"}`} 
          />
        ))}
      </div>
    </section>
  );
}