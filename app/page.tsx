import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/mahsulot/", { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() { // export default bo'lishi shart!
  const data = await getData();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-black text-center mb-12 uppercase italic">
        AVTO<span className="text-red-600">BOZOR</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item: any) => (
          <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all">
            <Link href={`/cars/${item.id}`}>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img 
                  // Rasm URL yoki CharField bo'lsa ham xavfsiz yuklash
                  src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`) : '/placeholder.jpg'} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
                <Link href={`/cars/${item.id}`} className="bg-zinc-900 text-white px-6 py-2 rounded-xl font-bold uppercase text-sm hover:bg-red-600 transition-colors">
                  Batafsil
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}