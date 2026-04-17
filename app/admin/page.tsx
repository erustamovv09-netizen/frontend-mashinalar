"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement); // Rasm yuklash uchun FormData shart!

    try {
      const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
        method: "POST",
        // DIQQAT: Multipart jo'natayotganda "Content-Type"ni o'zingiz yozmang! 
        // Brauzer avtomat boundary bilan o'zi qo'shib oladi.
        body: formData, 
      });

      if (res.ok) {
        alert("E'lon muvaffaqiyatli qo'shildi!");
        router.push("/cars");
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Backend xatosi:", errorData);
        alert("Xatolik yuz berdi. Ma'lumotlarni tekshiring.");
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">
            Yangi <span className="text-red-600">E'lon</span>
          </h1>
          <div className="h-1 w-20 bg-red-600 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* KONTEYNER */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* INPUT ELEMENTLARI */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mashina nomi</label>
                <input name="name" required placeholder="Tesla Model 3" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Brend</label>
                <input name="brand" required placeholder="Tesla" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Narxi ($)</label>
                <input name="price" type="number" required placeholder="45000" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Ishlab chiqarilgan yili</label>
                <input name="year" type="number" required placeholder="2024" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Rangi</label>
                <input name="color" required placeholder="Qora" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Yoqilg'i turi</label>
                <input name="fuel_type" required placeholder="Elektr / Benzin" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Uzatmalar qutisi</label>
                <input name="transmission" required placeholder="Avtomat" className="form-input" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Dvigatel hajmi</label>
                <input name="engine_volume" required placeholder="1.5 L / 0 (Elektr)" className="form-input" />
              </div>
            </div>

            {/* TAVSIF */}
            <div className="flex flex-col gap-2 mt-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Batafsil ma'lumot</label>
              <textarea 
                name="description" 
                rows={4} 
                className="form-input min-h-[120px] py-4 resize-none"
                placeholder="Mashina holati haqida qisqacha..."
              />
            </div>

            {/* FILE UPLOAD (Premium Style) */}
            <div className="mt-8">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 block mb-2">Mashina rasmini tanlang</label>
              <div className="relative group">
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="w-full h-14 bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl flex items-center px-4 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-zinc-900 file:text-white hover:border-red-500 transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* TUGMA */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-zinc-900 hover:bg-red-600 text-white font-[900] uppercase tracking-[0.2em] rounded-[24px] shadow-xl transition-all active:scale-[0.98] mt-10 disabled:opacity-50 text-xs"
            >
              {loading ? "YUBORILMOQDA..." : "E'LONNI JOYLASHTIRISH"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          height: 3rem;
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 1rem;
          padding: 0 1rem;
          outline: none;
          transition: all 0.3s;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .form-input:focus {
          background-color: white;
          border-color: #EF4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </main>
  );
}