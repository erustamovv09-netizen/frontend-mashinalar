"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, HeartCrack } from "lucide-react";

export default function FavoritesPage() {
  const [favoriteCars, setFavoriteCars] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Xotiradan ID larni o'qib olish
    const savedFavs = localStorage.getItem("avtobozor_favorites");
    const favIds = savedFavs ? JSON.parse(savedFavs) : [];
    setFavorites(favIds);

    // 2. Barcha mashinalarni olib kelib, faqat tanlanganlarini ajratib olish
    const fetchCars = async () => {
      try {
        const res = await fetch("https://avtobozor.onrender.com/mahsulot/");
        if (res.ok) {
          const data = await res.json();
          // Faqat ID si xotirada borlarini qoldiramiz
          const filtered = data.filter((car: any) => favIds.includes(car.id));
          setFavoriteCars(filtered);
        }
      } catch (error) {
        console.error("Yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Yurakchani olib tashlash (Ro'yxatdan o'chirish)
  const removeFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const newFavs = favorites.filter((favId) => favId !== id);
    
    setFavorites(newFavs);
    setFavoriteCars(favoriteCars.filter((car) => car.id !== id));
    localStorage.setItem("avtobozor_favorites", JSON.stringify(newFavs));
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black uppercase italic mb-8 border-l-4 border-red-600 pl-3 md:pl-4 flex items-center gap-3">
          Saqlangan <span className="text-red-600">Mashinalar</span>
          <Heart className="w-6 h-6 md:w-8 md:h-8 fill-red-500 text-red-500 animate-pulse" />
        </h1>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-zinc-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Yuklanmoqda...</p>
          </div>
        ) : favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {favoriteCars.map((item: any) => (
              <div key={item.id} className="relative bg-white border border-zinc-200 rounded-2xl md:rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                
                {/* O'chirish tugmasi */}
                <button
                  onClick={(e) => removeFavorite(e, item.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>

                <div className="relative h-48 md:h-52 overflow-hidden bg-zinc-100 shrink-0">
                  <img
                    src={item.image ? (item.image.startsWith('http') ? item.image : `https://avtobozor.onrender.com${item.image}`) : '/placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-grow">
                  <Link href={`/cars/${item.id}`}>
                    <h2 className="text-base md:text-lg font-black italic text-zinc-900 hover:text-red-600 transition-colors line-clamp-1">
                      {item.name}
                    </h2>
                  </Link>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl md:text-2xl font-black text-zinc-900 tracking-tighter">
                      {Number(item.price).toLocaleString()} <span className="text-lg md:text-xl text-red-600">$</span>
                    </span>
                  </div>

                  <Link href={`/cars/${item.id}`} className="block mt-4 md:mt-5 mt-auto">
                    <button className="w-full py-2.5 md:py-3 bg-zinc-900 hover:bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-md">
                      Batafsil ko'rish
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[24px] border border-zinc-100 shadow-sm flex flex-col items-center">
            <HeartCrack className="w-16 h-16 text-zinc-200 mb-4" />
            <h2 className="text-lg font-black text-zinc-900 uppercase tracking-wide mb-2">
              Sevimli mashinalaringiz yo'q
            </h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-sm">
              Katalogni ko'zdan kechiring va o'zingizga yoqqan mashinalardagi yurakchani bosing
            </p>
            <Link href="/cars">
              <button className="px-6 py-3 bg-red-600 hover:bg-zinc-900 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-md">
                Katalogga o'tish
              </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}