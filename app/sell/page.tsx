"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Car, Phone, User } from "lucide-react";

export default function SellCarPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      car: formData.get("car"),
      details: formData.get("details"),
    };

    // Sening Telegram ma'lumotlaring
    const botToken = "8716193054:AAFoaX8zIEhjZaluaRaaPnIdXHOOfhivCjw";
    const chatId = "8273165378"; 
    
    const message = `
🚗 **YANGI E'LON SO'ROVI**
👤 Sotuvchi: ${data.name}
📞 Telefon: ${data.phone}
🚘 Mashina: ${data.car}
📝 Ma'lumot: ${data.details}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
      alert("So'rovingiz yuborildi! Tez orada siz bilan bog'lanamiz.");
    } catch (error) {
      alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-[32px] p-8 shadow-xl border border-zinc-100">
        <h1 className="text-3xl font-black italic uppercase mb-2">E'lon <span className="text-red-600">Berish</span></h1>
        <p className="text-zinc-500 text-sm mb-8 font-medium">Ma'lumotlarni qoldiring, biz siz bilan bog'lanamiz va e'loningizni saytga joylaymiz.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <User size={14} /> Ismingiz
            </label>
            <Input name="name" placeholder="Masalan: Elshod" required className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Phone size={14} /> Telefon raqamingiz
            </label>
            <Input name="phone" placeholder="+998" required className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Car size={14} /> Mashina modeli
            </label>
            <Input name="car" placeholder="Masalan: Chevrolet Gentra" required className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Send size={14} /> Qo'shimcha ma'lumot
            </label>
            <Textarea name="details" placeholder="Yili, holati, narxi..." className="rounded-xl min-h-[100px]" />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black uppercase italic rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-200">
            {loading ? "Yuborilmoqda..." : "So'rovni yuborish"}
          </Button>
        </form>
      </div>
    </div>
  );
}