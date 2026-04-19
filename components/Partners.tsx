// app/components/Partners.tsx
'use client';

import React from 'react';

const partners = [
  "NVIDIA", "APPLE", "SAMSUNG", "TESLA", "MICROSOFT", "GOOGLE", "AMAZON", "META", 
  "BMW", "BYD", "INTEL", "TOYOTA", "HONDA", "HYUNDAI", "KIA", "CHEVROLET", 
  "MERCEDES", "AUDI", "SONY", "LG", "XIAOMI", "HUAWEI", "ADOBE", "ORACLE", 
  "NETFLIX", "DISNEY", "ALIEXPRESS", "UBER", "SPACE X"
];

export default function Partners() {
  return (
    <div className="w-full bg-white border-y border-zinc-100 py-6 overflow-hidden">
      {/* Sarlavha */}
      <div className="container mx-auto px-6 mb-6">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">
          Rasmiy hamkorlar va brendlar
        </h2>
      </div>

      {/* Lenta */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Chap va o'ng gradient effektlar */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div 
          className="flex animate-infinite-scroll whitespace-nowrap"
          style={{ width: 'fit-content' }}
        >
          {/* Asosiy ro'yxat */}
          <div className="flex items-center gap-8 sm:gap-12 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-[72px]">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-zinc-500 hover:text-red-600 transition-all duration-300 cursor-default tracking-tighter italic hover:scale-110 inline-block">
                  {partner}
                </span>
              </div>
            ))}
          </div>
          
          {/* Klon - uzilmasligi uchun */}
          <div className="flex items-center gap-8 sm:gap-12 md:gap-16" aria-hidden="true">
            {partners.map((partner, index) => (
              <div key={`clone-${index}`} className="flex items-center justify-center h-[72px]">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-zinc-500 hover:text-red-600 transition-all duration-300 cursor-default tracking-tighter italic hover:scale-110 inline-block">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animatsiya */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
        
        /* Responsive tezlik */
        @media (max-width: 640px) {
          .animate-infinite-scroll {
            animation-duration: 20s;
          }
        }
        
        @media (min-width: 1024px) {
          .animate-infinite-scroll {
            animation-duration: 35s;
          }
        }
      `}</style>
    </div>
  );
}