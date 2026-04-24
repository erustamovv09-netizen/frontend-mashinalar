import Link from "next/link";

async function getData() {
  try {
    const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error(`Xatolik: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Backend ulanishida xato:", error);
    return []; 
  }
}

export default async function Page() {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Hozircha sotuvda mashinalar yo'q.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase italic mb-8 border-l-4 border-red-600 pl-4">
          Barcha <span className="text-red-600">Mashinalar</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item: any) => (
            <div 
              key={item.id} 
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image || "/no-image.jpg"} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                  Sotuvda
                </div>
              </div>

              <div className="p-4">
                <Link href={`/cars/${item.id}`}>
                  <h2 className="text-lg font-bold text-zinc-900 hover:text-red-600 transition-colors line-clamp-1">
                    {item.name}
                  </h2>
                </Link>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-black text-zinc-900">
                    {Number(item.price).toLocaleString()} <span className="text-xl text-red-600">$</span>
                  </span>
                </div>

                <p className="text-zinc-500 text-sm mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <Link href={`/cars/${item.id}`} className="block mt-4">
                  <button className="w-full py-2.5 bg-zinc-900 hover:bg-red-600 text-white text-xs font-bold uppercase rounded-xl transition-all active:scale-95">
                    Batafsil ko'rish
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}