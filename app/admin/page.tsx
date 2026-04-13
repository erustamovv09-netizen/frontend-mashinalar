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
    console.log("Yuborish boshlandi..."); // Tekshirish uchun

    const formData = new FormData(e.currentTarget);

    try {
      // MUHIM: URL oxirida / borligini tekshiring
      const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
        method: "POST",
        body: formData,
        // FormData yuborayotganda Content-Type sarlavhasini qo'lda yozmang!
        // Brauzer uni avtomatik boundary bilan o'zi sozlaydi.
      });

      console.log("Server javobi:", res.status);

      if (res.ok) {
        alert("E'lon muvaffaqiyatli qo'shildi!");
        router.push("/");
        router.refresh();
      } else {
        const errorData = await res.json();
        console.error("Server xatosi:", errorData);
        alert(`Xatolik: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Fetch xatosi:", error);
      alert("Server bilan aloqa bog'lanmadi. Django ishlayotganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
      <Card className="shadow-2xl border-none rounded-[32px] overflow-hidden">
        <CardHeader className="bg-zinc-900 text-white p-8">
          <CardTitle className="text-3xl font-black uppercase italic tracking-wider">
            Yangi <span className="text-red-600">E'lon</span> berish
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Mashina nomi</Label>
              <Input name="name" id="name" placeholder="Masalan: BYD Song Plus" required className="rounded-xl h-12 text-black" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Narxi ($)</Label>
                <Input name="price" id="price" type="number" placeholder="32000" required className="rounded-xl h-12 text-black" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Yili</Label>
                <Input name="year" id="year" type="number" placeholder="2024" required className="rounded-xl h-12 text-black" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Tavsif (Description)</Label>
              <textarea 
                name="description" 
                id="description" 
                rows={4} 
                className="w-full p-4 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 text-black"
                placeholder="Mashina holati haqida yozing..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Mashina rasmi</Label>
              <Input name="image" id="image" type="file" accept="image/*" required className="rounded-xl h-12 pt-2 text-black" />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-lg rounded-2xl transition-all shadow-lg active:scale-[0.98]"
            >
              {loading ? "Yuborilmoqda..." : "E'lonni joylashtirish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}