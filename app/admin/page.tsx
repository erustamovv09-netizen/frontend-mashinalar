"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function PostCarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("E'lon muvaffaqiyatli qo'shildi!");
        router.push("/");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert("Xatolik: " + JSON.stringify(errorData));
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card className="shadow-2xl border-none rounded-[32px] overflow-hidden">
        <CardHeader className="bg-zinc-900 text-white p-8">
          <CardTitle className="text-3xl font-black uppercase italic text-center">
            YANGI <span className="text-red-600">E'LON</span> BERISH
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1-QATOR: Nomi va Brendi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Mashina nomi</Label>
                <Input name="name" placeholder="Masalan: BYD Song Plus" required className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Brendi</Label>
                <Input name="brand" placeholder="Masalan: BYD" required className="rounded-xl h-12" />
              </div>
            </div>

            {/* 2-QATOR: Narxi va Yili */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Narxi ($)</Label>
                <Input name="price" type="number" placeholder="32000" required className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Yili</Label>
                <Input name="year" type="number" placeholder="2024" required className="rounded-xl h-12" />
              </div>
            </div>

            {/* 3-QATOR: Rangi va Yoqilg'i turi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Rangi</Label>
                <Input name="color" placeholder="Oq" required className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Yoqilg'i turi</Label>
                <Input name="fuel_type" placeholder="Benzin/Metan/Elektr" required className="rounded-xl h-12" />
              </div>
            </div>

            {/* 4-QATOR: Uzatmalar qutisi va Dvigatel hajmi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold">Uzatmalar qutisi</Label>
                <Input name="transmission" placeholder="Avtomat/Mexanika" required className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold">Dvigatel hajmi</Label>
                <Input name="engine_volume" placeholder="1.5 L" required className="rounded-xl h-12" />
              </div>
            </div>

            {/* TAVSIF - TO'LIQ QATOR */}
            <div className="space-y-2">
              <Label className="font-bold">Tavsif (Description)</Label>
              <textarea 
                name="description" 
                rows={4} 
                className="w-full p-4 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-red-600 outline-none transition-all"
                placeholder="Mashina holati haqida yozing..."
              />
            </div>

            {/* RASM - TO'LIQ QATOR */}
            <div className="space-y-2">
              <Label className="font-bold">Mashina rasmi</Label>
              <Input name="image" type="file" accept="image/*" required className="rounded-xl h-12 pt-2" />
            </div>

            {/* TUGMA */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black uppercase rounded-2xl shadow-lg transition-all active:scale-95 mt-4"
            >
              {loading ? "YUBORILMOQDA..." : "E'LONNI JOYLASHTIRISH"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}