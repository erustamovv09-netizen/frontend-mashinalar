// app/components/Partners.tsx
'use client';

import React from 'react';

// Brendlarni ob'ekt ko'rinishiga o'tkazdik
const partners = [
  { name: "NVIDIA", url: "https://www.nvidia.com" },
  { name: "APPLE", url: "https://www.apple.com" },
  { name: "SAMSUNG", url: "https://www.samsung.com" },
  { name: "TESLA", url: "https://www.tesla.com" },
  { name: "MICROSOFT", url: "https://www.microsoft.com" },
  { name: "GOOGLE", url: "https://www.google.com" },
  { name: "AMAZON", url: "https://www.amazon.com" },
  { name: "META", url: "https://about.meta.com" },
  { name: "BMW", url: "https://www.bmw.com" },
  { name: "BYD", url: "https://www.byd.com" },
  { name: "INTEL", url: "https://www.intel.com" },
  { name: "TOYOTA", url: "https://www.toyota.com" },
  { name: "HONDA", url: "https://www.honda.com" },
  { name: "HYUNDAI", url: "https://www.hyundai.com" },
  { name: "KIA", url: "https://www.kia.com" },
  { name: "CHEVROLET", url: "https://www.chevrolet.com" },
  { name: "MERCEDES", url: "https://www.mercedes-benz.com" },
  { name: "AUDI", url: "https://www.audi.com" },
  { name: "SONY", url: "https://www.sony.com" },
  { name: "LG", url: "https://www.lg.com" },
  { name: "XIAOMI", url: "https://www.mi.com" },
  { name: "HUAWEI", url: "https://www.huawei.com" },
  { name: "ADOBE", url: "https://www.adobe.com" },
  { name: "ORACLE", url: "https://www.oracle.com" },
  { name: "NETFLIX", url: "https://www.netflix.com" },
  { name: "DISNEY", url: "https://www.disney.com" },
  { name: "ALIEXPRESS", url: "https://www.aliexpress.com" },
  { name: "UBER", url: "https://www.uber.com" },
  { name: "SPACEX", url: "https://www.spacex.com" }
];

export default function Partners() {
  // Qaytariluvchi qismni alohida render funksiyasiga oldik
  const renderPartners = (isClone = false) => (
    <div className="flex items-center gap-8 sm:gap-12 md:gap-16" aria-hidden={isClone}>
      {partners.map((partner, index) => (
        <div key={isClone ? `clone-${index}` : index} className="flex items-center justify-center h-[72px]">
          <a 
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-zinc-500 hover:text-red-600 transition-all duration-300 cursor-pointer tracking-tighter italic hover:scale-110 inline-block decoration-transparent"
          >
            {partner.name}
          </a>
        </div>
      ))}
    </div>
  );

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
          {renderPartners(false)}
          {renderPartners(true)}
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
          animation: infinite-scroll 35s linear infinite;
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 640px) {
          .animate-infinite-scroll {
            animation-duration: 25s;
          }
        }
      `}</style>
    </div>
  );
}