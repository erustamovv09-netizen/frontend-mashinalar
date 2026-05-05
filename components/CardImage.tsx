import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

async function getData() {
    const res = await fetch("http://127.0.0.1:8000/mahsulot/", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default async function CardImage() {
    const data = await getData();

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-black text-center mb-12 uppercase italic">
                AVTO<span className="text-red-600">BOZOR</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
                        <Link href={`/cars/${item.id}`}>
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                            <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="text-3xl font-black text-green-600">
                                {Number(item.price).toLocaleString()}$
                            </div>
                        </CardContent>

                        <CardFooter>
                            <Button asChild className="w-full bg-zinc-900 hover:bg-red-600 text-white font-bold py-6">
                                <Link href={`/cars/${item.id}`}>Batafsil ko'rish</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}