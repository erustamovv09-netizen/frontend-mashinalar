"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState<any>(null);

  // 1. ESKI MA'LUMOTLARNI YUKLAB OLAMIZ
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/mahsulot/${id}/`);
        if (res.ok) {
          const data = await res.json();
          setCar(data);
        } else {
          alert("Mashina topilmadi");
          router.push("/admin");
        }
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    fetchCar();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // MUHIM MANTIQ: Agar yangi rasm tanlanmagan bo'lsa, eski rasm o'chib ketmasligi uchun uni formadan olib tashlaymiz
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/mahsulot/${id}/`, {
        method: "PATCH", // PATCH faqat o'zgargan joylarni yangilaydi (PUT hamma narsani)
        body: formData,
      });

      if (res.ok) {
        alert("E'lon muvaffaqiyatli tahrirlandi!");
        router.push("/admin");
        router.refresh();
      } else {
        alert("Xatolik yuz berdi. Backendni tekshiring.");
      }
    } catch (error) {
      alert("Server bilan aloqa bog'lanmadi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "w-full h-12 md:h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-5 outline-none transition-all text-xs md:text-sm font-bold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-zinc-400";

  if (!car) {
    return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-zinc-400 text-sm">Yuklanmoqda...</div>;
  }

  return (
    <main className="min-h-screen bg-[#F8F9FA] py-8 md:py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <div className="mb-8 md:mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-[900] italic uppercase tracking-tighter text-zinc-900">
              E'LONNI <span className="text-blue-600">TAHRIRLASH</span>
            </h1>
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
              Ma'lumotlarni o'zgartirish
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">

              <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-blue-600 mb-4 md:mb-6 border-b pb-2">
                Texnik Ma'lumotlar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
                <input name="name" defaultValue={car.name} required placeholder="Mashina nomi" className={inputClassName} />
                <input name="brand" defaultValue={car.brand} required placeholder="Brend" className={inputClassName} />
                <input name="price" defaultValue={car.price} type="number" required placeholder="Narxi ($)" className={inputClassName} />
                <input name="year" defaultValue={car.year} type="number" required placeholder="Yili" className={inputClassName} />
                <input name="color" defaultValue={car.color} required placeholder="Rangi" className={inputClassName} />
                <input name="fuel_type" defaultValue={car.fuel_type} required placeholder="Yoqilg'i turi" className={inputClassName} />
                <input name="transmission" defaultValue={car.transmission} required placeholder="Uzatmalar qutisi" className={inputClassName} />
                <input name="engine_volume" defaultValue={car.engine_volume} required placeholder="Dvigatel hajmi" className={inputClassName} />
              </div>

              <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-blue-600 mb-4 md:mb-6 border-b pb-2">
                Sotuvchi Kontaktlari
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <input name="owner_phone" defaultValue={car.owner_phone} required className={inputClassName} />
                <input name="telegram_user" defaultValue={car.telegram_user} className={inputClassName} />
                <input name="instagram_user" defaultValue={car.instagram_user} className={inputClassName} />
              </div>

              <div className="space-y-4 md:space-y-6">
                <textarea
                  name="description"
                  defaultValue={car.description}
                  rows={4}
                  className={`${inputClassName} h-auto min-h-[100px] py-4 resize-none`}
                  placeholder="Mashina holati haqida batafsil..."
                />

                <div className="p-6 md:p-8 border-2 border-dashed border-zinc-200 rounded-[24px] bg-zinc-50 flex flex-col items-center gap-4 text-center overflow-hidden">
                  <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Yangi rasm tanlash (Majburiy emas)
                  </label>
                  <p className="text-[10px] md:text-xs text-zinc-500 font-bold">Agar rasmni o'zgartirmoqchi bo'lmasangiz, bo'sh qoldiring.</p>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    // REQUIRED YONIQ EMAS! (Chunki eski rasm bor)
                    className="w-full max-w-xs text-[10px] md:text-xs file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-zinc-900 file:text-white hover:file:bg-blue-600 transition-all cursor-pointer mt-2"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:w-1/3 h-14 md:h-16 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-[900] uppercase tracking-[0.2em] rounded-[20px] md:rounded-[24px] transition-all text-[10px] md:text-xs"
                >
                  BEKOR QILISH
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-2/3 h-14 md:h-16 bg-blue-600 hover:bg-blue-700 text-white font-[900] uppercase tracking-[0.2em] rounded-[20px] md:rounded-[24px] shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 text-[10px] md:text-xs"
                >
                  {loading ? "SAQLANMOQDA..." : "O'ZGARISHLARNI SAQLASH"}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </main>
  );
}