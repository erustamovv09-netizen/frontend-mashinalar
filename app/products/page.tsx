export default async function Home() {
    const res = await fetch("http://127.0.0.1:8000/mashinalar");
    const data = await res.json();


    return(
        <div>
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