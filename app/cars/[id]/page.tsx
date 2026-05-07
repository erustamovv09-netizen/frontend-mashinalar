import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  MessageCircle,
  Send,
  Calendar,
  Fuel,
  Settings,
  Gauge,
  Palette,
  ShieldCheck,
  MapPin
} from "lucide-react";
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
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-bold italic uppercase">Ma'lumot topilmadi</h2>
        <Button asChild variant="outline" className="rounded-full px-8">
          <Link href="/cars">Katalogga qaytish</Link>
        </Button>
      </div>
    );
  }

  const imageUrl = car.image
    ? (car.image.startsWith('http') ? car.image : `http://127.0.0.1:8000${car.image}`)
    : '/placeholder.jpg';

  const phoneNumber = car.owner_phone || "+998901234567";
  const messageText = `Assalomu alaykum! AVTOBOZOR saytida ko'rgan ${car.name} mashinangiz bo'yicha bog'lanayotgan edim.`;

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 mb-8 uppercase tracking-[0.2em]">
          <Link href="/" className="hover:text-red-600">BOSH SAHIFA</Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-red-600">MASHINALAR</Link>
          <span>/</span>
          <span className="text-zinc-900">{car.name}</span>
        </div>

        {/* items-start klassi o'ng tomonni to'g'ri tushishi uchun muhim */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* CHAP TOMON: RASM */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-zinc-200 border border-white">
              <img
                src={imageUrl}
                alt={car.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <Badge className="bg-white/90 backdrop-blur text-black px-4 py-2 rounded-2xl text-xs font-black shadow-xl border-none uppercase">
                  {car.year}-YIL
                </Badge>
                <Badge className="bg-red-600 text-white px-4 py-2 rounded-2xl text-xs font-black shadow-xl border-none uppercase tracking-widest">
                  YANGI
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-600" /> Avtomobil haqida ma'lumot
              </h3>
              <p className="text-zinc-600 leading-relaxed text-lg font-medium italic">
                {car.description || "Ushbu avtomobil Shahrisabzda joylashgan bo'lib, barcha texnik ko'rikdan o'tgan. To'liq ma'lumot olish uchun sotuvchi bilan bog'laning."}
              </p>
            </div>
          </div>

          {/* O'NG TOMON: NARX VA PARAMETRLAR (STICKY) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 transition-all">
            <div className="bg-white rounded-[32px] p-6 md:p-8 border border-zinc-100 shadow-xl shadow-zinc-200/50">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tighter leading-none uppercase italic mb-2">
                  {car.name}
                </h1>
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold">
                  <MapPin className="w-3 h-3 text-red-600" /> SHAHRISABZ, O'ZBEKISTON
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-8">
                {/* Narx telefonda text-4xl, kompyuterda text-5xl */}
                <span className="text-4xl md:text-5xl font-black text-zinc-900 italic tracking-tighter">
                  {Number(car.price).toLocaleString()}
                </span>
                <span className="text-3xl md:text-4xl font-bold text-red-600">$</span>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-8">
                <div className="p-3 md:p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    <Settings className="w-3 h-3" /> Transmissiya
                  </div>
                  <p className="font-black text-zinc-900 text-xs md:text-sm italic">{car.transmission || "Avtomat"}</p>
                </div>
                <div className="p-3 md:p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    <Fuel className="w-3 h-3" /> Yoqilg'i
                  </div>
                  <p className="font-black text-zinc-900 text-xs md:text-sm italic">{car.fuel_type || "Elektr"}</p>
                </div>
                <div className="p-3 md:p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    <Gauge className="w-3 h-3" /> Dvigatel
                  </div>
                  <p className="font-black text-zinc-900 text-xs md:text-sm italic">{car.engine_volume || "0.0 L"}</p>
                </div>
                <div className="p-3 md:p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase mb-1">
                    <Palette className="w-3 h-3" /> Rangi
                  </div>
                  <p className="font-black text-zinc-900 text-xs md:text-sm italic">{car.color || "Oq"}</p>
                </div>
              </div>

              {/* BOG'LANISH TUGMALARI */}
              <div className="space-y-3">
                <a href={`tel:${phoneNumber}`} className="block cursor-pointer">
                  <Button className="w-full h-14 md:h-16 text-[11px] md:text-xs font-black uppercase rounded-2xl bg-zinc-900 hover:!bg-black text-white transition-all shadow-xl active:scale-95 italic tracking-widest gap-3 cursor-pointer">
                    <Phone className="w-4 h-4 fill-white" /> Telefon orqali bog'lanish
                  </Button>
                </a>

                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <a href={`https://t.me/Rustamovv_E`} target="_blank" className="block cursor-pointer group">
                    <Button
                      variant="outline"
                      className="w-full h-12 md:h-14 rounded-2xl border-zinc-200 hover:!bg-[#0088cc] hover:!text-white hover:!border-[#0088cc] transition-all active:scale-95 italic uppercase text-[9px] md:text-[10px] font-black gap-2 cursor-pointer group"
                    >
                      <Send className="w-4 h-4 text-[#0088cc] group-hover:text-white transition-colors" />
                      Telegram
                    </Button>
                  </a>

                  <a href={`https://www.instagram.com/rustamovv.09`} target="_blank" className="block cursor-pointer group">
                    <Button
                      variant="outline"
                      className="w-full h-12 md:h-14 rounded-2xl border-zinc-200 hover:!bg-[#E4405F] hover:!text-white hover:!border-[#E4405F] transition-all active:scale-95 italic uppercase text-[9px] md:text-[10px] font-black gap-2 cursor-pointer group"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#E4405F] group-hover:text-white transition-colors"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Instagram
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}