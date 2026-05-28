"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

export default function CarsPage() {
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtr uchun holatlar (State)
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");

  // Backenddan barcha mashinalarni olib kelish
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("https://avtobozor.onrender.com/mahsulot/");
        if (res.ok) {
          const data = await res.json();
          setAllData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Mashinalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // FILTRATSIYA MANTIG'I
  useEffect(() => {
    let result = allData;

    // 1. Qidiruv bo'yicha (Nomi yoki Brendi)
    if (searchQuery) {
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (car.brand && car.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 2. Narx bo'yicha
    if (minPrice) {
      result = result.filter((car) => Number(car.price) >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((car) => Number(car.price) <= Number(maxPrice));
    }

    // 3. Yoqilg'i turi bo'yicha
    if (fuelType) {
      result = result.filter(
        (car) =>
          car.fuel_type &&
          car.fuel_type.toLowerCase() === fuelType.toLowerCase()
      );
    }

    // 4. Uzatmalar qutisi bo'yicha
    if (transmission) {
      result = result.filter(
        (car) =>
          car.transmission &&
          car.transmission.toLowerCase() === transmission.toLowerCase()
      );
    }

    setFilteredData(result);
  }, [searchQuery, minPrice, maxPrice, fuelType, transmission, allData]);

  const inputClass = "w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-xs font-bold focus:bg-white focus:border-red-500 outline-none transition-all placeholder:text-zinc-400";

  return (
    <main className="min-h-screen bg-zinc-50 py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black uppercase italic mb-6 md:mb-8 border-l-4 border-red-600 pl-3 md:pl-4">
          Barcha <span className="text-red-600">Mashinalar</span>
        </h1>

        {/* ================= FILTR QISMI ================= */}
        <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-zinc-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <SlidersHorizontal className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
              Kengaytirilgan Qidiruv
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Mashina nomi bo'yicha */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Mashina nomini yozing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>

            {/* Narx oralig'i */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Narx: dan ($)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={inputClass}
              />
              <input
                type="number"
                placeholder="Narx: gacha ($)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Yoqilg'i turi */}
            <div>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="">Yoqilg'i: Barchasi</option>
                <option value="Benzin">Benzin</option>
                <option value="Gaz">Gaz</option>
                <option value="Elektro">Elektro</option>
                <option value="Gibrid">Gibrid</option>
              </select>
            </div>

            {/* Uzatmalar qutisi */}
            <div>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="">Karobka: Barchasi</option>
                <option value="Avtomat">Avtomat</option>
                <option value="Mexanika">Mexanika</option>
              </select>
            </div>
          </div>
        </div>
        {/* ================= FILTR TUGADI ================= */}

        {/* Natijalar sonini ko'rsatish */}
        {!loading && (
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6 text-right">
            Topildi: <span className="text-zinc-900">{filteredData.length}</span> ta e'lon
          </p>
        )}

        {/* ================= MASHINALAR RO'YXATI ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-8 h-8 border-4 border-zinc-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Yuklanmoqda...</p>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item: any) => (
              <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl md:rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
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

                  {/* Kichik teglarda yoqilg'i va karobkani ko'rsatamiz */}
                  <div className="flex gap-2 mt-3">
                    <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                      {item.fuel_type || "Noma'lum"}
                    </span>
                    <span className="bg-zinc-100 text-zinc-600 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                      {item.transmission || "Noma'lum"}
                    </span>
                  </div>

                  <Link href={`/cars/${item.id}`} className="block mt-4 md:mt-5 mt-auto">
                    <button className="w-full py-2.5 md:py-3 bg-zinc-900 hover:bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-md">
                      Batafsil ko'rish
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[24px] border border-zinc-100">
              <p className="text-zinc-400 font-black italic uppercase text-sm tracking-widest">Bunday parametrdagi mashina topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}