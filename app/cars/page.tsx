"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Boshqa sahifaga o'tish uchun

export default function CarsPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // DJANGO'DAN BARCHA MASHINALARNI OLIB KELAMIZ
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/mahsulot/");
        if (res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // YUKLANAYOTGAN PAYTDA CHIQADIGAN ANIMATSIYA
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F8F9FA]">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Sarlavha qismi */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-[900] italic uppercase tracking-tighter text-zinc-900">
            BARCHA <span className="text-red-600">AVTOMOBILLAR</span>
          </h1>
          <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3">
            O'zingizga mos mashinani tanlang
          </p>
        </div>

        {/* Mashinalar ro'yxati */}
        {cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">
              Hozircha e'lonlar yo'q
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {cars.map((car) => (
              <div 
                key={car.id} 
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col border border-zinc-100"
              >
                
                {/* 1. Rasm qismi */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-zinc-100">
                  <img
                    src={car.image ? (car.image.startsWith('http') ? car.image : `http://127.0.0.1:8000${car.image}`) : '/placeholder.jpg'}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Yili (Rasm ustida) */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-zinc-900 shadow-sm">
                    {car.year} YIL
                  </div>
                </div>

                {/* 2. Ma'lumot qismi */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-black uppercase italic text-zinc-900 mb-1">{car.name}</h3>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-4">{car.brand}</p>
                  
                  {/* Narxi va Batafsil tugmasi */}
                  <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-lg md:text-xl font-black text-green-600">
                      {Number(car.price).toLocaleString()} $
                    </span>
                    
                    {/* Link orqali mashina sahifasiga o'tamiz */}
                    <Link 
                      href={`/cars/${car.id}`}
                      className="bg-zinc-900 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors shadow-md active:scale-95"
                    >
                      Batafsil
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}