"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/loyiham/")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-mono font-bold p-8 text-center">dokon</h1>

      <div>
        <ul>
      {data.map((p, i) => (
        <li key={i} className="text-2xl font-mono font-bold text-blue-500 p-2 px-12">
          {p.name} - {p.price} - {p.description}
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
}