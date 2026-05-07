"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Search } from "lucide-react"; // Search ikonkasini ham qo'shdik

export default function PostCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv uchun yangi state

  const fetchCars = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/mahsulot/");
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (error) {
      console.error("Mashinalarni yuklashda xatolik:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Rostdan ham bu e'lonni butunlay o'chirib tashlamoqchimisiz?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/mahsulot/${id}/`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Mashina muvaffaqiyatli o'chirildi!");
        setCars(cars.filter((car) => car.id !== id)); 
        router.refresh(); 
      } else {
        alert("O'chirishda xatolik yuz berdi. Backendni tekshiring.");
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const carName = formData.get("name");
    const carPrice = formData.get("price");
    const ownerPhone = formData.get("owner_phone");

    try {
      const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        try {
          await fetch("/api/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carName, carPrice, ownerPhone }),
          });
        } catch (tgErr) {
          console.error("API ga yuborishda xatolik:", tgErr);
        }

        alert("E'lon muvaffaqiyatli qo'shildi!");
        formElement.reset(); 
        fetchCars(); 
        router.push("/cars");
        router.refresh();
      } else {
        alert("Xatolik yuz berdi. Barcha maydonlarni to'ldirganingizni tekshiring.");
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "w-full h-12 md:h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 outline-none transition-all text-xs md:text-sm font-bold focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 placeholder:text-zinc-400";

  // QIDIRUV MANTIQ: Faqat qidiruvga mos keladigan mashinalarni ajratib olamiz
  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* 1-QISM: MASHINA QO'SHISH FORMASI */}
        <div>
          <div className="mb-8 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">
              Admin <span className="text-red-600">Panel</span>
            </h1>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
              Yangi avtomobil qo'shish
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">

              <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-red-600 mb-4 md:mb-6 border-b pb-2">
                Texnik Ma'lumotlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
                <input name="name" required placeholder="Mashina nomi" className={inputClassName} />
                <input name="brand" required placeholder="Brend" className={inputClassName} />
                <input name="price" type="number" required placeholder="Narxi ($)" className={inputClassName} />
                <input name="year" type="number" required placeholder="Yili" className={inputClassName} />
                <input name="color" required placeholder="Rangi" className={inputClassName} />
                <input name="fuel_type" required placeholder="Yoqilg'i turi" className={inputClassName} />
                <input name="transmission" required placeholder="Uzatmalar qutisi" className={inputClassName} />
                <input name="engine_volume" required placeholder="Dvigatel hajmi" className={inputClassName} />
              </div>

              <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-red-600 mb-4 md:mb-6 border-b pb-2">
                Sotuvchi Kontaktlari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <input name="owner_phone" required defaultValue="+998901234567" className={inputClassName} />
                <input name="telegram_user" defaultValue="Rustamovv_E" className={inputClassName} />
                <input name="instagram_user" defaultValue="rustamovv.09" className={inputClassName} />
              </div>

              <div className="space-y-4 md:space-y-6">
                <textarea
                  name="description"
                  rows={4}
                  className={`${inputClassName} h-auto min-h-[100px] py-4 resize-none`}
                  placeholder="Mashina holati haqida batafsil..."
                />

                <div className="p-6 md:p-8 border-2 border-dashed border-zinc-200 rounded-[24px] bg-zinc-50 flex flex-col items-center gap-4 text-center overflow-hidden">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Mashina rasmini tanlang
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="w-full max-w-xs text-[10px] md:text-xs file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-zinc-900 file:text-white hover:file:bg-red-600 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 md:h-16 bg-zinc-900 hover:bg-red-600 text-white font-[900] uppercase tracking-[0.2em] rounded-[20px] md:rounded-[24px] shadow-xl transition-all active:scale-[0.98] mt-8 md:mt-10 disabled:opacity-50 text-[10px] md:text-xs"
              >
                {loading ? "YUBORILMOQDA..." : "E'LONNI TASDIQLASH"}
              </button>
            </div>
          </form>
        </div>

        {/* 2-QISM: MASHINALARNI BOSHQARISH (QIDIRUV BILAN) */}
        <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 mt-12">
          
          <div className="mb-6 border-b pb-4 flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-[900] italic uppercase tracking-tighter text-zinc-900">
              E'LONLARNI <span className="text-red-600">BOSHQARISH</span>
            </h2>
            <span className="bg-zinc-100 text-zinc-600 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full">
              Jami: {cars.length}
            </span>
          </div>

          {/* QIDIRUV MAYDONI (SEARCH) - Lupa mukammal joylashdi */}
          <div className="mb-6 relative flex items-center w-full">
            <Search className="absolute left-4 text-zinc-400 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="Mashina nomini yozib qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 md:h-14 bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 outline-none transition-all text-xs md:text-sm font-bold focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 placeholder:text-zinc-400"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Endi 'cars' o'rniga 'filteredCars' ni aylantiramiz */}
            {filteredCars.map((car) => (
              <div key={car.id} className="flex flex-col md:flex-row items-center justify-between p-3 md:p-4 bg-zinc-50 border border-zinc-100 rounded-2xl md:rounded-[20px] gap-4 transition-all hover:border-zinc-300">
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-zinc-100 shrink-0 shadow-sm">
                    <img 
                      src={car.image ? (car.image.startsWith('http') ? car.image : `http://127.0.0.1:8000${car.image}`) : '/placeholder.jpg'} 
                      alt={car.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-sm md:text-base uppercase italic text-zinc-900">{car.name}</h4>
                    <p className="text-xs font-bold text-green-600">{Number(car.price).toLocaleString()} $</p>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(car.id)}
                  className="w-full md:w-auto h-11 px-6 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-100 rounded-xl transition-all font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> O'chirish
                </button>
              </div>
            ))}

            {filteredCars.length === 0 && (
              <p className="text-center text-zinc-400 text-xs font-bold uppercase tracking-widest py-8">
                {searchQuery ? "Bunday mashina topilmadi" : "Hozircha e'lonlar yo'q"}
              </p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}