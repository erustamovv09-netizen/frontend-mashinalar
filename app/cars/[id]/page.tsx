import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

async function getSingleCar(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/mahsulot/${id}/`, {
      cache: "no-store"
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function CarDetailPage({ params }: { params: any }) {
  const { id } = await params;
  const car = await getSingleCar(id);

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Button asChild variant="outline">
          <Link href="/">Ma'lumot topilmadi. Orqaga qaytish</Link>
        </Button>
      </div>
    );
  }

  const imageUrl = car.image
    ? (car.image.startsWith('http') ? car.image : `http://127.0.0.1:8000${car.image}`)
    : '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black mb-8 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> &nbsp; BOSH SAHIFA / MASHINALAR
        </Link>

        <div className="bg-white rounded-[32px] shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* CHAP TOMON: RASM */}
            <div className="relative h-[400px] md:h-[500px] lg:h-full min-h-[600px] bg-zinc-100 overflow-hidden">
              <img
                src={imageUrl}
                alt={car.name}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <Badge className="absolute bottom-6 left-6 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-2xl uppercase tracking-widest">
                {car.year}-YIL
              </Badge>
            </div>

            {/* O'NG TOMON */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-white">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 uppercase italic">
                  {car.name}
                </h1>

                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-black text-green-600 italic">
                    {Number(car.price).toLocaleString()}$
                  </span>
                  <div className="h-6 w-[2px] bg-zinc-200"></div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                    Bojxonadan o'tgan
                  </span>
                </div>

                <Separator className="my-8" />

                <div className="space-y-8">
                  <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Tavsif</h3>
                    <p className="text-zinc-600 leading-relaxed text-lg font-medium">
                      {car.description || "Ushbu mahsulot haqida batafsil ma'lumot kiritilmagan."}
                    </p>
                  </div>

                  {/* PARAMETRLAR GRIDI */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Brend</p>
                      <p className="font-black text-zinc-900 text-xl uppercase italic">{car.brand || "---"}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Yili</p>
                      <p className="font-black text-zinc-900 text-xl italic">{car.year} yil</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Transmissiya</p>
                      <p className="font-black text-zinc-900 text-xl italic">{car.transmission || "---"}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Yoqilg'i turi</p>
                      <p className="font-black text-zinc-900 text-xl italic">{car.fuel_type || "---"}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Dvigatel hajmi</p>
                      <p className="font-black text-zinc-900 text-xl italic">{car.engine_volume || "---"}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Rangi</p>
                      <p className="font-black text-zinc-900 text-xl italic">{car.color || "---"}</p>
                    </div>

                    {/* HOLATI - OXIRIDA VA MARKAZDA */}
                    <div className="p-5 rounded-3xl bg-zinc-50 border border-zinc-100 col-span-2 flex flex-col items-center justify-center text-center">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2 tracking-widest">Holati</p>
                      <p className="font-black text-green-600 text-2xl italic uppercase tracking-widest">Yangi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TUGMA */}
              <div className="mt-24">
                <Button className="w-full h-20 text-xl font-black uppercase rounded-2xl bg-zinc-900 hover:bg-red-600 text-white transition-all duration-500 shadow-2xl shadow-zinc-300 active:scale-[0.97]">
                  Sotuvchi bilan bog'lanish
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}