"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "PREMIUM AVTOMOBILLAR",
    subtitle: "Orzuingizdagi mashinani biz bilan toping",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
    button: "Katalogni ko'rish",
    color: "from-black/70 to-transparent"
  },
  {
    id: 2,
    title: "TEZKOR VA ISHONCHLI",
    subtitle: "Barcha turdagi e'lonlar va tekshirilgan avtolar",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop",
    button: "E'lon berish",
    color: "from-red-900/40 to-black/60"
  },
  {
    id: 3,
    title: "SHAHRISABZ AVTO BOZOR",
    subtitle: "Viloyatdagi eng katta avtomobil platformasi",
    image: "https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=2036&auto=format&fit=crop",
    button: "Biz haqimizda",
    color: "from-zinc-900/70 to-zinc-900/30"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-zinc-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] scale-110"
            style={{ backgroundImage: `url(${slide.image})`, transform: index === current ? 'scale(1)' : 'scale(1.1)' }}
          />
          
          {/* Overlay - Sening dizayningga mos gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />

          {/* Content */}
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-start">
            <div className="max-w-2xl space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] animate-bounce">
                Yangi imkoniyatlar
              </span>
              <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                {slide.title.split(' ')[0]} <br />
                <span className="text-red-600">{slide.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-zinc-300 text-sm md:text-xl font-medium max-w-lg">
                {slide.subtitle}
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/cars">
                  <button className="bg-white hover:bg-red-600 hover:text-white text-black font-black uppercase px-8 py-4 rounded-2xl transition-all duration-300 transform active:scale-95 text-xs md:text-sm tracking-widest shadow-2xl">
                    {slide.button}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots - Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              current === i ? "w-10 bg-red-600" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}