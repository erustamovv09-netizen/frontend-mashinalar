import Link from "next/link";

async function getData() {
  try {
    const res = await fetch("http://127.0.0.1:8000/mahsulot/", { cache: "no-store" });
    if (!res.ok) throw new Error(`Xatolik: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Backend xatosi:", error);
    return [];
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const params = await searchParams;
  const query = params.search || ""; 
  
  const allData = await getData();
  const data = query 
    ? allData.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase()))
    : allData;

  return (
    <main className="min-h-screen bg-zinc-50 py-8 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Sarlavha telefonda biroz kichikroq, kompyuterda kattaroq bo'ladi */}
        <h1 className="text-2xl md:text-3xl font-black uppercase italic mb-6 md:mb-8 border-l-4 border-red-600 pl-3 md:pl-4">
          {query ? `"${query}" bo'yicha natijalar` : <>Barcha <span className="text-red-600">Mashinalar</span></>}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.length > 0 ? data.map((item: any) => (
            <div key={item.id} className="bg-white border border-zinc-200 rounded-2xl md:rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* Rasm qismi */}
              <div className="relative h-48 md:h-52 overflow-hidden bg-zinc-100 shrink-0">
                <img 
                  src={item.image ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`) : '/placeholder.jpg'} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest shadow-md">
                  Sotuvda
                </div>
              </div>
              
              {/* Ma'lumot qismi: flex-grow orqali kartochka bo'yi bir xil qilinib, tugmalar doim pastga tushiriladi */}
              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <Link href={`/cars/${item.id}`}>
                  <h2 className="text-base md:text-lg font-black italic text-zinc-900 hover:text-red-600 transition-colors line-clamp-1">
                    {item.name}
                  </h2>
                </Link>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xl md:text-2xl font-black text-zinc-900 tracking-tighter">
                    {Number(item.price).toLocaleString()} <span className="text-lg md:text-xl text-red-600">$</span>
                  </span>
                </div>
                
                <p className="text-zinc-500 text-xs md:text-sm mt-2 md:mt-3 line-clamp-2 leading-relaxed flex-grow font-medium">
                  {item.description}
                </p>
                
                <Link href={`/cars/${item.id}`} className="block mt-4 md:mt-5">
                  <button className="w-full py-2.5 md:py-3 bg-zinc-900 hover:bg-red-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-md">
                    Batafsil ko'rish
                  </button>
                </Link>
              </div>

            </div>
          )) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
               <p className="text-zinc-400 font-black italic uppercase text-sm tracking-widest">Hech narsa topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}