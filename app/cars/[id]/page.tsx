// 1. Ma'lumot olish
async function getData(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/mahsulot/${id}/`, { cache: "no-store" });
  return res.json();
}

// 2. Sahifa komponenti
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="p-5">
      <img className="" src={data.image} alt="" />
      <h1 className="text-2xl font-bold">{data.name}</h1>
      <img src={data.images} alt="" className="w-64 my-4 rounded" />
      <p>Narxi: {data.price} $</p>
      <p>{data.description}</p>
    </div>
  );
}