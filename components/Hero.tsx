// app/components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';

const heroSlides = [
  {
    id: 1,
    title: "Luxury avtomobillar",
    subtitle: "Eng yangi 2025 modellari",
    description: "Premium klassdagi avtomobillarni eng qulay narxlarda xarid qiling",
    image: "https://images.unsplash.com/photo-1533473359331-fd322b6e0de0?w=1200",
    cta: "Batafsil",
  },
  {
    id: 2,
    title: "Sport avtomobillar",
    subtitle: "Tezlik va quvvat",
    description: "Eng tez sport avtomobillari bilan tanishing",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200",
    cta: "Ko'rish",
  },
  {
    id: 3,
    title: "Elektromobillar",
    subtitle: "Kelajak texnologiyasi",
    description: "Ekologik toza va tejamkor elektromobillar",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200",
    cta: "Tanlash",
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const current = heroSlides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image - CSS bilan */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url(${current.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-red-600 rounded-full mb-6">
              <span className="text-white text-sm font-semibold tracking-wide">
                2025 ENG YANGI MODELLAR
              </span>
            </div>

            {/* Subtitle */}
            <h3 className="text-red-500 text-xl md:text-2xl font-semibold mb-3">
              {current.subtitle}
            </h3>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              {current.title}
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-base md:text-lg lg:text-xl mb-8 max-w-2xl">
              {current.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-all hover:scale-105">
                {current.cta}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all">
                Test Drive
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">50+</p>
                <p className="text-gray-300 text-sm">Avtomobil modellari</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">1000+</p>
                <p className="text-gray-300 text-sm">Mijozlar</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
                <p className="text-gray-300 text-sm">Texnik yordam</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-2 bg-red-600 rounded-full'
                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}