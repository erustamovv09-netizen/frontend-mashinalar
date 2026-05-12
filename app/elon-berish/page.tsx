"use client";
import { useState } from "react";
// Kerakli importlarni (Button, Input, va h.k.) tepaga qo'shib qo'ying

export default function PublicSellPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("https://avtobozor.onrender.com/api/avto-elonlar/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        
        // --- LOCALSTORAGE MANTIQI ---
        const myCars = JSON.parse(localStorage.getItem("myCars") || "[]");
        myCars.push({
          id: data.id,
          time: new Date().getTime() // Qo'shilgan vaqt
        });
        localStorage.setItem("myCars", JSON.stringify(myCars));
        // ----------------------------

        alert("Mashina qo'shildi! 15 daqiqa davomida tahrirlashingiz mumkin.");
        window.location.href = "/products"; // Mashinalar ro'yxatiga yuboramiz
      }
    } catch (err) {
      alert("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 uppercase italic">Mashina <span className="text-red-600">qo'shish</span></h1>
      {/* FAQAT FORMANI SHU YERGA QO'YING */}
      <form onSubmit={handleSubmit} className="space-y-4">
          {/* Inputlar... */}
          <button type="submit" disabled={loading} className="w-full bg-red-600 p-4 text-white font-bold">
            {loading ? "Yuborilmoqda..." : "E'LONNI TASDIQLASH"}
          </button>
      </form>
    </div>
  );
}