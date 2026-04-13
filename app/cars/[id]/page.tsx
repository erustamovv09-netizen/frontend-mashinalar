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

  return (
    <div className="min-h-screen bg-zinc-50/50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigatsiya */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-black mb-8 transition-colors">
          ← BOSH SAHIFA / MASHINALAR
        </Link>

        <div className="bg-white rounded-[32px] shadow-xl shadow-zinc-200/50 overflow-hidden border border-zinc-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* CHAP TOMON: RASM */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] bg-zinc-100">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute bottom-6 left-6 bg-red-600 hover:bg-red-600 text-white px-4 py-1.5 brounded-full text-sm font-bold shadow-lg">
                {car.year}-YIL
              </Badge>
            </div>

            {/* O'NG TOMON: MA'LUMOTLAR */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4 uppercase italic">
                  {car.name}
                </h1>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-4xl font-black text-green-600 italic">
                    {Number(car.price).toLocaleString()}$
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded">
                    Bojxonadan o'tgan
                  </span>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3">Tavsif</h3>
                    <p className="text-zinc-600 leading-relaxed text-lg">
                      {car.description || "Ushbu mashina haqida qo'shimcha ma'lumot kiritilmagan."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Ishlab chiqarilgan</p>
                      <p className="font-bold text-zinc-900 text-lg">{car.year} yil</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                      <p className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Holati</p>
                      <p className="font-bold text-zinc-900 text-lg">Yangi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TUGMA */}
              <div className="mt-10">
                <Button className="w-full h-16 text-lg font-bold uppercase rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-xl shadow-red-200/50 active:scale-[0.98]">
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