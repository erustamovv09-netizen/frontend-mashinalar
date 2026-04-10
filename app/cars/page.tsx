import Link from "next/link";

async function getData() {
  // MUHIM: Port 8000 va oxirida / belgisiga e'tibor bering
  const res = await fetch("http://127.0.0.1:8000/mahsulot/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Ma'lumot olishda xato: " + res.status);
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  // Agar ma'lumot list bo'lmasa, xato chiqmasligi uchun
  if (!Array.isArray(data)) {
    return <div>Ma'lumot formatida xatolik bor.</div>;
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-amber-200">
      {data.map((item: any) => (
        <div key={item.id} className="border p-4 rounded-lg shadow-md">
          <img src={item.image} alt="" />
          <Link href={`/apps/${item.id}`}>
            <h2 className="text-xl font-bold text-blue-600 hover:underline">
              {item.name}
            </h2>
          </Link>
          <p className="text-green-600 font-bold my-2">{item.price} $</p>
          <p className="text-gray-600 line-clamp-2">{item.description}</p>
          {item.images && (
            <img 
              src={item.images} 
              alt={item.name} 
              className="w-full h-40 object-cover mt-3 rounded" 
            />
          )}
        </div>
      ))}
    </div>
  );
}