export default async function Home() {
    // 1. Next.js ga "Buni build vaqtida qidirmagin, keshlamagin" deb aytamiz
    const res = await fetch("https://avtobozor.onrender.com/mahsulot/", { 
        cache: 'no-store' 
    });

    // 2. Agar Render uxlab yotgan bo'lsa, xato berib yiqilmasligi uchun himoya qo'yamiz
    if (!res.ok) {
        return <div className="text-center mt-10 text-xl font-bold text-red-500">Server uyg'onmoqda... 1 daqiqadan so'ng sahifani yangilang!</div>;
    }

    const data = await res.json();

    return (
        <div/>
            {data.map((item: any) => (
                <div key={item.id}>
                    <h1 className="text-4xl font-bold text-center text-blue-500">{item.name}</h1>
                    <h1 className="text-2xl font-bold text-red-600">{item.price}</h1>
                    <p className="text-2xl font-bold">{item.description}</p>
                </div>
            ))}
        </div>
    )
}