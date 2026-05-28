"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function CarsPage() {
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtr uchun holatlar
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  
  // TARTIBLASH (Sorting) uchun yangi holat
  const [sortBy, setSortBy] = useState("newest");

  // Backenddan ma'lumot olish
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

  // FILTRATSIYA VA TARTIBLASH MANTIG'I
  useEffect(() => {
    let result = [...allData];

    // 1. Qidiruv
    if (searchQuery) {
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (car.brand && car.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 2. Narx
    if (minPrice) result = result.filter((car) => Number(car.price) >= Number(minPrice));
    if (maxPrice) result = result.filter((car) => Number(car.price) <= Number(maxPrice));

    // 3. Yoqilg'i
    if (fuelType) result = result.filter((car) => car.fuel_type?.toLowerCase() === fuelType.toLowerCase());

    // 4. Karobka
    if (transmission) result = result.filter((car) => car.transmission?.toLowerCase() === transmission.toLowerCase());

    // 5. TARTIBLASH (Sorting)
    if (sortBy === "cheap") {
      result.sort((a, b) => Number(a.price) - Number(b.price)); // Arzonlari oldin
    } else if (sortBy === "expensive") {
      result.sort((a, b) => Number(b.price) - Number(a.price)); // Qimmatlari oldin
    } else {
      result.sort((a, b) => b.id - a.id); // Eng yangilari oldin (ID kattasi)
    }

    setFilteredData(result);
  }, [searchQuery, minPrice, maxPrice, fuelType, transmission, sortBy, allData]);

  const inputClass = "w-full h-12 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-sm font-bold focus:bg-white focus:border-red-500 outline-none transition-all placeholder:text-zinc-400";

  return (
    <main className="min-h-screen bg-zinc-50 py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black uppercase italic mb-6 border-l-4 border-red-600 pl-3 md:pl-4">
          Barcha <span className="text-red-600">Mashinalar</span>
        </h1>

        {/* ================= FILTR QISMI ================= */}
        <div className="bg-white p-6 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-zinc-100 mb-6">
          <div className="flex items-center gap-3 mb-5 border-b border-zinc-100 pb-4">
            <SlidersHorizontal className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900">
              Kengaytirilgan Qidiruv
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Mashina nomi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>

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

            <div>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                <option value="">Yoqilg'i: Barchasi</option>
                <option value="Benzin">Benzin</option>
                <option value="Gaz">Gaz</option>
                <option value="Elektro">Elektro</option>
                <option value="Gibrid">Gibrid</option>
              </select>
            </div>

            <div>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                <option value="">Karobka: Barchasi</option>
                <option value="Avtomat">Avtomat</option>
                <option value="Mexanika">Mexanika</option>
              </select>
            </div>
          </div>
        </div>
        {/* ================= FILTR TUGADI ================= */}

        {/* ================= TARTIBLASH VA QIDIRUV NATIJASI ================= */}
        {!loading && (
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-zinc-100 mb-6 gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Topildi: <span className="text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md">{filteredData.length}</span> ta e'lon
            </p>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-zinc-400 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto h-10 bg-zinc-50 border border-zinc-200 rounded-xl px-4 text-xs font-black uppercase tracking-widest focus:bg-white focus:border-red-500 outline-none transition-all cursor-pointer text-zinc-700"
              >
                <option value="newest">Eng yangilari oldin</option>
                <option value="cheap">Arzonlari oldin</option>
                <option value="expensive">Qimmatlari oldin</option>
              </select>
            </div>
          </div>
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
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-md">
                    Sotuvda
                  </div>
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
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-[24px] border border-zinc-100 shadow-sm">
              <p className="text-zinc-400 font-black italic uppercase text-sm tracking-widest">Bunday parametrdagi mashina topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}