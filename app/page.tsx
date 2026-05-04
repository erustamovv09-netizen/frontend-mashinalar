// app/page.tsx

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Partners from "@/components/Partners";
import Hero from "@/components/Hero";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
    cache: 'no-store',
    next: { revalidate: 0 }
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>


      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Partners />
        {/* Bo'lim sarlavhasi */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-4">
            OMMABOP <span className="text-red-600">AVTOMOBILLAR</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Eng sifatli va ishonchli avtomobillar sizni kutmoqda
          </p>
        </div>

        {/* Mashinalar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item: any) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all group">
              <Link href={`/cars/${item.id}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`) : '/placeholder.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-black hover:bg-white">
                    {item.year}
                  </Badge>
                </div>
              </Link>

              <CardHeader>
                <Link href={`/cars/${item.id}`}>
                  <CardTitle className="text-2xl font-bold hover:text-red-600 transition-colors cursor-pointer">
                    {item.name}
                  </CardTitle>
                </Link>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-3xl font-black text-green-600">
                    {Number(item.price).toLocaleString()}$
                  </span>
                  <Link
                    href={`/cars/${item.id}`}
                    className="bg-zinc-900 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm hover:bg-red-600 transition-colors"
                  >
                    Batafsil
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

    </>
  );
}