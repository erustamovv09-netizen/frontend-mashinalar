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
    const formData = new FormData(formElement);

    // Telegram uchun ma'lumotlarni olamiz
    const carName = formData.get("name");
    const carPrice = formData.get("price");
    const ownerPhone = formData.get("owner_phone");

    try {
      // 1. DJANGO BAZASIGA YUBORISH (Fayl bilan birga)
      const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
        method: "POST",
        body: formData, // FormData rasm faylini avtomatik o'zi bilan olib ketadi
      });

      if (res.ok) {
        // 2. TELEGRAM BOTGA XABAR YUBORISH
        const botToken = "8716193054:AAFoaX8zIEhjZaluaRaaPnIdXHOOfhivCjw";
        const chatId = "8273165378"; 
        
        const telegramMessage = `
🚀 **YANGI E'LON QO'SHILDI!**

🚗 **Mashina:** ${carName}
💰 **Narxi:** ${carPrice} $
📞 **Tel:** ${ownerPhone}
✅ E'lon muvaffaqiyatli saytga joylandi va rasm bazaga yuklandi.
        `;

        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage,
              parse_mode: "Markdown",
            }),
          });
        } catch (tgErr) {
          console.error("Telegramga yuborishda xatolik:", tgErr);
        }

        alert("E'lon muvaffaqiyatli qo'shildi va Telegramga xabar yuborildi!");
        router.push("/cars");
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Backend xatosi:", errorData);
        alert("Xatolik yuz berdi. Barcha maydonlarni to'ldirganingizni tekshiring.");
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">
            Admin <span className="text-red-600">Panel</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">Yangi avtomobil qo'shish</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
            
            <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6 border-b pb-2">Texnik Ma'lumotlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <input name="name" required placeholder="Mashina nomi" className="form-input" />
              <input name="brand" required placeholder="Brend" className="form-input" />
              <input name="price" type="number" required placeholder="Narxi ($)" className="form-input" />
              <input name="year" type="number" required placeholder="Yili" className="form-input" />
              <input name="color" required placeholder="Rangi" className="form-input" />
              <input name="fuel_type" required placeholder="Yoqilg'i turi" className="form-input" />
              <input name="transmission" required placeholder="Uzatmalar qutisi" className="form-input" />
              <input name="engine_volume" required placeholder="Dvigatel hajmi" className="form-input" />
            </div>

            <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-6 border-b pb-2">Sotuvchi Kontaktlari</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <input name="owner_phone" required defaultValue="+998901234567" className="form-input" />
              <input name="telegram_user" defaultValue="Rustamovv_E" className="form-input" />
              <input name="instagram_user" defaultValue="rustamovv.09" className="form-input" />
            </div>

            <div className="space-y-6">
              <textarea name="description" rows={4} className="form-input min-h-[100px] py-4 resize-none" placeholder="Mashina holati haqida batafsil..." />

              {/* GALEREYADAN RASM TANLASH QISMI */}
              <div className="p-8 border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50 flex flex-col items-center gap-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mashina rasmini tanlang</label>
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  required 
                  className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-zinc-900 file:text-white hover:file:bg-red-600 transition-all cursor-pointer" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full h-16 bg-zinc-900 hover:bg-red-600 text-white font-[900] uppercase tracking-[0.2em] rounded-[24px] shadow-xl transition-all active:scale-[0.98] mt-10 disabled:opacity-50 text-xs"
            >
              {loading ? "YUBORILMOQDA..." : "E'LONNI TASDIQLASH"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          height: 3.5rem;
          background-color: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 1.25rem;
          padding: 0 1.25rem;
          outline: none;
          transition: all 0.3s;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .form-input:focus {
          background-color: white;
          border-color: #EF4444;
        }
      `}</style>
    </main>
  );
}