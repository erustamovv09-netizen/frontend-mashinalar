import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

async function getData() {
    try {
        const res = await fetch("https://avtobozor.onrender.com/mahsulot/", { cache: "no-store" });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function CardImage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
            {/* Sarlavha telefonda biroz ixcham qilingan */}
            <h1 className="text-3xl md:text-4xl font-black text-center mb-8 md:mb-12 uppercase italic">
                AVTO<span className="text-red-600">BOZOR</span>
            </h1>

            {/* Telefonda gap-5 (oraliq), kompyuterda gap-8 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {data.map((item: any) => {
                    // Rasmlar manzilini to'g'rilash (Django'dan kelganda sinib qolmasligi uchun)
                    const imageUrl = item.image
                        ? (item.image.startsWith('http') ? item.image : `https://avtobozor.onrender.com${item.image}`)
                        : '/placeholder.jpg';

                    return (
                        <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">

                            <Link href={`/cars/${item.id}`} className="shrink-0">
                                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                                    <img
                                        src={imageUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                    <Badge className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur text-black hover:bg-white text-[10px] md:text-xs font-black px-3 py-1 uppercase tracking-widest shadow-sm border-none">
                                        {item.year}
                                    </Badge>
                                </div>
                            </Link>

                            {/* flex-grow orqali kartochkalar bo'yi tenglashtiriladi */}
                            <CardHeader className="flex-grow p-4 md:p-6 pb-0 md:pb-2">
                                <Link href={`/cars/${item.id}`}>
                                    <CardTitle className="text-lg md:text-2xl font-black hover:text-red-600 transition-colors cursor-pointer line-clamp-1 italic uppercase tracking-tight">
                                        {item.name}
                                    </CardTitle>
                                </Link>
                                <CardDescription className="line-clamp-2 mt-2 text-xs md:text-sm text-zinc-500 font-medium">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-4 md:p-6 pt-3 md:pt-4">
                                <div className="text-2xl md:text-3xl font-black text-green-600 tracking-tighter">
                                    {Number(item.price).toLocaleString()} <span className="text-xl text-red-600">$</span>
                                </div>
                            </CardContent>

                            <CardFooter className="p-4 md:p-6 pt-0">
                                <Button asChild className="w-full bg-zinc-900 hover:bg-red-600 text-white font-black h-12 md:h-14 rounded-xl uppercase tracking-widest text-[10px] md:text-xs transition-all active:scale-95 shadow-md">
                                    <Link href={`/cars/${item.id}`}>Batafsil ko'rish</Link>
                                </Button>
                            </CardFooter>

                        </Card>
                    );
                })}
            </div>
        </div>
    )
}